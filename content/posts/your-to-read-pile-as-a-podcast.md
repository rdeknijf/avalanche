+++
title = "Your to-read pile as a podcast"
date = 2026-10-14
description = "People keep asking for the skill that turns my reports into episodes on my own private podcast feed. Here it is, with what I learned about writing for the ear and picking a voice."
draft = false
aliases = ["/posts/your-own-private-podcast/"]
[cover]
image = "images/sculptures/giovanni_dandrea_lecture.webp"
alt = "Marble relief of a professor lecturing from a reading desk, with students at slanted desks and open books on both sides"
caption = "Sarcophagus of Giovanni d'Andrea (1348), Museo civico medievale, Bologna: a lecture.<br>Photo GFreihalter, [CC BY-SA 3.0](https://creativecommons.org/licenses/by-sa/3.0/), cropped."
+++

{{< audience >}}
Anyone with more to read than time to read it, who also runs, drives or does the dishes. You use an AI agent (Claude Code, Codex, whatever) and know roughly what a skill is.
{{< /audience >}}

{{< scribble >}}Rather listen? Here's this post as an episode, made by the skill it's about. Seven minutes.<audio controls preload="none"><source src="/audio/your-to-read-pile-as-a-podcast.ogg" type="audio/ogg; codecs=opus"><source src="/audio/your-to-read-pile-as-a-podcast.mp3" type="audio/mpeg"></audio>{{< /scribble >}}

