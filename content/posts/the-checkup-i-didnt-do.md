+++
title = "The Checkup I Didn't Do"
date = 2026-06-13
description = "Every time a smarter AI model lands, run it over all your projects. I keep telling people that. Then I got three days of Fable, and didn't."
draft = false

[cover]
image = "images/sculptures/laocoon.webp"
alt = "Laocoön and His Sons (Hellenistic marble, Vatican Museums)"
caption = "Laocoön and His Sons (Hellenistic marble, Vatican Museums)"
+++

{{< audience >}}
Anyone using AI to build/maintain many projects; technical or not.
{{< /audience >}}

I've been telling people to do this for a while now. Then I got the exact chance to do it myself, and I didn't. And thus follows a story of regret and resolve:

I preach thusly: Every time a smarter AI system becomes available to you (a new model is the obvious one, but a higher effort level could count too, or a better harness, you name it), you should run a check over all your (active) projects to see if it finds problems, inefficiencies, or even a completely different approach you (or older models) simply never considered.

This really works; it's like something we all know. You re-encounter a problem years later and it's obvious, simply because you're much more experienced in everything around it. I watch my kids go through things I remember from when I was a child. I remember the feeling and childish logic of those moments; sometimes I can still feel an echo of it today. But now, as an adult, I can also see straight through it. This is how Fable felt, like it could just see the bigger picture.

So in those three days that I had Anthropic's Fable model at my fingertips, I of course made it do that checkup, right?

Nope... I thought three things: 1) It's finally here! 2) Wow, this is smart! 3) Damn, it's expensive, better conserve my weekly usage...

I did (probably, the PRs are still pending) clear a massive multi-blocker problem in [Pants](https://www.pantsbuild.org/) (an open-source build system for monorepos) that's been stumping people for years. And I'm super proud of that, and gained another level of existential AI-dread in the process about the fact that this was even possible. But I never got to my checkup! I thought we'd have it forever, maybe it'd get more expensive, but they wouldn't just pull it. Right? Then politics got in the way and the rest is history.

But, next time... I'll be ready.

I made two skills. [`/genius-check`](https://github.com/rdeknijf/dotclaude/blob/main/skills/genius-check/SKILL.md) takes one project and has the smarter model look the whole thing over: fragile code, latent bugs, better designs the everyday model keeps missing. It makes the genius model take the broad view. It writes the findings to disk, including potential fixes so that cheaper models can execute them later. And [`/genius-queue`](https://github.com/rdeknijf/dotclaude/blob/main/skills/genius-queue/SKILL.md) is the loop. It runs first, actually, across all my projects, scores them into tiers by how likely each one is to benefit. It's important to prioritize because who knows how long it'll be available next time. Or what tokens will cost by then.
