+++
title = "On modularization"
date = 2026-11-16
description = "Why do humans split things? And why more than is useful for the job at hand? About repositories, services, teams, and the toll at the border."
draft = false
tags = ["architecture", "monorepo", "devops", "software-design"]
[cover]
image = "images/sculptures/colossus_constantine.webp"
alt = "Fragments of the colossal statue of Constantine along a courtyard wall in Rome: a marble head, a hand and other parts"
caption = "The Colossus of Constantine, Capitoline Museums, Rome <span class=\"cap-tip\" tabindex=\"0\">(why him?)<span class=\"cap-tip-body\">One emperor, now a head, a hand and some limbs along a courtyard wall. The parts are there; the statue is not.</span></span><br>Photo СССР, [CC BY-SA 2.5 CA](https://creativecommons.org/licenses/by-sa/2.5/ca/), cropped."
+++

{{< audience >}}
Anyone who sorts their work into boxes, which is most people with a job. The second half gets into repositories and services, so it speaks most to engineers, architects, and whoever signs off on their diagrams.
{{< /audience >}}

A recurring part of my work is (trying) to talk people out of splitting something up; a second repository, a separate service, sometimes even a whole separate team. The gist is always that the parts get presented/wishful-thinked as separate, yet in reality they're still coupled, but now there's a border, with all the overhead that requires. It happens so often that I wanted to do some research to figure out why. Why do humans split things? And why do they split more than is useful for the job at hand?

## Why people split things

People divide the world into parts, for two reasons:

One is efficiency: a bag of rice is several thousand grains that happen to cohabitate, but nobody cooks a countable number of them. And you'd be instantly overloaded if you had to think of each of those thousands as separate.

