+++
title = "Your AI Fuel Gauge"
date = 2026-03-10
description = "A status bar widget that proves you have enough tokens — so you stop worrying and start building"
draft = false
[cover]
image = "images/sculptures/sleeping_ariadne.jpg"
alt = "Sleeping Ariadne (2nd century AD)"
caption = "Sleeping Ariadne (2nd century AD)"
+++

You're probably not running out of tokens. You're running out of confidence.

If your plan is too small, no widget fixes that — upgrade first. But if you're on a flat-rate subscription and still rationing prompts like a hiker rationing water on a trail that turned out to be two miles long, the problem isn't supply. It's visibility. You self-throttle because you can't see the gauge, and you finish the day with budget to spare and nothing ambitious to show for it. That's overhead, not output.

## The fuel gauge

I built a status bar widget that shows two numbers side by side: how much of your token budget you've *used* versus how much *time* has elapsed in the window. Claude Max resets session limits every 5 hours and weekly limits every 7 days. The gauge shows where you stand in both.

![ccstatusline with custom bars showing context usage, session burn rate, and weekly burn rate](/images/ccstatusline.png)

The reading `23%|64%` means: I've used 23% of my session tokens, but 64% of the 5-hour window has elapsed. Green — plenty of room. If the first number catches the second, the bar turns yellow, then red.

Most of the time it tells you what you needed to hear: you're fine. Keep going. That's what it mostly does for me — proves I have headroom, session after session, until the scarcity reflex loses its grip.

## Reading the bar

The color is the ratio of usage to elapsed time:

| Ratio | Color | Meaning |
|-------|-------|---------|
| < 0.7 | Green | Comfortable headroom |
| 0.7–1.0 | Cyan | Roughly tracking |
| 1.0–1.5 | Yellow | Usage outpacing time |
| > 1.5 | Red | Burning 1.5x faster than the clock |

A morning session might go like this: you start at `0%|0%` green, burn through a big exploration task and hit `45%|20%` red. You ease off for an hour, let time catch up, and by mid-session you're at `52%|55%` cyan. Without the gauge, you'd either hammer until the wall or start worrying after the first burst. With it, you just... adjust.

## The code

Under the hood, it's a pacing ratio. Given a usage percentage and an elapsed-time percentage, pick a color:

```python
def pick_colors(used, elapsed):
    if elapsed < 1:
        return CYAN, YELLOW
    ratio = used / elapsed
    if ratio >= 1.5:   return RED, DIM
    elif ratio >= 1.0: return YELLOW, DIM
    elif ratio >= 0.7: return CYAN, YELLOW
    else:              return GREEN, YELLOW
```

Then build the bar — solid blocks for tokens used, shaded for time elapsed, empty for remaining:

```python
bar = "".join(
    f"{uc}█" if i < used_w
    else f"{ec}▓" if i < el_w
    else f"{DIM}░"
    for i in range(BAR_WIDTH))
print(f"{bar} {used:.0f}%|{el:.0f}%")
```

This runs on [ccstatusline](https://github.com/sirmalloc/ccstatusline) as a custom command widget. The full script — including the elapsed-time calculation from your session reset timestamp — is in [this gist](https://gist.github.com/rdeknijf/a6a7c500549e4f2b08a861623e940802). Drop it in `~/.config/ccstatusline/` and add a custom-command widget to your `settings.json`.

## A caveat

This works for me because it mostly shows green. If your subscription doesn't cover your usage and the gauge is perpetually yellow, it will make things *worse*. The gauge is a confidence builder, not a rationing system. Fix the plan first.

## The other half of the dashboard

[The 40% rule](/posts/context-40-percent-rule/) covers context *quality* — keeping your AI sharp by not filling the window. This post covers the psychological side — letting go of the scarcity reflex.

Same philosophy: make the invisible visible, then let your brain handle the rest. Green bar, green light. Focus on the code, not the meter.
