/* ════════════════════════════════════════════════════════════════
   SHARED HEADER & FOOTER — edit ONCE here, changes on EVERY page.
   The header goes where a page has <div id="site-header"></div>,
   the footer where it has <div id="site-footer"></div>.
   ════════════════════════════════════════════════════════════════ */

/* ---------------- EDIT THESE FIRST: the common details ----------------
   A line whose value is still a [placeholder], "#" or empty is simply
   left out of the footer until you fill it in.                           */
const SITE = {
  groupName: "Rongchao Jin Research Group",
  subtitle:  "Department of Chemistry · Penn State University",
  email:     "rbj5326@psu.edu",
  phone:     "[Phone number]",                    // shows in footer once filled in
  office:    "408, Benkovic Building",
  addr1:     "Department of Chemistry",
  addr2:     "Penn State University",
  addr3:     "University Park, PA, USA",
  scholar:   "https://scholar.google.com/citations?user=vveoESoAAAAJ&hl=en",
  orcid:     "https://orcid.org/0000-0002-2525-8345",
  twitter:   "#",                                  // put full URL or leave "#"
  recruitHeading: "Interested in our group? Send us an email!"
};

/* ---------------- HEADER (menu) ----------------
   To add a page to the menu, copy one <li>…</li> line and change its
   href and label. The two "dropdown" items are the folders.              */
const HEADER_HTML = `
<a class="skip-link" href="#main">Skip to content</a>
<header class="site">
  <div class="navbar">
    <a class="brand" href="index.html">
      <img src="images/homeicon2.png" alt="" width="42" height="42">
      <span class="brand-text">
        <span class="brand-name">${SITE.groupName}</span>
        <span class="brand-sub">${SITE.subtitle}</span>
      </span>
    </a>
    <button class="nav-toggle" aria-label="Menu" aria-expanded="false" aria-controls="site-nav"><span></span><span></span><span></span></button>
    <nav class="main" id="site-nav" aria-label="Main menu">
      <ul>
        <li><a href="about.html" style="font-size: 24px;">About RJ</a></li>
        <li class="dropdown"><a href="current-members.html" style="font-size: 18px;">Group Members</a>
          <ul>
            <li><a href="current-members.html">Current Members</a></li>
            <li><a href="alumni.html">Alumni</a></li>
            <li><a href="group-photos.html">Group Photos</a></li>
          </ul>
        </li>
        <li class="dropdown"><a href="research-approach.html" style="font-size: 18px;">Research</a>
          <ul>
            <li><a href="research-approach.html">Research Approach</a></li>
            <li><a href="instruments.html">Instruments</a></li>
            <li><a href="funding.html">Funding</a></li>
          </ul>
        </li>
        <li><a href="publications.html" style="font-size: 18px;">Publications</a></li>
        <li><a href="news.html" style="font-size: 18px;">News</a></li>
        <li><a href="links.html" style="font-size: 18px;">Links</a></li>
      </ul>
    </nav>
  </div>
</header>`;

/* ---------------- FOOTER (recruiting band + addresses) ---------------- */
const filled = v => !!v && v !== "#" && !String(v).trim().startsWith("[");

const CONTACT_LINES = [
  filled(SITE.email)  ? `Email: <a href="mailto:${SITE.email}">${SITE.email}</a>` : "",
  filled(SITE.phone)  ? `Telephone: ${SITE.phone}` : "",
  filled(SITE.office) ? `Office: ${SITE.office}` : ""
].filter(Boolean).join("<br>");

const ELSEWHERE_LINKS = [
  filled(SITE.scholar) ? `<a href="${SITE.scholar}">Google Scholar</a>` : "",
  filled(SITE.orcid)   ? `<a href="${SITE.orcid}">ORCID</a>` : "",
  filled(SITE.twitter) ? `<a href="${SITE.twitter}">X / Twitter</a>` : ""
].filter(Boolean).join("<br>");

const FOOTER_HTML = `
<section class="recruit">
  <div class="wrap">
    <h2>${SITE.recruitHeading}</h2>
    <p><a href="mailto:${SITE.email}">${SITE.email}</a></p>
  </div>
</section>
<footer class="site">
  <div class="wrap footer-grid">
    <div>
      <h4 class="footer-name">${SITE.groupName}</h4>
      ${SITE.addr1}<br>
      ${SITE.addr2}<br>
      ${SITE.addr3}
    </div>
    <div>
      <h4>Contact</h4>
      ${CONTACT_LINES}
    </div>
    <div>
      <h4>Elsewhere</h4>
      ${ELSEWHERE_LINKS}
    </div>
  </div>
  <div class="wrap"><div class="footnote">© ${new Date().getFullYear()} ${SITE.groupName}</div></div>
</footer>`;


/* ════════════════════════════════════════════════════════════════
   NO NEED TO EDIT BELOW THIS LINE
   Everything from here down is machinery: it puts the header and
   footer on the page and runs the menu, the homepage picture reel,
   click-to-enlarge, the publication search, and the scroll effect.
   ════════════════════════════════════════════════════════════════ */
