/*
 * SOUKAINA'S PORTFOLIO — vanilla JavaScript, no build tools required.
 * 1. Add your real email and profile URLs to CONTACT below.
 * 2. Edit your education, skills, experience, and project text in index.html.
 * 3. Replace assets/businesswoman.webp to change your photo.
 * The concept projects below are working demos, not claims about past work.
 */
"use strict";

const CONTACT = {
  email: "", // e.g. your verified professional email
  github: "", // e.g. https://github.com/YOUR_USERNAME
  linkedin: "", // e.g. https://www.linkedin.com/in/YOUR_USERNAME/
  instagram: "", // e.g. https://www.instagram.com/YOUR_USERNAME/
  codepen: "", // e.g. https://codepen.io/YOUR_USERNAME
};

const select = (selector, parent = document) => parent.querySelector(selector);
const selectAll = (selector, parent = document) => [
  ...parent.querySelectorAll(selector),
];
const reducedMotion = window.matchMedia(
  "(prefers-reduced-motion: reduce)",
).matches;

// Mobile navigation, keyboard support, and active section indication.
const menuToggle = select(".menu-toggle");
const navLinks = select("#nav-links");
const header = select(".site-header");

function closeMenu() {
  navLinks.classList.remove("open");
  menuToggle.setAttribute("aria-expanded", "false");
  menuToggle.setAttribute("aria-label", "Open navigation");
}

menuToggle.addEventListener("click", () => {
  const open = menuToggle.getAttribute("aria-expanded") !== "true";
  navLinks.classList.toggle("open", open);
  menuToggle.setAttribute("aria-expanded", String(open));
  menuToggle.setAttribute(
    "aria-label",
    open ? "Close navigation" : "Open navigation",
  );
});
selectAll("a", navLinks).forEach((link) =>
  link.addEventListener("click", closeMenu),
);
document.addEventListener("click", (event) => {
  if (!header.contains(event.target)) closeMenu();
});
document.addEventListener("keydown", (event) => {
  if (event.key === "Escape" && navLinks.classList.contains("open")) {
    closeMenu();
    menuToggle.focus();
  }
});
window.matchMedia("(min-width: 641px)").addEventListener("change", (event) => {
  if (event.matches) closeMenu();
});

const updateHeader = () =>
  header.classList.toggle("scrolled", window.scrollY > 15);
window.addEventListener("scroll", updateHeader, { passive: true });
updateHeader();
select("#year").textContent = new Date().getFullYear();

if ("IntersectionObserver" in window) {
  const activeObserver = new IntersectionObserver(
    (entries) => {
      entries.forEach((entry) => {
        if (!entry.isIntersecting) return;
        selectAll(".nav-links a").forEach((link) => {
          const active = link.getAttribute("href") === `#${entry.target.id}`;
          link.classList.toggle("active", active);
          if (active) link.setAttribute("aria-current", "location");
          else link.removeAttribute("aria-current");
        });
      });
    },
    { rootMargin: "-18% 0px -50% 0px", threshold: 0 },
  );
  selectAll("main section[id]").forEach((section) =>
    activeObserver.observe(section),
  );

  if (!reducedMotion) {
    const revealObserver = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            entry.target.classList.add("is-visible");
            entry.target.classList.remove("will-reveal");
            revealObserver.unobserve(entry.target);
          }
        });
      },
      { threshold: 0.08 },
    );
    document.documentElement.classList.add("motion-ready");
    selectAll(".reveal").forEach((element) => {
      // Only animate content below the viewport; never hide the first screen.
      if (element.getBoundingClientRect().top > window.innerHeight) {
        element.classList.add("will-reveal");
        revealObserver.observe(element);
      }
    });
  }
}

// Filter the concept projects without shifting keyboard focus.
selectAll("[data-filter]").forEach((button) => {
  button.addEventListener("click", () => {
    const filter = button.dataset.filter;
    selectAll("[data-filter]").forEach((item) => {
      const selected = item === button;
      item.classList.toggle("active", selected);
      item.setAttribute("aria-pressed", String(selected));
    });
    selectAll(".project-card").forEach((card) => {
      card.hidden = filter !== "all" && card.dataset.category !== filter;
    });
  });
});

// A small accessible feedback message.
let toastTimeout;
function notify(message) {
  const toast = select("#toast");
  window.clearTimeout(toastTimeout);
  toast.textContent = message;
  toast.classList.add("show");
  toastTimeout = window.setTimeout(() => toast.classList.remove("show"), 3200);
}

// A single native dialog keeps focus inside every interactive preview.
const dialog = select("#project-dialog");
const dialogContent = select("#dialog-content");
let lastDialogTrigger = null;

function openDialog(markup, trigger) {
  lastDialogTrigger = trigger || document.activeElement;
  dialogContent.innerHTML = markup;
  dialog.showModal();
  document.body.classList.add("modal-open");
}

