/*==================== MENU SHOW ====================*/
const showMenu = (toggleId, navId) => {
  const toggle = document.getElementById(toggleId);
  const nav = document.getElementById(navId);

  if (toggle && nav) {
    toggle.addEventListener("click", () => {
      nav.classList.toggle("show");
    });
  }
};

// Initialize menu toggle
showMenu("nav-toggle", "nav-menu");

/*==================== HAMBURGER MENU TOGGLE ====================*/
const hamburger = document.querySelector(".nav__toggle");
const navMenu = document.querySelector(".nav__menu");

// Toggle active class for hamburger and nav menu
hamburger.addEventListener("click", () => {
  hamburger.classList.toggle("active");
  navMenu.classList.toggle("active");
});

/*==================== REMOVE MENU ON LINK CLICK ====================*/
const navLinks = document.querySelectorAll(".nav__link");

// Function to remove the active class from the menu
function linkAction() {
  navMenu.classList.remove("show");
  hamburger.classList.remove("active"); // Optionally remove active class from hamburger
}

// Add click event listener to each navigation link
navLinks.forEach((link) => link.addEventListener("click", linkAction));

/*==================== TYPING EFFECT ====================*/
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
  banner.textContent = message;
  banner.style.display = "block";
  banner.style.opacity = "1";

  setTimeout(() => {
    banner.style.opacity = "0";
    setTimeout(() => {
      banner.style.display = "none";
    }, 500); // Match with CSS transition duration
  }, 3000); // Show for 3 seconds
}

/*==================== DARK MODE ====================*/
// Load the theme on page load
function loadTheme() {
  const savedTheme = localStorage.getItem("theme");
  const sunIcon = document.getElementById("sun-icon");
  const moonIcon = document.getElementById("moon-icon");

  // Check for saved theme and apply it
  if (savedTheme === "dark") {
    document.body.classList.add("dark-mode");
    sunIcon.style.display = "block"; // Show sun icon
    moonIcon.style.display = "none"; // Hide moon icon
  } else if (savedTheme === "light") {
    document.body.classList.remove("dark-mode");
    sunIcon.style.display = "none"; // Hide sun icon
    moonIcon.style.display = "block"; // Show moon icon
  } else {
    // Check system preference if no saved theme
    if (
      window.matchMedia &&
      window.matchMedia("(prefers-color-scheme: dark)").matches
    ) {
      document.body.classList.add("dark-mode");
      sunIcon.style.display = "block"; // Show sun icon
      moonIcon.style.display = "none"; // Hide moon icon
    } else {
      document.body.classList.remove("dark-mode");
      sunIcon.style.display = "none"; // Hide sun icon
      moonIcon.style.display = "block"; // Show moon icon
    }
  }
}

// Toggle dark mode function
function toggleDarkMode() {
  const currentTheme = localStorage.getItem("theme");

  if (currentTheme === "dark") {
    document.body.classList.remove("dark-mode");
    localStorage.setItem("theme", "light");
    loadTheme(); // Update icons accordingly
  } else {
    document.body.classList.add("dark-mode");
    localStorage.setItem("theme", "dark");
    loadTheme(); // Update icons accordingly
  }
}

// Event listener for the floating action button
document
  .getElementById("theme-toggle-fab")
  .addEventListener("click", toggleDarkMode);

// Call loadTheme on page load
loadTheme();