(function () {
  "use strict";
  const $ = (sel, root) => (root || document).querySelector(sel);
  const $$ = (sel, root) => Array.from((root || document).querySelectorAll(sel));
  const reduceMotion = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
  document.documentElement.classList.add("js");

  /* ---- header + footer ---- */
  const headerSlot = document.getElementById("site-header");
  const footerSlot = document.getElementById("site-footer");
  if (headerSlot) headerSlot.innerHTML = HEADER_HTML;
  if (footerSlot) footerSlot.innerHTML = FOOTER_HTML;
  if (headerSlot && headerSlot.nextElementSibling && !document.getElementById("main")) {
    headerSlot.nextElementSibling.id = headerSlot.nextElementSibling.id || "main";
    $(".skip-link").setAttribute("href", "#" + headerSlot.nextElementSibling.id);
  }

  /* ---- highlight the current page in the menu ---- */
  const pageKey = s => (s || "").split("#")[0].split("?")[0].split("/").pop().replace(/\.html$/, "") || "index";
  const here = pageKey(location.pathname);
  $$("#site-header nav a").forEach(a => {
    if (pageKey(a.getAttribute("href")) !== here) return;
    a.setAttribute("aria-current", "page");
    const folder = a.closest("li.dropdown");
    if (folder) folder.classList.add("is-active");
  });

  /* ---- phone menu ---- */
  const toggle = $(".nav-toggle"), nav = $("nav.main");
  if (toggle && nav) {
    const setOpen = open => { nav.classList.toggle("open", open); toggle.setAttribute("aria-expanded", String(open)); };
    toggle.addEventListener("click", () => setOpen(!nav.classList.contains("open")));
    document.addEventListener("keydown", e => { if (e.key === "Escape") setOpen(false); });
    document.addEventListener("click", e => { if (!e.target.closest("#site-header")) setOpen(false); });
  }

  /* ---- tablets in landscape have no mouse to hover with: first tap opens a folder, second tap follows it ---- */
  const folders = $$("nav.main li.dropdown");
  folders.forEach(li => {
    li.firstElementChild.addEventListener("click", e => {
      const touchOnly = window.matchMedia("(hover: none)").matches;
      const phoneMenu = window.matchMedia("(max-width: 1000px)").matches;
      if (!touchOnly || phoneMenu || li.classList.contains("open")) return;
      e.preventDefault();
      folders.forEach(other => other.classList.remove("open"));
      li.classList.add("open");
    });
  });
  document.addEventListener("click", e => {
    if (!e.target.closest("nav.main li.dropdown")) folders.forEach(li => li.classList.remove("open"));
  });

  /* ---- member e-mail addresses become clickable ---- */
  $$(".person .email").forEach(p => {
    const text = p.textContent.trim();
    if (p.querySelector("a") || !/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(text)) return;
    const a = document.createElement("a");
    a.href = "mailto:" + text; a.textContent = text;
    p.textContent = ""; p.appendChild(a);
  });

  /* ---- contact form: until a Formspree ID is set, "Send" opens the visitor's mail app ---- */
  const form = $(".contact-form");
  if (form && /YOUR_FORM_ID/.test(form.getAttribute("action") || "")) {
    form.addEventListener("submit", e => {
      e.preventDefault();
      const v = n => (form.elements[n] ? form.elements[n].value.trim() : "");
      const subject = "Message from " + (v("name") || "the group website");
      const body = v("message") + "\n\n" + v("name") + (v("email") ? "\n" + v("email") : "");
      location.href = "mailto:" + SITE.email + "?subject=" + encodeURIComponent(subject) + "&body=" + encodeURIComponent(body);
    });
  }

  /* ---- homepage picture reel ---- */
  const reel = document.getElementById("banner-car");
  let reelDragged = false;
  if (reel) {
    const prev = $(".car-prev"), next = $(".car-next");
    const maxScroll = () => Math.max(0, reel.scrollWidth - reel.clientWidth);
    const stops = () => {
      const slides = $$(".slide", reel);
      const base = slides.length ? slides[0].offsetLeft : 0;
      return slides.map(s => Math.min(s.offsetLeft - base, maxScroll()));
    };
    const go = dir => {
      const cur = reel.scrollLeft, list = stops();
      let target;
      if (dir > 0) {
        target = list.find(x => x > cur + 8);
        if (target === undefined) target = 0;                      // past the last picture: back to the first
      } else {
        const before = list.filter(x => x < cur - 8);
        target = before.length ? before[before.length - 1] : 0;
      }
      reel.scrollTo({ left: target, behavior: reduceMotion ? "auto" : "smooth" });
    };
    const sync = () => { if (prev) prev.disabled = reel.scrollLeft < 8; };
    let auto = !reduceMotion, hovering = false;
    const stopAuto = () => { auto = false; };
    if (prev) prev.addEventListener("click", () => { stopAuto(); go(-1); });
    if (next) next.addEventListener("click", () => { stopAuto(); go(1); });
    reel.addEventListener("scroll", sync, { passive: true });
    reel.addEventListener("wheel", stopAuto, { passive: true });
    reel.addEventListener("touchstart", stopAuto, { passive: true });
    reel.addEventListener("keydown", stopAuto);
    const wrap = reel.closest(".carousel-wrap") || reel;
    wrap.addEventListener("mouseenter", () => { hovering = true; });
    wrap.addEventListener("mouseleave", () => { hovering = false; });
    setInterval(() => { if (auto && !hovering && !document.hidden && maxScroll() > 8) go(1); }, 6000);

    /* drag with the mouse */
    let down = false, startX = 0, startLeft = 0;
    reel.addEventListener("pointerdown", e => {
      if (e.pointerType !== "mouse" || e.button !== 0) return;
      down = true; reelDragged = false; startX = e.clientX; startLeft = reel.scrollLeft;
    });
    window.addEventListener("pointermove", e => {
      if (!down) return;
      const dx = e.clientX - startX;
      if (!reelDragged && Math.abs(dx) > 5) { reelDragged = true; stopAuto(); reel.classList.add("dragging"); }
      if (reelDragged) reel.scrollLeft = startLeft - dx;
    });
    window.addEventListener("pointerup", () => {
      if (!down) return;
      down = false; reel.classList.remove("dragging");
      setTimeout(() => { reelDragged = false; }, 0);
    });
    reel.addEventListener("dragstart", e => e.preventDefault());
    sync();
  }

  /* ---- click a figure or photo to see it large ---- */
  if (window.HTMLDialogElement) {
    let box = null;
    const open = img => {
      if (!box) {
        box = document.createElement("dialog");
        box.className = "lightbox";
        box.innerHTML = '<button class="lb-close" aria-label="Close">×</button><figure><img alt=""><figcaption></figcaption></figure>';
        document.body.appendChild(box);
        box.addEventListener("click", e => { if (e.target.tagName !== "IMG") box.close(); });
      }
      const big = $("img", box);
      big.src = img.currentSrc || img.src;
      big.alt = img.alt || "";
      $("figcaption", box).textContent = img.alt || "";
      box.showModal();
    };
    $$(".research-section img, .gp img, .carousel .slide img, .inst img").forEach(img => {
      img.classList.add("zoomable");
      img.tabIndex = 0;
      img.setAttribute("role", "button");
      img.setAttribute("aria-label", "Enlarge image" + (img.alt ? ": " + img.alt : ""));
      img.addEventListener("click", () => { if (!reelDragged) open(img); });
      img.addEventListener("keydown", e => { if (e.key === "Enter" || e.key === " ") { e.preventDefault(); open(img); } });
    });
  }

  /* ---- publications: search box + jump-to-year buttons ---- */
  const pubs = document.getElementById("manual-pubs");
  if (pubs) {
    const items = $$("li.pub", pubs).map(li => ({ li, text: li.textContent.toLowerCase() }));
    const years = $$(".year-divider", pubs);
    years.forEach(y => { if (!y.id) y.id = "y" + y.textContent.trim().replace(/\W+/g, ""); });
    const tools = document.createElement("div");
    tools.className = "pub-tools";
    tools.innerHTML =
      '<label class="sr-only" for="pub-q">Search publications</label>' +
      '<input id="pub-q" type="search" autocomplete="off" placeholder="Search ' + items.length + ' publications by title, author or journal">' +
      '<p class="pub-count" aria-live="polite"></p>' +
      '<nav class="year-nav" aria-label="Jump to a year">' +
      years.map(y => '<a href="#' + y.id + '">' + y.textContent.trim() + "</a>").join("") + "</nav>";
    pubs.prepend(tools);
    const input = $("#pub-q", tools), count = $(".pub-count", tools), yearNav = $(".year-nav", tools);
    input.addEventListener("input", () => {
      const terms = input.value.toLowerCase().split(/\s+/).filter(Boolean);
      let shown = 0;
      items.forEach(it => {
        const hit = terms.every(t => it.text.includes(t));
        it.li.hidden = !hit;
        if (hit) shown++;
      });
      years.forEach(y => {
        const list = y.nextElementSibling;
        const any = !!(list && list.querySelector("li.pub:not([hidden])"));
        y.hidden = !any;
        if (list) list.hidden = !any;
      });
      yearNav.hidden = terms.length > 0;
      count.textContent = terms.length ? shown + " of " + items.length + " publications match" : "";
    });
  }

  /* ---- pictures ease in and grow to full size as you scroll to them ---- */
  if (!reduceMotion && "IntersectionObserver" in window) {
    const watcher = new IntersectionObserver(entries => {
      entries.forEach(en => {
        if (!en.isIntersecting) return;
        en.target.classList.add("in");
        watcher.unobserve(en.target);
      });
    }, { rootMargin: "0px 0px -6% 0px", threshold: 0.05 });
    $$(".person, .pi-card .avatar, .pubpic, .cards.two .card, .inst, .gp, .research-section img, .logo-showcase img, .scrollgrow").forEach(el => {
      const siblings = el.parentElement ? Array.from(el.parentElement.children) : [];
      el.style.setProperty("--i", String(Math.max(0, siblings.indexOf(el)) % 4));
      el.classList.add("reveal");
      watcher.observe(el);
    });
  }
})();
