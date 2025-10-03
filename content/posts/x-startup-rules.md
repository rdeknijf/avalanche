+++
title = "Rules for my Ideal Startup"
date = 2021-11-08
description = "On the cost of forgoing accelerators"
draft = true
+++

The best thing about startups is that they get to start with a clean slate. Building something that
works is one thing, but building something that is scalable and maintainable is what gives the
actual chance at success.

So if I were CTO of a startup this would be my ideal:

# We build something for a single type/size of client
Having one giant client and many small ones makes for a very hard day. As their requirements are different and sometimes in opposition.

# We use a single programming language whenever possible.

If at all possible, pick one and stick with it. Just because Kubernetes allows you to use any language in isolation doesn't mean you should! Dividing attention over multiple languages is just inefficient. 


# We never grow beyond 10 programmers.

This is a hard limit. If you need more than 10 people to build your product, you're doing it wrong.
ROI per dev decreases exponentially.

# We don't hire messy devs.

There's no excuse for messy code. If you can't write clean code and clean architecture, you're
not a good programmer. If you're not a good programmer, you're not a good fit for our team.

# Single minute validation.

There's a system to _confidently_ validate the whole system within 1 single minute. I'm calling it a
system, but
really it's the unittests, and possibly the integration tests as well.
The test suite is holier than the code itself. If it doesn't give you confidence that something is not
broken within 1 minute, you code until it does or the ticket is not done.

# Push to `main` == deploy to production within 1 minute

# Strive for only ever having a single production environment

# All our repos are individually deployable

That also means that they're individually testable. If two repos can't live without each other they
will do so in a single repo.

# We update everything at least once a month

There's an upgrade path for everything we use and build. Most of our updates are automatic but those
that cannot be are done periodically in small intervals. This ensures that we only ever have small
upgrade problems to deal with at a time, while also ensuring that we can always just use the latest
standards.

# We all use the same IDE

IDEs are accelerators, not using them is not a point of pride. We use all accelerators wherever
logical. And we use the same one so there's no confusion.
Also, it's Pycharm.

# We all work on the OS our product runs on

If your stuff runs on Linux containers in Kubernetes, you work on Linux. If you dev a Windows
product, you work on Windows.