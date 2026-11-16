// Progressive enhancement only: every page is fully readable without this file.
(function () {
  "use strict";
  var doc = document.documentElement;
  var reduce = window.matchMedia("(prefers-reduced-motion: reduce)").matches;

  // Theme toggle — remembers the choice per browser.
  var themeBtn = document.querySelector(".theme-btn");
  if (themeBtn) {
    themeBtn.addEventListener("click", function () {
      var current = doc.dataset.theme || (window.matchMedia("(prefers-color-scheme: dark)").matches ? "dark" : "light");
      var next = current === "dark" ? "light" : "dark";
      doc.dataset.theme = next;
      try { localStorage.setItem("theme", next); } catch (e) {}
    });
  }

  // Mobile menu.
  var menuBtn = document.querySelector(".menu-btn");
  var mobileNav = document.getElementById("mobile-nav");
  if (menuBtn && mobileNav) {
    menuBtn.addEventListener("click", function () {
      var open = menuBtn.getAttribute("aria-expanded") !== "true";
      menuBtn.setAttribute("aria-expanded", String(open));
      menuBtn.setAttribute("aria-label", open ? "Close menu" : "Open menu");
      mobileNav.dataset.open = String(open);
    });
    document.addEventListener("keydown", function (e) {
      if (e.key === "Escape" && mobileNav.dataset.open === "true") { menuBtn.click(); menuBtn.focus(); }
    });
  }

  // Reading progress bar.
  var bar = document.querySelector(".progress");
  if (bar && !reduce) {
    var raf = 0;
    var update = function () {
      raf = 0;
      var max = doc.scrollHeight - doc.clientHeight;
      bar.style.transform = "scaleX(" + (max > 0 ? doc.scrollTop / max : 0) + ")";
    };
    window.addEventListener("scroll", function () { if (!raf) raf = requestAnimationFrame(update); }, { passive: true });
  }

  // Scroll reveal (content is visible by default if IO is unavailable).
  var reveals = document.querySelectorAll(".reveal");
  if ("IntersectionObserver" in window && !reduce) {
    var io = new IntersectionObserver(function (entries) {
      entries.forEach(function (en) { if (en.isIntersecting) { en.target.classList.add("is-in"); io.unobserve(en.target); } });
    }, { rootMargin: "0px 0px -8% 0px" });
    reveals.forEach(function (el) { io.observe(el); });
    setTimeout(function () { reveals.forEach(function (el) { el.classList.add("is-in"); }); }, 3000);
  } else {
    reveals.forEach(function (el) { el.classList.add("is-in"); });
  }

  // Case-study table of contents: highlight current section.
  var tocLinks = document.querySelectorAll(".cs-toc a");
  if (tocLinks.length && "IntersectionObserver" in window) {
    var map = {};
    tocLinks.forEach(function (a) { map[a.getAttribute("href").slice(1)] = a; });
    var tio = new IntersectionObserver(function (entries) {
      entries.forEach(function (en) {
        if (en.isIntersecting) {
          tocLinks.forEach(function (a) { a.classList.remove("is-current"); });
          var link = map[en.target.id];
          if (link) link.classList.add("is-current");
        }
      });
    }, { rootMargin: "-30% 0px -60% 0px" });
    Object.keys(map).forEach(function (id) { var el = document.getElementById(id); if (el) tio.observe(el); });
  }

  // Sticky story: swap the image as steps scroll past.
  document.querySelectorAll("[data-story]").forEach(function (story) {
    var imgs = story.querySelectorAll(".story-frame img");
    var steps = story.querySelectorAll(".story-step");
    if (!("IntersectionObserver" in window)) return;
    var sio = new IntersectionObserver(function (entries) {
      entries.forEach(function (en) {
        if (!en.isIntersecting) return;
        var i = Number(en.target.dataset.i);
        steps.forEach(function (s, j) { s.classList.toggle("is-active", i === j); });
        imgs.forEach(function (im, j) { im.classList.toggle("is-active", i === j); });
      });
    }, { rootMargin: "-45% 0px -45% 0px" });
    steps.forEach(function (s) { sio.observe(s); });
  });

  // Before/after compare slider (native range input = keyboard accessible).
  document.querySelectorAll(".compare").forEach(function (c) {
    var input = c.querySelector("input");
    if (!input) return;
    var set = function () { c.style.setProperty("--pos", input.value + "%"); };
    input.addEventListener("input", set);
    set();
  });

  // Category filters (projects, writing).
  document.querySelectorAll("[data-filter-group]").forEach(function (group) {
    var name = group.getAttribute("data-filter-group");
    var list = document.querySelector('[data-filter-list="' + name + '"]');
    if (!list) return;
    var items = list.querySelectorAll("[data-category]");
    var buttons = group.querySelectorAll("button");
    buttons.forEach(function (btn) {
      btn.addEventListener("click", function () {
        var v = btn.getAttribute("data-filter");
        buttons.forEach(function (b) { b.setAttribute("aria-pressed", String(b === btn)); });
        items.forEach(function (it) { it.hidden = !(v === "All" || it.getAttribute("data-category") === v); });
      });
    });
  });

  // Horizontal card scrollers: buttons, drag, keyboard, progress and focus dimming.
  document.querySelectorAll("[data-scroller]").forEach(function (root) {
    var track = root.querySelector(".scroller-track");
    var items = Array.prototype.slice.call(track.children);
    var prev = root.querySelector("[data-scroller-prev]");
    var next = root.querySelector("[data-scroller-next]");
    var idx = root.querySelector("[data-scroller-index]");
    var bar = root.querySelector("[data-scroller-bar]");
    var step = function () { return items[0] ? items[0].getBoundingClientRect().width + parseFloat(getComputedStyle(track).columnGap || 0) : track.clientWidth; };
    var go = function (dir) { track.scrollBy({ left: dir * step(), behavior: reduce ? "auto" : "smooth" }); };
    prev.addEventListener("click", function () { go(-1); });
    next.addEventListener("click", function () { go(1); });
    track.addEventListener("keydown", function (e) {
      if (e.key === "ArrowRight") { e.preventDefault(); go(1); }
      if (e.key === "ArrowLeft") { e.preventDefault(); go(-1); }
    });
    var sync = function () {
      var max = track.scrollWidth - track.clientWidth;
      var p = max > 0 ? track.scrollLeft / max : 1;
      prev.disabled = track.scrollLeft <= 2;
      next.disabled = track.scrollLeft >= max - 2;
      if (bar) bar.style.transform = "scaleX(" + Math.max(p, 1 / items.length) + ")";
      var trackLeft = track.getBoundingClientRect().left;
      var current = 0;
      items.forEach(function (it, i) {
        var off = it.getBoundingClientRect().left - trackLeft;
        if (off < step() / 2) current = i;
        it.classList.toggle("is-dim", off > track.clientWidth - step() / 3 || off < -step() / 2);
      });
      if (max > 0 && track.scrollLeft >= max - 2) current = items.length - 1;
      if (idx) idx.textContent = String(current + 1).padStart(2, "0");
    };
    track.addEventListener("scroll", function () { requestAnimationFrame(sync); }, { passive: true });
    window.addEventListener("resize", sync);
    sync();
    // Drag to scroll with a mouse (touch already scrolls natively).
    var startX = 0, startLeft = 0, moved = false, down = false;
    track.addEventListener("pointerdown", function (e) {
      if (e.pointerType !== "mouse") return;
      down = true; moved = false; startX = e.clientX; startLeft = track.scrollLeft;
    });
    window.addEventListener("pointermove", function (e) {
      if (!down) return;
      var dx = e.clientX - startX;
      if (Math.abs(dx) > 4) { moved = true; track.classList.add("is-dragging"); }
      if (moved) track.scrollLeft = startLeft - dx;
    });
    window.addEventListener("pointerup", function () {
      if (!down) return;
      down = false;
      if (moved) {
        track.classList.remove("is-dragging");
        var i = Math.round(track.scrollLeft / step());
        track.scrollTo({ left: i * step(), behavior: reduce ? "auto" : "smooth" });
      }
    });
    // Spotlight follows the pointer inside each card.
    root.querySelectorAll(".card--situation").forEach(function (card) {
      card.addEventListener("pointermove", function (e) {
        var r = card.getBoundingClientRect();
        card.style.setProperty("--mx", (e.clientX - r.left) + "px");
        card.style.setProperty("--my", (e.clientY - r.top) + "px");
      });
    });
  });

  // Typing effect on CTA headings, started when the heading scrolls into view.
  document.querySelectorAll("[data-type]").forEach(function (h) {
    var ghost = h.querySelector(".type-ghost");
    var live = h.querySelector(".type-live");
    if (!ghost || !live || reduce || !("IntersectionObserver" in window)) return;
    var text = ghost.textContent;
    var tio = new IntersectionObserver(function (entries) {
      if (!entries[0].isIntersecting) return;
      tio.disconnect();
      h.classList.add("is-typing");
      var i = 0;
      var tick = function () {
        i += 1;
        live.textContent = text.slice(0, i);
        if (i < text.length) setTimeout(tick, text.charAt(i - 1) === "," ? 180 : 28);
        else { h.classList.remove("is-typing"); h.classList.add("is-typed"); }
      };
      setTimeout(tick, 250);
    }, { threshold: 0.6 });
    tio.observe(h);
  });

  // Header shadow once the page has scrolled.
  var header = document.querySelector(".site-header");
  if (header) {
    var onScroll = function () { header.classList.toggle("is-scrolled", window.scrollY > 8); };
    window.addEventListener("scroll", onScroll, { passive: true });
    onScroll();
  }

  // Stagger siblings that reveal together, and number list items for timed ticks.
  document.querySelectorAll(".grid-2, .grid-3, .grid-4, .work-list, .outcomes").forEach(function (g) {
    Array.prototype.forEach.call(g.children, function (c, i) { c.style.setProperty("--stagger", i % 6); });
  });
  document.querySelectorAll(".checklist--quiet").forEach(function (ul) {
    Array.prototype.forEach.call(ul.children, function (li, i) { li.style.setProperty("--i", i); });
  });

  // Pointer glow inside cards.
  var fine = window.matchMedia("(hover: hover) and (pointer: fine)").matches;
  if (fine) {
    document.querySelectorAll(".card").forEach(function (card) {
      card.addEventListener("pointermove", function (e) {
        var r = card.getBoundingClientRect();
        card.style.setProperty("--mx", (e.clientX - r.left) + "px");
        card.style.setProperty("--my", (e.clientY - r.top) + "px");
      });
    });
  }

  // Primary buttons lean slightly toward the pointer.
  if (fine && !reduce) {
    document.querySelectorAll(".btn--primary, .btn--accent").forEach(function (btn) {
      btn.addEventListener("pointermove", function (e) {
        var r = btn.getBoundingClientRect();
        var x = (e.clientX - r.left - r.width / 2) / r.width;
        var y = (e.clientY - r.top - r.height / 2) / r.height;
        btn.style.transform = "translate(" + (x * 6).toFixed(1) + "px," + (y * 5 - 1).toFixed(1) + "px)";
      });
      btn.addEventListener("pointerleave", function () { btn.style.transform = ""; });
    });
  }

  // Numbers count up the first time they are seen.
  if ("IntersectionObserver" in window && !reduce) {
    var cio = new IntersectionObserver(function (entries) {
      entries.forEach(function (en) {
        if (!en.isIntersecting) return;
        cio.unobserve(en.target);
        var el = en.target, full = el.textContent, m = full.match(/^([\d,]+)(.*)$/);
        if (!m) return;
        var target = parseInt(m[1].replace(/,/g, ""), 10), suffix = m[2], t0 = performance.now(), dur = 1100;
        if (!(target > 1)) return;
        var step = function (now) {
          var p = Math.min((now - t0) / dur, 1), e = 1 - Math.pow(1 - p, 4);
          el.textContent = Math.round(target * e).toLocaleString("en-US") + suffix;
          if (p < 1) requestAnimationFrame(step); else el.textContent = full;
        };
        requestAnimationFrame(step);
      });
    }, { threshold: 0.6 });
    document.querySelectorAll(".metric-num").forEach(function (el) { cio.observe(el); });
    var bio = new IntersectionObserver(function (entries) {
      entries.forEach(function (en) { if (en.isIntersecting) { en.target.classList.add("is-seen"); bio.unobserve(en.target); } });
    }, { threshold: 0.3 });
    document.querySelectorAll(".chart").forEach(function (el) { bio.observe(el); });
  } else {
    document.querySelectorAll(".chart").forEach(function (el) { el.classList.add("is-seen"); });
  }

  // Token panel: switch collections.
  document.querySelectorAll("[data-tp]").forEach(function (tp) {
    var tabs = tp.querySelectorAll("[data-tp-tab]"), panels = tp.querySelectorAll("[data-tp-panel]");
    tabs.forEach(function (tab) {
      tab.addEventListener("click", function () {
        var i = tab.getAttribute("data-tp-tab");
        tabs.forEach(function (t) { t.setAttribute("aria-selected", String(t === tab)); });
        panels.forEach(function (p) {
          var on = p.getAttribute("data-tp-panel") === i;
          p.hidden = !on;
          p.classList.remove("is-switching");
          if (on) { void p.offsetWidth; p.classList.add("is-switching"); p.parentNode.scrollTop = 0; }
        });
      });
    });
  });

  // Angled component sheet: cards drop in, and the sheet tilts with the pointer.
  document.querySelectorAll("[data-iso]").forEach(function (iso) {
    iso.querySelectorAll(".iso-card").forEach(function (c, i) { c.style.setProperty("--n", i); });
    if (!fine || reduce) return;
    iso.addEventListener("pointermove", function (e) {
      var r = iso.getBoundingClientRect();
      var x = (e.clientX - r.left) / r.width - 0.5, y = (e.clientY - r.top) / r.height - 0.5;
      iso.style.setProperty("--rx", (56 - y * 8).toFixed(2) + "deg");
      iso.style.setProperty("--rz", (-34 + x * 8).toFixed(2) + "deg");
    });
    iso.addEventListener("pointerleave", function () { iso.style.removeProperty("--rx"); iso.style.removeProperty("--rz"); });
  });

  // Footer: a grid of particles. A radial wave travels out from the pointer and bends
  // the grid; a click sends a single ring. Runs only while the footer is on screen.
  document.querySelectorAll("[data-particles]").forEach(function (host) {
    var canvas = host.querySelector("canvas");
    if (!canvas || !canvas.getContext) return;
    var ctx = canvas.getContext("2d");
    var GAP = 26, dots = [], W = 0, H = 0, dpr = 1;
    var mouse = { x: -9999, y: -9999, tx: -9999, ty: -9999, on: 0 };
    var rings = [], raf = 0, visible = false, t0 = performance.now();

    var build = function () {
      var r = host.getBoundingClientRect();
      W = Math.max(1, r.width); H = Math.max(1, r.height);
      dpr = Math.min(window.devicePixelRatio || 1, 2);
      canvas.width = Math.round(W * dpr); canvas.height = Math.round(H * dpr);
      ctx.setTransform(dpr, 0, 0, dpr, 0, 0);
      dots = [];
      var cols = Math.ceil(W / GAP) + 1, rows = Math.ceil(H / GAP) + 1;
      var ox = (W - (cols - 1) * GAP) / 2, oy = (H - (rows - 1) * GAP) / 2;
      for (var j = 0; j < rows; j++) for (var i = 0; i < cols; i++) dots.push(ox + i * GAP, oy + j * GAP);
    };

    var draw = function (now) {
      var t = (now - t0) / 1000;
      mouse.x += (mouse.tx - mouse.x) * 0.14; mouse.y += (mouse.ty - mouse.y) * 0.14;
      ctx.clearRect(0, 0, W, H);
      // With no pointer, a slow wave drifts across so the grid is never dead.
      var cx = mouse.on ? mouse.x : W * (0.5 + 0.38 * Math.sin(t * 0.21));
      var cy = mouse.on ? mouse.y : H * (0.5 + 0.3 * Math.cos(t * 0.17));
      var amp = mouse.on ? 13 : 6, reach = mouse.on ? 300 : 380;
      for (var k = 0; k < dots.length; k += 2) {
        var x = dots[k], y = dots[k + 1];
        var dx = x - cx, dy = y - cy, d = Math.sqrt(dx * dx + dy * dy) || 1;
        var fall = Math.exp(-d / reach);
        var wave = Math.sin(d * 0.05 - t * 3.2) * amp * fall;
        var push = mouse.on ? 26 * Math.exp(-(d * d) / 9000) : 0;
        var off = wave + push, glow = fall * (0.5 + 0.5 * Math.sin(d * 0.05 - t * 3.2));
        for (var q = 0; q < rings.length; q++) {
          var rg = rings[q], rdx = x - rg.x, rdy = y - rg.y, rd = Math.sqrt(rdx * rdx + rdy * rdy) || 1;
          var age = t - rg.t, band = Math.exp(-Math.pow((rd - age * 520) / 46, 2)) * Math.max(0, 1 - age / 1.6);
          x += (rdx / rd) * band * 22; y += (rdy / rd) * band * 22; glow += band;
        }
        x += (dx / d) * off; y += (dy / d) * off;
        var g = Math.min(1, glow);
        var size = 1.15 + g * 1.9;
        ctx.fillStyle = g > 0.42 ? "rgba(255,154,98," + (0.35 + g * 0.6).toFixed(3) + ")" : "rgba(244,244,241," + (0.26 + g * 0.5).toFixed(3) + ")";
        ctx.beginPath(); ctx.arc(x, y, size, 0, 6.2832); ctx.fill();
      }
      rings = rings.filter(function (r) { return t - r.t < 1.6; });
      raf = visible ? requestAnimationFrame(draw) : 0;
    };

    var still = function () {
      ctx.clearRect(0, 0, W, H); ctx.fillStyle = "rgba(244,244,241,.26)";
      for (var k = 0; k < dots.length; k += 2) { ctx.beginPath(); ctx.arc(dots[k], dots[k + 1], 1, 0, 6.2832); ctx.fill(); }
    };

    build();
    if (reduce) { still(); window.addEventListener("resize", function () { build(); still(); }); return; }
    host.addEventListener("pointermove", function (e) {
      var r = host.getBoundingClientRect();
      mouse.tx = e.clientX - r.left; mouse.ty = e.clientY - r.top;
      if (!mouse.on) { mouse.x = mouse.tx; mouse.y = mouse.ty; mouse.on = 1; }
    });
    host.addEventListener("pointerleave", function () { mouse.on = 0; });
    host.addEventListener("pointerdown", function (e) {
      var r = host.getBoundingClientRect();
      rings.push({ x: e.clientX - r.left, y: e.clientY - r.top, t: (performance.now() - t0) / 1000 });
      if (rings.length > 4) rings.shift();
    });
    if ("ResizeObserver" in window) new ResizeObserver(build).observe(host); else window.addEventListener("resize", build);
    if ("IntersectionObserver" in window) {
      new IntersectionObserver(function (entries) {
        visible = entries[0].isIntersecting;
        if (visible && !raf) raf = requestAnimationFrame(draw);
      }).observe(host);
    } else { visible = true; raf = requestAnimationFrame(draw); }
  });

  // Blog: highlight the current heading in the post's contents.
  var postToc = document.querySelectorAll(".post-toc a");
  if (postToc.length && "IntersectionObserver" in window) {
    var pmap = {};
    postToc.forEach(function (l) { pmap[l.getAttribute("href").slice(1)] = l; });
    var pio = new IntersectionObserver(function (entries) {
      entries.forEach(function (en) {
        if (!en.isIntersecting) return;
        postToc.forEach(function (l) { l.classList.remove("is-current"); });
        if (pmap[en.target.id]) pmap[en.target.id].classList.add("is-current");
      });
    }, { rootMargin: "-20% 0px -70% 0px" });
    Object.keys(pmap).forEach(function (id) { var el = document.getElementById(id); if (el) pio.observe(el); });
  }

  // Reactions: odometer counts, gauge needles, and a shared count when the site has storage.
  document.querySelectorAll("[data-react]").forEach(function (box) {
    var post = box.getAttribute("data-react");
    var btns = Array.prototype.slice.call(box.querySelectorAll(".react-btn"));
    var note = box.querySelector("[data-react-note]");
    var key = "react:" + post, mineKey = "react-mine:" + post;
    var store = { get: function (k, d) { try { var v = localStorage.getItem(k); return v ? JSON.parse(v) : d; } catch (e) { return d; } },
                  set: function (k, v) { try { localStorage.setItem(k, JSON.stringify(v)); } catch (e) {} } };
    var counts = {}, mine = store.get(mineKey, {}), shared = false;
    btns.forEach(function (b) { counts[b.getAttribute("data-react-id")] = 0; });

    // Build enough digit columns for a number and roll each to its digit.
    var setOdo = function (odo, n) {
      var digits = String(Math.max(0, n)).split("");
      var cols = odo.querySelectorAll(".odo-col");
      while (cols.length < digits.length) {
        var c = cols[0].cloneNode(true);
        c.querySelector(".odo-strip").style.setProperty("--d", 0);
        odo.insertBefore(c, odo.firstChild);
        cols = odo.querySelectorAll(".odo-col");
      }
      while (cols.length > digits.length) { odo.removeChild(cols[0]); cols = odo.querySelectorAll(".odo-col"); }
      requestAnimationFrame(function () {
        cols.forEach(function (c, i) { c.querySelector(".odo-strip").style.setProperty("--d", digits[i]); });
      });
    };

    var render = function () {
      var max = 0;
      Object.keys(counts).forEach(function (k) { max = Math.max(max, counts[k]); });
      btns.forEach(function (b) {
        var id = b.getAttribute("data-react-id"), n = counts[id] || 0;
        setOdo(b.querySelector("[data-odo]"), n);
        b.querySelector("[data-react-sr]").textContent = n;
        b.setAttribute("aria-label", b.querySelector(".react-label").textContent + ", " + n + (n === 1 ? " reaction" : " reactions"));
        b.setAttribute("aria-pressed", String(!!mine[id]));
        b.style.setProperty("--share", max ? (n / max).toFixed(3) : 0);
      });
    };

    var burst = function (b) {
      if (reduce) return;
      var colors = ["#ff9a62", "#1b36ff", "#c2410c", "#93a2ff", "#1f6b3f"];
      for (var i = 0; i < 10; i++) {
        var p = document.createElement("span");
        p.className = "react-burst";
        var ang = (i / 10) * Math.PI * 2, dist = 30 + Math.random() * 18;
        p.style.setProperty("--bx", Math.cos(ang) * dist + "px");
        p.style.setProperty("--by", Math.sin(ang) * dist + "px");
        p.style.background = colors[i % colors.length];
        b.appendChild(p);
        setTimeout(function (el) { return function () { el.remove(); }; }(p), 750);
      }
    };

    // Start from this browser's saved counts; replace with shared counts if the API answers.
    var local = store.get(key, null);
    if (local) Object.keys(counts).forEach(function (k) { counts[k] = local[k] || 0; });
    render();
    fetch("/api/reactions?post=" + encodeURIComponent(post), { headers: { Accept: "application/json" } })
      .then(function (r) { if (!r.ok) throw 0; return r.json(); })
      .then(function (d) { shared = true; counts = d.counts; render(); })
      .catch(function () { if (note) note.hidden = false; });

    btns.forEach(function (b) {
      b.addEventListener("click", function () {
        var id = b.getAttribute("data-react-id"), on = !mine[id], delta = on ? 1 : -1;
        mine[id] = on; store.set(mineKey, mine);
        counts[id] = Math.max(0, (counts[id] || 0) + delta);
        if (!shared) store.set(key, counts);
        b.classList.remove("is-pop"); void b.offsetWidth;
        if (on) { b.classList.add("is-pop"); burst(b); }
        render();
        if (shared) {
          fetch("/api/reactions", { method: "POST", headers: { "Content-Type": "application/json" }, body: JSON.stringify({ post: post, id: id, delta: delta }) })
            .then(function (r) { return r.ok ? r.json() : null; })
            .then(function (d) { if (d && d.counts) { counts = d.counts; render(); } })
            .catch(function () {});
        }
      });
    });
  });

  // Design-system token demo.
  var themes = {
    light: { "--d-bg": "#f6f6f2", "--d-surface": "#ffffff", "--d-ink": "#111111", "--d-muted": "#5c5c63", "--d-line": "#e3e3dc", "--d-accent": "#1b36ff", "--d-accent-ink": "#ffffff" },
    dark: { "--d-bg": "#0f1014", "--d-surface": "#181a20", "--d-ink": "#f1f1ee", "--d-muted": "#a9a9b3", "--d-line": "#2c2e36", "--d-accent": "#93a2ff", "--d-accent-ink": "#0b0b0c" },
    partner: { "--d-bg": "#f3f7f4", "--d-surface": "#ffffff", "--d-ink": "#10261b", "--d-muted": "#4a5e53", "--d-line": "#d7e3db", "--d-accent": "#0f7a4a", "--d-accent-ink": "#ffffff" },
  };
  document.querySelectorAll("[data-demo]").forEach(function (demo) {
    var stage = demo.querySelector(".demo-stage");
    var code = demo.querySelector("[data-demo-code]");
    var state = { theme: "light", radius: "12", density: "20" };
    var render = function () {
      var t = themes[state.theme];
      Object.keys(t).forEach(function (k) { stage.style.setProperty(k, t[k]); });
      stage.style.setProperty("--d-radius", state.radius + "px");
      stage.style.setProperty("--d-pad", state.density + "px");
      if (code) {
        code.textContent = "/* " + state.theme + " theme */\n" +
          Object.keys(t).map(function (k) { return k.replace("--d-", "--") + ": " + t[k] + ";"; }).join("\n") +
          "\n--radius: " + state.radius + "px;\n--space-inset: " + state.density + "px;";
      }
    };
    demo.querySelectorAll(".seg").forEach(function (seg) {
      var key = seg.getAttribute("data-group");
      seg.querySelectorAll("button").forEach(function (b) {
        b.addEventListener("click", function () {
          state[key] = b.getAttribute("data-v");
          seg.querySelectorAll("button").forEach(function (x) { x.setAttribute("aria-pressed", String(x === b)); });
          render();
        });
      });
    });
    render();
  });
})();
