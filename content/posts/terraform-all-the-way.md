+++
title = "Terraform All The Way"
date = 2026-05-23
description = "If you're running Kubernetes, Terraform should be doing the application layer too."
draft = false

[cover]
image = "images/sculptures/marcus_aurelius.webp"
alt = "Marcus Aurelius (Equestrian statue, 2nd century AD)"
caption = "Marcus Aurelius (Equestrian statue, 2nd century AD)"
+++

{{< audience >}}
Anyone running or planning cloud infrastructure and/or running applications on that. Plus those interested in a way to annoy quite a few DevOps people.
{{< /audience >}}

When people hear that I promote using Terraform for the whole stack, I almost always get this: "For the infra, sure. But for the application: why not Ansible? Why not Argo? Why not Kustomize? Why not *\<insert tool here\>*."

So here's the thing. In my humble opinion: If you're running Kubernetes, Terraform should be doing the application layer too. Not just the VPC, the cluster, the firewall. Also the deployments, the services, the cronjobs, the persistent volumes. All of it. And I'll make you understand why. Through the power of song... Ehm, no. Let's just do; long winded tales of personal experience. Settle in, kids! Let's bring out the time machine.
## How I got here

Back in 2014, I'm working at Sanoma (Finnish-Dutch publishing house, pile of websites, on-prem-moving-to-AWS) and we're using bash to get servers into existence and Ansible to get software running on them. Then - as I remember it - a Finnish guy from Nordcloud walks in and casually introduces us to this thing called Terraform. Version 0.1. It can barely do anything; it didn't even have modules yet. But I can immediately see the end of two problems that are part of my daily existence; piles of unreadable bash and the non-determinism of cloud orchestration. Terraform is declarative: You tell it what should exist and it just... casts it into being. It's fantastic! And best of all; if there's nothing to do, it will tell you exactly that.

