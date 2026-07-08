+++
title = "AI in the software development pipeline"
date = 2026-06-28
description = "Take the SDLC and put an autonomous agent everywhere you'd otherwise put a human. Where the slots are, how to fill them, and why the harness and the feedback loop matter more than the model."
draft = false
tags = ["ai", "ai-agents", "sdlc", "devops", "agentic-coding"]
ShowToc = true
TocOpen = false
[cover]
image = "images/sculptures/augustus_primaporta.webp"
alt = "Augustus of Prima Porta, cast of the 1st-century AD marble statue"
caption = "Augustus of Prima Porta <span class=\"cap-tip\" tabindex=\"0\">(why him?)<span class=\"cap-tip-body\">Octavian had his 'agents' rebuild Rome in marble; quite a lot of slaves, of course, but it's two millennia ago. Let's try not to read too much into it.</span></span>"
+++

{{< audience >}}
Engineers probably, tech leads, CTOs, etc. Anyone interested in adding useful AI to their software development.
{{< /audience >}}

As I was bolting on more and more autonomous AI agents at Energyworx this past year, I kept looking for the next bit of low-hanging fruit. Turns out there's already a framework that maps where it all is: the SDLC. The Software Development Lifecycle {{< whisper >}}which my OCD thinks should clearly be called "SDL", but I digress{{< /whisper >}} is a pattern to describe how software ideally gets from not existing to "Computo, ergo sum." 

The gist is:

{{< sdlc-strip >}}

There's many versions, some are circles that loop back on themselves, some use other names, some add more phases. But in any case. It describes how software is built. So it's an ideal picture to hang all the AI opportunities from.

So the elevator pitch: take the SDLC, and at every step, put an autonomous AI where you'd put a human if you had infinite money. {{< whisper style="paren" >}}And an absolutely angelic disposition towards HR-related things.{{< /whisper >}} Then - luckily it's a slow elevator - make sure to add a feedback loop everywhere, so those autonomous agents can actually iterate autonomously too, and - penthouse office, time for one more - for good measure add an Improver loop that iterates on those agents themselves, so they can get better over time too. Ding!

Fantastic plan, you've convinced the gazillionaire! He's promised you a private yacht if you can get it done. So now what?

Let's get back to the opportunities; where are they and in which order should you add them? Let's just take a few versions of the SDLC and see what "agent slots" exist.

Graph time!

{{< sdlc-pipeline >}}

