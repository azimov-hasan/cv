// Mobil menyu
const toggle = document.getElementById("navToggle");
const links = document.getElementById("navLinks");
toggle.addEventListener("click", () => {
  const open = links.classList.toggle("is-open");
  toggle.setAttribute("aria-expanded", open);
});
links.querySelectorAll("a").forEach(a =>
  a.addEventListener("click", () => {
    links.classList.remove("is-open");
    toggle.setAttribute("aria-expanded", "false");
  })
);

const reduceMotion = window.matchMedia("(prefers-reduced-motion: reduce)").matches;

// Ekranga kirganda paydo bo'lish animatsiyasi
const io = new IntersectionObserver(entries => {
  entries.forEach(e => {
    if (e.isIntersecting) { e.target.classList.add("is-visible"); io.unobserve(e.target); }
  });
}, { threshold: 0.15 });
document.querySelectorAll(".reveal").forEach(el => io.observe(el));

// Raqamlar: 0 dan maqsad qiymatigacha sanab chiqish (data-count, data-prefix, data-suffix)
if (!reduceMotion) {
  const countIo = new IntersectionObserver(entries => {
    entries.forEach(e => {
      if (!e.isIntersecting) return;
      const el = e.target;
      countIo.unobserve(el);
      const end = Number(el.dataset.count);
      const prefix = el.dataset.prefix || "";
      const suffix = el.dataset.suffix || "";
      const dur = 1200;
      const t0 = performance.now();
      const step = now => {
        const k = Math.min(1, (now - t0) / dur);
        const eased = 1 - Math.pow(1 - k, 3);
        el.textContent = prefix + Math.round(end * eased).toLocaleString("en-US") + suffix;
        if (k < 1) requestAnimationFrame(step);
      };
      requestAnimationFrame(step);
    });
  }, { threshold: 0.5 });
  document.querySelectorAll("[data-count]").forEach(el => countIo.observe(el));
}

// Joriy yil
document.getElementById("year").textContent = new Date().getFullYear();
