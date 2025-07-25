window.addEventListener("load", () => {
  const popup = document.getElementById("popupForm");
  const close_btn = document.getElementById("close-button");
  // Check if popup has already been shown
  if (!localStorage.getItem("hasSeenPopup")) {
    popup.style.display = "flex"; // Show the popup
    popup.classList.add("show"); // Optional: trigger animation
    localStorage.setItem("hasSeenPopup", "true"); // Mark as shown
  } else {
    popup.style.display = "none"; // Hide if already seen
  }

  close_btn.addEventListener("click", () => {
    popup.style.display = "none";
    popup.classList.remove("show");
  });

  document.querySelectorAll("form").forEach((f) => {
    f.addEventListener("submit", (e) => {
      handleFormSubmission(e);
    });
  });

  const careers_wrapper = document.getElementById("careers-wrapper");
  const careers_nav_item_menu = document.getElementById(
    "careers-nav-item-menu"
  );
  careers_nav_item_menu.hidden = true;

  careers_wrapper.addEventListener("mouseover", handleMenuOpen);

  careers_wrapper.addEventListener("mouseleave", handleMenuClose);

  document.querySelectorAll(".question").forEach((q) => {
    q.addEventListener("click", () => {
      q.classList.toggle("open");
    });
  });

  const hamburger = document.getElementsByClassName("hamburger")[0];

  const nbar = document.getElementsByClassName("navbar")[0];
  hamburger.addEventListener("click", () => {
    hamburger.classList.toggle("active");

    const existingWrapper = document.getElementById("image-wrapper");

    if (existingWrapper) {
      // Element exists → remove it
      existingWrapper.remove();
    } else {
      // Element doesn't exist → add it
      const wrapper = document.createElement("div");
      wrapper.id = "image-wrapper";

      const img = document.createElement("img");
      img.src = "./assets/hyperactive.png";
      img.alt = "";

      const text = document.createElement("p");
      text.textContent = "בית הספר להיי-טק הטוב בישראל";

      wrapper.appendChild(img);
      wrapper.appendChild(text);

      nbar.appendChild(wrapper);
    }

    if (nbar.style.display === "flex") nbar.style.display = "none";
    else nbar.style.display = "flex";
    careers_wrapper.addEventListener("click", () => {
      if (careers_nav_item_menu.style.display === "flex")
        careers_nav_item_menu.style.display = "none";
      else careers_nav_item_menu.style.display = "flex";
    });
  });

  document
    .querySelectorAll(".how-it-works-card-expander")
    .forEach(function (expander) {
      expander.addEventListener("click", function () {
        const card = this.nextElementSibling;

        if (card.style.display === "none" || card.style.display === "") {
          card.style.display = "block";
          this.textContent = "–";
        } else {
          card.style.display = "none";
          this.textContent = "+";
        }
      });
    });
});

function handleMenuOpen() {
  const careers_nav_item_menu = document.getElementById(
    "careers-nav-item-menu"
  );
  careers_nav_item_menu.hidden = false;
}

function handleMenuClose() {
  const careers_nav_item_menu = document.getElementById(
    "careers-nav-item-menu"
  );
  careers_nav_item_menu.hidden = true;
}

function handleFormSubmission(e) {
  let validForm = true;
  e.preventDefault();
  const form = e.target;
  const email = form.elements["email"];
  email.addEventListener("focus", function clearError() {
    email.value = "";
    email.classList.remove("invalid");
    email.removeEventListener("focus", clearError);
  });
  if (!IsValidMail(email.value)) {
    email.classList.add("invalid");
    email.value = "נא הכנס כתובת מייל תקינה";
    validForm = false;
  }
  const name = form.elements["fullname"];
  name.addEventListener("focus", function clearError() {
    name.value = "";
    name.classList.remove("invalid");
    name.removeEventListener("focus", clearError);
  });
  if (name.value === "") {
    name.classList.add("invalid");
    name.value = "נא הכנס שם תקין";
    validForm = false;
  }

  const phone = form.elements["phone"];
  phone.addEventListener("focus", function clearError() {
    phone.value = "";
    phone.classList.remove("invalid");
    phone.removeEventListener("focus", clearError);
  });
  if (!IsValidPhone(phone.value)) {
    phone.classList.add("invalid");
    phone.value = "נא הכנס מספר טלפון תקין";
    validForm = false;
  }

  if (validForm) {
    form.style.display = "none";
    const success_modal = document.getElementById("submission-success-modal");
    success_modal.style.display = "flex";
    const close_btn = document.getElementById("close-button-success-modal");
    close_btn.addEventListener("click", () => {
      form.submit();
    });
  }
}

function IsValidMail(str) {
  const pattern = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
  return pattern.test(str);
}

function IsValidPhone(str) {
  const pattern = /^\d{3}\d{7}$/;
  return pattern.test(str);
}
