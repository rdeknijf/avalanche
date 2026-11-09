---
version: 1
slug: "content-projects-md"
primary_target: "content/projects.md"
related_targets: []
---

Scope: the Projects page of deknijf.com (`/projects/`), visitor mode Experience.

Audience and job: people who judge whether to hire or trust Rutger. They need to see that he builds real things and keeps them running. Proof: six live public sites with public source. Action: open a site, or go to Work with me.

Constraints: every existing sentence, curl line and link stays verbatim. One new closing line, by Fable, links to Work with me. Light and dark ship. No eyebrow labels, no section numbers.

## Direction contract

THESIS: Six live sites, each dressed differently, hang together as one wall of real work. Refuses the single text column.

OWN-WORLD: Atrium as shipped: parchment or warm near-black ground, Newsreader headings, Hanken Grotesk body, IBM Plex Mono for code, saddle brown or bronze links. The screenshot is the only picture; a hairline edge and a soft offset shadow make it a hung plate.

STORY: The visitor sees several working sites at once, understands that these are live APIs with public source, can try one with a curl line, and ends at one quiet line to Work with me.

FIRST VIEWPORT: At 1280 by 800, title and dek on the left with the intro on the right in one band, then two aligned columns of plates, the first plate fully started above the fold. Plates link to the live site.

FORM: Wall of plates, two aligned columns in document order, equal plate widths. The picked form was the salon wall (position 7 on the ordered list, seed:f4574de008a91728); Rutger found its vertical offset weird on 2026-11-09, so the offset and the mixed plate widths are gone.

FINISH: unreviewed and undocumented is unfinished; this build ends with the finish review, the verdict, DESIGN.md, and every shipping raster carrying its provenance

Raster provenance: the six files in `static/images/projects/` are Playwright screenshots of each project's live homepage (the `url` in `content/projects.md`), captured 2026-11-09 and resized to 1200x750. Not generated. Viewports: grid and adfeed 1280x800 at 2x, full frame; isde 1280 wide, clip 1136x710 at x 72; zonecheck 1280 wide, clip 1216x760 at x 32; nbcheck 1280 wide, clip 1254x784 at x 13; lateststable 640 wide at 3x, clip 640x400 at y 3. Kept here because a sidecar in `static/` would ship publicly.
