(() => {
  const burger = document.querySelector(".hamburger-menu");
  const sidebar = document.querySelector(".sidebar");
  const overlay = document.querySelector(".nav__overlay");
  const closeBtn = document.querySelector(".sidebar__close");

  if (!burger || !sidebar || !overlay || !closeBtn) return;

  let lastFocusedEl = null;

  const focusableSelector = [
    "a[href]",
    "button:not([disabled])",
    "input:not([disabled])",
    "select:not([disabled])",
    "textarea:not([disabled])",
    "[tabindex]:not([tabindex='-1'])",
  ].join(",");

  const getFocusableEls = () =>
    Array.from(sidebar.querySelectorAll(focusableSelector)).filter(
      (el) => !el.hasAttribute("disabled") && el.offsetParent !== null
    );

  const onEsc = (e) => {
    if (e.key === "Escape") closeMenu();
  };

  const onTabTrap = (e) => {
    if (e.key !== "Tab") return;

    const focusables = getFocusableEls();
    if (focusables.length === 0) {
      e.preventDefault();
      closeBtn.focus();
      return;
    }

    const first = focusables[0];
    const last = focusables[focusables.length - 1];

    if (e.shiftKey && document.activeElement === first) {
      e.preventDefault();
      last.focus();
    } else if (!e.shiftKey && document.activeElement === last) {
      e.preventDefault();
      first.focus();
    }
  };

  const openMenu = () => {
    if (burger.getAttribute("aria-expanded") === "true") return;

    lastFocusedEl = document.activeElement;

    sidebar.classList.add("is-open");
    overlay.hidden = false;

    burger.setAttribute("aria-expanded", "true");
    sidebar.setAttribute("aria-hidden", "false");

    sidebar.removeAttribute("inert");

    document.body.classList.add("nav-locked");

    document.addEventListener("keydown", onEsc);
    document.addEventListener("keydown", onTabTrap);

    closeBtn.focus();
  };

  const closeMenu = () => {
    if (burger.getAttribute("aria-expanded") === "false") return;

    sidebar.classList.remove("is-open");
    overlay.hidden = true;

    burger.setAttribute("aria-expanded", "false");
    sidebar.setAttribute("aria-hidden", "true");

    sidebar.setAttribute("inert", "");

    document.body.classList.remove("nav-locked");

    document.removeEventListener("keydown", onEsc);
    document.removeEventListener("keydown", onTabTrap);

    if (lastFocusedEl && typeof lastFocusedEl.focus === "function") {
      lastFocusedEl.focus();
    } else {
      burger.focus();
    }

    lastFocusedEl = null;
  };

  burger.addEventListener("click", () => {
    const isOpen = burger.getAttribute("aria-expanded") === "true";
    if (isOpen) closeMenu();
    else openMenu();
  });

  closeBtn.addEventListener("click", closeMenu);
  overlay.addEventListener("click", closeMenu);

  sidebar.addEventListener("click", (e) => {
    if (e.target.closest("a")) closeMenu();
  });

  burger.setAttribute("aria-expanded", "false");
  sidebar.setAttribute("aria-hidden", "true");
  overlay.hidden = true;

  sidebar.setAttribute("inert", "");
})();

// Schedule a Demo Button:

(() => {
  const form = document.querySelector(".hero-form");
  if (!form) return;

  // svarbu: imam email tik iš šitos formos, ne globaliai
  const email = form.querySelector('input[type="email"]');
  if (!email) return;

  const isValidEmail = (v) => /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(v);

  const validateEmail = () => {
    const value = email.value.trim();

    // jei tu nori, kad tuščias rodytų klaidą tik submit'e – paliekam customValidity tuščią kol tuščias
    if (value === "") {
      email.setCustomValidity("");
      return true;
    }

    if (value.startsWith("-")) {
      email.setCustomValidity("Email cannot start with '-'");
      return false;
    }

    if (!isValidEmail(value)) {
      email.setCustomValidity("Please enter a valid email address");
      return false;
    }

    email.setCustomValidity("");
    return true;
  };

  // nerodom klaidos kol vartotojas nieko neįrašė
  email.addEventListener("input", () => {
    validateEmail();
  });

  email.addEventListener("blur", () => {
    if (email.value.trim() !== "") {
      validateEmail();
      email.reportValidity();
    }
  });

  form.addEventListener("submit", (e) => {
    // submit'e jau leidžiam rodyti ir tuščio / neteisingo atvejį per browser required
    validateEmail();

    if (!form.checkValidity()) {
      e.preventDefault();
      form.reportValidity();
    }
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

    if (fieldKey === "companyName" && !value) {
      field.classList.remove("error");
      errorContainer.textContent = "";
      errorContainer.classList.remove("show");
      return true;
    }

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

  Object.values(fields).forEach((field) => {
    field.addEventListener("input", () => {
      if (field.classList.contains("error")) {
        const fieldKey = field.id;
        validateField(fieldKey);
      }
    });
  });
})();
