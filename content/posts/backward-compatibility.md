+++
title = "Backward compatibility is a curse"
date = 2022-09-16
description = "Backward compatibility is a (sometimes) necessary evil that should be avoided whenever possible. Sounds simple, right?"
draft = false
+++

I recently had a colleague who suggested it might be a good idea to test our Python software against
older versions of Python. And at first I was like: Yeah, good idea! It’s good practice, right?
Support a whole range of versions! We see that all the time in the packages we fetch from Pypi.
Supporting more versions is just good stewardship, right?

But we were walking into a trap. We were discussing our own software, that we run, ourselves, in
Kubernetes. We control the environment, all the way from development to production. There is simply
nowhere where we don’t explicitly decide what Python version to use. On top of that most of that
software is technically scripts, not installable packages.

My point is that backwards compatibility is often a knee-jerk reaction. We see it a lot and assume
that - since _good_ packages do it - we should do it too, for then _we_ are good and our fathers
will
finally love us!

But we should stop and think whether it’s really applicable to our situation.
Especially in this case it’s a really costly assumption to make. Docker/Kubernetes gives us this
magnificent gift of only ever having to deal with the latest version. Why would you throw that out
to imitate packages that do have to deal with that burden. And anyone who’s had to deal with it
knows that that is what it is, a burden.