The other is that grouping is simply how we think. People name objects at [a basic level](https://doi.org/10.1016/0010-0285(76)90013-X): they say chair, and less often furniture or kitchen chair. It's the level at which members of a category share many attributes, and the one people reach for first.

That level moves with what you know. A gardener sees beds, varieties and seasons where a visitor sees a garden. Bird watchers and dog experts [used the specific name as often as the general one](https://doi.org/10.1016/0010-0285(91)90016-H) inside their own field, and didn't do so outside it.

### From one head into the world

Dividing is also a skill. A renovation done in the free hours of a household with young children only gets done when it's broken into parts that fit the time available. We teach children (and adults) the same thing: take an overwhelming problem, and cut it up into manageable subproblems. But as long as you're the only one working the problem, there's no practical division. The whole and the parts stay in one brain, just at different levels. There's no overhead, just more focus.

Then that category, useful in that one head, gets carried into the world as a formal boundary, without anyone deciding to do that. People draw the line at the level at which they themselves think.

{{< pullquote >}}People draw the line at the level at which they *themselves* think.{{< /pullquote >}}

### The motives

The motive people name is to simplify, either for themselves or so they can hand parts to others. When people were asked [why they had migrated to microservices](https://doi.org/10.1016/j.infsof.2021.106600), team organization, including autonomy and less synchronization, came up in 11 of the 97 reasons the interviewees gave.

In software a second motive is usually quick to join: the expectation that this thing is going to be huge, that it may initially be manageable as a whole, but it will surely outgrow that soon and we should pre-emptively cut it up.

This is attractive to humans because a huge thing is an important thing, and since you're the one building it, you must be important too. There's a good dose of hubris in that, of course. And planners overestimate future scale to begin with: rail passenger demand forecasts were [106 per cent too high on average](https://doi.org/10.1080/01944360508976688) in a 2005 study.

### Normal enough for LLMs

An ironic but telling thing happened to me while working on this post. When I was discussing/dictating with GPT during a run{{< whisper style="paren" >}}ChatGPT's voice mode works flawlessly, despite wind sounds in the audio stream{{< /whisper >}}, it proposed a second Google Doc to hold the discussion notes, instead of a second tab within the same document. This illustrates what I've been seeing in the wild too; LLMs lean towards formal solutions that are quite often overkill for the problem at hand. In any case, the practice is literally normal enough to end up in LLMs trained on everything.

## How organizations divide work

A manager needs a way to think about the organization, and the natural way is a set of categories. Once responsibility is divided, it's easiest to assume that the work flows along the same lines, and to a degree it then does. The path of least resistance is always within the "cell", your direct colleagues. But where some work was divided between cells and really is (inter)dependent, two people now have to talk, and they need an interface to do it: a paper form or an API contract. Had the two pieces stayed one thing, that interface wouldn't exist.

People focus on dividing work and neglect the work of putting it back together; the research name for that is [coordination neglect](https://doi.org/10.1016/S0191-3085(00)22005-4). There's a [team scaling fallacy](https://doi.org/10.1016/j.obhdp.2012.03.002) too: people underestimate the total labour the work will need as the team grows.

### The water bucket

Once a split exists, people hold on to it. Partly because it's theirs: people [value a product more after completing self-assembly](https://doi.org/10.1016/j.jcps.2011.08.002), the IKEA effect, and I'd expect the same of a boundary you drew yourself. And people quite often cannot imagine a world without the problems they live with. A household that fetches water from a well each day, when offered a tap indoors, asks what to do with the water bucket.

They protect a split the same way. The objection is usually that merging would result in a state that's too complex to manage. Or that it would be unsafe. Keeping it split is then a "solution" to that problem. However, there are often other ways to manage that complexity, and a split through work that belongs together is in the end the costliest one.

Whatever the reason (often a technical one gets the blame), people then treat that reason as fixed. Removing it, so that the merge becomes possible and the coordination cost goes with it, rarely comes up. So I try to remove the condition that blocks an improvement before I accept a workaround for it.

## Boundaries in software and what they cost

Software has an unusually long list of boundaries, all named, and the cost of each is usually quite intuitive: line, function, file, folder, module, package, and somewhere above those, repository and service.

Moving a function to another file is a refactoring that your IDE probably did for you automatically before AI was a practical thing. Moving code into a separate package adds a dependency declaration. Moving it into a separate repository means a change that touches both sides needs a pull request on each side, a second pipeline, an integration and/or contract test and an update of a pinned version. Moving it into a separate service adds a network contract and a deployment order. The cost rises steeply to the right, and the heaviest entries are the hardest to undo.

{{< boundary-ladder >}}

An architect draws the line at the level they think at, like everyone else. Their field is the whole system, so where an outsider sees one application, the architect sees its repositories and services: the two heaviest entries on the list.

### 100+ repos, nothing in production

I once worked for a company where we'd successfully moved a whole bunch of (apparently) coupled repos into a monorepo. Infrastructure changes, a button colour on the frontend, schema changes; anything was as simple as a single commit.

When this client was acquired by another company, the tech people in that company took one look at our monorepo and promptly told us to start adhering to their system of (exceedingly) many interdependent repos. Do note that they had nothing in production; yet already had 100+ repos.

We told them that we came from many repos and ended up at a monorepo because it proved practically unmanageable otherwise. They could not believe it. We told them that it made things like changing the database schema effortless; to which they replied with horror that one never changes the schema. "Why?" we asked. "Because then everything breaks!" … They could not imagine a world in which the problems they knew did not exist.

Software exists to be changeable. Otherwise, it would be hardware. Kent Beck's rule for cohesion: ["put everything that changes at the same time in one place"](https://newsletter.kentbeck.com/p/cohesion).

The acquiring company's repositories looked like this: one per application, one for that application's infrastructure, others for Terraform modules and code libraries, all connected by pinned versions so that each part could in principle be shared and reused. The reasoning holds for a real third-party library. Here they applied it to internal code, with the release discipline and compatibility windows a third party needs. You could call that proper dogfooding. But with no outside user to justify it, the massive daily cost and complexity quickly become ridiculous.

{{< one-change >}}

### Out of sight

In another case, people proposed building an AI agent in its own small repository. The reasoning was that non-developers or junior contributors might work on it, and there they'd stay out of everyone else's way. That's comfortable for them, and it also takes the non-developers' work out of sight and away from the shared repository's tests and validations.

In a monorepo, no one can hide what they're adding, so they'll keep a lookout that what they push is indeed good enough. While in a separate small repo, they're out of mind and out of scope, until the day that it turns out that many people now depend on that repo and the code is basically slop.

### The toll at the border

Quite often the split happens anyway because it pays off at once for whoever makes that choice. A fresh repository is clean and it's theirs; the legacy code next door can stay behind the garden fence. It's there, but not their problem. We all love greenfield projects; however, the cost now moves to the border, where everyone pays the toll in the form of sync meetings, ordered deployments, pinned versions, contract tests and whatever else your particular business requires.

Research on goals points the same way: in interdependent groups, individual goals aimed at a person's own performance [hurt group performance](https://doi.org/10.1037/a0024315) and goals set for the group helped.

## The steel-man

To be fair, the people who split have research on their side too. New Internet ventures whose founding teams had more formalized roles, more specialization and relatively more executives [outperformed those with looser, organic structures](https://doi.org/10.5465/amj.2006.20785590). In software maintenance, specialization [raised individual productivity](https://doi.org/10.1287/mnsc.1090.1057), and a balance with task variety gave the highest productivity.

A third study adds a condition: [change requests were resolved faster](https://herbsleb.org/web-pubs/pdfs/cataldo-socio-2008.pdf) where the coordination that actually took place matched the coordination that the technical dependencies required. Modularization, in the words of that study, is "a necessary but not a sufficient mechanism". The harm comes from a mismatch between the split and how the parts of the work depend on each other.

The people who propose a split usually worry that everyone in one repository will get in each other's way: merge conflicts, release timing, the cognitive load of a large tree. And that's true, but at least it'll be visible. And it'll be hard to coordinate. So fix that then; don't split up and go "lalala" with your fingers in your ears about the coordination problems, because they're really not gone. Just hidden in a place where it's easier to blame others or "the system"; while in reality you're just slow by design now.

{{< pullquote >}}In reality you're just *slow by design* now.{{< /pullquote >}}

One of Martin Fowler's favourite soundbites is [if it hurts, do it more often](https://martinfowler.com/bliki/FrequencyReducesDifficulty.html). He says it about integrating and releasing: merge conflicts and release timing. All beginnings are hard, but once you're over the hump it's really a lot faster than living with distributed problems.

## When to (not) split

Before a split I ask what it's expected to gain and whether anyone has estimated its cost. Someone really should own that, and not just assume the happy path. Quite often the second question is just skipped. The word "just" is a tell that it's not been considered properly. "Just pin the right version." That's easy to say, and in itself not really hard. It's a smart-people trap: how are you both smart AND willing to admit that pinning something is difficult? However, practically, coordinating that the pin moves at some point is usually quite an undertaking.

There are many versions of this: small complexities that on their own are not big or even medium problems. In aggregate, they paint you into the same corner so many companies have ended up in:

The story starts with a startup or a small product that adds features rapidly, and it ends in so much tech debt that even the simplest change is a herculean effort. Everyone in software knows it; it's our hero's journey, except that it ends as a tragedy.

[Lehman's law of increasing complexity](https://en.wikipedia.org/wiki/Lehman%27s_laws_of_software_evolution) says that as a system evolves, its complexity increases unless explicit work is done to maintain or reduce it. Foote and Yoder called the result a [big ball of mud](http://www.laputan.org/mud/): a system whose organization, "if one can call it that, is dictated more by expediency than design". "Systems that were once tidy become overgrown", they wrote.

In a [2018 report by Stripe and Harris Poll](https://stripe.com/files/reports/the-developer-coefficient.pdf), developers estimated that 17.3 hours of an average working week of 41.1 hours go to maintenance: 13.5 hours of technical debt plus 3.8 hours of bad code. Stripe estimates that the bad code alone costs about 85 billion dollars a year worldwide.

### Split it when it proves it

The rule I use: split it when it proves that it needs splitting. So in a new project, nothing is split up.

You don't convince people of this by argument. A trial works better. I once had a project that needed two independent services, expected to grow to three or four. The default plan was two repositories, because that's what you do. As a small experiment, and a bit of a gamble, we put both services in one repository managed with the Pants build system.{{< sidenote >}}[Pants](https://www.pantsbuild.org) is a build system for monorepos.{{< /sidenote >}} The two developers who worked in it were blown away by how fast it could be. They became its advocates. That helped when the organization later consolidated its repositories.

### The test

A split can only prove itself if the parts really are independent. The most concrete test for that comes from DORA.{{< sidenote >}}DORA is the DevOps research programme behind the State of DevOps reports.{{< /sidenote >}} Its [description of loosely coupled teams](https://dora.dev/capabilities/loosely-coupled-teams/) says that parts can be independently acceptance tested and deployed, and a team can change, test and deploy its part without waiting on another team. DORA describes this kind of independence as a predictor of continuous delivery. Repository count by itself says nothing about coupling: one repository can hold independent deployments, and a hundred repositories can still need one ordered deployment.

Some things do pass this test. This site is static. But the Terraform that creates the platform my actually running websites run on is tested and deployed alone and changes on its own schedule; its blast radius is a further reason to keep it apart. A set of small, unrelated websites that share nothing beyond a landing zone{{< sidenote >}}A landing zone is the shared cloud base of accounts and network that the sites run on.{{< /sidenote >}} are independent by that test: each assumes the platform is present and each deploys alone.

For those websites I tried a true monorepo first. The AI coding tools I used then struggled with the different cadences and handled separate repositories more easily, so now a root repository owns the shared platform and refers to each site as a Git submodule.

That's a split for my own convenience, with pinned versions and all. But it came after the monorepo had shown the problem, the sites share nothing beyond the platform, and no change ever needs two of them at once.{{< whisper style="paren" >}}You could call this chickening out, and it kinda is. I should probably try merging them again. AI has since evolved and is now a lot better with this kind of thing.{{< /whisper >}}

### Where the line goes

[Parnas argued in 1972](https://doi.org/10.1145/361598.361623) that a system should be decomposed around the design decisions that are likely to change, each hidden behind a module. Beck frames coupling with respect to a change: ["Two elements are coupled with respect to a particular change if changing one element necessitates changing the other element"](https://newsletter.kentbeck.com/p/coupling). That's where I'd put a boundary: around the decisions that change together.

Once a split has proven itself, make it as light as the goal allows. A folder or a package often does what a repository or a service would. As Dave Farley put it in a [GOTO conversation with Simon Brown and Hannes Lowette](https://gotopia.tech/articles/154/expert-talk-devops-software-architecture): "modularity is always good but you don't necessarily need inter-process communications all over the place". The heavier boundary can follow when a demonstrated problem calls for one.

So why do people split more than is useful for the job at hand? They draw the line at the level at which they themselves think, they expect the thing to be huge, and the split pays off at once for whoever makes it. The colleagues whose work has to cross that line, and later the people who drew it, pay at each crossing.