People keep asking me for my private podcast skill. So here it is: [podcast-it](https://github.com/rdeknijf/dotclaude/tree/main/skills/podcast-it).

Some backstory: I've had an eye condition that makes some types of reading challenging ever since I was a teenager. When I enrolled in university to study Law I quickly discovered that this was a Really Big Problem. I even switched to Arts and Culture, partly because the required reading there was less brutal. I've since had an operation and some reading glasses, which makes it all pretty doable. But at the time I was looking for solutions left and right.

One of those was text-to-speech systems, but the voices available to me were atrocious. Think Stephen Hawking, but somehow worse. Then one beautiful day I discovered that IBM had a brand new top-of-the-line system that sounded great{{< whisper style="paren" >}}at the time{{< /whisper >}}, and they even had a free sample thing on their website. You could only put in a limited number of characters, but lucky for me there was no rate limit on the site itself. So, as a budding programmer, I made a script that took some OCR-ed text, fed it to this website in small chunks, and played back the whole book while I lay on the floor next to my speaker. Blissfully not having to use my eyes.

Fast forward a few decades. Ever since the operation, reading has been doable for me, so for a long time I left my TTS-days behind me. But still, I take a lot of things by ear. Podcasts, books, lectures, etc. So when OpenAI released their TTS model, it didn't take me long to dredge my proclivity back up. When I run or drive or clean, half my attention is free anyway. Now I hand my podcast-skill a report, or a pile of research, or meeting notes, or a book I want synopsied,{{< sidenote >}}Yes, that's not a word, but it should be.{{< /sidenote >}} and a few minutes later there's an episode on my phone, in my normal podcast app.{{< sidenote >}}Podcast Addict.{{< /sidenote >}}

{{< podcast-strip >}}

## Most of it is the script

My first attempts were just the text version of whatever report I needed in my head, read aloud. Boy, did that not work! The waterfall of words made retention really bad; I never had a moment to store a point before the next one arrived.

So, as I do, I told Claude to send out a bunch of subagents to figure out how others do this, and what authoritative sources specifically advise. With research like that, I usually have two top-tier models from different vendors review and enrich it, and then a third one deduplicates the lot. Some of what came back:

- Listening is the mode where your mind [wanders most](https://www.frontiersin.org/articles/10.3389/fpsyg.2013.00892/full), more than reading, aloud or silently. So the listener has to do something now and then.
- Talking slower doesn't fix the waterfall. In a radio news study, recall [was best at a normal pace](https://journalistsresource.org/?p=48675) and worst when the speech was both fast and dense. What works: normal speed, fewer facts per minute, and actual silences.
- A question asked before the answer [helps you remember the answer](https://pmc.ncbi.nlm.nih.gov/articles/PMC4252494/); a cliffhanger that never gets answered doesn't.
- A short recall question after each part of a lecture raised the final test score [from 68% to 90%](https://pmc.ncbi.nlm.nih.gov/articles/PMC3631699/), and the mind wandered half as often.
- People who [overheard deep questions](https://digitalcommons.memphis.edu/facpubs/8941) (why, how, what if) remembered more than people who heard a monologue.
- Music under speech [lowers what you retain](https://tecfa.unige.ch/tecfa/teaching/methodo/Moreno_Mayer00.pdf). And students who jogged while listening to a podcast [did worse](https://iadisportal.org/digital-library/listening-to-an-educational-podcast-while-walking-or-jogging-can-students-really-multitask) than students who sat. Bad news for me.

So that became the format. Every section has the following shape: a question, a concrete case, the principle, why it matters, then a recall question, a pause, and the answer again in other words. One idea per sentence. Almost no numbers, because numbers by ear are mostly wasted brain power anyway; links, figures and ticket numbers go in the show notes, where my eyes can find them later. An episode is between ten and twenty minutes, and if there's more material than that it becomes a series, where every next episode opens with a few questions about the previous one.

There are two voices, but not the two-hosts-chatting kind. A female narrator gives every fact,{{< sidenote >}}I find her clearer.{{< /sidenote >}} and a male voice asks the question I'd be asking if I could; mostly why, how, or so what.

A piece of a script looks like this:

{{< payload >}}
Q: So what actually goes wrong in your head?

Your memory needs a moment to store a point. That storing starts in the second or two after you hear something. When the next sentence arrives too soon, it pushes the last one out.

[pause]

Q: Is there a way to check that for myself?

There is an easy test. Read a paragraph aloud to a friend, and stop after each sentence. Then read the next paragraph without stopping. Ask your friend what they remember from each one. Almost always, the slow paragraph wins.

[...]
{{< /payload >}}

The research only got me the second version. At the bottom of the skill there's a section called "Rules learned from listening", and when an episode annoys me, I say why, and a rule goes in. The rationing of numbers came out of that, the pauses too, and later the second voice. I didn't find a single other pipeline that does this.

## Two writers and a fact check

NotebookLM is the obvious alternative, and I've used it; it's great, right up until it tells you you've hit your limit and you can't make anything anymore. You can steer it a bit, with a format, a length and a prompt about what to focus on, but you don't write the script. And its app works fine, but it can't be the one place where all my audio comes in. My private podcast can.

For work that matters I don't let one model write the script either. Same trick as with the research: the best model from Anthropic and the best from OpenAI, with reasoning on, each write their own draft. A third pass merges the two, and then a fact check runs the result against the sources. Every claim keeps its source in the notes, which the voices don't read out. As far as I could find, none of the public pipelines (like [personal-podcast-skill](https://github.com/haltakov/personal-podcast-skill) or [podcastfy](https://github.com/souzatharsis/podcastfy)) does either of those.

In the public skill this is optional, because you need access to models from both companies. Without it, one model writes and the rest is the same.

## The voice

I've been picky about voices since that IBM website. If the voice is bad I'm annoyed and listening for more mistakes instead of taking in the subject matter.

So I compared. A month ago that was a few options, and only OpenAI's speech model was acceptable. Then I tried ElevenLabs, and OpenAI still won. While writing this post I had an agent find the current best text-to-speech models and get six of them running on the older graphics card in my Windows machine, and I listened to them blind: same short text, files named by number. The best open-weights model on the [Artificial Analysis leaderboard](https://artificialanalysis.ai/text-to-speech/leaderboard) had a slow, lazy ASMR voice. The OpenAI model isn't on that leaderboard at all.

The surprise was Kokoro, a small free model that runs on the normal CPU of my laptop. On short samples it tied with OpenAI. If you can't or won't pay for this, it may actually be good enough.

Not for me, though. Over a whole episode Kokoro is worse: it pronounces things wrong, and every time the voice pronounces something wrong it is very jarring. In "pull request" Kokoro puts the emphasis on "request". OpenAI says it correctly, like the two words belong together. Like people do. So OpenAI won, at about 20 to 30 cents per episode.

The same text in both voices, Kokoro first:

<audio controls preload="none" src="/audio/podcast-skill-kokoro-sample.mp3"></audio>

<audio controls preload="none" src="/audio/podcast-skill-openai-sample.mp3"></audio>

## Your ears are not my ears

The public skill doesn't pick a voice for you. The script-writing part works in Claude Code, Codex, or any agent that reads skills. For the voice, it looks up the current best text-to-speech options when you install it and renders the same short text with each one you can use, under a number instead of a name. Same blind test as mine. Then listen to a whole episode before you decide. If you can't spend money on this you end up local anyway, and the same goes if your text may not leave the building or you're offline a lot. My own bar was "as good as it gets", which for me is OpenAI.

## My own feed

A podcast feed is less magic than I thought. It's one XML file that lists the episodes, next to the audio files, on any web server your phone can reach. Every podcast app reads that file.

Mine works like this. Publishing an episode copies two files to my server: the audio, and a small JSON file with the title, the show notes and the source. Then a script rebuilds `feed.xml` from that folder, one item per episode: a link to the audio file with its size and type, a date, the duration, the notes and a picture. An nginx container serves the folder, and the reverse proxy in front of it asks for a password. In Podcast Addict I added the feed by its URL, with "Authentication" switched on, and a new episode shows up the way any podcast episode does. The public skill builds the same file from the same kind of folder; where you host it is up to you.

The files used to be MP3 at 64 kbps. Then I wondered why that wasn't Opus{{< sidenote >}}[The audio format](https://en.wikipedia.org/wiki/Opus_(audio_format)), that is.{{< /sidenote >}} by now, and did one more blind test: MP3 against Opus at 32, 24 and 16 kbps. I heard no difference. So now it's Opus at 16 kbps, about 120 KB per minute, which is a quarter of the old size.

Every episode also gets a picture, one per source: a rooster at dawn for the morning brief, Mondrian's Amsterdam for client work, Homer dictating for books and research. The feed itself is Manet's raven; all of it public-domain museum art. The pictures sit on a public path, because the podcast app may or may not be using the password to fetch those assets.

<figure class="feed-art">
<div class="feed-art-row">
<div><img src="/images/podcast/feed-brief.webp" alt="Etching of a rooster crowing on a dung heap at dawn" width="360" height="360" loading="lazy"><span>Morning brief</span></div>
<div><img src="/images/podcast/feed-work.webp" alt="Watercolour of bare trees and boats along a canal, with the Amsterdam skyline far behind" width="360" height="360" loading="lazy"><span>Client work</span></div>
<div><img src="/images/podcast/feed-research.webp" alt="Painting of the old, bearded Homer dictating while a boy writes" width="360" height="360" loading="lazy"><span>Books and research</span></div>
<div><img src="/images/podcast/feed-channel.webp" alt="Ink drawing of a raven in flight under the words ex libris" width="360" height="360" loading="lazy"><span>The feed</span></div>
</div>
<figcaption>Daubigny, Mondrian, Mola and Manet. All public domain.</figcaption>
</figure>

You don't even need a server. AntennaPod can [add a local folder](https://antennapod.org/blog/2020/12/2-1-0-release) on your phone as a podcast, so copying the file over is enough. But if you do put a feed online, put basic auth on it rather than relying on a "secret" URL.

## Get it

[The podcast-it skill, in rdeknijf/dotclaude](https://github.com/rdeknijf/dotclaude/tree/main/skills/podcast-it)

Same skill I run, minus the bits that only work on my server. It needs a voice, free or paid, and somewhere to put the episodes. If I were you, though, I wouldn't even use it as is. I'd make your own AI read this post and the skill, and then let it build whatever it thinks fits you best.
