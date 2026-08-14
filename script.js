const memories = [...document.querySelectorAll(".memory")];
const title = document.querySelector(".title");
const tagline = document.querySelector(".tagline");
const hero = document.querySelector(".hero");
const menuToggle = document.querySelector(".menu-toggle");
const mobileMenu = document.querySelector(".mobile-menu");

const CAPTION_DELAY = 3000;
const TITLE_DELAY = 6000;
const SLIDE_MS = 10000;

let active = 0;
let slideTimer = null;
let targetX = 0;
let targetY = 0;
let raf = null;

function showMemory(next) {
  memories.forEach((memory, index) => {
    memory.classList.toggle("is-visible", index === next);
  });

  active = next;
}

function nextMemory() {
  showMemory((active + 1) % memories.length);
}

window.setTimeout(() => {
  tagline.classList.add("is-revealed");
}, CAPTION_DELAY);

window.setTimeout(() => {
  title.classList.add("is-revealed");
}, TITLE_DELAY);

window.setTimeout(() => {
  slideTimer = window.setInterval(nextMemory, SLIDE_MS);
}, TITLE_DELAY);

function handlePointerMove(event) {
  const rect = hero.getBoundingClientRect();

  const pointerX =
    (event.clientX - rect.left) / rect.width - 0.5;

  const pointerY =
    (event.clientY - rect.top) / rect.height - 0.5;

  targetX = pointerX * -10;
  targetY = pointerY * -6;

  if (!raf) {
    raf = requestAnimationFrame(renderParallax);
  }
}

function renderParallax() {
  raf = null;

  memories.forEach((memory, index) => {
    const depth = 0.45 + index * 0.28;

    const x = targetX * depth;
    const y = targetY * depth;

    const scale =
      memory.classList.contains("is-visible")
        ? 1.04
        : 1.10 + index * 0.01;

    memory.style.transform =
      `translate3d(${x}px, ${y}px, 0) scale(${scale})`;
  });
}

if (window.matchMedia("(pointer:fine)").matches) {
  hero.addEventListener(
    "pointermove",
    handlePointerMove,
    { passive: true }
  );
}

function closeMenu() {
  mobileMenu.classList.remove("is-open");
  mobileMenu.setAttribute("aria-hidden", "true");
  menuToggle.setAttribute("aria-expanded", "false");
}

menuToggle?.addEventListener("click", () => {
  const open =
    !mobileMenu.classList.contains("is-open");

  mobileMenu.classList.toggle("is-open", open);

  mobileMenu.setAttribute(
    "aria-hidden",
    String(!open)
  );

  menuToggle.setAttribute(
    "aria-expanded",
    String(open)
  );
});

mobileMenu?.querySelectorAll("a").forEach((link) => {
  link.addEventListener("click", closeMenu);
});

document.querySelectorAll(".nav__link").forEach((link) => {
  link.addEventListener("click", () => {
    document
      .querySelectorAll(".nav__link")
      .forEach((item) => {
        item.classList.remove("is-active");
      });

    link.classList.add("is-active");
  });
});

window.addEventListener("beforeunload", () => {
  if (slideTimer) {
    clearInterval(slideTimer);
  }

  if (raf) {
    cancelAnimationFrame(raf);
  }
});
