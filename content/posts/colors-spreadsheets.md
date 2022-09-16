+++
title = "On formatting in Google Spreadsheets"
date = 2022-09-12
description = "Formatting in Google Spreadsheets is a trap. Here's how to do it right."
draft = false
+++

TLDR; Colors aren’t values.

Yes, as a human you can quickly see what’s up, and that’s great if it’s automatically formatted, I’m
all for that. But colorizing a line or cell by hand is possibly the slowest action you can do in a
spreadsheet. And yet I see people doing it all the time! Do me a favor, and look at your keyboard.
Take one finger and color a cell. Nope, you can’t. There are, however, 26 letters and 10 numbers,
right there. No hotkeys, just dedicated buttons, just for those!

Second: you can’t calculate anything on it! Which is the primary purpose of a spreadsheet. Let's say
that you have a list of tasks. And you strike through those that are done. Now, if you want to know
what percentage is done, you’re shit out of luck. If you’d added a column `done` filled with ones
and zeros, it would be so trivial that Google Spreadsheets will even suggest it for you.

Cute sidenote: in Excel you there actually _are_ functions that work with formatting. But that's just more rope to hang yourself with. You can’t export formatting to csv. So if for whatever reason you want to do that… No joy;
because you encoded valuable info in an unsupported format.

So, conclusion: colors in spreadsheets are great, and often make or break human understanding of the
content. I use them all the time! But please use them like the name suggests, as formatting, not
values.