select(".dialog-close").addEventListener("click", () => dialog.close());
dialog.addEventListener("click", (event) => {
  // The dialog border/padding belongs to the dialog, not the backdrop.
  if (event.target !== dialog) return;
  const box = dialog.getBoundingClientRect();
  if (
    event.clientX < box.left ||
    event.clientX > box.right ||
    event.clientY < box.top ||
    event.clientY > box.bottom
  )
    dialog.close();
});
dialog.addEventListener("close", () => {
  document.body.classList.remove("modal-open");
  if (lastDialogTrigger?.isConnected) lastDialogTrigger.focus();
});

// Real links become active when CONTACT is personalized. No guessed profiles.
selectAll("[data-social]").forEach((link) => {
  const platform = link.dataset.social;
  const url = CONTACT[platform];
  if (url && /^https:\/\//i.test(url)) {
    link.href = url;
    link.target = "_blank";
    link.rel = "noopener noreferrer";
  } else {
    const label = {
      github: "GitHub",
      linkedin: "LinkedIn",
      instagram: "Instagram",
      codepen: "CodePen",
    }[platform];
    link.addEventListener("click", (event) => {
      event.preventDefault();
      notify(`${label} profile coming soon.`);
    });
  }
});

select("#contact-button").addEventListener("click", (event) => {
  if (CONTACT.email && /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(CONTACT.email)) {
    window.location.href = `mailto:${CONTACT.email}`;
    return;
  }
  openDialog(
    '<h3 id="dialog-title">A hello, coming soon.</h3><p class="contact-placeholder">My contact details are on their way. In the meantime, take a look around and explore a few ideas.<br><a href="#projects" id="contact-project-link">Explore the concept projects ↗</a></p>',
    event.currentTarget,
  );
  select("#contact-project-link").addEventListener("click", () =>
    dialog.close(),
  );
});

// BLOOM — a working saved-products concept, deliberately free of checkout.
function openBloom(trigger) {
  openDialog(
    `<h3 id="dialog-title">Bloom — the everyday edit</h3>
    <p class="demo-description">A tiny storefront concept. Save your favorite little things to try the interaction.</p>
    <p class="demo-label">THE LITTLE LOVELIES COLLECTION</p>
    <div class="demo-products">
      <article class="demo-product"><div class="demo-product-art" aria-hidden="true">✿</div><h4>A little bloom</h4><p>A little everyday joy.</p><button class="save-product" type="button" aria-pressed="false" data-product="A little bloom">♡ Save favorite</button></article>
      <article class="demo-product"><div class="demo-product-art" aria-hidden="true">☕</div><h4>The slow morning</h4><p>A moment just for you.</p><button class="save-product" type="button" aria-pressed="false" data-product="The slow morning">♡ Save favorite</button></article>
      <article class="demo-product"><div class="demo-product-art" aria-hidden="true">✦</div><h4>A golden moment</h4><p>A touch of possibility.</p><button class="save-product" type="button" aria-pressed="false" data-product="A golden moment">♡ Save favorite</button></article>
    </div><p class="demo-feedback" id="bloom-count" role="status" aria-live="polite">0 favorites saved in this preview.</p>`,
    trigger,
  );
  selectAll(".save-product", dialogContent).forEach((button) => {
    button.addEventListener("click", () => {
      const saved = button.getAttribute("aria-pressed") !== "true";
      button.setAttribute("aria-pressed", String(saved));
      button.textContent = saved ? "♥ Saved" : "♡ Save favorite";
      const count = selectAll(
        '.save-product[aria-pressed="true"]',
        dialogContent,
      ).length;
      select("#bloom-count").textContent =
        `${count} favorite${count === 1 ? "" : "s"} saved in this preview.`;
    });
  });
}

// FOCUS — add, complete, and remove tasks. Stored only in this browser.
const TASK_KEY = "soukaina-focus-demo-v1";
const initialTasks = () => [
  { id: "first", text: "Make something meaningful", done: true },
  { id: "second", text: "Bring an idea to life", done: false },
  { id: "third", text: "Take a well-earned break", done: false },
];
let tasks = initialTasks();
try {
  const savedTasks = JSON.parse(localStorage.getItem(TASK_KEY));
  if (
    Array.isArray(savedTasks) &&
    savedTasks.length <= 100 &&
    savedTasks.every(
      (task) =>
        task &&
        typeof task.id === "string" &&
        typeof task.text === "string" &&
        task.text.length <= 100 &&
        typeof task.done === "boolean",
    )
  )
    tasks = savedTasks;
} catch {
  /* The demo still works when browser storage is unavailable. */
}

function saveTasks() {
  try {
    localStorage.setItem(TASK_KEY, JSON.stringify(tasks));
  } catch {
    /* Keep in-memory functionality. */
  }
}

