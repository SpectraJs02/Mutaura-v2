document.addEventListener("DOMContentLoaded", () => {
  if (window.matchMedia("(prefers-reduced-motion: reduce)").matches) return;
  let lastMove = 0;
  function sparkle(x, y, kind) {
    const el = document.createElement("span");
    el.className = "cursor-sparkle " + (kind === "click" ? "click-sparkle" : "move-sparkle");
    el.textContent = kind === "click" ? "✦" : (Math.random() > .5 ? "✧" : "·");
    el.style.left = x + "px";
    el.style.top = y + "px";
    document.body.appendChild(el);
    el.addEventListener("animationend", () => el.remove(), { once: true });
  }
  document.addEventListener("pointermove", event => {
    const now = performance.now();
    if (now - lastMove < 95) return;
    lastMove = now;
    sparkle(event.clientX, event.clientY, "move");
  }, { passive: true });
  document.addEventListener("click", event => {
    sparkle(event.clientX, event.clientY, "click");
    sparkle(event.clientX + 12, event.clientY - 8, "move");
    sparkle(event.clientX - 10, event.clientY + 9, "move");
  });
});
