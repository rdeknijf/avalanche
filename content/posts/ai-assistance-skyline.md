+++
title = "The AI-Assistance Skyline"
date = 2026-04-07
description = "Definitely not just a colorful bar chart."
draft = false
aliases = ["/posts/skills-skyline/"]

[cover]
image = "images/sculptures/tyche_antioch.jpg"
alt = "Tyche of Antioch (Roman copy, c. 300 BC)"
caption = "Tyche of Antioch (Roman copy, c. 300 BC)"
+++

There's this idea going around that AI is the great equalizer. "If everyone gets the same AI, anyone can do everything as good as anyone else." When I first heard it I couldn't put a finger on why that felt wrong to me. But I think I can show you why; and as a nature lover I'm only a little sad that it's a city skyline.

So, this is mine. Or as close as I can get to it without being overly dramatic on the internet.

<div style="text-align:center; margin: 40px 0;">
<canvas id="pre-ai" width="1200" height="520" style="max-width:100%; height:auto;"></canvas>
<p style="font-size:13px; color:#888; font-style:italic; font-family:'Comic Sans MS',cursive;">My capability skyline, circa 2024. Note the conspicuous absence of anything hardware-related.</p>
</div>

Everyone is good at something; many somethings in fact. Some people of course less than others. Much to my father's despair I couldn't kick a soccer ball to save my life. Luckily both my younger brothers compensated handsomely for that, and I've always been able to fix his printer and program the VCR. (Damn, I remember when "millennial" meant "young".) So I get a taller tower there. (Sorry bros, it's true.) And this is how you can map out anyone.

<div style="display:flex; justify-content:center; gap:12px; flex-wrap:nowrap; margin: 40px 0;">
<div style="text-align:center;">
<p style="font-size:13px; color:#999; font-family:'Comic Sans MS',cursive;">Me</p>
<canvas id="me-compare" width="260" height="200" style="width:180px; height:auto;"></canvas>
</div>
<div style="text-align:center;">
<p style="font-size:13px; color:#999; font-family:'Comic Sans MS',cursive;">Middle bro</p>
<canvas id="bro1" width="260" height="200" style="width:180px; height:auto;"></canvas>
</div>
<div style="text-align:center;">
<p style="font-size:13px; color:#999; font-family:'Comic Sans MS',cursive;">Youngest bro</p>
<canvas id="bro2" width="260" height="200" style="width:180px; height:auto;"></canvas>
</div>
</div>
<p style="font-size:13px; color:#888; font-style:italic; text-align:center; font-family:'Comic Sans MS',cursive;">My brothers' skylines for comparison. Yes, I put soccer at zero for myself. No, that's not an exaggeration.</p>

But now, the unholy trinity of GPT, Claude and Gemini have given quite a few of my buildings a bump. Higher being just more of the same capability, and wider meaning that I can now do things that used to be *adjacent* to what I already knew but not really in it. I'm looking at you, Golang.

<div style="text-align:center; margin: 40px 0;">
<canvas id="ai-amplified" width="1200" height="520" style="max-width:100%; height:auto;"></canvas>
<p style="font-size:13px; color:#888; font-style:italic; font-family:'Comic Sans MS',cursive;">Same city, 2026. Look at all that glow. Taller in some places; wider in others.</p>
</div>

The question is, where does competence stop and capability start? And where, in turn, does *that* stop?

<div style="text-align:center; margin: 40px 0;">
<canvas id="gradient-scale" width="900" height="340" style="max-width:100%; height:auto;"></canvas>
<p style="font-size:13px; color:#888; font-style:italic; font-family:'Comic Sans MS',cursive;">The four shades of AI-assisted capability, from "I genuinely understand this" to "I am praying."</p>
</div>

- **Gray**: Pre-AI competences. Like seemingly all my podcasts are now prefixed with: "Guaranteed human."
- **Blue**: Understood. AI helped you get there, but you understand it now.
- **Teal**: Reach. It works and you can steer it, but let's not pretend you could do it yourself.
- And past teal; there are no buildings. Just outer space of hopes and prayers.

### Gray: DevOps
This is the easy bit. For me that's Python, Terraform, Git, etc. All the usual trappings of being a DevOps engineer for far too long. (How's my writing career coming along?)

