(function () {
  const header = document.querySelector("[data-header]");
  const navToggle = document.querySelector("[data-nav-toggle]");
  const navPanel = document.querySelector("[data-nav-panel]");
  const year = document.querySelector("[data-year]");
  const introLoader = document.querySelector("[data-intro-loader]");
  const hero = document.querySelector("[data-hero]");
  const heroRail = document.querySelector("[data-hero-rail]");

  document.body.classList.add("is-loading");
  window.setTimeout(() => {
    document.body.classList.remove("is-loading");
    introLoader?.remove();
  }, 1600);

  if (year) {
    year.textContent = new Date().getFullYear();
  }

  if (hero && heroRail && window.matchMedia("(pointer: fine)").matches) {
    hero.addEventListener("pointermove", (event) => {
      const rect = hero.getBoundingClientRect();
      const railShift = ((event.clientY - rect.top) / rect.height - 0.5) * 24;
      const railDrift = ((event.clientX - rect.left) / rect.width - 0.5) * 8;

      heroRail.style.setProperty("--rail-shift", `${railShift.toFixed(1)}px`);
      heroRail.style.setProperty("--rail-drift", `${railDrift.toFixed(1)}px`);
    });

    hero.addEventListener("pointerleave", () => {
      heroRail.style.removeProperty("--rail-shift");
      heroRail.style.removeProperty("--rail-drift");
    });
  }

  function closeNav() {
    document.body.classList.remove("nav-open");
    navToggle?.setAttribute("aria-expanded", "false");
  }

  navToggle?.addEventListener("click", () => {
    const isOpen = document.body.classList.toggle("nav-open");
    navToggle.setAttribute("aria-expanded", String(isOpen));
  });

  navPanel?.addEventListener("click", (event) => {
    if (event.target instanceof HTMLAnchorElement) {
      closeNav();
    }
  });

  window.addEventListener("scroll", () => {
    header?.classList.toggle("is-scrolled", window.scrollY > 18);
  });

  if ("IntersectionObserver" in window) {
    const revealObserver = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            entry.target.classList.add("is-visible");
            revealObserver.unobserve(entry.target);
          }
        });
      },
      { threshold: 0.14 }
    );

    document.querySelectorAll("[data-reveal]").forEach((element) => revealObserver.observe(element));
  } else {
    document.querySelectorAll("[data-reveal]").forEach((element) => element.classList.add("is-visible"));
  }
})();
