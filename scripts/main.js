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
  
  if (!form) return;

  const fields = {
    name: document.querySelector("#name"),
    email: document.querySelector("#email"),
    companyName: document.querySelector("#companyName"),
    title: document.querySelector("#title"),
    message: document.querySelector("#message")
  };

  const hasOnlyNumbers = (value) => /^\d+$/.test(value);
  const hasOnlySymbols = (value) => /^[^a-zA-Z0-9]+$/.test(value);
  const isValidEmail = (email) => /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email);

  const validateField = (fieldKey) => {
    const field = fields[fieldKey];
    const errorContainer = document.querySelector(`#${fieldKey}-error`);
    const value = field.value.trim();

    if (!value || hasOnlyNumbers(value) || hasOnlySymbols(value)) {
      field.classList.add("error");
      errorContainer.textContent = "This field can't be empty";
      errorContainer.classList.add("show");
      return false;
    } else if (fieldKey === "email" && !isValidEmail(value)) {
      field.classList.add("error");
      errorContainer.textContent = "Please enter a valid email address";
      errorContainer.classList.add("show");
      return false;
    } else {
      field.classList.remove("error");
      errorContainer.textContent = "";
      errorContainer.classList.remove("show");
      return true;
    }
  };

  form.addEventListener("submit", (e) => {
    e.preventDefault();
    const results = Object.keys(fields).map((fieldKey) => validateField(fieldKey));
    const isValid = results.every((result) => result === true);

    if (isValid) {
      form.reset();
    }
  });

  // Clear error on input
  Object.values(fields).forEach((field) => {
    field.addEventListener("input", () => {
      if (field.classList.contains("error")) {
        const fieldKey = field.id;
        validateField(fieldKey);
      }
    });
  });
})();
