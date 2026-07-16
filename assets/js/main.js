(function () {
  const root = document.documentElement;
  const header = document.querySelector("[data-header]");
  const navToggle = document.querySelector("[data-nav-toggle]");
  const navPanel = document.querySelector("[data-nav-panel]");
  const themeToggle = document.querySelector("[data-theme-toggle]");
  const year = document.querySelector("[data-year]");
  const storedTheme = localStorage.getItem("theme");
  const prefersDark = window.matchMedia("(prefers-color-scheme: dark)").matches;

  root.dataset.theme = storedTheme || (prefersDark ? "dark" : "light");
  document.body.classList.add("is-loading");
  window.setTimeout(() => {
    document.body.classList.remove("is-loading");
    document.querySelector("[data-intro-loader]")?.remove();
  }, 2400);
  if (year) year.textContent = new Date().getFullYear();

  function closeNav() {
    document.body.classList.remove("nav-open");
    navToggle?.setAttribute("aria-expanded", "false");
  }

  navToggle?.addEventListener("click", () => {
    const isOpen = document.body.classList.toggle("nav-open");
    navToggle.setAttribute("aria-expanded", String(isOpen));
  });

  navPanel?.addEventListener("click", (event) => {
    if (event.target instanceof HTMLAnchorElement) closeNav();
  });

  themeToggle?.addEventListener("click", () => {
    const nextTheme = root.dataset.theme === "dark" ? "light" : "dark";
    root.dataset.theme = nextTheme;
    localStorage.setItem("theme", nextTheme);
  });

  window.addEventListener("scroll", () => {
    header?.classList.toggle("is-scrolled", window.scrollY > 18);
  });

  const revealObserver = new IntersectionObserver(
    (entries) => {
      entries.forEach((entry) => {
        if (entry.isIntersecting) {
          entry.target.classList.add("is-visible");
          revealObserver.unobserve(entry.target);
        }
      });
    },
    { threshold: 0.16 }
  );

  document.querySelectorAll("[data-reveal]").forEach((element) => revealObserver.observe(element));

  const filterButtons = [...document.querySelectorAll("[data-filter]")];
  const projectCards = [...document.querySelectorAll("[data-category]")];

  filterButtons.forEach((button) => {
    button.addEventListener("click", () => {
      const filter = button.dataset.filter;
      filterButtons.forEach((item) => {
        const active = item === button;
        item.classList.toggle("is-active", active);
        item.setAttribute("aria-selected", String(active));
      });
  projectCards.forEach((card) => {
        card.classList.toggle("is-hidden", filter !== "all" && card.dataset.category !== filter);
      });
    });
  });

  const portraitTriggers = [...document.querySelectorAll("[data-portrait-trigger]")];
  const portraitPanels = [...document.querySelectorAll("[data-portrait-panel]")];

  portraitTriggers.forEach((trigger) => {
    trigger.addEventListener("click", () => {
      const target = trigger.dataset.portraitTrigger;
      portraitTriggers.forEach((item) => {
        const active = item === trigger;
        item.classList.toggle("is-active", active);
        item.setAttribute("aria-selected", String(active));
      });
      portraitPanels.forEach((panel) => {
        panel.classList.toggle("is-active", panel.dataset.portraitPanel === target);
      });
    });
  });

  document.querySelectorAll(".service-card, .project-card, .education-grid article, .insight-strip article").forEach((card) => {
    card.addEventListener("pointermove", (event) => {
      const rect = card.getBoundingClientRect();
      const x = (event.clientX - rect.left) / rect.width - 0.5;
      const y = (event.clientY - rect.top) / rect.height - 0.5;
      card.style.setProperty("--tilt-x", `${(-y * 4).toFixed(2)}deg`);
      card.style.setProperty("--tilt-y", `${(x * 4).toFixed(2)}deg`);
    });
    card.addEventListener("pointerleave", () => {
      card.style.removeProperty("--tilt-x");
      card.style.removeProperty("--tilt-y");
    });
  });

  const assistantLog = document.querySelector("[data-assistant-log]");
  const assistantForm = document.querySelector("[data-assistant-form]");
  const assistantInput = document.querySelector("#assistant-input");
  const answers = {
    perfil:
      "Carlos combina integracion y educacion social con una trayectoria amplia en diseno grafico, produccion, formacion, danza y atencion al cliente.",
    servicios:
      "Puede aportar valor en proyectos de integracion social, formacion, comunicacion visual, dinamizacion de grupos y experiencia de cliente.",
    contacto:
      "Puedes contactar con Carlos en carlosarandabcn@gmail.com, por telefono en el 680 223 287 o via LinkedIn: /in/carlosarandabcn.",
    idiomas: "Idiomas: catalan nativo/bilingue, espanol nativo/bilingue e ingles profesional.",
    danza: "Como instructor de danza, dinamizo clases y baile social, con experiencia en gestion de grupos.",
    diseno: "Su base visual viene del CFGS de Diseno Grafico y de mas de 15 anos en tratamiento de informacion y produccion grafica.",
  };

  function respond(question) {
    const normalized = question.toLowerCase();
    const key =
      Object.keys(answers).find((item) => normalized.includes(item)) ||
      (normalized.includes("email") || normalized.includes("linkedin") ? "contacto" : "perfil");
    if (assistantLog) {
      assistantLog.innerHTML = `<p><strong>Tu:</strong> ${escapeHtml(question)}</p><p><strong>Asistente:</strong> ${answers[key]}</p>`;
    }
  }

  document.querySelectorAll("[data-question]").forEach((button) => {
    button.addEventListener("click", () => respond(button.dataset.question || "perfil"));
  });

  assistantForm?.addEventListener("submit", (event) => {
    event.preventDefault();
    const value = assistantInput?.value?.trim();
    if (value) respond(value);
    if (assistantInput) assistantInput.value = "";
  });

  function escapeHtml(value) {
    return value.replace(/[&<>"']/g, (char) => {
      const map = { "&": "&amp;", "<": "&lt;", ">": "&gt;", '"': "&quot;", "'": "&#039;" };
      return map[char];
    });
  }

  const canvas = document.querySelector("#signalCanvas");
  const context = canvas?.getContext("2d");
  let points = [];
  let mouseX = 0.5;
  let mouseY = 0.5;
  let raf = 0;

  function setupCanvas() {
    if (!canvas || !context) return;
    const dpr = Math.min(window.devicePixelRatio || 1, 2);
    const rect = canvas.getBoundingClientRect();
    canvas.width = Math.max(1, Math.floor(rect.width * dpr));
    canvas.height = Math.max(1, Math.floor(rect.height * dpr));
    context.setTransform(dpr, 0, 0, dpr, 0, 0);
    points = Array.from({ length: 72 }, (_, index) => ({
      angle: (index / 72) * Math.PI * 2,
      radius: 90 + Math.random() * 220,
      speed: 0.002 + Math.random() * 0.004,
      size: 1 + Math.random() * 2.5,
    }));
  }

  function animateCanvas(time) {
    if (!canvas || !context) return;
    const rect = canvas.getBoundingClientRect();
    context.clearRect(0, 0, rect.width, rect.height);
    const cx = rect.width * (0.22 + mouseX * 0.05);
    const cy = rect.height * (0.55 + mouseY * 0.04);
    context.lineWidth = 1;

    points.forEach((point, index) => {
      const angle = point.angle + time * point.speed;
      const x = cx + Math.cos(angle) * point.radius;
      const y = cy + Math.sin(angle * 0.78) * point.radius * 0.42;
      context.beginPath();
      context.arc(x, y, point.size, 0, Math.PI * 2);
      context.fillStyle = index % 5 === 0 ? "rgba(255,45,85,0.32)" : "rgba(0,166,166,0.18)";
      context.fill();

      if (index > 0 && index % 3 === 0) {
        const prev = points[index - 1];
        const prevAngle = prev.angle + time * prev.speed;
        const px = cx + Math.cos(prevAngle) * prev.radius;
        const py = cy + Math.sin(prevAngle * 0.78) * prev.radius * 0.42;
        context.beginPath();
        context.moveTo(px, py);
        context.lineTo(x, y);
        context.strokeStyle = "rgba(101,112,131,0.12)";
        context.stroke();
      }
    });
    raf = requestAnimationFrame(animateCanvas);
  }

  if (canvas && context && !window.matchMedia("(prefers-reduced-motion: reduce)").matches) {
    setupCanvas();
    window.addEventListener("resize", setupCanvas);
    window.addEventListener("pointermove", (event) => {
      mouseX = event.clientX / window.innerWidth;
      mouseY = event.clientY / window.innerHeight;
    });
    raf = requestAnimationFrame(animateCanvas);
  }

  window.addEventListener("beforeunload", () => cancelAnimationFrame(raf));
})();
