+++
title = "My Claude Code Status Line"
date = 2026-03-18
description = "The full ccstatusline setup — config, custom widgets, and Model Intelligence score — that turns invisible AI state into glanceable awareness"
draft = false
[cover]
image = "images/sculptures/hermes.jpg"
alt = "Hermes of Praxiteles (c. 340 BC)"
caption = "Hermes of Praxiteles (c. 340 BC)"
+++

The problem wasn't tokens. It was having to keep wondering.

Every long session with Claude, you're running a background process in your head. Is it still sharp? Am I burning too fast? What model did I switch to? You don't notice this overhead until you eliminate it — and then you realize how much clearer everything gets.

I built a status line that answers all five questions at a glance.

![ccstatusline two-line status bar showing context usage, session and weekly burn rate, model, MI score](/images/ccstatusline-v2.png)

Two lines. Five answers. A status line only earns its keep if every element answers a question that would otherwise interrupt you.

## Model Intelligence

I used to watch raw context percentage. Hit 40%, start wrapping up — I wrote a whole post about it ([The 40% Rule](/posts/context-40-percent-rule/)). That was on a 200K context window. Then we got 1M tokens, and a fixed percentage threshold stopped making sense. 40% of 200K is 80K — a reasonable point to wrap up. 40% of 1M is 400K — a completely different situation. What I actually wanted was a number that tracked model quality directly, not a proxy.

MI (Model Intelligence) is that number. It estimates how sharp the model is right now — 1.000 when the context is fresh, declining toward 0.000 as it fills.

The formula: `MI = max(0, 1 - u^β)` where `u` is context utilization and `β` is a per-model degradation curve:

| Model | β | MI at 50% | MI at 75% |
|-------|---|-----------|-----------|
| Opus | 1.8 | 0.713 | 0.404 |
| Sonnet | 1.5 | 0.646 | 0.350 |
| Haiku | 1.2 | 0.565 | 0.292 |

