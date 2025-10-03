+++
title = "My AI agents setup"
date = 2025-10-01
description = "~/ai/notes/<something>.md"
draft = true
+++

I've been using Agentic AI for a while now, starting with Claude Code, and now seeming to have ended up with Warp for a bit.

I'd like to share the structure of my AI instructions and notes files:

```bash
$ tree ~/ai

├── instructions
│   ├── global-rules.md
│   └── system-info.md
└── notes
    ├── ARCHIVED-kde-panel-alignment-fix.md
    ├── ARCHIVED-kde-panel-emergency-recovery.md
    ├── bambustudio-manual-install.md
    ├── brother-dcp-t780dw-printer-setup.md
    ├── console-switching-authentication-analysis.md
    ├── dep-v2-bq-script-implementation.md
    ├── ewx-console-firebase-auth-domain.md
    ├── ewx-global-coupling-analysis.md
    ├── ewx-monorepo-documentation-enhancement.md
    ├── framework16-battery-tuned-setup.md
    ├── git-clean-branches-merge-check.md
    ├── kde-panel-strut-fix-resolution.md
    ├── numlock-startup-fix.md
    ├── obsidian-vault-reorganization.md
    ├── repo-hashing-tests-implementation.md
    └── warp-terminal-gpu-fix.md

```

## Instructions

In `~/ai/instructions` I (make the agents) keep two high level instructions. I currently only have two, but this is likely to increase. You could keep one for one specific type of work.

### `global-rules.md`

This is the most important one in my opinion. It contains things like: "Never commit", and "I usually work with Python", and "I prefer `uv` as my Python package manager