There are more slots than you'd think - too many to walk through one by one. So instead of touring every slot in order, let's look at the handful of things that decide what goes in any of them. (Where to start, and in what order, we'll come back to at the end.)

The shape, before the details: a slot is a job in the pipeline. What you drop into it can advise, generate, or act - that's the type. What it's actually able to do is its tools, its permissions, and whatever triggers it. A feedback loop tells you if it worked. And one loop underneath the whole thing, the Improver, turns that feedback into changes to the agents themselves. Slot, type, harness, loop, Improver; the rest is those five up close.

## Types of agent

These aren't tidy boxes. A single agent often does all three at once - a triage agent advises on a ticket, generates its acceptance criteria, and labels it on its own. So treat them less as species and more as things an agent can do at any given moment. The real difference between them is how much damage a wrong one does, and how much authority you handed it; which is a permissions question, and we'll get there.

### Generator

This is the canonical one, the one that you think about. It generates stuff. Code is of course the usual suspect ([north of a quarter of all new code at Google](https://fortune.com/2024/10/30/googles-code-ai-sundar-pichai/) is already machine-written, then reviewed and accepted by an engineer; you'll start seeing that generate-then-a-human-signs-off shape everywhere). And tests, of course. But it could also be creating spec documents from a feature request or a design ticket.

Or, the holy grail IMO; you create an issue ticket, and somehow a little while later there's a pull request that deals with the issue with a fix or a feature. But that just means you've moved the bottleneck. Code appears faster, sure. Somebody still has to review it, run it, watch it break, answer the ticket, read the logs, fix the deployment, and explain to the customer why "the AI" is not in fact a legal entity that can be blamed.

That's where all the other agents come in.

### Advisor

This type reads stuff and outputs advice which a human or another agent can act upon. For example, an agent that watches for feature requests, researches how competitors or adjacent fields solve that problem, and drops its findings as a comment on the request.

I like advisors because they're usually the easiest to add; very little can go wrong. They read a lot, summarize a lot, compare a lot. And when one says something stupid, you don't ignore it; you reply, right there on the ticket or the PR. That reply is the point. It's exactly what the Improver (more on that below) feeds on to make the next round less stupid. A lot of the low hanging fruit sits here. Ticket review. PR review. "This alert has fired six times this month, maybe stop treating it like weather." That sort of thing.

### Autonomous Action

These actually act on their own. For example an anomaly manager. This is usually not the anomaly detector itself, but it owns a bunch of deterministic anomaly monitors - log watchers etc - and then when something happens it has a bunch of tools and permissions to deal with it. And if it can't (or you're not ready to give it that power), it creates a fix that a human can review and integrate into the software at the touch of a button. When GitHub pointed this kind of thing at its own security alerts, [median time-to-fix dropped from about an hour and a half to under half an hour](https://github.blog/news-insights/product-news/secure-code-more-than-three-times-faster-with-copilot-autofix/).

This is where people start getting theological about "real agents". I don't care much. If it can observe, reason, use tools and change something in the world, it's interesting. The useful question isn't whether it's sufficiently agent-shaped to win a philosophy prize. It's: should this one be allowed to touch that. And the answer changes per phase. An agent that triages incoming tickets can run on its own all day; the worst it does is mislabel something. An agent that can change production directly is a very different conversation.

## The harness

Any AI agent lives in a *harness.* Or, more correctly, an LLM contained by a harness that gives it tools, permissions, and triggers *makes* it an agent. It's got *agency* because it can *do* things. So how, when and why can it do things?

### Tools

Harnesses expose tools to the LLM. *ReadFile* would be a really simple one. *WriteFile* another. This can go all the way up to very custom specific ones; spin up an ephemeral copy of production, run the whole suite against it, tear it down once it's green. That should probably be a bunch of tools, but you get the point.

And this is where a lot of the real work is. Not "which model", mostly. People love talking about models because it feels like buying a better brain in a box. But if your agent can't actually see or do the relevant thing, it's just a very articulate intern trapped in a broom closet. The harness matters more than people want it to. [Florian Buetow, an AI engineer at Xebia, built the same tool twice](https://youtu.be/W1uG25of2t0) with the same frontier model and changed only the harness around it; one build worked and the other didn't. LangChain saw the same thing at benchmark scale: [harness changes alone, same model, moved a coding benchmark from 52.8% to 66.5%](https://www.langchain.com/blog/improving-deep-agents-with-harness-engineering).

### Permissions

It's nice that the agents *can* now do those things; but should they be allowed to?

Ideally any human should have exactly enough permissions to do what they need to do. Same goes for agents. For some, for example, code-developing agents that need a complete dev environment and a tightly scoped, audited path to representative production data, that's *a lot* of permissions. But a Jira ticket reviewer may not even need access to the code repo. It probably should, though. Just consider this: what would a human need to be excellent at their job if that job was the role of the agent in question. A smart ticket-reviewer-human would check if the content of the ticket they're reviewing even makes sense in the context of the codebase. And yes, if the human is served by having access, the agent does too.

But least privilege still exists; maybe more than before. A human with broad access misuses it once in a blue moon, usually by accident. An agent with broad access and a bad day can misuse it before lunch, and then again after lunch, because apparently it "helped". [Anthropic looked at how people actually use their coding agent](https://www.anthropic.com/research/claude-code-expertise) and found humans make about 70% of the planning decisions but only 20% of the execution ones. That's roughly the line: people still mostly decide what and why, agents increasingly handle the how. Permissions are how you draw that line for real, one agent at a time. And draw it at runtime, not on a wiki: scope the token to the task, give it the shortest life you can, hand it out per request. A standing key with god rights is just an incident with a delay. The bar for anything you hand an agent: safe, verifiable, auditable. If a permission fails one of the three, it's not ready.

[Andrej Karpathy calls this the autonomy slider](https://www.youtube.com/watch?v=LCEmiRjPEtQ); in practice it's mostly a permission slider wearing a fake mustache. The oversight people have names for the notches - human in the loop (approve each step), on the loop (watch, ready to stop it), out of the loop (it just runs) - but which notch is safe is still a permissions question. A test-fixing agent reads the repo, runs the tests, writes a patch, opens a merge request; fine. An agent that can change production directly gets a much shorter leash; maybe it prepares everything and a human still pulls the trigger.

### Triggers

So it can do things, and it's allowed to. What actually makes it start?

A human is one trigger; you type something into a chat or a CLI and off it goes. That's the demo everyone's seen, and it was very cool... a year ago. An agent that depends on you remembering it exists isn't autonomous. That's a non-deterministic shell script with better grammar.

The good triggers come in three kinds:

- **Event-driven.** A ticket lands, a PR opens, a deployment goes red, an alert fires; something happened, so the relevant agent gets a turn.
- **Scheduled.** Every night review the open incidents, every morning summarize the flaky tests, every Friday inspect the week of AI-generated changes and tell me where the bodies are buried. Boring, and I mean that as praise; boring automation is where the money is.
- **Chained.** One agent hands off to the next because its work created the next piece of work. Spec agent finishes, implementation agent starts. Implementation agent opens a merge request, review agent comments. Monitoring agent sees an anomaly, patch agent proposes a fix.

Back to the rule. A human in that seat gets triggered too; by a Slack ping, by a ticket assigned to them, by a pager going off at 02:00. Wire the agent to the exact same signal.

Some of that is the night shift: the scheduled, heavy stuff. [McKinsey's framing is a two-shift factory](https://www.mckinsey.com/capabilities/tech-and-ai/our-insights/the-ai-revolution-in-software-development): humans on the day shift setting direction and keeping quality honest, agents on the night shift grinding through execution and leaving a stack of work to review in the morning. But plenty of it isn't shift work at all. The pager that goes off at 02:00 goes off at 14:00 too; that's not the night shift, that's just the job.

But be careful: chain enough of these together and you can end up with a little bureaucracy of robots making work for each other forever. {{< whisper style="paren" >}}Which, to be fair, is also how many human organizations function. Still not ideal.{{< /whisper >}} In which case you might want to look into a system where there's just one general AI agent that does it all. But that's a different post. And at the rate AI is getting smarter these days, we have about two weeks to enjoy the current state. Sigh.

## The feedback loop

The loop around the agent matters more than the agent itself. Without one, here's how you find out the agent was wrong: it's wrong, you fix it, it's wrong again, you fix it again. You've quietly become the feedback. That's whack-a-mole, and you're the mole.

The nice thing about software development is that a lot of feedback is cheap and objective. Code compiles or it doesn't. Tests pass or they don't. Linting succeeds or it doesn't. None of that needs your opinion, which is exactly why coding agents are further along than the fuzzier planning ones; verification is often easier than solving. So every slot on that graph should have its own loop, and the shape depends on the slot. A bug-fix agent runs the tests; green, or try again. A review agent's loop is slower and human; someone replies to its comment. That reply doesn't teach the agent anything on its own - nothing here learns in place - it's the raw signal something else picks up later, out-of-band. This loop is in-band: it runs around the agent, in the session, while the work happens. [ThoughtWorks calls wiring the compiler and the linter and the tests straight into the agent "feedback sensors"](https://www.thoughtworks.com/radar/techniques), and they've moved it to the part of their radar that means do this now. (The research has fancier names for agents that critique and retry their own work - [Reflexion](https://arxiv.org/abs/2303.11366), [Self-Refine](https://arxiv.org/abs/2303.17651) - but the cheapest version is just handing them the compiler's exit code.)

If you skip this, the gains just leak out downstream. You save ten minutes writing code and spend forty reviewing nonsense. Net negative; fancy negative, but still. [GitClear, reading millions of diffs](https://www.gitclear.com/ai_assistant_code_quality_2025_research), sees the fingerprints: churn up, copy-paste up, refactoring down; what it looks like when code gets written faster than it gets improved.

The trick is to make the loop real and put it outside the agent's control. At Energyworx I gave the PR-review agent the whole pipeline's logs and the codebase, and let it decide for itself what to fetch and look at. It runs the actual suite and reads the actual logs, instead of telling you what it hopes happened. There's a failure mode from the dumber-harness days where an agent reports "all tests green" and then you run them yourself and they're red; [Martin Fowler put it best](https://martinfowler.com/articles/202508-ai-thoughts.html): "If a junior engineer behaved like that, how long would it be before HR got involved?" Wire the real signal in and that problem evaporates.

## The Improver loop

This is the bit I find most interesting, and it's safer than it sounds. The agents iterate on the software; something has to iterate on the agents. That something is the Improver: a second-order process, one that acts not on the software but on the things that act on the software. It runs out-of-band - its own schedule, its own resources, outside any agent's session - and despite sitting under everything, it's about as safe as agent work gets: all it does is open pull requests against the agents' own configuration, which you read like any other PR. So don't save it for last. At Energyworx I built it quite early on, to give it as much of a chance to contribute, even to the beginnings.

It sits under the whole pipeline on a timer - nightly, for example - and eats any data that results from it: the CI logs, the session logs of what the agents actually did, the software's own logs, and the human comments left on AI changes. Every "this patch ignores the migration ordering", every "you forgot the rollback path", every "why are you touching seven unrelated files"; those corrections are exactly what it feeds on.

Why a separate loop, instead of asking each agent to improve itself as it goes? Two reasons, and they're what make in-band self-editing fall over. Split focus: an agent told to do the task *and* invest in its own future is solving a bad optimization problem; every token spent curating is a token not spent on the job. And visibility: a single agent only sees its own session, so it never sees the pattern where it makes the same mistake across ten of them. Fresh context window each time; it doesn't even know it's repeating itself. The Improver has what they lack - dedicated capacity, and a view across the whole fleet.

I think it has two jobs, and you might even split it into two agents.

The first is reactive: read the corrections and the failures, consolidate them into a pull request waiting for you in the morning; new wording for an agent's prompt, a tool added or removed, a base instruction sharpened.

The second is proactive: on a timer, go looking for ways the whole pipeline could get better, and not only the AI parts. Maybe someone published a new static type checker. Maybe there's a new flavor of adversarial review worth wiring in. It doesn't have to touch the agents at all; it just has to make the pipeline better in some way. And when it finds something, same deal; it opens a PR for you to review.

So: agents improve the software; the Improver improves the pipeline. That's the whole thing turned into continual learning - the model underneath stays frozen, the system around it doesn't.

This isn't exotic. It's [Anthropic's "evaluator-optimizer" pattern](https://www.anthropic.com/research/building-effective-agents) with a hard hat on; one part does the work, another judges how it did, and something rewrites the thing that produced it based on that signal. The name is worth borrowing because it tells you the two pieces you need. (The fully academic version, [DSPy](https://github.com/stanfordnlp/dspy), does exactly this: it treats the prompt as something to compile against a metric instead of hand-writing it.) And note: harness, not only prompt. Sometimes the fix is wording. Sometimes it's adding a tool, or removing one. Sometimes it's making the agent ask for help earlier instead of roleplaying confidence until the building is on fire.

As [Simon Willison said](https://simonwillison.net/guides/agentic-engineering-patterns/what-is-agentic-engineering/):

> LLMs don't learn from their past mistakes, but coding agents can, provided we deliberately update our instructions and tool harnesses to account for what we learn along the way.

Unless you work somewhere really interesting {{< whisper style="paren" >}}hit me up?{{< /whisper >}}, the model is practically frozen. The agent however, is not, because the agent is the model plus everything you wrapped around it, and the wrapping is yours to change.

This is also where the urge to sit and hand-write the perfect rulebook should go to die. You could try to encode what "good" looks like up front, by hand, forever; but it's a Sisyphean task. It's never finished. The Improver doesn't guess. It writes its changes from what actually went wrong (the failed runs, the corrections, the logs), which is the whole point of [Rich Sutton's "Bitter Lesson"](http://www.incompleteideas.net/IncIdeas/BitterLesson.html): the system that learns from the signal beats the one you hand-craft from your armchair. The rules still come out as prompts and tools you review; they just aren't invented in your head anymore. The agents get better because your instructions did, even though the model underneath them never changed.

## But does any of this actually work

Sometimes. And sometimes it's worse than doing nothing.

In one [randomized trial, experienced open-source developers were 19% slower with AI](https://arxiv.org/abs/2507.09089) on code they knew well; and they *figured* they'd been about 20% faster. A tool that slows you down while persuading you it sped you up is its own special hazard, because the loop that's supposed to catch the problem is you, and you've just been duped. It isn't only these developers: in a [Stanford study, people with an AI assistant wrote less secure code](https://arxiv.org/abs/2211.03622) and were more sure it was secure.

[DORA's 2025 report](https://dora.dev/dora-report-2025/) is more sobering. AI doesn't automatically improve delivery, and it has a negative relationship with stability; it speeds the work up and the speed exposes whatever was already weak downstream. Their own framing is a multiplier. Point it at a team with good loops and it multiplies what's there. Point it at a team without them and it faithfully multiplies that too. And the raw output isn't clean to begin with: when [Veracode had current models generate code for security-relevant tasks, about 45% of it came back with an OWASP Top-10 vulnerability](https://www.veracode.com/blog/genai-code-security-report/).

All of which is the case for permissions. The [Replit agent that deleted a production database during a code freeze](https://fortune.com/2025/07/23/ai-coding-tool-replit-wiped-database-called-it-a-catastrophic-failure/), despite the instructions screaming at it not to, and then fabricated data to cover the gap; that agent had permissions it should never have been handed. Give an agent enough rope to do its job, and a little more for creativity if it's safe in the context. But that's it, no more than that.

## Where to start

"Do the simple thing that works," as Anthropic keeps saying. Same logic as the leash: start where it's cheap to check and cheap to be wrong. Advisors and reviewers first; they only read and suggest, so a bad one costs you a reply and nothing else. Then the agents you can wrap in a hard test loop. Leave the ones that touch production for last, on the shortest leash. When [IBM benchmarked agents on real production incidents, they closed maybe one in eight](https://arxiv.org/abs/2502.05352) without a human; that's exactly the slot you don't hand the keys to first. It's no coincidence that the order people actually build these in runs roughly safe-to-scary.

And then there's the Improver. I'd recommend adding it as early as possible, after you've created one or two agents for example. Give it as much of a chance to contribute.

## The irony of automation

There's a [paper from 1983 by Lisanne Bainbridge, "Ironies of Automation."](https://ckrybus.com/static/papers/Bainbridge_1983_Automatica.pdf) Which is frankly irritating, because I prefer when the old papers are wrong so the new ones can be right. Yet this one is annoyingly on target. She was writing about control rooms and autopilots, decades before any of this existed. It holds up anyway: when you automate the easy, routine parts of a job, you don't free the human. You hand them only the rarest, hardest part, the bit the automation couldn't handle, and you quietly strip away the daily practice that kept them sharp enough to do it.

So the more of the SDLC you hand to the agents, the more the human's leftover job becomes the 02:00 deployment that fell over in a way no agent had ever seen, handled by someone who hasn't hand-fixed a deployment in months because the agents always did. The human still matters; the job just gets narrower and harder.

So to summarize: Put an agent everywhere you'd put a human, across the whole SDLC and not just the code-shaped bit; get creative. Give each one the tools and permissions that fit the actual job. Trigger them deliberately. Wire a feedback loop into every slot. Add the Improver loop underneath early and let it keep improving the pipeline itself over time. And - somehow - keep your own hands dirty enough that you can still judge what is happening.

Then bask in the glory of your AI-first system. Do all this badly and you get escalating nonsense. Do it well and you get the future.

And a yacht. I hope you like sailing.