The β values are calibrated against Anthropic's MRCR v2 8-needle retrieval benchmark. Opus retains quality longest; Haiku degrades earliest. Credit for the MI concept goes to [luongnv89's cc-context-stats](https://github.com/luongnv89/cc-context-stats) — I ported it as a native [ccstatusline](https://github.com/sirmalloc/ccstatusline) widget and [submitted it upstream](https://github.com/sirmalloc/ccstatusline/pull/248).

"Context at 45%" is abstract. "MI: 0.691" hits differently. That's your model getting measurably dumber in real time.

Is 0.691 precise? No. But it's better than pretending context fill percentage and model quality are the same thing. When MI drops below 0.7, I start thinking about wrapping up. Below 0.5, I start fresh. The number confirms what you'd eventually feel — it just saves you the guessing.

## The rest of the dashboard

MI handles quality. The other widgets handle pacing and certainty.

**Context bar** (`Ctx`) — Raw fill level of the context window. A fuel gauge, nothing more.

**Session and weekly burn rate** — Token usage vs elapsed time ([covered in detail here](/posts/usage-burn-rate-dashboard/)). If usage outpaces time, the bar turns yellow then red. Most of the time it's green — which is the whole point.

**Model, effort, version** — I run Opus. I don't think about it. The moment you start switching models to save tokens, you've left the problem and started managing the tool. Same principle as [paying flat-rate and not counting tokens](/posts/context-40-percent-rule/#the-other-token-problem).

## The config

The layout is a two-line grid of widgets — built-in types like `model` and `version`, plus `custom-command` widgets that run scripts:

```json
{
  "version": 3,
  "lines": [
    [
      { "type": "custom-text", "customText": "Ctx" },
      { "type": "custom-command", "commandPath": "python3 ~/.config/ccstatusline/context-bar.py",
        "preserveColors": true, "timeout": 500 },
      { "type": "context-length", "rawValue": true },
      { "type": "custom-text", "customText": "/" },
      { "type": "context-window-size", "rawValue": true },
      { "type": "custom-text", "customText": "Session" },
      { "type": "custom-command", "commandPath": "python3 ~/.config/ccstatusline/dual-usage-bar.py session",
        "preserveColors": true, "timeout": 500 },
      { "type": "custom-text", "customText": "Weekly" },
      { "type": "custom-command", "commandPath": "python3 ~/.config/ccstatusline/dual-usage-bar.py weekly",
        "preserveColors": true, "timeout": 500 }
    ],
    [
      { "type": "model", "rawValue": true },
      { "type": "custom-command", "commandPath": "python3 ~/.config/ccstatusline/effort.py",
        "timeout": 500 },
      { "type": "model-intelligence" },
      { "type": "version" }
    ],
    []
  ],
  "flexMode": "full-minus-40",
  "compactThreshold": 60
}
```

Custom-command widgets receive ccstatusline's data blob on stdin as JSON and output ANSI-colored text. The three scripts are below — drop them in `~/.config/ccstatusline/`.

The `model-intelligence` and `context-window-size` widget types started as [my PR](https://github.com/sirmalloc/ccstatusline/pull/248). If it hasn't been merged yet, build from [my fork](https://github.com/rdeknijf/ccstatusline/tree/feat/model-intelligence-context-window-widgets).

<details>
<summary>context-bar.py — context usage gauge</summary>

```python
#!/usr/bin/env python3
import json, sys

GREEN, YELLOW, DIM, RESET = "\033[92m", "\033[93m", "\033[90m", "\033[0m"
BAR_WIDTH = 16

try:
    data = json.load(sys.stdin)
except (json.JSONDecodeError, EOFError):
    sys.exit(0)

cw = data.get("context_window")
if not cw:
    sys.exit(0)

pct = cw.get("used_percentage")
if pct is None:
    size = cw.get("context_window_size")
    usage = cw.get("current_usage")
    if size and usage:
        tokens = sum(v for v in usage.values() if isinstance(v, (int, float))) if isinstance(usage, dict) else usage
        pct = (tokens / size) * 100 if size > 0 else 0
    else:
        sys.exit(0)

pct = max(0, min(100, pct))
color = YELLOW if pct >= 40 else GREEN
filled = round((pct / 100) * BAR_WIDTH)
print(f"{color}{'█' * filled}{DIM}{'░' * (BAR_WIDTH - filled)}{RESET} {color}{pct:.0f}%{RESET}")
```

</details>

<details>
<summary>dual-usage-bar.py — burn rate gauge</summary>

```python
#!/usr/bin/env python3
import json, os, sys
from datetime import datetime, timezone

CACHE = os.path.expanduser("~/.cache/ccstatusline/usage.json")
BAR_WIDTH = 16
GREEN, CYAN, YELLOW, RED, WHITE, DIM, RESET = (
    "\033[92m", "\033[96m", "\033[93m", "\033[91m", "\033[97m", "\033[90m", "\033[0m"
)

def elapsed_pct(reset_at, duration_s):
    if not reset_at: return None
    try:
        reset_s = datetime.fromisoformat(reset_at.replace("Z", "+00:00")).timestamp()
    except (ValueError, OSError):
        return None
    now_s = datetime.now(timezone.utc).timestamp()
    return max(0, min(duration_s, now_s - (reset_s - duration_s))) / duration_s * 100

def pick_color(used, elapsed):
    if elapsed < 1: return CYAN, WHITE
    r = used / elapsed
    if r >= 1.5: return RED, WHITE
    if r >= 1.0: return YELLOW, WHITE
    if r >= 0.7: return CYAN, WHITE
    return GREEN, WHITE

def main():
    mode = sys.argv[1] if len(sys.argv) > 1 else "session"
    try:
        with open(CACHE) as f: data = json.load(f)
    except (FileNotFoundError, json.JSONDecodeError): return

    dur = 5*3600 if mode == "session" else 7*86400
    used = data.get("sessionUsage" if mode == "session" else "weeklyUsage")
    el = elapsed_pct(data.get("sessionResetAt" if mode == "session" else "weeklyResetAt"), dur)
    if used is None or el is None or el >= 100: return

    used, el = max(0, min(100, used)), max(0, min(100, el))
    uc, ec = pick_color(used, el)
    uw, ew = round(used/100*BAR_WIDTH), round(el/100*BAR_WIDTH)
    bar = "".join(f"{uc}█{RESET}" if i<uw else f"{ec}▓{RESET}" if i<ew else f"{DIM}░{RESET}" for i in range(BAR_WIDTH))
    print(f"{bar} {uc}{used:.0f}%{RESET}{DIM}|{RESET}{ec}{el:.0f}%{RESET}")

if __name__ == "__main__": main()
```

</details>

<details>
<summary>effort.py — effort level reader</summary>

```python
#!/usr/bin/env python3
import json, os
try:
    with open(os.path.expanduser("~/.claude/settings.json")) as f:
        print(json.load(f).get("effortLevel", "high"))
except (FileNotFoundError, json.JSONDecodeError):
    print("?")
```

</details>

## The rearview mirror

None of these turn yellow as emergencies. They're awareness — like a rearview mirror you glance at and dismiss.

The point isn't to monitor the model. It's to stop monitoring it in your head.

This is apparently the third in an unplanned series on making AI-assisted development less anxious: [The 40% Rule](/posts/context-40-percent-rule/), [Your AI Fuel Gauge](/posts/usage-burn-rate-dashboard/), and this post.

## Credits

- [ccstatusline](https://github.com/sirmalloc/ccstatusline) by sirmalloc — the status line framework
- [cc-context-stats](https://github.com/luongnv89/cc-context-stats) by luongnv89 — the Model Intelligence formula and concept
