// ── Cityscape renderer ──
// Shared rendering engine for the competence cityscape blog post.
// Expects rough.js to be loaded first.

var Cityscape = (function() {
  'use strict';

  var COL = {
    gray:   '#d8d8d8',
    blue:   '#5b8dd9',
    teal:   '#3dbdb5',
    ground: '#444',
    label:  '#999',
  };

  function baseOpts(seed) {
    return { fill: COL.gray, fillStyle: 'solid', stroke: COL.gray, strokeWidth: 0.5, roughness: 1.2, bowing: 1.5, seed: seed || 42 };
  }
  function blueOpts(seed) {
    return { fill: COL.blue, fillStyle: 'solid', stroke: COL.blue, strokeWidth: 0.5, roughness: 1.2, bowing: 1.5, seed: seed || 99 };
  }
  function tealOpts(seed) {
    return { fill: COL.teal, fillStyle: 'solid', stroke: COL.teal, strokeWidth: 0.5, roughness: 1.2, bowing: 1.5, seed: seed || 77 };
  }

  // Detect PaperMod dark mode — PaperMod adds/removes 'dark' class on body
  function isDark() {
    return document.body.classList.contains('dark');
  }

  // Toggle PaperMod theme by clicking its theme-toggle button
  function toggleSiteTheme() {
    var btn = document.getElementById('theme-toggle');
    if (btn) btn.click();
  }

  function drawStars(ctx, w, h, count) {
    ctx.fillStyle = '#fff';
    var rng = function(seed) {
      return function() { seed = (seed * 16807) % 2147483647; return (seed - 1) / 2147483646; };
    }(12345);
    for (var i = 0; i < count; i++) {
      var x = rng() * w, y = rng() * h * 0.7;
      var r = rng() * 1.5 + 0.3, alpha = rng() * 0.6 + 0.2;
      ctx.globalAlpha = alpha;
      ctx.beginPath(); ctx.arc(x, y, r, 0, Math.PI * 2); ctx.fill();
    }
    ctx.globalAlpha = 1;
  }

  function drawMoon(rc, ctx, cx, cy) {
    var r = 22;
    var off = document.createElement('canvas');
    off.width = ctx.canvas.width; off.height = ctx.canvas.height;
    var oc = off.getContext('2d');
    var orc = rough.canvas(off);
    orc.circle(cx, cy, r * 2, {
      fill: '#dde4ee', fillStyle: 'solid', stroke: '#ccd3dd',
      strokeWidth: 0.5, roughness: 1.0, bowing: 1.5, seed: 888
    });
    oc.globalCompositeOperation = 'destination-out';
    oc.beginPath(); oc.arc(cx + 12, cy - 5, r, 0, Math.PI * 2); oc.fill();
    oc.globalCompositeOperation = 'source-over';
    ctx.save();
    var glow = ctx.createRadialGradient(cx, cy, r * 0.3, cx, cy, r * 2.5);
    glow.addColorStop(0, 'rgba(200, 210, 230, 0.10)');
    glow.addColorStop(1, 'rgba(200, 210, 230, 0)');
    ctx.fillStyle = glow;
    ctx.beginPath(); ctx.arc(cx, cy, r * 2.5, 0, Math.PI * 2); ctx.fill();
    ctx.restore();
    ctx.drawImage(off, 0, 0);
  }

  function drawSun(rc, ctx, cx, cy) {
    var r = 18;
    ctx.save();
    var glow = ctx.createRadialGradient(cx, cy, r * 0.5, cx, cy, r * 2.5);
    glow.addColorStop(0, 'rgba(255, 220, 100, 0.18)');
    glow.addColorStop(1, 'rgba(255, 220, 100, 0)');
    ctx.fillStyle = glow;
    ctx.beginPath(); ctx.arc(cx, cy, r * 2.5, 0, Math.PI * 2); ctx.fill();
    ctx.restore();
    rc.circle(cx, cy, r * 2, {
      fill: '#ffe066', fillStyle: 'solid', stroke: '#f0c030',
      strokeWidth: 0.8, roughness: 1.2, bowing: 1.5, seed: 889
    });
    var rayOpts = { stroke: '#f0c030', strokeWidth: 1.2, roughness: 1.0 };
    for (var i = 0; i < 8; i++) {
      var angle = (Math.PI * 2 / 8) * i;
      var x1 = cx + Math.cos(angle) * (r + 4);
      var y1 = cy + Math.sin(angle) * (r + 4);
      var x2 = cx + Math.cos(angle) * (r + 12);
      var y2 = cy + Math.sin(angle) * (r + 12);
      rc.line(x1, y1, x2, y2, rayOpts);
    }
  }

  function drawGlow(ctx, x, y, w, h, color) {
    ctx.save();
    ctx.shadowColor = color; ctx.shadowBlur = 18;
    ctx.fillStyle = color; ctx.globalAlpha = 0.15;
    ctx.fillRect(x - 3, y - 3, w + 6, h + 6);
    ctx.globalAlpha = 0.08; ctx.shadowBlur = 35;
    ctx.fillRect(x - 6, y - 6, w + 12, h + 12);
    ctx.restore();
  }

  function drawLabels(ctx, positions, data, groundY) {
    ctx.font = '11px "Comic Sans MS", "Chalkboard SE", cursive';
    ctx.fillStyle = COL.label;
    for (var i = 0; i < data.length; i++) {
      var cx = positions[i].x + positions[i].w / 2;
      ctx.save();
      ctx.translate(cx, groundY + 10);
      ctx.rotate(Math.PI / 3);
      ctx.textAlign = 'left'; ctx.textBaseline = 'top';
      ctx.fillText(data[i].skill, 0, 0);
      ctx.restore();
    }
  }

  function drawStickFigure(rc, x, groundY) {
    var o = { stroke: COL.label, strokeWidth: 1.5, roughness: 0.5 };
    rc.line(x - 4, groundY, x, groundY - 12, o);
    rc.line(x + 4, groundY, x, groundY - 12, o);
    rc.line(x, groundY - 12, x, groundY - 24, o);
    rc.line(x - 6, groundY - 18, x + 6, groundY - 18, o);
    rc.circle(x, groundY - 28, 8, Object.assign({}, o, { fill: '#0a0a14', fillStyle: 'solid' }));
  }

  // Registry of render functions to re-render on theme change
  var renderFns = [];

  function registerRender(fn) {
    renderFns.push(fn);
  }

  // Watch for PaperMod theme changes and re-render all cityscapes
  var _observing = false;
  function observeTheme() {
    if (_observing) return;
    _observing = true;
    // PaperMod toggles class on body
    var bodyObserver = new MutationObserver(function() {
      renderFns.forEach(function(fn) { fn(); });
    });
    bodyObserver.observe(document.body, { attributes: true, attributeFilter: ['class'] });
    // Also watch data-theme on html
    var htmlObserver = new MutationObserver(function() {
      renderFns.forEach(function(fn) { fn(); });
    });
    htmlObserver.observe(document.documentElement, { attributes: true, attributeFilter: ['data-theme'] });
    if (window.matchMedia) {
      window.matchMedia('(prefers-color-scheme: dark)').addEventListener('change', function() {
        renderFns.forEach(function(fn) { fn(); });
      });
    }
  }

  // Set up click-to-toggle-theme on canvas celestial body
  function setupCelestialClick(canvasId) {
    var canvas = document.getElementById(canvasId);
    if (!canvas || canvas._celestialClick) return;
    canvas._celestialClick = true;

    canvas.addEventListener('click', function(e) {
      if (!canvas._celestialHit) return;
      var rect = canvas.getBoundingClientRect();
      var scaleX = canvas.width / rect.width;
      var scaleY = canvas.height / rect.height;
      var mx = (e.clientX - rect.left) * scaleX;
      var my = (e.clientY - rect.top) * scaleY;
      var hit = canvas._celestialHit;
      var dx = mx - hit.cx, dy = my - hit.cy;
      if (dx * dx + dy * dy <= hit.r * hit.r) {
        toggleSiteTheme();
      }
    });

    canvas.addEventListener('mousemove', function(e) {
      if (!canvas._celestialHit) return;
      var rect = canvas.getBoundingClientRect();
      var scaleX = canvas.width / rect.width;
      var scaleY = canvas.height / rect.height;
      var mx = (e.clientX - rect.left) * scaleX;
      var my = (e.clientY - rect.top) * scaleY;
      var hit = canvas._celestialHit;
      var dx = mx - hit.cx, dy = my - hit.cy;
      canvas.style.cursor = (dx * dx + dy * dy <= hit.r * hit.r) ? 'pointer' : '';
    });
  }

  // ── Render a simple gray-only skyline ──
  function renderSimple(canvasId, data, opts) {
    opts = opts || {};

    function doRender() {
      var canvas = document.getElementById(canvasId);
      if (!canvas) return;
      var ctx = canvas.getContext('2d');
      var rc = rough.canvas(canvas);
      ctx.clearRect(0, 0, canvas.width, canvas.height);

      var groundY = Math.round(canvas.height * 0.85);
      var topMargin = Math.round(canvas.height * 0.12);

      var maxH = 0;
      data.forEach(function(d) { if (d.height > maxH) maxH = d.height; });
      var available = groundY - topMargin;
      var scale = maxH > 0 ? available / maxH : 1;

      var totalW = data.reduce(function(s, d) { return s + d.width; }, 0);
      // Reduce horizontal margins to 75% of natural centering
      var margin = canvas.width - totalW;
      var startX = Math.round(margin * 0.75 / 2);

      // Always dark sky with stars
      drawStars(ctx, canvas.width, canvas.height, opts.starCount || 80);

      var positions = [], x = startX;
      data.forEach(function(d) { positions.push({ x: x, w: d.width }); x += d.width; });

      // Celestial body above rightmost building, well inside canvas
      if (opts.celestial !== false) {
        var lastPos = positions[positions.length - 1];
        var cCx = lastPos.x + lastPos.w / 2;
        var cCy = topMargin + 30; // low enough that glow stays inside
        drawMoon(rc, ctx, cCx, cCy);
        if (!isDark()) {
          rc.line(cCx - 83, cCy, cCx - 36, cCy, { stroke: '#555', strokeWidth: 1.5, roughness: 1.5 });
          rc.line(cCx - 46, cCy - 6, cCx - 36, cCy, { stroke: '#555', strokeWidth: 1.5, roughness: 1.0 });
          rc.line(cCx - 46, cCy + 6, cCx - 36, cCy, { stroke: '#555', strokeWidth: 1.5, roughness: 1.0 });
          ctx.save();
          ctx.font = '16px "Comic Sans MS", cursive';
          ctx.fillStyle = '#555';
          ctx.textAlign = 'right';
          ctx.fillText('night mode', cCx - 87, cCy + 5);
          ctx.restore();
        }
        canvas._celestialHit = { cx: cCx, cy: cCy, r: 30 };
      }

      data.forEach(function(d, i) {
        var h = d.height * scale;
        if (h > 0) rc.rectangle(positions[i].x, groundY - h, positions[i].w, h, baseOpts(42 + i));
      });

      rc.line(startX - 10, groundY, x + 10, groundY, { stroke: COL.ground, strokeWidth: 2, roughness: 0.8 });
      drawLabels(ctx, positions, data, groundY);
      if (opts.stickFigure !== false) drawStickFigure(rc, startX - 22, groundY);
    }

    doRender();
    registerRender(doRender);
    setupCelestialClick(canvasId);
    observeTheme();
  }

  // ── Render a full 3-layer skyline (teal → blue → gray) ──
  function renderLayered(canvasId, data, opts) {
    opts = opts || {};

    function doRender() {
      var canvas = document.getElementById(canvasId);
      if (!canvas) return;
      var ctx = canvas.getContext('2d');
      var rc = rough.canvas(canvas);
      ctx.clearRect(0, 0, canvas.width, canvas.height);

      var groundY = Math.round(canvas.height * 0.85);
      var topMargin = Math.round(canvas.height * 0.12);

      var maxH = 0;
      data.forEach(function(d) {
        var h = d.teal || d.blue || d.base || d.height || 0;
        if (h > maxH) maxH = h;
      });
      var available = groundY - topMargin;
      var scale = maxH > 0 ? available / maxH : 1;

      var totalW = data.reduce(function(s, d) { return s + d.width; }, 0);
      var margin = canvas.width - totalW;
      var startX = Math.round(margin * 0.75 / 2);

      drawStars(ctx, canvas.width, canvas.height, opts.starCount || 80);

      var positions = [], x = startX;
      data.forEach(function(d) { positions.push({ x: x, w: d.width }); x += d.width; });

      if (opts.celestial !== false) {
        var lastPos = positions[positions.length - 1];
        var cCx = lastPos.x + lastPos.w / 2;
        var cCy = topMargin + 30;
        drawMoon(rc, ctx, cCx, cCy);
        if (!isDark()) {
          rc.line(cCx - 83, cCy, cCx - 36, cCy, { stroke: '#555', strokeWidth: 1.5, roughness: 1.5 });
          rc.line(cCx - 46, cCy - 6, cCx - 36, cCy, { stroke: '#555', strokeWidth: 1.5, roughness: 1.0 });
          rc.line(cCx - 46, cCy + 6, cCx - 36, cCy, { stroke: '#555', strokeWidth: 1.5, roughness: 1.0 });
          ctx.save();
          ctx.font = '16px "Comic Sans MS", cursive';
          ctx.fillStyle = '#555';
          ctx.textAlign = 'right';
          ctx.fillText('night mode', cCx - 87, cCy + 5);
          ctx.restore();
        }
        canvas._celestialHit = { cx: cCx, cy: cCy, r: 30 };
      }

      // Glow
      data.forEach(function(d, i) {
        var hasTeal = d.teal > (d.blue || d.base);
        var hasBlue = (d.blue || d.base) > d.base;
        if (!hasTeal && !hasBlue) return;
        var outerH = (d.teal || d.blue || d.base) * scale;
        var outerExtra = d.tealExtra || 0;
        var outerColor = hasTeal ? COL.teal : COL.blue;
        var outerW = positions[i].w + outerExtra;
        var outerX = positions[i].x + positions[i].w / 2 - outerW / 2;
        drawGlow(ctx, outerX, groundY - outerH, outerW, outerH, outerColor);
      });

      // Teal (back)
      data.forEach(function(d, i) {
        if (!d.teal || d.teal <= (d.blue || d.base)) return;
        var tH = d.teal * scale;
        var tW = positions[i].w + (d.tealExtra || 0);
        var tX = positions[i].x + positions[i].w / 2 - tW / 2;
        rc.rectangle(tX, groundY - tH, tW, tH, tealOpts(300 + i));
      });

      // Blue (middle)
      data.forEach(function(d, i) {
        if (!d.blue || d.blue <= d.base) return;
        var bH = d.blue * scale;
        var bW = positions[i].w + (d.blueExtra || 0);
        var bX = positions[i].x + positions[i].w / 2 - bW / 2;
        rc.rectangle(bX, groundY - bH, bW, bH, blueOpts(200 + i));
      });

      // Gray (front)
      data.forEach(function(d, i) {
        var bH = d.base * scale;
        if (bH > 0) rc.rectangle(positions[i].x, groundY - bH, positions[i].w, bH, baseOpts(42 + i));
      });

      rc.line(startX - 10, groundY, x + 10, groundY, { stroke: COL.ground, strokeWidth: 2, roughness: 0.8 });
      drawLabels(ctx, positions, data, groundY);
      if (opts.stickFigure !== false) drawStickFigure(rc, startX - 22, groundY);
    }

    doRender();
    registerRender(doRender);
    setupCelestialClick(canvasId);
    observeTheme();
  }

  return {
    COL: COL,
    renderSimple: renderSimple,
    renderLayered: renderLayered,
    drawStars: drawStars,
    drawGlow: drawGlow,
  };
})();