### Blue: the PCB

Look at what I've learned to not be scared of last year:

![My PCB fan controller](/images/pcb-fan-controller.png)

I made that! I am so proud. Claude helped me understand it, and I most absolutely definitely wouldn't have ever learned this without AI help. But I made that PCB; it's a fan controller that talks with [Home Assistant](https://www.home-assistant.io). I had a pet peeve with the size of my [Speedcomforts](https://www.speedcomfort.nl) for years. So I bought some properly sized fans, tinkered away at this problem for months whenever I had time and inclination and eventually gathered enough courage to press the order button on [Aisler](https://aisler.net); I soldered it up (only knowing the right temperature and equipment thanks to GPT). And it works, and it works great.

And... I now know how PCBs are made. Or rather, I understand the process. Which; to be honest; was more of the point, I guess. My brain just abhors a technological non-understanding.

That's blue. If every AI disappeared tomorrow I couldn't make the *next* PCB as easily, but I'd know where to start. I understand what a trace is, why decoupling caps go where they go, what the difference between SPI and I2C is. That's mine now.

So is that still AI augmentation? Or should that now just be gray? AI may have helped me grow my competence, but it's mine now.

### Teal: the Android app

I never did any Android development. Yet I'm dictating my notes for this very article into an Android app that I had Claude create after yammering to it for five minutes. It has a dark mode. It syncs to my vault. I added a "blog idea" button last week in about three minutes of conversation. Could I have built that button by reading the Kotlin docs? Probably. Did I? No. My current AI-fueled impatience level does not accommodate that.

That's teal. The app works, I can steer it, but I don't *own* it the way I own my Python coded stuff. If the AI disappears, that app keeps running but it stops evolving.

Unless of course I make that AI help me get that teal blue, and then maybe even that teal gray.

### Somewhere in between: Kubernetes on AWS

I've had AI generate complete Kubernetes IaC modules for AWS and Azure, which I haven't worked in for a decade. It made it, I probably couldn't have; at least not as fast. But I can read every line. I can tell when the module is wrong because I know what a Kubernetes cluster *should* look like even if I haven't written the AWS glue in years. I'd have no problem maintaining it if tokens become too precious.

That's the weird part of the gradient; the bit where blue and teal blur together. I needed help, but I genuinely understand the result. If you asked me to explain it to a junior I could. I just couldn't have written it from scratch on a Friday afternoon.

### The edge of space

Then there's the border we must never go beyond; the edge of the world where ships drop off; the event horizon beyond which all code spaghettifies into a black blob.

I have been there. I had Claude generate a custom [ESPHome](https://esphome.io) component in C++ for that fan controller. It compiled. It ran. The fans spun. And I had absolutely no idea if it was doing what I thought it was doing or just doing *something*. I stared at it the way you stare at a legal contract; the words are English but the meaning is not landing.

We've all done the light version of this; and by we I mean my bubble of developer friends. You make AI do something, and it works. And you don't check it. Because, well; time pressure, laziness, AI burnout, dehydration, whatever reason you want to dish up. And then a few cycles later it turns out that the damn thing has been serving test data because the model was so incentivized to make it "work" that it concluded that building it for real was a massive nuisance.

That's annoying and expensive, but hopefully you've not gone too far along with it and it's fixable. But what about a part that you *cannot* understand; where you can't judge whether it's correct. Only that the outcome is probably correct because you've seen it work a few times, or worse, Claude told you it worked. That's not a building. That's empty sky that somehow looks like a building if you're not staring straight at it; like an optical illusion.

### Knowing your color

So if it quacks like a duck, looks like a duck and walks like a duck; doesn't the real result make the "competence" real as well? Maybe. But it doesn't completely work for me; which is why I call it "reach". The places we can work in now but don't own.

So here's a question: what color is the thing you're building right now? How confident are you that you'll be able to maintain it? Or are you telling yourself you're just exploring and pinky promise not to put it in production?

Each of us has a personal skyline, gaudy colors and all. And just like everyone's un-assisted skyline is different, it's not like AI flattens out capability for everyone equally. Like the [most recent DORA report](https://dora.dev/dora-report-2025/) says: AI is an amplifier. And it amplifies each of us in different ways.

And that's the thing that makes me feel all warm and fuzzy inside. Remember the great AI flattening? Look at the skylines. Mine has a tall blue PCB tower and a teal Android shed and some empty lots where I pretended there were buildings. Yours would look completely different. Same tools, different cities. Your gray determines your blue, your blue shapes your teal, and your particular flavor of overconfidence determines where the buildings end and the starry sky begins.

---

## Make your own skyline


<div id="builder" style="font-family:'Comic Sans MS','Chalkboard SE',cursive; max-width:900px; margin:0 auto;">

<canvas id="builder-canvas" width="1200" height="520" style="display:block; margin:0 auto 20px; max-width:100%; height:auto;"></canvas>

<p style="font-size:12px; color:#888; text-align:center; font-style:italic; margin:-10px 0 18px 0; font-family:'Comic Sans MS','Chalkboard SE',cursive;">taller = more of what you already knew. wider = adjacent ground you couldn't reach before.</p>

<div id="skill-rows" style="margin-bottom:16px;"></div>

<button id="add-skill" style="background:#333; color:#aaa; border:1px solid #555; padding:8px 20px; font-family:inherit; font-size:13px; cursor:pointer; border-radius:4px;">+ add capability</button>

<details style="margin-top:24px;">
<summary style="cursor:pointer; color:#888; font-size:13px;">your skyline as json</summary>
<pre id="json-out" style="background:#111; color:#7a7; padding:16px; border-radius:6px; font-size:11px; font-family:'Courier New',monospace; overflow-x:auto; margin-top:8px;"></pre>
</details>

</div>

<script src="/js/rough.min.js"></script>
<script src="/js/cityscape.js"></script>
<script>
// ── Static cityscapes ──

Cityscape.renderSimple('pre-ai', [
  { skill: 'Python', height: 230, width: 42 },
  { skill: 'K8s', height: 205, width: 36 },
  { skill: 'GCP', height: 210, width: 38 },
  { skill: 'Terraform / IaC', height: 225, width: 40 },
  { skill: 'Docker', height: 185, width: 36 },
  { skill: 'CI/CD', height: 185, width: 34 },
  { skill: 'Linux', height: 190, width: 38 },
  { skill: 'Git', height: 175, width: 32 },
  { skill: 'Bash', height: 165, width: 32 },
  { skill: 'SQL', height: 120, width: 30 },
  { skill: 'Go', height: 100, width: 30 },
  { skill: 'TypeScript', height: 30, width: 28 },
  { skill: 'Java', height: 25, width: 26 },
  { skill: 'AWS', height: 80, width: 28 },
  { skill: 'Azure', height: 60, width: 26 },
  { skill: 'Home Assistant', height: 90, width: 32 },
  { skill: 'DIY', height: 70, width: 28 },
  { skill: 'Soldering', height: 25, width: 24 },
  { skill: '3D printing', height: 40, width: 26 },
  { skill: 'Writing', height: 90, width: 30 },
  { skill: 'History', height: 110, width: 30 },
  { skill: 'Parenting', height: 130, width: 32 },
  { skill: 'Cooking', height: 55, width: 28 },
  { skill: 'Gaming', height: 55, width: 28 },
  { skill: 'Bouldering', height: 55, width: 24 },
  { skill: 'Printer fixing', height: 75, width: 26 },
  { skill: 'Soccer', height: 12, width: 22 },
]);

// Brother comparisons
function miniSkyline(id, data, seed) {
  var canvas = document.getElementById(id);
  var ctx = canvas.getContext('2d');
  var rc = rough.canvas(canvas);
  var groundY = 150;
  var totalW = data.reduce(function(s,d){return s+d.width;},0);
  var startX = (canvas.width - totalW) / 2;
  Cityscape.drawStars(ctx, canvas.width, canvas.height, 30);
  var positions = [], x = startX;
  data.forEach(function(d){ positions.push({x:x,w:d.width}); x+=d.width; });
  data.forEach(function(d,i){
    if(d.height>0) rc.rectangle(positions[i].x, groundY-d.height, positions[i].w, d.height,
      {fill:'#d8d8d8',fillStyle:'solid',stroke:'#d8d8d8',strokeWidth:0.5,roughness:1.2,bowing:1.5,seed:seed+i});
  });
  rc.line(startX-6,groundY,x+6,groundY,{stroke:'#444',strokeWidth:2,roughness:0.8});
  ctx.font='10px "Comic Sans MS",cursive'; ctx.fillStyle='#999';
  data.forEach(function(d,i){
    var cx=positions[i].x+positions[i].w/2;
    ctx.save(); ctx.translate(cx,groundY+8); ctx.rotate(Math.PI/3);
    ctx.textAlign='left'; ctx.textBaseline='top'; ctx.fillText(d.skill,0,0); ctx.restore();
  });
}
miniSkyline('bro1',[
  {skill:'Banking',height:160,width:48},{skill:'Soccer',height:140,width:44},
  {skill:'Cooking',height:55,width:36},{skill:'Printer fixing',height:15,width:32}
],100);
miniSkyline('bro2',[
  {skill:'Horeca',height:160,width:48},{skill:'Soccer',height:140,width:44},
  {skill:'Cooking',height:110,width:36},{skill:'Printer fixing',height:15,width:32}
],200);
miniSkyline('me-compare',[
  {skill:'Python',height:160,width:48},{skill:'Soccer',height:10,width:44},
  {skill:'Cooking',height:55,width:36},{skill:'Printer fixing',height:120,width:32}
],300);

// AI-amplified
Cityscape.renderLayered('ai-amplified', [
  { skill: 'Python',           base: 230, blue: 295, teal: 315, width: 42, blueExtra: 10, tealExtra: 16 },
  { skill: 'K8s',              base: 205, blue: 245, teal: 260, width: 36, blueExtra: 8,  tealExtra: 12 },
  { skill: 'GCP',              base: 210, blue: 255, teal: 270, width: 38, blueExtra: 8,  tealExtra: 12 },
  { skill: 'Terraform / IaC',  base: 225, blue: 290, teal: 305, width: 40, blueExtra: 10, tealExtra: 16 },
  { skill: 'Docker',           base: 185, blue: 220, teal: 230, width: 36, blueExtra: 6,  tealExtra: 10 },
  { skill: 'CI/CD',            base: 185, blue: 220, teal: 235, width: 34, blueExtra: 6,  tealExtra: 12 },
  { skill: 'Linux',            base: 190, blue: 220, teal: 230, width: 38, blueExtra: 4,  tealExtra: 8  },
  { skill: 'Git',              base: 175, blue: 192, teal: 205, width: 32, blueExtra: 3,  tealExtra: 8  },
  { skill: 'Bash',             base: 165, blue: 195, teal: 205, width: 32, blueExtra: 6,  tealExtra: 10 },
  { skill: 'SQL',              base: 120, blue: 158, teal: 178, width: 30, blueExtra: 6,  tealExtra: 12 },
  { skill: 'Go',               base: 100, blue: 190, teal: 220, width: 30, blueExtra: 22, tealExtra: 38 },
  { skill: 'TypeScript',       base: 30,  blue: 80,  teal: 135, width: 28, blueExtra: 18, tealExtra: 32 },
  { skill: 'Java',             base: 25,  blue: 60,  teal: 115, width: 26, blueExtra: 16, tealExtra: 28 },
  { skill: 'AWS',              base: 110, blue: 200, teal: 230, width: 28, blueExtra: 16, tealExtra: 28 },
  { skill: 'Azure',            base: 60,  blue: 105, teal: 145, width: 26, blueExtra: 14, tealExtra: 24 },
  { skill: 'Home Assistant',   base: 90,  blue: 170, teal: 195, width: 32, blueExtra: 14, tealExtra: 24 },
  { skill: 'DIY / electronics',base: 70,  blue: 150, teal: 175, width: 28, blueExtra: 16, tealExtra: 28 },
  { skill: 'Soldering',        base: 25,  blue: 85,  teal: 100, width: 24, blueExtra: 14, tealExtra: 22 },
  { skill: 'PCB design',       base: 0,   blue: 100, teal: 110, width: 50, blueExtra: 28, tealExtra: 44 },
  { skill: 'C++ / ESPHome',    base: 0,   blue: 5,   teal: 25,  width: 42, blueExtra: 22, tealExtra: 38 },
  { skill: 'Firmware',         base: 0,   blue: 8,   teal: 25,  width: 40, blueExtra: 22, tealExtra: 36 },
  { skill: '3D printing',      base: 40,  blue: 75,  teal: 92,  width: 26, blueExtra: 10, tealExtra: 18 },
  { skill: 'Writing',          base: 90,  blue: 190, teal: 220, width: 30, blueExtra: 16, tealExtra: 28 },
  { skill: 'History',          base: 110, blue: 148, teal: 165, width: 30, blueExtra: 6,  tealExtra: 10 },
  { skill: 'Parenting',        base: 130, blue: 142, teal: 152, width: 32, blueExtra: 2,  tealExtra: 6  },
  { skill: 'Android dev',      base: 0,   blue: 10,  teal: 80,  width: 48, blueExtra: 26, tealExtra: 44 },
  { skill: 'Cooking',          base: 55,  blue: 75,  teal: 90,  width: 28, blueExtra: 4,  tealExtra: 10 },
  { skill: 'Gaming',           base: 55,  blue: 55,  teal: 55,  width: 28, blueExtra: 0,  tealExtra: 0  },
  { skill: 'Bouldering',       base: 55,  blue: 55,  teal: 55,  width: 24, blueExtra: 0,  tealExtra: 0  },
  { skill: 'Printer fixing',   base: 75,  blue: 82,  teal: 88,  width: 26, blueExtra: 3,  tealExtra: 6  },
  { skill: 'Soccer',           base: 12,  blue: 12,  teal: 12,  width: 22, blueExtra: 0,  tealExtra: 0  },
]);

// Gradient scale
(function() {
  var canvas = document.getElementById('gradient-scale');
  var ctx = canvas.getContext('2d');
  var rc = rough.canvas(canvas);
  var groundY = 220, barW = 100, gap = 40;
  var totalW = barW * 4 + gap * 3;
  var startX = (canvas.width - totalW) / 2;
  Cityscape.drawStars(ctx, canvas.width, canvas.height, 40);
  var items = [
    { label: 'Gray', sub: 'yours', height: 160, fill: '#d8d8d8', glow: null },
    { label: 'Blue', sub: 'understood', height: 160, fill: '#5b8dd9', glow: '#5b8dd9' },
    { label: 'Teal', sub: 'reach', height: 160, fill: '#3dbdb5', glow: '#3dbdb5' },
    { label: 'Space', sub: 'prayers', height: 160, fill: null, glow: null },
  ];
  items.forEach(function(item, i) {
    var x = startX + i * (barW + gap);
    if (item.glow) Cityscape.drawGlow(ctx, x, groundY - item.height, barW, item.height, item.glow);
    if (item.fill) {
      rc.rectangle(x, groundY - item.height, barW, item.height, {
        fill: item.fill, fillStyle: 'solid', stroke: item.fill, strokeWidth: 0.5, roughness: 1.2, bowing: 1.5, seed: 500 + i
      });
    } else {
      ctx.save(); ctx.setLineDash([6,6]);
      var grad = ctx.createLinearGradient(0, groundY, 0, groundY - item.height);
      grad.addColorStop(0, 'rgba(60,60,60,0.4)'); grad.addColorStop(1, 'rgba(60,60,60,0)');
      ctx.strokeStyle = grad; ctx.lineWidth = 1;
      ctx.strokeRect(x, groundY - item.height, barW, item.height);
      ctx.font = '14px "Comic Sans MS",cursive'; ctx.fillStyle = 'rgba(80,80,80,0.5)';
      ctx.fillText('?', x+30, groundY-80); ctx.fillText('?', x+55, groundY-120); ctx.fillText('?', x+45, groundY-40);
      ctx.restore();
    }
    ctx.font = '13px "Comic Sans MS",cursive'; ctx.fillStyle = item.fill || '#555';
    ctx.textAlign = 'center'; ctx.fillText(item.label, x + barW/2, groundY + 20);
    ctx.font = '11px "Comic Sans MS",cursive'; ctx.fillStyle = '#666';
    ctx.fillText(item.sub, x + barW/2, groundY + 36);
  });
  rc.line(startX-10, groundY, startX+totalW+10, groundY, {stroke:'#444',strokeWidth:2,roughness:0.8});
  ctx.save(); ctx.strokeStyle='#444'; ctx.lineWidth=1; ctx.setLineDash([4,4]);
  var arrowY = groundY + 56;
  ctx.beginPath(); ctx.moveTo(startX+barW/2, arrowY); ctx.lineTo(startX+totalW-barW/2, arrowY); ctx.stroke();
  ctx.setLineDash([]); ctx.beginPath();
  ctx.moveTo(startX+totalW-barW/2, arrowY);
  ctx.lineTo(startX+totalW-barW/2-8, arrowY-4);
  ctx.lineTo(startX+totalW-barW/2-8, arrowY+4);
  ctx.closePath(); ctx.fillStyle='#444'; ctx.fill(); ctx.restore();
  ctx.font='10px "Comic Sans MS",cursive'; ctx.fillStyle='#555'; ctx.textAlign='center';
  ctx.fillText('increasing delusion', startX+totalW/2, arrowY+14);
})();

// ═══════════════════════════════════════════
// Interactive "Make your own skyline" builder
// ═══════════════════════════════════════════
(function() {
  var defaults = [
    { skill: 'Writing emails',   base: 170, blue: 250, teal: 275, breadth: 14 },
    { skill: 'Cooking',          base: 130, blue: 155, teal: 170, breadth: 8  },
    { skill: 'Home repair',      base: 85,  blue: 170, teal: 200, breadth: 28 },
    { skill: 'Taxes',            base: 40,  blue: 135, teal: 185, breadth: 42 },
    { skill: 'Photography',      base: 110, blue: 145, teal: 165, breadth: 12 },
    { skill: 'French',           base: 30,  blue: 120, teal: 175, breadth: 36 },
    { skill: 'Guitar',           base: 75,  blue: 75,  teal: 75,  breadth: 0  },
    { skill: 'Parallel parking', base: 60,  blue: 60,  teal: 60,  breadth: 0  },
    { skill: 'Small talk',       base: 50,  blue: 55,  teal: 62,  breadth: 4  },
  ];

  var skills = JSON.parse(JSON.stringify(defaults));
  var rafPending = false;

  function el(tag, attrs, children) {
    var e = document.createElement(tag);
    if (attrs) Object.keys(attrs).forEach(function(k) {
      if (k === 'style' && typeof attrs[k] === 'object') {
        Object.keys(attrs[k]).forEach(function(s) { e.style[s] = attrs[k][s]; });
      } else if (k.indexOf('on') === 0) {
        e.addEventListener(k.slice(2), attrs[k]);
      } else { e.setAttribute(k, attrs[k]); }
    });
    (children || []).forEach(function(c) {
      if (typeof c === 'string') e.appendChild(document.createTextNode(c));
      else if (c) e.appendChild(c);
    });
    return e;
  }

  // Schedule a canvas re-render on next animation frame (coalesces rapid slider events)
  function scheduleRender() {
    if (rafPending) return;
    rafPending = true;
    requestAnimationFrame(function() {
      rafPending = false;
      renderCanvas();
    });
  }

  function renderCanvas() {
    var data = skills.map(function(s) {
      var w = 36;
      var breadth = s.breadth || 0;
      var blueExtra = s.blue > s.base ? Math.round(breadth * 0.6) : 0;
      var tealExtra = s.teal > s.blue ? breadth : blueExtra;
      return {
        skill: s.skill, base: s.base, blue: s.blue, teal: s.teal,
        width: w, blueExtra: blueExtra, tealExtra: tealExtra,
      };
    });
    var canvas = document.getElementById('builder-canvas');
    var ctx = canvas.getContext('2d');
    ctx.clearRect(0, 0, canvas.width, canvas.height);
    if (data.length > 0) Cityscape.renderLayered('builder-canvas', data, { stickFigure: false });

    var jsonData = skills.map(function(s) {
      return { skill: s.skill, base: s.base, understood: s.blue, reach: s.teal, breadth: s.breadth || 0 };
    });
    document.getElementById('json-out').textContent = JSON.stringify(jsonData, null, 2);
  }
  function renderBuilder() {
    var container = document.getElementById('skill-rows');
    container.innerHTML = '';

    var rowStyle = {
      display: 'flex', alignItems: 'center', gap: '8px',
      marginBottom: '6px', fontSize: '12px', color: '#aaa',
    };
    var inputStyle = {
      background: '#1a1a2a', color: '#ccc', border: '1px solid #333',
      padding: '4px 8px', borderRadius: '3px', fontFamily: 'inherit', fontSize: '12px',
    };

    // Header
    var header = el('div', { style: Object.assign({}, rowStyle, { color: '#666', marginBottom: '10px' }) }, [
      el('span', { style: { width: '120px', flexShrink: '0' } }, ['capability']),
      el('span', { style: { width: '108px', textAlign: 'center', color: '#d8d8d8' } }, ['base']),
      el('span', { style: { width: '108px', textAlign: 'center', color: '#5b8dd9' } }, ['understood']),
      el('span', { style: { width: '108px', textAlign: 'center', color: '#3dbdb5' } }, ['reach']),
      el('span', { style: { width: '88px',  textAlign: 'center', color: '#aaa'    } }, ['breadth']),
    ]);
    container.appendChild(header);

    skills.forEach(function(s, idx) {
      var nameInput = el('input', Object.assign({ type: 'text', value: s.skill }, { style: Object.assign({}, inputStyle, { width: '120px' }) }));
      nameInput.addEventListener('input', function() { s.skill = this.value; scheduleRender(); });

      // Store references to sibling sliders+labels so we can update them without rebuilding DOM
      var sliderRefs = {};

      function makeSlider(prop, color, max, wrapWidth, sliderWidth) {
        var ww = wrapWidth || '108px';
        var sw = sliderWidth || '100px';
        var wrap = el('div', { style: { display: 'flex', alignItems: 'center', gap: '4px', width: ww } });
        var slider = el('input', { type: 'range', min: '0', max: String(max || 350), value: String(s[prop] || 0),
          style: { width: sw, height: '6px', cursor: 'pointer', accentColor: color } });
        var val = el('span', { style: { width: '28px', fontSize: '11px', color: '#666', textAlign: 'right' } }, [String(s[prop] || 0)]);
        sliderRefs[prop] = { slider: slider, val: val };
        slider.addEventListener('input', function() {
          s[prop] = parseInt(this.value);
          // Enforce: base <= blue <= teal (heights only; breadth is independent)
          if (prop === 'base') { s.blue = Math.max(s.blue, s.base); s.teal = Math.max(s.teal, s.blue); }
          if (prop === 'blue') { s.base = Math.min(s.base, s.blue); s.teal = Math.max(s.teal, s.blue); }
          if (prop === 'teal') { s.blue = Math.min(s.blue, s.teal); s.base = Math.min(s.base, s.blue); }
          // Update all slider positions and value labels in-place (no DOM rebuild)
          Object.keys(sliderRefs).forEach(function(p) {
            if (s[p] !== undefined) {
              sliderRefs[p].slider.value = s[p];
              sliderRefs[p].val.textContent = s[p];
            }
          });
          scheduleRender();
        });
        wrap.appendChild(slider); wrap.appendChild(val);
        return wrap;
      }

      var removeBtn = el('button', {
        style: { background: 'none', border: 'none', color: '#555', cursor: 'pointer', fontSize: '14px', padding: '2px 6px' },
        onclick: function() { skills.splice(idx, 1); renderBuilder(); scheduleRender(); },
      }, ['\u00d7']);

      var row = el('div', { style: rowStyle }, [
        nameInput,
        makeSlider('base',    '#d8d8d8', 350),
        makeSlider('blue',    '#5b8dd9', 350),
        makeSlider('teal',    '#3dbdb5', 350),
        makeSlider('breadth', '#aaaaaa', 80, '88px', '80px'),
        removeBtn,
      ]);
      container.appendChild(row);
    });
  }

  document.getElementById('add-skill').addEventListener('click', function() {
    skills.push({ skill: 'New capability', base: 80, blue: 120, teal: 150, breadth: 15 });
    renderBuilder(); scheduleRender();
  });

  renderBuilder();
  renderCanvas();
})();
</script>