It's not all instantly great, of course. Terraform is intentionally limited. It's not a full programming language, and you notice this almost immediately when you try to do anything clever. No arbitrary control flow, no rich type system, no loops over loops. New Terraform devs are often baffled: "why can't I just..." And the answer is usually, that you shouldn't anyway. The language doesn't give you enough rope to hang yourself with. That is on purpose and the elegance of it. [Dijkstra](https://www.cs.utexas.edu/~EWD/transcriptions/EWD03xx/EWD340.html) put it plainly in 1972:

> The tools we are trying to use and the language or notation we are using to express or record our thoughts, are the major factors determining what we can think or express at all!

A language that won't let you write clever control flow isn't broken. It's opinionated about what you should be thinking about.

But, back to 2014. Baby Terraform is not just linguistically limited, it's limited; full stop. So we settle for Terraform plus Ansible. The two get wrapped up in a single command-line tool that we call - I kid you not - "Terrible". The joke is so appreciated that we eventually get our room officially renamed to the Terrible Room; including corporate nameplate on the glass next to the door. Yes, really.
## Exit Ansible

A few years pass, and all is well, until Kubernetes enters the scene and confusion ensues; what's Ansible's job? To me it's clear. I think it was Uncle Bob who said "celebrate deletions"; well, bye Ansible.{{< whisper style="paren" >}}My personal parting was made easy by the fact that it had been the bane of my existence for years by then.{{< /whisper >}} VMs become disposable; you don't maintain them, you replace them. State lives elsewhere. SSH stops being a control plane. The thing Ansible was for is just... gone.

So we go looking for what fills the gap. Helm is the obvious candidate; everyone reaches for it for Kubernetes apps. We try it. It works, but back then it still needed Tiller, an in-cluster agent that held release state and had to be deployed and maintained and given cluster privileges. Heavy, flaky. And meanwhile Terraform's capabilities are growing fast. Quite soon most of what Helm does is just a Terraform resource. Helm is more or less dead on arrival, in my situation at least.
## The coupling argument

Yet still, it seems so many folks just really want something - anything - between `terraform apply` and `app.status = deployed`. But why?

Let me make the problem concrete. Imagine you're using Terraform for the "infra" and Helm for the "app." Your app needs Redis. Terraform already knows the IP, because Terraform created the Redis instance. You need a database password. Terraform already has it, because Terraform made the database. You need an ingress name. You can guess. And now you're writing glue to export all of this from Terraform, get it into a Helm values file (or worse, a sealed secret, or an external secret operator). Just so that a second tool can apply the same information to the same cluster that Terraform already talks to directly.

Why by all that is holy would anyone want this?!

[Kent Beck](https://tidyfirst.substack.com/p/coupling) has the tightest definition of coupling I know:

> Two elements are coupled with respect to a particular change if changing one element necessitates changing the other element.

Every Terraform output that feeds a Helm value is a piece of coupling you've built by hand, across a tool boundary that Terraform can't see Helm's side of and Helm can't see Terraform's. It's the worst kind of coupling because there isn't even a compiler to warn you when you break it. Terraform has the information. Terraform has the cluster. Terraform has `kubernetes_manifest` and `kubernetes_deployment` and yes, `helm_release` when you want it. There is no information gap. There is no access gap. There is just habit, reinforced by an organisational boundary that used to matter and no longer does (more on that later).

There are real gotchas with going all-Terraform. `kubernetes_manifest` needs API access at plan time, which means you can't always create a cluster and plan its manifests in a single run. You break the work in two and Terragrunt resolves the dependency for you (more on Terragrunt later). And if a CRD is also being reconciled by an in-cluster operator that mutates the resource, Terraform will see drift forever. Pick a side. Either Terraform owns it or the operator does.

And there's still a place for Helm. I still maintain Helm deployments daily for the things you really shouldn't reimplement: operators, Elasticsearch, etcd, Argo{{< whisper style="paren" >}}yes, I use Argo, but not for anything Terraform should be managing{{< /whisper >}}. I just don't write charts myself. With AI translating Helm to Terraform for free, the cost of owning the YAML yourself is mostly historical.
## The steel-man

I love adversarial reviews. So let me give the other side its best shot.
### Continuous reconciliation

The thing Terraform genuinely lacks is continuous reconciliation. Argo CD runs a loop; default interval three minutes. When reality drifts from the Git-declared state, Argo pulls it back. Terraform doesn't do this. Terraform runs when you tell it to. You can schedule it, you can put it behind CI, you can use HCP Terraform's 24-hour drift detection, you can use Spacelift's drift-remediation runs. But there is no tool I know of that does for Terraform what Argo does for Kubernetes manifests; a true fast-loop controller that keeps demanding convergence every few minutes. The philosophy [came out of Google](https://queue.acm.org/detail.cfm?id=2898444) in the Borg/Omega/Kubernetes paper: reconciliation controllers that constantly compare desired state to observed state and take action to converge them. Terraform was designed as a one-shot convergence tool, not a persistent controller. (Atlantis doesn't count; it's a PR-workflow runner. And `driftctl` was sadly deprecated by Snyk in 2023.)

[Crossplane](https://blog.crossplane.io/crossplane-vs-terraform/) takes this the furthest: it literally is a control plane, not a CLI tool. If you want continuous reconciliation over cloud resources, not just Kubernetes manifests, that's where you end up. I've used it, and it works pretty elegantly. But it doesn't hold a candle to the simplicity of Terraform. I'd rather have a smaller mental model than a more powerful one, and Terraform plus Terragrunt plus a scheduled apply gets me most of the way there. But if you're going to push back on this post in good faith, Crossplane is the strongest framing to push from.

### Rollback

Then there's rollback. Omg, don't get me started on rollbacks. I should write a whole post about why you shouldn't ever depend on it or sell it. But hey, it's a thing. `helm rollback` and Argo's one-click revert are just faster than `git revert` plus another apply. If your release cadence makes that difference matter, that's a real thing.

### Dashboards

Argo CD has a good UI. A live resource tree, color-coded by health, with one-click sync. You open it and you *see* what's going on. Terraform's UI story is "read the plan output." That's it.

It's gotten better. HCP Terraform has drift detection, Spacelift shows per-resource drift indicators, and the newer platforms (Scalr, Terramate Cloud, Gruntwork's Pipelines Dashboard) all give you some form of real-time infrastructure view. If you're paying for one, you're not flying blind.

But none of them have Argo's topology view. That "open a browser and see my cluster" experience doesn't exist in the Terraform world. If that's what you need day-to-day, fair enough. I've never felt the need; but I do love observability, so since researching for this article I've put it on my todo list.

### Locking down state

The sharpest written counter is from [Nat Bennett](https://www.simplermachines.com/why-you-shouldnt-use-terraform-to-manage-kubernetes-deployments/), who argues that Terraform's state is deceptively hard to manage, introduces security risks, and is redundant with Kubernetes internal state management. His strongest point is about secrets: anyone with access to the S3 bucket holding your state has access to every secret any resource in that state file uses. That's not a small thing. It's the single best argument for *not* doing this.

I'll be honest: in practice, I mostly work in small teams where every developer has admin access and the state bucket is just another thing everyone can reach. I know that's naive at scale. If you're in a regulated environment or a large org where state access is a genuine security boundary, this is a real problem and Bennett is right to flag it. For the teams I work with, the tradeoff is: secrets-in-state is a known risk I accept, because the alternative (a permanent tool boundary maintained forever) costs more in practice than locking down a bucket.

What I'm saying is: in my experience, simplicity wins. And one tool doing the whole stack (usually) beats the advantages of the separate tools. If you actually need the fast reconcile loop (really need it, not just "it would be nice") that's the case where a second tool is justified. The boundary is worth drawing when the second tool buys you something the first one structurally cannot.
## Terragrunt

Terraform itself has real limits. Some resources can't be used until others exist, so you get chicken-and-egg problems, and you end up reaching for something to glue it together. For years now, that something has been Terragrunt.

I may have come to Terragrunt late, *it* showed up really early. It had remote state locking before Terraform did, and later solved the DRY-modules problem Terraform still hasn't. I always felt the things it offered would eventually land in Terraform proper. And quite a few actually did.

"But," you say, "isn't your whole schtick here to promote single tool-use over multiple?" Yes, that is indeed my thing. However, I wouldn't call Terragrunt a tool. It's a toolbox. Seventeen-ish different tools in one beautifully banged up bag. Pick the ones you need and ignore the rest. Dependency resolution across Terraform states. Conditional retries when a cloud API hiccups. A way to express "this thing depends on that thing that another TF project owns" without manually wrangling remote state outputs. I wish I had stepped on the Terragrunt bandwagon a lot earlier than I did.

And now, with Terragrunt 1.0, the whole stack resolves in one go. Things get created as soon as they can be created, in parallel, and your only bottleneck is the cloud itself. If Google won't give you a GKE cluster in less than twenty minutes, you're waiting twenty minutes. There's no way around that. But if the bottleneck is the cloud and not your tooling, you've done your job. Stacks that used to take a day to get right now come up in a few minutes.
## Drop the line

Why do we separate "infra" from "application" at all? Because it used to map onto real boundaries. Infra was hardware, hardware cost money, the people who bought/rented hardware protected the budget, and applications were whatever those people let you run on the hardware. Hardware was slow to change; applications fast. Different cadences, different cost owners, different tools.

In a properly elastic cloud setup, with a properly IoC-ed codebase, this is simply not true anymore. Your cost is not determined by how much infra you provisioned; it's determined by how much work your application did. At Energyworx we have setups that go from one pod on one node to five or six thousand pods under load, and back down, without a human making any capacity decision (outside of some quota for cost protection). Node auto-provisioning gives each pod almost exactly what it needs, with a little breathing room, and the total cost is determined entirely by how much data the pipeline ate and how efficiently the code chewed it.

If infra and application no longer have two different cadences and two different cost structures, then the boundary between them is an arbitrary line you're drawing for historical reasons. And every line you draw in software creates an edge, and edges are both where the costs are and where things break. Gray-area resources get double-managed, or not-managed. (Either is a big problem.) State drifts. Ownership gets fuzzy. Dependencies cross the line and nobody notices until something breaks at 2 AM.

[Conway's Law](https://www.melconway.com/Home/pdf/committees.pdf) has been saying this since 1968: the system you build will mirror the organisation that built it. Two teams, two tools, a gray area in between. That's not a technical architecture; it's an org chart with YAML on top.

[Kelsey Hightower](https://changelog.com/posts/monoliths-are-the-future) was blunter:

> We are just building distributed monoliths; we are not drawing the boundaries correctly.

The fix isn't drawing the line better. It's asking whether you need the line at all.

So stop asking "which part is the infra and which part is the application." Treat the whole thing as one graph, with one state, managed by one tool, owned by one team. Reason from first principles. If you discover you don't need the distinction, congratulations. You've just been handed the gift of a metric ton less complexity, forever.
