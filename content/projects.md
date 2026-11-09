+++
title = "Projects"
description = "Package versions, EU grid emissions, ISDE meldcodes, milieuzones, EASA directives and notified bodies as free JSON APIs."
draft = false
layout = "projects"
closing = "I do this kind of thing for teams too, on contract; [working with me](/work-with-me/) has the details."

[menu.main]
  name = "Projects"
  weight = 15

[[params.projects]]
name = "lateststable.org"
image = "lateststable"
alt = "The lateststable.org homepage: the start of its plain list of platforms with their API paths."
url = "https://lateststable.org"
source = "https://github.com/rdeknijf/lateststable"
curl = "curl -s https://lateststable.org/v1/pypi/fastapi"
text = "Answers one question: what's the latest stable version of X? It covers 15 platforms: PyPI, npm, GitHub, Docker Hub, crates.io, Go, Homebrew, RubyGems, NuGet, Packagist, Maven, Helm, JetBrains, Artifact Hub and the AUR. It has run since December 2019. I rewrote it in Bun and TypeScript in March 2026. MIT licensed."

[[params.projects]]
name = "Grid emissions"
image = "grid"
alt = "The Grid Intensity API homepage, dark, with coverage figures and a live curl response for the Netherlands."
url = "https://grid.deknijf.com"
source = "https://github.com/rdeknijf/grid-emissions-api"
curl = "curl -s 'https://grid.deknijf.com/v1/intensity/latest?country=NL'"
text = "Hourly electricity grid emissions intensity in gCO₂eq per kWh, for 27 EU countries in 31 bidding zones. Built from the ENTSO-E Transparency Platform's generation data and IPCC AR6 lifecycle emission factors."

[[params.projects]]
name = "ISDE"
image = "isde"
alt = "The ISDE Meldcode API homepage, with product counts for glass, heat pumps, insulation, solar boilers and ventilation."
url = "https://isde.deknijf.com"
source = "https://github.com/rdeknijf/isde-api"
docs = "https://isde.deknijf.com/docs"
curl = "curl -s https://isde.deknijf.com/v1/meldcode/KA01290"
text = "The Dutch RVO ISDE subsidy meldcode lists (heat pumps, insulation, high-efficiency glass, solar boilers, ventilation units) as JSON. RVO publishes them as Excel workbooks; the API reads those every night. Amounts are integer cents, and each record carries its source file URL and SHA-256, so you can check where a number came from."

[[params.projects]]
name = "zonecheck"
image = "zonecheck"
alt = "The zonecheck homepage, with a Dutch licence plate field, a city picker and coverage figures."
url = "https://zonecheck.deknijf.com"
source = "https://github.com/rdeknijf/zonecheck"
curl = "curl -s 'https://zonecheck.deknijf.com/access?kenteken=27-GH-TF&zone=Amsterdam'"
text = "Give it a Dutch licence plate and a zone, and it tells you whether that vehicle may enter the low- or zero-emission zone (milieuzone): allowed, not_allowed or unknown, with the conditions that decided it. Data from NDW's DATEX II zone feed and RDW vehicle data."

[[params.projects]]
name = "AD Feed Europe"
image = "adfeed"
alt = "The AD Feed Europe homepage, with a not-a-compliance-source warning, a last-sync table and an aircraft type lookup."
url = "https://adfeed.deknijf.com"
source = "https://github.com/rdeknijf/ad-feed-europe"
curl = "curl -s 'https://adfeed.deknijf.com/v1/types/A350/ads'"
text = "EASA airworthiness directives per directive number and per aircraft type, with a change feed. It is an unofficial mirror of data that EASA publishes; I'm not affiliated with EASA, and EASA hasn't endorsed it."

[[params.projects]]
name = "Notified Body Check"
image = "nbcheck"
alt = "The Notified Body Check homepage, with a check result for notified body 0123, TÜV SÜD Product Service, under Regulation 2017/745."
url = "https://nbcheck.deknijf.com"
source = "https://github.com/rdeknijf/notified-body-check"
curl = "curl -s 'https://nbcheck.deknijf.com/v1/check?body=NB%200297&legislation=2017/745'"
text = "NANDO is the European Commission's register of notified bodies, the bodies that sign off on products such as medical devices, lifts and pressure vessels before they go on the EU market. The API answers whether body X is notified for EU law Y, and covers status, scope, suspensions and withdrawals, with Atom change feeds. The data comes from NANDO, reused under CC BY 4.0. It is unofficial; I'm not affiliated with the European Commission, and the Commission hasn't endorsed it."
+++

These are small free APIs I built and left running, each one over public data that is a pain to get at. You curl a URL and you get JSON back; you don't need an account or a key.
