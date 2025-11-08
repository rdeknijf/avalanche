+++
title = "My Pants Build Journey"
date = 2025-10-01
description = "Notes from onboarding a large monorepo to Pants Build and keeping my sanity intact."
draft = false
+++

I embarked on my quest to Pantsify (as we call it in my team) our quite large monorepo in juli 2024. I've made some notes along the way; this is my Pants journey.

Let me save you some time: Pants is brilliant if you keep close enough to the paved Python road. You can even walk in the grass next to it, but don't go too far because you'll need to learn new spells. Pants is still worth it forces a single way of working, and allows you to run all validations constantly and repeatably; because it knows what hasn't changed and therefore can be skipped.

## TL;DR

- The official docs are a solid reference once you're close to the answer, but the freshest context still lives in the Pants Slack.
- Goals, targets, inference, dynamic sources… the wiring isn't obvious, and the CLI doesn't yet explain “this goal will run X/Y/Z.”
- `ambiguity_resolution=by_source_root`, just... just set it. Make my pain be worth something!
- Stay in Python-land and you're in good shape. Go, uv as package managr, and TypeScript/JS support still feel experimental, so plan accordingly.
- Remote caching remains hard to reason about, and IDE support (especially JetBrains + BUILD files) is still thin.
- LLMs do better if you convince them to run `pants help`; Claude 4.5 Sonnet was the first model I saw doing that automatically.

## Why Pants Fit Our Monorepo

We needed a single tool to verify everything — tests, formatting, packaging, artifact builds — across one large monorepo every time a developer touched it. Pants nails that. Dependency inference means new targets appear without hand-curating BUILD files, and once a goal runs, the second run is almost instant. It saves us complexity and brain cycles, full stop.

## Documentation and Slack

The official docs are accurate but dense, and Pants v1 guides still haunt search results. [Slack](https://docs.google.com/forms/d/e/1FAIpQLSf9zgf-MXRnVDJbrVEST3urqneq7LCcy0zw8qU-GH4hPMn52A/viewform?usp=sf_link) threads are where you learn the “oh, that flag was renamed last week” details. Archive anything useful: paste snippets into your own Markdown notes, teach your LLMs the context, and save future-you a dig through chat history.

## Goals Need Introspection

At this point I mostly do understand which goal triggers what, but it took repetition and explaining it to other devs. I'd still love `pants goal explain test` to show “here's the rule graph you're about to kick off.”

Right now the closest thing is `pants --engine-visualize-to=out/dir test ::`, which spits out Graphviz files of the rule graph plus the subset used in that run. Pair that with introspection goals like `list`, `dependencies`, `dependees`, and `peek` to see which targets even qualify.

Dynamic targets make discovery harder because `pants list` won't show them until Pants finishes generating them. Expect a bit of “surprise! more targets” output mid-run.

## Dependency Inference: Set Expectations

`ambiguity_resolution=by_source_root` finally made inference behave exactly how I expected: everything under that root belongs together, stop guessing. It's still opt-in (Pants 2.29 keeps the default to `"none"`), so plan on enabling it yourself.

Remember that inference only sees explicit imports. Pytest plugins or helper modules that register themselves without a normal `import` won't be detected, so add them as manual deps.

For example, `pytest-socket` (an [extremely useful plugin](https://pypi.org/project/pytest-socket/) I might add, kudos to Mike!) might often have no `import` anywhere. But you still need it. So put this in your pytest tests dir `BUILD` file, next to `conftest.py`:

```python
python_tests(
    dependencies=[
        "some/path:poetry#pytest-socket",
    ]
)
```

## BUILD Files and IDE Support

It's basically abesent. There's plugins for BUILD files, but they're for Bazel... If you mark them as Python code Jetbrains will colorize them, but also not understand what it's doing there and what its venv is etc.
VSCode is not much better. There's a plugin called "Suspenders", but as far as I can see it doesn't really work.

Treat BUILD files like declarative config wearing a Python costume. Keep real logic in normal modules where tooling helps you.

## Edge Cases: Go, UV, and Friends

Pure Python repos? Pants is a joy. Mix in Go or TypeScript? Now you're beta testing. The docs still badge both the Go and JavaScript/TypeScript backends as beta, which matches my experience: good enough for experiments, shaky for massive mono repos. `uv` backend work is ongoing, and I haven't had the courage to point Pants at our JS projects yet.

## Plugins Are Still a Steep Climb

I've built the tutorial plugin like twice, and each time the jump from “hello world” to “real rule graph” felt abrupt. It's not a secret society, but the documentation assumes you're fluent in the rule engine already. Plan extra time if you need custom behavior.

## LLMs, Slack, and Actual Knowledge

LLMs weren't trained on the Slack archives, so they default to Pants 1 responses unless you spoon-feed them context. Claude 4.5 Sonnet was the first to automatically run `pants help` and stay grounded. Other models can do the same if you explicitly ask them to shell out via MCP or provide the relevant help text yourself. Access isn't the problem; training data is.

## Remote Cache, Docker Layers, and Reality Checks

I wired Pants to a Bazel Remote Cache. Locally, cache hits are obvious. Cross-machine hits? Still anecdotal. Logs don't make it easy to prove what's happening, so debugging feels like reading tea leaves.

PEX packaging also means you lose classic Docker layering tricks. Pants’ own blog has recipes for multi-stage builds that split third-party deps from first-party code using `pex_binary(..., layout="packed")` plus `PEX_TOOLS=1 ... venv --scope=deps/src`, so Docker can cache the heavy layers. Worth a read before assuming it's impossible.

## Resolves (a.k.a. Lock Files) in the Real World

Pants encourages one "resolve" per repo. (It's basically a lock file, but it can be shared by multiple projects within the monorepo.) That’s ideal for fresh repos, but existing estates rarely cooperate. One stubborn legacy service can freeze every dependency bump if everything shares the same lock file.

My current pattern:

1. Keep a “default” resolve for the majority that actually upgrades together.
2. Give each incompatible chunk its own resolve so it stops blocking everyone else.
3. Remember that the interpreter used to *generate* the resolve doesn't have to match the interpreter that eventually runs the code. That tripped me up — document it for your team.

And another thing; I should try again by now, but when I started `pants run` wasn't ready for primetime. So if you also use Poetry, Pipenv or something to manage your packages (You do, right?) you'll have **two** lockfiles, one Poetry one for each project, and a single big one for that Pants resolve. You'll have to re-lock both every time you update something.

## What I'd Tell New Teams Today

1. Use Pants for Python-heavy monorepos when you want consistent verification across everything; it's fantastic at that mission.
2. Understand goals and targets early. Even if Pants can't yet print the rule graph, walk your team through what `lint`, `check`, `package`, etc. actually do.
3. Configure `ambiguity_resolution=by_source_root`, and be ready to declare manual deps for anything Pants can't infer (pytest plugins, dynamic imports, etc.).
4. Plan your resolves up front. Decide which parts share a lock file and which deserve their own before the first upgrade fight.
5. When you need help from an LLM, make it use `pants help`. Claude 4.5 Sonnet has been the most Pants-aware model so far, but any model improves once it sees real context.

Despite the rough edges, I still like Pants a lot. It keeps our large monorepo honest, fast, and boring in all the right ways. I just want more of its magic documented someplace better than Slack - until then, here's my breadcrumb trail.
