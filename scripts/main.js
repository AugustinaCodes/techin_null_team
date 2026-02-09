(() => {
  const burger = document.querySelector(".hamburger-menu");
  const sidebar = document.querySelector(".sidebar");
  const overlay = document.querySelector(".nav__overlay");
  const closeBtn = document.querySelector(".sidebar__close");

  if (!burger || !sidebar || !overlay || !closeBtn) return;

  const openMenu = () => {
    sidebar.classList.add("is-open");
    overlay.hidden = false;
    burger.setAttribute("aria-expanded", "true");
    sidebar.setAttribute("aria-hidden", "false");
    document.body.classList.add("nav-locked");
  };

  const closeMenu = () => {
    sidebar.classList.remove("is-open");
    overlay.hidden = true;
    burger.setAttribute("aria-expanded", "false");
    sidebar.setAttribute("aria-hidden", "true");
    document.body.classList.remove("nav-locked");
  };

  burger.addEventListener("click", openMenu);
  closeBtn.addEventListener("click", closeMenu);
  overlay.addEventListener("click", closeMenu);

  sidebar.addEventListener("click", (e) => {
    if (e.target.closest("a")) closeMenu();
  });

  document.addEventListener("keydown", (e) => {
    if (e.key === "Escape") closeMenu();
  });
})();