function renderTasks() {
  const list = select("#demo-task-list");
  list.replaceChildren();
  tasks.forEach((task) => {
    const item = document.createElement("li");
    item.className = "demo-task";
    const label = document.createElement("label");
    const checkbox = document.createElement("input");
    checkbox.type = "checkbox";
    checkbox.checked = task.done;
    const text = document.createElement("span");
    text.textContent = task.text; // User input is text, never HTML.
    label.append(checkbox, text);
    const remove = document.createElement("button");
    remove.className = "delete-task";
    remove.type = "button";
    remove.setAttribute("aria-label", `Delete ${task.text}`);
    remove.innerHTML = '<i class="fa-solid fa-xmark" aria-hidden="true"></i>';
    checkbox.addEventListener("change", () => {
      task.done = checkbox.checked;
      saveTasks();
      updateTaskSummary();
    });
    remove.addEventListener("click", () => {
      tasks = tasks.filter((item) => item.id !== task.id);
      saveTasks();
      renderTasks();
      select("#new-task").focus();
    });
    item.append(label, remove);
    list.append(item);
  });
  updateTaskSummary();
}

function updateTaskSummary() {
  const done = tasks.filter((task) => task.done).length;
  select("#task-summary").textContent = tasks.length
    ? `${done} of ${tasks.length} complete. Small steps. Real progress.`
    : "A fresh start. Add your first task above.";
}

function openFocus(trigger) {
  openDialog(
    `<h3 id="dialog-title">One thing at a time.</h3>
    <p class="demo-description">Your little productivity space. Add a task, tick it off, and make a little progress. Tasks stay in this browser.</p>
    <form class="task-form" id="task-form"><label class="visually-hidden" for="new-task">New task</label><input id="new-task" type="text" placeholder="What would you like to do?" maxlength="100" required autocomplete="off"><button class="button button-primary" type="submit">Add <i class="fa-solid fa-plus" aria-hidden="true"></i></button></form>
    <ul class="demo-task-list" id="demo-task-list" aria-label="Your tasks"></ul><p class="task-summary" id="task-summary" role="status" aria-live="polite"></p>`,
    trigger,
  );
  renderTasks();
  select("#task-form").addEventListener("submit", (event) => {
    event.preventDefault();
    const input = select("#new-task");
    const value = input.value.trim();
    if (!value) return;
    if (tasks.length >= 100) {
      notify("Your list is full. Finish a few tasks first.");
      return;
    }
    const id =
      globalThis.crypto?.randomUUID?.() ||
      `task-${Date.now()}-${Math.random().toString(36).slice(2)}`;
    tasks.push({ id, text: value.slice(0, 100), done: false });
    saveTasks();
    renderTasks();
    input.value = "";
    input.focus();
  });
}

// PALETTE — rotate curated palettes and copy any hex color.
const palettes = [
  ["#EBAFC1", "#E5C8A8", "#798B73", "#344C42"],
  ["#F2C9D5", "#CA7095", "#83516D", "#353040"],
  ["#F1DAC4", "#DF9B81", "#A65E63", "#5C3F50"],
  ["#DDD7F0", "#B2A2CC", "#758F9C", "#344D5B"],
  ["#F4E8C5", "#D7B67F", "#A8B58B", "#58674E"],
  ["#FFD9DC", "#F8A8B0", "#BEE0D0", "#53837A"],
];
let paletteIndex = 0;

function renderPalette() {
  const swatches = select("#demo-swatches");
  swatches.replaceChildren();
  palettes[paletteIndex].forEach((color) => {
    const button = document.createElement("button");
    button.type = "button";
    button.className = "demo-swatch";
    button.style.setProperty("--swatch", color);
    button.setAttribute("aria-label", `Copy color ${color}`);
    const text = document.createElement("span");
    text.textContent = color;
    button.append(text);
    button.addEventListener("click", async () => {
      try {
        await navigator.clipboard.writeText(color);
        notify(`${color} copied. Make something lovely!`);
      } catch {
        notify(`Your color: ${color}. Select it below to copy.`);
        const selection = window.getSelection();
        const range = document.createRange();
        range.selectNodeContents(text);
        selection.removeAllRanges();
        selection.addRange(range);
      }
    });
    swatches.append(button);
  });
}

function openPalette(trigger) {
  openDialog(
    `<h3 id="dialog-title">Find your next favorite.</h3><p class="demo-description">A little color playground. Explore curated combinations, then click a color to copy its hex code.</p><div class="demo-swatches" id="demo-swatches" aria-label="Color palette"></div><div class="palette-actions"><button class="button button-primary" type="button" id="new-palette">Another little possibility <i class="fa-solid fa-shuffle" aria-hidden="true"></i></button><p>Click a color to copy it.</p></div>`,
    trigger,
  );
  renderPalette();
  select("#new-palette").addEventListener("click", () => {
    paletteIndex = (paletteIndex + 1) % palettes.length;
    renderPalette();
  });
}

selectAll("[data-project]").forEach((button) => {
  button.addEventListener("click", () => {
    const previews = {
      bloom: openBloom,
      focus: openFocus,
      palette: openPalette,
    };
    previews[button.dataset.project]?.(button);
  });
});
