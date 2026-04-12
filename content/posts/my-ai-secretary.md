+++
title = "My AI Secretary"
date = 2026-03-03
description = "How I built a personal AI assistant from markdown files, MCP servers, and Claude Code — and what it actually feels like to use one."
draft = false
[cover]
image = "images/sculptures/venus_de_milo.webp"
alt = "Venus de Milo (c. 130 BC)"
caption = "Venus de Milo (c. 130 BC)"
+++

{{< audience >}}
Anyone curious about AI assistants. Gets technical in places.
{{< /audience >}}

I finally got a secretary. Not a real one, alas, but still. Ever since I can remember I've wanted one.

First mostly because my dad had one, and to the five-year-old me he was of course the most powerful man in the world. If I had a secretary, I'd be powerful too, and that would make him proud. Easy!

When I got older this understanding shifted to finding the idea of a secretary extremely practical. Imagine not having to think of hard-to-remember stuff, like names and birthdays.

And yet later it shifted towards the understanding that a secretary might just free up enough space to get ahead of the todo list and cumulatively grow the rest of your life.

So, ever since I first used GPT2 (Yes, that's a 2; and yes that was a flex.) I've had two things in mind: Complete codebase refactors (jury is out on that one) and building myself a secretary like some digital Frankenstein.

I've tried both, many times, and failed always. And I basically gave up for a while. But then people started asking if I had [OpenClaw](https://openclawai.com) yet. So I tried that, and it was dumb — like, literally not very intelligent. But the idea was tantalizing, and Claude Code was *not* dumb, so I tried again there, and poof! It's not perfect, but it's getting there rapidly. So rapidly that I'm looking for ETFs that I can buy that somehow leverage this concept.
So now Claude Code reads my email, manages my calendar, checks my car's charge level, orders groceries, and tells me how I slept. And it's all a bunch of markdown and a metric ton of MCPs and other connectors.

Before this system, I had so much data, and I *knew* I had so much data. But I was just not able to aggregate it to my eyeballs. I checked email (sometimes) and calendar. Todoist rotted. My Home Assistant ran on bursts of enthusiasm, hope, prayers and a generous WAF (Wife Acceptance Factor). Health metrics I saw on my watch, but were not connected anywhere. I handled the urgent stuff and let everything else drift.

Now I have a system that surfaces all of it. I call it Muninn; after one of Odin's ravens. It means "Memory", which is ironic because turns out that memory is the hardest part to get right on a system like this. But more on that later. The other raven is called Huginn, which means "Thought" — a better fit, which is why I used it for my mothballed OpenClaw.
Anyway, I digress; people keep asking how it works, so here it is.

I didn't write any of these files. Not one. I dictate everything — voice (via [Whispering](https://github.com/EpicenterHQ/epicenter/tree/main/apps/whispering)) into Claude Code, all day. The AI writes the instructions, the playbooks, the memory entries, the config. I steer, it types. The instructions end up in a format the LLM already understands, because it wrote them.

## It's Just Markdown

The entire system is markdown files. That's it. No custom framework, no database, no deployment pipeline. Claude Code reads `CLAUDE.md` files at the start of every conversation. Those files *are* the agent — they define its identity, capabilities, and knowledge. Everything else is context.

Here's what the directory structure looks like:

```
~/ai/agents/muninn/
├── CLAUDE.md                    # The agent's identity and instructions
├── domains/                     # One playbook per life domain
│   ├── tasks.md                 # Todoist procedures
│   ├── calendar.md              # Google Calendar procedures
│   ├── email-personal.md        # Personal email procedures
│   ├── email-work.md            # Work email procedures
│   ├── comms.md                 # Messaging (Signal, WhatsApp)
│   ├── home.md                  # Home Assistant monitoring
│   ├── health.md                # Garmin metrics
│   ├── transport.md             # EV charge monitoring
│   ├── cooking.md               # Meal planning + grocery ordering
│   ├── jira.md                  # Work issue tracker
│   └── agents.md                # Sub-agent registry
├── memory/                      # Persistent knowledge base
│   ├── people.md                # Facts about people
│   ├── decisions.md             # Resolved items, preferences
│   ├── projects.md              # System/project facts
│   ├── briefing-notes.md        # Filtering rules for briefings
│   └── daily/                   # Auto-generated daily logs
└── STATUS-FORMAT.md             # Standard agent reporting template
```


## The Core CLAUDE.md

The main `CLAUDE.md` file defines three things: who the agent is, what it can do, and how it should behave.

```markdown
# Muninn — Chief of Staff

## Identity

Chief of staff and executive assistant. You survey all domains
of my digital life and act on my behalf.

## Execution Capabilities

When the user asks you to DO something, handle it directly:
- Tasks: create/update/complete via Todoist
- Calendar: create/modify/delete events via Google Workspace MCP
- Email: compose/send/reply via Google Workspace MCP
- Home: control devices via Home Assistant MCP
- Health: query Garmin metrics
- Cooking: check groceries, delegate meal planning
- Messaging: read/send via Beeper
...

### Bias Toward Action

If you can do something yourself, just do it — don't ask me
to do it manually. If an action is potentially dangerous,
ask for permission to execute — still don't tell me to do
it myself.

### Confirmation Rule

For any outward action (sending email, completing tasks,
creating events), show exactly what you'll do and wait for
confirmation. Internal reads and scans don't need confirmation.
```

Two principles matter here. **Bias toward action** means the agent doesn't say "you could try running this command" — it runs the command. But the **confirmation rule** puts a gate on anything visible to the outside world. It'll read my email without asking, but it won't send a reply without showing me the draft first. That balance is what makes it usable: fast on the inside, careful on the outside.

## Domain Playbooks

Each domain gets its own markdown file with a consistent structure: a Scan Procedure (for briefings — what to check and in what order) and Execute Procedures (for direct actions — how to do things).

Here's a stripped-down example of the health domain:

```markdown
## Scan Procedure

1. Get sleep data — score, duration, quality
2. Get body battery — current level, charge/drain trend
3. Get training readiness
4. Check resting HR — normal vs. elevated
5. Get recent activities — compare against exercise schedule
6. If training readiness is low or sleep score < 60:
   → Flag as FYI: "Recovery day — consider skipping the run"

## Execute Procedures

### "How did I sleep?"
→ Pull sleep data, summarize score + duration + deep/REM split

### "Should I run today?"
→ Check training readiness + body battery + schedule
→ Give a go/caution/no-go recommendation
```

The cooking domain knows which days are cooking days and how much effort to expect. The email domain knows which account is personal and which is work, and which senders actually matter. The transport domain monitors my EV's charge level and warns me the night before a long driving day if it's low.

The pattern scales. When I added Home Assistant monitoring, I added a new playbook file. When I started tracking my car's charge, another file. Each domain is independent — you can remove one without touching the others. And because they're just markdown, Claude reads them at conversation start and immediately knows the procedures.

## The Memory System

This is where things get interesting — and where I spent the most time iterating.

The memory is a set of topic-specific markdown files indexed by a local search engine (QMD, which does BM25 keyword search). The core files are organized by topic, not by date — the daily logs are auto-generated output from each briefing, not part of the searchable knowledge base:

- **people.md** — facts about people (family, colleagues, contacts)
- **decisions.md** — preferences, resolved items, permanent dismissals
- **projects.md** — facts about systems and projects
- **patterns.md** — behavioral patterns observed across sessions
- **briefing-notes.md** — domain-specific filtering rules
- **daily/** — auto-generated daily logs

The routing rules are explicit in the `CLAUDE.md`:

```markdown
### Writing Memory

Routing rules:
- People facts → people.md
- Project/system facts → projects.md
- Decisions, preferences, corrections → decisions.md
- Briefing tuning notes → briefing-notes.md

Do NOT write:
- Transient session mechanics
- Information already in the topic files
- Speculative or unconfirmed information
- Todos / action items — these go in Todoist, not memory
```

Memory is for *facts*, not *intentions*. Tasks go in the task manager. Memory stores what happened, what was decided, and what the preferences are. Mixing these up creates noise that degrades every future search.

The `decisions.md` file does double duty. It stores genuine preferences ("no work actions on weekends", "garden tasks are primarily my wife's domain") but also tracks **resolved items** — things the briefing has already surfaced and that were handled. This prevents the most annoying failure mode of any recurring assistant: nagging you about things you already dealt with.

```markdown
## 2026-02-20

- RESOLVED: Dentist appointment booked for Feb 27, no further action
- DISMISSED: SolarEdge inverter offline alerts — known hardware issue, not actionable
- PREFERENCE: Don't remind me to plug in the car — I have my own routine
```

I tried vector search (embeddings, semantic similarity) early on. Slower and less predictable than keyword search. BM25 with a well-structured file wins here because the documents are small, the vocabulary is controlled, and exact matches matter more than fuzzy similarity.

Memory is also where the system still struggles. Convincing the LLM to *actually reference memory* before acting is harder than you'd expect. The goal is simple: if I told you last week that something was resolved, don't bring it up again. Simple in theory, surprisingly hard in practice. It's getting better with each iteration of the instructions, but it's the area I spend the most time tuning.

## The Briefing

A few times a day I run `/briefing` and get a structured overview of my life. This is the killer workflow — the thing that makes the rest of the system worth building.

**Phase 1 — Load Context:** Read `decisions.md` and `briefing-notes.md`. Search memory for any recently resolved items. Build a list of things NOT to mention.

**Phase 2 — Launch Domain Scans:** Fire all domain sub-agents *in parallel*. Each one reads its playbook and queries its tools. Tasks checks Todoist, calendar checks Google Calendar, email scans for unread messages, health pulls Garmin metrics, transport checks battery level. All at once.

**Phase 3 — Filter and Synthesize:** This is where the resolved-items list earns its keep. Each domain returns its findings, and the main agent filters out anything that's been handled, dismissed, or is covered by a pending plan. Defense in depth: the sub-agents filter against the resolved list too, but the main agent double-checks.

**Phase 4 — Present:** The output follows a fixed format:

```
URGENT     — needs action in the next few hours
TODAY      — should happen today
TOMORROW   — heads up for tomorrow
THIS WEEK  — on the radar
FYI        — informational, no action needed
ANOMALIES  — something unexpected (device offline, metric spike)
SUGGESTED ACTIONS — things the agent could do for me right now
```

**Phase 5 — Capture Feedback:** After the briefing, the agent asks what was handled, snoozed, or dismissed. Those answers go straight into `decisions.md`, so the next briefing won't repeat them.

The briefing takes 30 to 120 seconds and can use up to a few percent of my Claude Code Max session limit. It replaced a morning routine of checking six different apps. What it gave me, more than anything, is the feeling of control — an overview of everything that needs doing, without having to go look for it.

## Sub-Agents

Domain playbooks define *what* Muninn checks during a briefing. Sub-agents are separate projects — independent Claude Code sessions with their own instructions and state.

Muninn is the generalist. Around it, I have specialists: a cooking agent that handles meal planning and grocery ordering, a system maintenance agent that audits my machines, a trip planner for an upcoming family road trip, a home automation agent for ESPHome firmware and Home Assistant integrations. There's even a meta-agent that audits the memory system itself — checks for duplicates, stale references, compliance with the routing rules.

Each sub-agent is its own Claude Code project directory with a `CLAUDE.md` and `STATUS.md`. These aren't Claude Code's built-in subagents — they're separate project folders that I `cd` into and run independently. Muninn checks on them during briefings by reading their status files. The pattern is always the same: a `CLAUDE.md` defines identity and procedures, a `STATUS.md` tracks recent work and open items.

Agents aren't permanent by default. Some start as lightweight, temporary projects — tracking a single bike repair — and grow into full domain managers over time. Others stay small and get archived when they're done. The system breathes.

## Tools: CLI First, MCP When Necessary

Once you have agents, tool selection becomes the next bottleneck. Claude Code connects to external services through MCP (Model Context Protocol) servers, but also — and often preferably — through plain CLI tools. Peter Steinberger (of OpenClaw) put it well: "most MCPs should be CLIs." I agree. MCPs load their entire tool schema into the context window at startup. Connect enough of them and you're burning tokens just to tell the model what's available.

My rule: use the lightest, fastest tool that works. For Todoist, I have two CLI tools that handle 90% of operations faster and with less context overhead than the MCP. The MCP is a fallback for operations the CLIs can't do. For Google Workspace and Home Assistant, there's no practical CLI alternative, so MCP it is.

The MCP servers I do use:

- **Google Workspace** — email, calendar, Drive, Sheets (two accounts: personal and work)
- **Home Assistant** — smart home control, EV monitoring, device status
- **Garmin** — health metrics
- **Beeper** — cross-platform messaging (Signal, WhatsApp via bridge)
- **Todoist** — fallback for complex task operations
- **QMD** — local search engine over the memory files

The configuration lives in `~/.claude.json` (MCP server definitions and workspace trust) and `~/.claude/settings.json` (tool permissions and behavioral defaults). One lesson learned: if you have multiple accounts on the same service (personal and work Gmail), you need explicit routing rules in your `CLAUDE.md`. Without this, the agent will guess wrong at the worst possible time.

## The Permission Problem

In the early days, I was going insane. Every other action triggered a permission prompt. "Allow bash command?" "Allow MCP tool?" "Allow file edit?" Dozens of times per session. It broke my flow completely.

The fix was a dedicated Permission Optimizer agent. It runs periodically, scans all permission files across every project, deduplicates entries, removes cruft that accumulates from clicking "Yes, don't ask again," and ensures the global allow list covers everything benign. The deny list is tiny — just the catastrophic stuff (`rm -rf /` and friends). Everything else is either globally allowed or gated by `CLAUDE.md` instructions.

This single agent probably did more for my sanity than any other part of the system. If you build nothing else from this post, build the permission optimizer.

## What It Feels Like

The best thing this system gave me isn't any single feature — it's the feeling that everything is slowly, incrementally getting better. The instructions get more precise over time because every time something surfaces that shouldn't, or fails to surface when it should, I tell the agent and it updates its own playbooks. The cooking agent learns which meals worked. The system maintenance agent tightens backups. Each run leaves things a little better than before. I've never been so delightfully on top of my todo list. And when Anthropic released Opus 4.6, the whole thing jumped a level — not because I changed anything, but because the model got better at following the instructions that were already there.

It's all triggered manually. No background daemon, no webhook that fires while I'm away. This is deliberate. This system has broad permissions across my entire digital life — I want to be watching when it acts. When I step away from my computer, the system stops. That's a feature, not a bug. The only remote interface is Todoist: I can add labeled tasks from my phone, and the next briefing picks them up.

The downsides are real. Early on, the context switching was brutal. You're coding, then reviewing a briefing, then approving an email draft, then back to code. My brain felt like pudding. I was approaching burnout — not from overwork, but from never having a single uninterrupted train of thought.

I've adjusted since. Partly by fixing the permission problem, partly by internalizing that what I accomplish in a day now would have taken me a week before. Even when I sit idle for five minutes, I'm more productive than I ever was. That perspective helped.

It's not perfect. The model carries assumptions from its training data about what matters — email feels urgent because for most people for most of digital history, it was. My actual priority hierarchy doesn't always match. The playbooks and memory correct for this, but you're always nudging against the model's priors. It's getting better.

## Where to Start

I started with a `CLAUDE.md` that said "you are my assistant, here are my preferences." Then one domain playbook. Then memory. Then the briefing. Each piece made the previous pieces more useful.

The whole thing is markdown files that an LLM reads. No framework, no API, no deployment. Start with whatever you check first every morning. Give the agent a playbook for that one thing. If it sticks, add the next one.
