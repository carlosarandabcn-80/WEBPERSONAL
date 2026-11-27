(() => {
  const button = document.querySelector('.menu-button');
  const nav = document.getElementById('primary-nav');
  const mobile = matchMedia('(max-width: 900px)');
  function setOpen(open) {
    button.setAttribute('aria-expanded', String(open));
    nav.hidden = mobile.matches && !open;
    button.textContent = open ? 'Cerrar' : 'Menú';
  }
  function resize() {
    button.hidden = !mobile.matches;
    setOpen(false);
  }
  resize();
  mobile.addEventListener('change', resize);
  button.addEventListener('click', () => setOpen(nav.hidden));
  document.addEventListener('keydown', event => {
    if (event.key === 'Escape' && mobile.matches && !nav.hidden) {
      setOpen(false);
      button.focus();
    }
  });
  const links = [...nav.querySelectorAll('a')];
  for (const link of links) {
    link.addEventListener('click', () => {
      if (!mobile.matches) return;
      setOpen(false);
      const target = document.querySelector(link.hash);
      target.setAttribute('tabindex', '-1');
      target.focus({preventScroll: true});
    });
  }
  const sections = [...document.querySelectorAll('main section')];
  function updateCurrent() {
    const current = sections.filter(section => section.getBoundingClientRect().top <= innerHeight * 0.35).pop();
    for (const link of links) {
      if (current && link.hash === '#' + current.id) link.setAttribute('aria-current', 'location');
      else link.removeAttribute('aria-current');
    }
  }
  let pending = false;
  addEventListener('scroll', () => {
    if (pending) return;
    pending = true;
    requestAnimationFrame(() => { updateCurrent(); pending = false; });
  }, {passive: true});
  updateCurrent();
})();

