+++
title = "Every Problem Is Claude's Problem"
date = 2026-03-21
description = "When something annoys me twice, I make a folder, start Claude Code, and hand the problem over permanently."
draft = false
tags = ["ai", "claude-code", "developer-productivity", "workflow", "agentic-coding"]
+++

What does that mean? Just this: When something annoys me twice - or even once, actually - I don't fix it, I make a folder, start Claude Code, and (try my very best to) hand the problem over permanently. It sounds annoyingly simple. It kind of is. But the people I've shown this to keep doing it, and that's usually how you know something works. And I can tell it sure made my life a lot easier. I've never had my ducks as in a row as I do now, it's actually just weirding me out sometimes.

## Make a Folder

The recipe: if you have a problem, make a folder. Start Claude Code in that folder. Tell it to create a `CLAUDE.md` file, and in that file, write:

*This is your role. I have this problem. I am handing this problem to you. I will run you once in a while. Whenever I run into this problem, you are to deal with that problem durably. Fix it forever if you can. If you cannot, fix it for now.*

That's it. The folder gives Claude a stable home; context, memory, instructions that persist between sessions. Every time you run it, it picks up where it left off. That's the mechanic. The rest is examples.

## Examples
### My System Maintenance Agent

I have a few machines to manage, including the work laptop. Backups, firewall rules, DNS, software updates. The kind of things you know you should check regularly and never do because there's always something more interesting. I'd get around to it when something broke, fix that one thing, and ignore the rest for another month.

So I made a folder. I told Claude: *hey, this is your role now. I will run you once in a while and I want you to figure out how you can fulfill this role.* I listed what I needed: backups that are verified, not just scheduled. Firewall settings that are correct. DNS that's happy. Whatever you would do if you had enough time to do this properly.

So it did. It figured it out, made some notes, and I trimmed them down. Not too specific, because I want it to have enough leeway to find new things if that's logical. I don't want it stuck checking a fixed list. It should stay somewhat creative. I run it every couple of days. It proposes, I review, done.

That's the whole interaction model. Not micromanagement. Management.

### A Few More

I have a **permissions agent**. Its job is making sure Claude Code never pings me for permission on things that are safe and repetitive. It figured out, on its own, that this means scanning all the permissions files across the machine, aggregating, cleaning, deduplicating. It drafts its changes, I review them, we're good.

I have an **Italy trip planner**. I gave it where I wanted to go and when. I'm driving, so the car needs charging along the way. It figured that out. I told it: there's gaps in my plan, fill them. I need a packing list. I need an AnkiDroid deck to practice Italian words.

I have a **finances agent**. I want to know how much I have, how many investments, what they are, where they are. I gave it the files. Now once in a while I run it, it gathers data, and gives me output.

These are running agents on my machine right now, not thought experiments. And they're not just for dev tooling. Trip planning and personal finance have nothing to do with code.

## The Loop

Every time you run one of these agents, it does its actual job. The maintenance agent checks backups and DNS. The finances agent gathers numbers. The trip planner fills gaps in the itinerary. That's the point — they work on *their* problem, not yours.

But sometimes they get something wrong, or you notice a better way to approach it. When that happens, you don't just correct the output. You make Claude update its own instructions so it handles it better next time.

Your setup gets smarter over time. Not because the model improves (though when it does, the whole system jumps a level for free), but because your *instructions* improve. Every session leaves things a little better than it found them.

## What You Need

You need a flat-rate plan so you stop counting tokens. You need connections (MCP servers, CLI tools) so Claude can *do* things, not just talk about them. You need permissions sorted so you're not approving every file read. And you need good instructions, which are exactly what the loop produces over time. I've written about most of these individually; the short version is that they're table stakes, not the hard part.

## Claude Fixes Claude

The most ironic version of all this: people setting up Claude Code will hit a problem and Google it. Twenty minutes on Stack Overflow looking for the right config flag.

This is the perfect training ground. Tell Claude about the problem you're having *with Claude.* Either it fixes it (updates its own config, adds a hook, adjusts permissions, done forever) or you've practiced the most important skill in your toolkit.

Whatever you would do if you had enough time to do this properly? That's what you tell Claude to do. It has the time. And the tokens.

## Two Skills

I've been thinking about what humans are still for in all this. I think it comes down to two things.

One is what I hear others say too: creativity, or taste, or design, however you want to call it. The ability to decide what *should* exist, what's worth building, what matters.

The other I don't hear, but I think is more vital: **how good are you at having yourself be assisted?**

That sentence is clunky and I haven't found a better way to say it, but it's the core of everything in this post. Not "can you prompt." That's the surface. The real skill is knowing what to hand off, how to describe it, how to verify the result, when to intervene, and when to let it run. I don't mean blind trust. I mean delegation with review. The kind of management that requires you to actually understand the domain, not less.

Every folder you make is practice.

The recipe is simple. I know "make a folder" is not the kind of insight that gets you invited to TED. But the hard part was never the recipe. It's flipping the default from "I'll figure it out myself" to "let me describe this and hand it off."

Pick one thing that keeps stealing your time. Make a folder. Tell Claude: this is your problem now, own it.
