const memories = [...document.querySelectorAll(".memory")];
const titleLockup = document.querySelector(".title-lockup");
const hero = document.querySelector(".hero");
const menuToggle = document.querySelector(".menu-toggle");
const mobileMenu = document.querySelector(".mobile-menu");

const ENTRY_MS = 8000;
const SLIDE_MS = 10000;
const TRANSITION_MS = 2200;

let active = 0;
let slideTimer = null;
let pointerX = 0;
let pointerY = 0;
let targetX = 0;
let targetY = 0;
let raf = null;

function revealTitle() {
  titleLockup.classList.add("is-revealed");
}

function showMemory(next) {
  memories.forEach((memory, i) => {
    memory.classList.toggle("is-visible", i === next);
  });

  active = next;
}

function nextMemory() {
  const next = (active + 1) % memories.length;
  showMemory(next);
}

function startSlideshow() {
  slideTimer = window.setInterval(nextMemory, SLIDE_MS);
}

// Initial cinematic camera push.
window.setTimeout(revealTitle, ENTRY_MS);
window.setTimeout(startSlideshow, ENTRY_MS + 2000);

// Tiny mouse-driven parallax; intentionally restrained.
function handlePointerMove(event) {
  const rect = hero.getBoundingClientRect();
  pointerX = ((event.clientX - rect.left) / rect.width - 0.5);
  pointerY = ((event.clientY - rect.top) / rect.height - 0.5);

  targetX = pointerX * -10;
  targetY = pointerY * -6;

  if (!raf) raf = requestAnimationFrame(renderParallax);
}

function renderParallax() {
  raf = null;

  memories.forEach((memory, i) => {
    const depth = 0.45 + i * 0.28;
    const x = targetX * depth;
    const y = targetY * depth;
    memory.style.setProperty("--px", `${x}px`);
    memory.style.setProperty("--py", `${y}px`);
    memory.style.transform = `translate3d(${x}, ${y}, 0) scale(${memory.classList.contains("is-visible") ? 1.04 : 1.10 + i * .01})`;
  });
}

if (window.matchMedia("(pointer:fine)").matches) {
  hero.addEventListener("pointermove", handlePointerMove, { passive: true });
}

function closeMenu() {
  mobileMenu.classList.remove("is-open");
  mobileMenu.setAttribute("aria-hidden", "true");
  menuToggle.setAttribute("aria-expanded", "false");
}

menuToggle?.addEventListener("click", () => {
  const open = !mobileMenu.classList.contains("is-open");
  mobileMenu.classList.toggle("is-open", open);
  mobileMenu.setAttribute("aria-hidden", String(!open));
  menuToggle.setAttribute("aria-expanded", String(open));
});

mobileMenu?.querySelectorAll("a").forEach((link) => {
  link.addEventListener("click", closeMenu);
});

// Keep active navigation intentionally simple.
document.querySelectorAll(".nav__link").forEach((link) => {
  link.addEventListener("click", () => {
    document.querySelectorAll(".nav__link").forEach((item) => item.classList.remove("is-active"));
    link.classList.add("is-active");
  });
});

window.addEventListener("beforeunload", () => {
  if (slideTimer) clearInterval(slideTimer);
  if (raf) cancelAnimationFrame(raf);
});
