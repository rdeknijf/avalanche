+++
title = "Make Every Problem Claude's Problem"
date = 2026-03-21
description = "When something annoys me twice, I make a folder, start Claude Code, and hand the problem over permanently."
draft = false
tags = ["ai", "claude-code", "developer-productivity", "workflow", "agentic-coding"]
aliases = ["/posts/every-problem-is-claudes-problem/"]
+++

So there's this thing I've been mentioning to so many people recently: "Make every problem Claude's problem". What do I mean by that. Basically, if you have a problem. Make a folder, open `claude` and tell it (with `/voice` - Yes, I'm talking to my machines all day. Like a lunatic.): "Hey Claude, make a `CLAUDE.md` file with the following: You are now the owner of problem X. I expect you to first research how you can deal with it, at least for now and ideally permanently. I'll run you once in a while, so you'll get to check and/or re-fix and the opportunity to tune your approach."

I've done this a few times now, to absolute great success. 

It sounds annoyingly simple. It kind of is. But the people I've shown this to keep doing it, and that's usually how you know something works. And I can tell it sure made my life a lot easier. I've never had my ducks as in-a-row as I do now; to be honest it's actually just weirding me out sometimes.

## Make a Folder

The recipe: if you have a problem, make a folder. Start Claude Code in that folder. Tell it to create a `CLAUDE.md` file, and in that file, write:

*This is your role. I have this problem. I am handing this problem to you. I will run you once in a while. Whenever I run into this problem, you are to deal with that problem durably. Fix it forever if you can. If you cannot, fix it for now.*

That's it. The folder gives Claude a stable home; context, memory, instructions that persist between sessions. Every time you run it, it picks up where it left off. That's the mechanic. The rest is examples.

## Examples
### My System Maintenance Agent

I have a few machines to manage, including the laptop I'm writing on right now; backups, firewall rules, DNS, software updates. The kind of things you know you should check regularly. And I kind of did, but basically never as thoroughly as I should.

So I made a folder. I told Claude: *hey, you are my systems maintainer, there's this and that machine, this is how you connect. I want you to own backups, updates and general security. I will run you once in a while and I want you to figure out how you can fulfill this role.* I listed what I needed: backups that are verified, not just scheduled. Firewall settings that are correct. DNS that's happy. Whatever you would do if you had enough time to do this properly.

So it did. It figured out its place in this world, it made some for itself that I promptly (pun intended) trimmed down a bit so it's not too specific. You want to give it enough leeway to find new angles if that's logical. You don't want it stuck checking a fixed list. (I ran into that trap before; that's a script, not an agent.) I run it every couple of days. It proposes, I review, done.

That's the whole interaction model. Not micromanagement. Management.

### More agents

I have a **permissions agent**. Its job is making sure Claude Code never pings me for permission on things that are safe and repetitive. It figured out, on its own, that this means scanning all the permissions files across the machine, aggregating, cleaning, deduplicating. It drafts its changes, I review them, and we're good.

I have a **vacation planner**. I gave it where I wanted to go and when. I'm driving, so the car needs charging along the way. It figured that out. I told it: "there's gaps in my plan, fill them. Oh, and I need a packing list." And as a cherry on top I made it generate me a targeted AnkiDroid deck to practice Italian words. I've yet to practice for the second time. But it did work; I even made it put it in the right place on my phone.

I have a **finances agent**. I want to know how much I have, how many investments, what they are, where they are, etc. So I gave it a whole bunch of files. Now once in a while I run it, it gathers data (mostly through me, because it's hidden behind heavy security), and gives me output. And once, when my accountant sent me my draft tax statements for the year, I told it to fetch them and it decided to fully validate them. Finding no mistakes; so hats off to my financial human.

I have a **statusline agent**. It started with ccstatusline, and it quickly spiralled out into basically only custom components. Now, any time I want anything changed in that regard, I just ask the project.

These are running agents on my machine right now, not thought experiments. And they're not just for dev tooling. Trip planning and personal finance have nothing to do with code.

## The Loop

So, every time you run one of these agents, it does its actual job. The maintenance agent checks backups and DNS. The finances agent gathers numbers. The trip planner checks if all is prepped for the trip. That's the point — they work on *their* problem, not yours.

But sometimes they get something wrong, or you notice a better way to approach it. When that happens, you don't just correct the output. You make Claude update its own instructions so it handles it better next time.

Your setup gets smarter over time. Not because the model improves (though that happens too, and when it does, the whole system jumps a level for free), but because your *instructions* improve. Every session leaves things a little better than it found them.

## What You Need

Firstly, you need a flat-rate plan so you stop counting tokens. I've written about this in a previous post. You need connections (MCP servers, CLI tools) so Claude can *do* things, not just talk about them. You need permissions sorted so you're not approving every file read. And you need good instructions, which are exactly what the loop produces over time. I've written about most of these individually; the short version is that they're table stakes, not the hard part.

## Claude Fixes Claude

The most ironic version of all this: people setting up Claude Code will hit a problem and Google it. Twenty minutes on Stack Overflow looking for the right config flag.

But this is the perfect training opportunity! Tell Claude about the problem you're having *with Claude.* Either it fixes it (updates its own config, adds a hook, adjusts permissions, done forever) or you've just had some good practice on what doesn't work. Which is annoying, but useful too.

Basically: whatever you would do if you had enough time to do this properly? That's what you tell Claude to do. It has the time. And - hopefully - the tokens.

## The One Remaining Human Skill

I've been thinking about what humans are still for in all this. I think it comes down to two things. (Yes, that header was misleading.)

One is what I hear others say too: creativity, or taste, or design, however you want to call it. The ability to decide what *should* exist, what's worth building, what matters, what is good, etc.

The other I don't hear, but I think is much more ehm... immediate at least: **how good are you at having yourself be assisted?**

That sentence is clunky and I haven't found a better way to say it, but it's the core of everything in this post. Not "can you prompt." That's the surface. The real skill is knowing what to hand off, how to describe it, how to (make Claude) verify the result, how to make the context not get poisoned, when to steer, and when to let it run. I don't mean blind trust. I mean delegation with review. The kind of management that requires you to actually understand the domain more, not less.

I believe this is the skill of the future, and every opportunity to practice it should be taken. Dedicated problem agents are the lowest hanging fruit. Not coding.

The recipe is simple. I know "make a folder" is not the kind of insight that gets you invited to TED. But the hard part was never the recipe. It's flipping the default from "I'll figure it out myself" to "let me describe this and hand it off."

Pick one thing that keeps stealing your time. Make a folder. Tell Claude: this is your problem now; go own it.
