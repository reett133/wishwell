// Shared across all WishWell pages: the ambient night-sky backdrop and the
// one deliberate motion moment (a coin dropping into the well) that plays
// on meaningful actions like logging in or saving a wish.
window.WishWell = (function () {
  function initStarfield(container) {
    if (!container) return;
    const STAR_COUNT = 22;
    const FIREFLY_COUNT = 5;
    for (let i = 0; i < STAR_COUNT; i++) {
      const s = document.createElement("span");
      s.className = "star" + (Math.random() < 0.25 ? " pink" : "");
      s.style.left = Math.random() * 100 + "%";
      s.style.top = Math.random() * 70 + "%";
      s.style.animationDelay = (Math.random() * 5).toFixed(2) + "s";
      s.style.animationDuration = (4 + Math.random() * 3).toFixed(2) + "s";
      container.appendChild(s);
    }
    for (let i = 0; i < FIREFLY_COUNT; i++) {
      const f = document.createElement("span");
      f.className = "firefly" + (Math.random() < 0.4 ? " pink" : "");
      f.style.left = Math.random() * 100 + "%";
      f.style.top = 20 + Math.random() * 60 + "%";
      f.style.animationDelay = (Math.random() * 8).toFixed(2) + "s";
      f.style.animationDuration = (10 + Math.random() * 8).toFixed(2) + "s";
      container.appendChild(f);
    }
  }

  function magicAt(x, y) {
    const coin = document.createElement("div");
    coin.className = "magic-coin";
    coin.style.left = x - 8 + "px";
    coin.style.top = y - 8 + "px";
    document.body.appendChild(coin);

    [0, 150, 300].forEach((delay) => {
      setTimeout(() => {
        const ring = document.createElement("div");
        ring.className = "magic-ripple";
        ring.style.left = x + "px";
        ring.style.top = y + 30 + "px";
        document.body.appendChild(ring);
        setTimeout(() => ring.remove(), 950);
      }, delay);
    });

    setTimeout(() => coin.remove(), 950);
  }

  function magicFromElement(el) {
    if (!el) return;
    const rect = el.getBoundingClientRect();
    magicAt(rect.left + rect.width / 2, rect.top + rect.height / 2);
  }

  return { initStarfield, magicAt, magicFromElement };
})();
