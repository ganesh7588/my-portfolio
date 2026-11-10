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
