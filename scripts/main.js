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

// Contact form validation

(() => {
  const form = document.querySelector(".contact-form");
  const emailInput = document.querySelector("#email");
  const emailError = document.querySelector(".email-error");

  if (!form || !emailInput || !emailError) return;

  form.addEventListener("submit", (e) => {
    const emailValue = emailInput.value.trim();

    if (!emailValue) {
      e.preventDefault();
      emailInput.classList.add("error");
      emailError.classList.add("show");
    } else {
      emailInput.classList.remove("error");
      emailError.classList.remove("show");
    }
  });

  emailInput.addEventListener("input", () => {
    if (emailInput.value.trim()) {
      emailInput.classList.remove("error");
      emailError.classList.remove("show");
    }
  });
})();
