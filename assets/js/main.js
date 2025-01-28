/*===== MENU SHOW =====*/
const showMenu = (toggleId, navId) => {
  const toggle = document.getElementById(toggleId),
    nav = document.getElementById(navId);

  if (toggle && nav) {
    toggle.addEventListener("click", () => {
      nav.classList.toggle("show");
    });
  }
};
showMenu("nav-toggle", "nav-menu");

/*==================== REMOVE MENU MOBILE ====================*/
const navLink = document.querySelectorAll(".nav__link");

function linkAction() {
  const navMenu = document.getElementById("nav-menu");
  // When we click on each nav__link, we remove the show-menu class
  navMenu.classList.remove("show");
}
navLink.forEach((n) => n.addEventListener("click", linkAction));

// Typing Effect
const text = "Web Developer"; // Text to be typed
const typingText = document.getElementById("typingText");
const cursor = document.getElementById("cursor");
let index = 0;

function type() {
  if (index < text.length) {
    typingText.textContent += text.charAt(index);
    index++;
    setTimeout(type, 200); // Speed of typing (200ms)
  } else {
    cursor.style.display = "none"; // Hide cursor once typing is finished
    setTimeout(() => {
      cursor.style.display = "inline-block"; // Show cursor again
      resetTyping(); // Restart typing animation after a delay
    }, 1000); // Delay before restarting the typing effect
  }
}

function resetTyping() {
  typingText.textContent = ""; // Clear the text
  index = 0; // Reset the index
  type(); // Restart the typing animation
}

// SCROLL SECTIONS ACTIVE LINK
const sections = document.querySelectorAll("section[id]");

const scrollActive = () => {
  const scrollDown = window.scrollY;

  sections.forEach((current) => {
    const sectionHeight = current.offsetHeight,
      sectionTop = current.offsetTop - 58,
      sectionId = current.getAttribute("id"),
      sectionsClass = document.querySelector(
        ".nav__menu a[href*=" + sectionId + "]"
      );

    if (scrollDown > sectionTop && scrollDown <= sectionTop + sectionHeight) {
      sectionsClass.classList.add("active-link");
    } else {
      sectionsClass.classList.remove("active-link");
    }
  });
};
window.addEventListener("scroll", scrollActive);

// SCROLL REVEAL ANIMATION
const sr = ScrollReveal({
  origin: "top",
  distance: "60px",
  duration: 2000,
  delay: 200,
});

// Define afterReveal callback to trigger the typing animation
sr.reveal(".home__data, .about__img, .skills__subtitle, .skills__text", {
  afterReveal: () => {
    // Trigger the typing effect after the scroll animation completes
    if (index === 0) {
      // Ensure typing only starts once and doesn't restart unnecessarily
      type();
    }
  },
});

sr.reveal(
  ".home__img, .about__subtitle, .about__text, .skills__img, .home__social-icon",
  {
    delay: 400,
  }
);

sr.reveal(
  ".skills__data, .work__tile, .work__img, .contact__input, .primary-button, .secondary-button",
  {
    interval: 200,
  }
);

/*==================== CONTACT PAGE SUBMISSION ====================*/
document
  .getElementById("contactForm")
  .addEventListener("submit", function (event) {
    event.preventDefault(); // Prevent the default form submission

    const formData = new FormData(this); // Create a FormData object from the form

    // Send the form data using fetch API
    fetch("https://formspree.io/f/xpwqdzvb", {
      method: "POST",
      body: formData,
      headers: {
        Accept: "application/json", // Optional: Accept JSON response
      },
    })
      .then((response) => {
        if (response.ok) {
          showNotification("Message sent successfully!"); // Show success message
          this.reset(); // Reset form fields
        } else {
          showNotification(
            "There was a problem sending your message. Please try again."
          ); // Handle errors
        }
      })
      .catch((error) => {
        console.error("Error:", error);
        showNotification(
          "There was a problem sending your message. Please try again."
        ); // Handle fetch errors
      });
  });

function showNotification(message) {
  const banner = document.getElementById("notificationBanner");
  banner.textContent = message; // Set the message text
  banner.style.display = "block"; // Show the banner
  banner.style.opacity = "1"; // Make it visible

  setTimeout(() => {
    banner.style.opacity = "0"; // Fade out effect
    setTimeout(() => {
      banner.style.display = "none"; // Hide after fading out
    }, 500); // Match with CSS transition duration
  }, 3000); // Show for 3 seconds
}
