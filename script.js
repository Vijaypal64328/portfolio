const roles = ["Developer...", "Designer....", "Photographer", "Freelancer.."];
    let index = 0;
    let charIndex = 0;
    const typedText = document.getElementById("typed-text");

    function type() {
      if (index < roles.length) {
        if (charIndex < roles[index].length) {
          typedText.textContent += roles[index][charIndex];
          charIndex++;
          setTimeout(type, 100);
        } else {
          setTimeout(() => {
            typedText.textContent = "";
            charIndex = 0;
            index = (index + 1) % roles.length;
            setTimeout(type, 500);
          }, 1000);
        }
      }
    }
    type();

    function toggleMenu(event) {
      event.stopPropagation();
      const menu = document.getElementById("mobileMenu");
      menu.style.display = menu.style.display === "flex" ? "none" : "flex";
    }

    function closeMenuOnOutsideClick(event) {
      const menu = document.getElementById("mobileMenu");
      const menuIcon = document.querySelector(".menu-icon");
      if (!menu.contains(event.target) && event.target !== menuIcon) {
        menu.style.display = "none";
      }
    }
   // form submission logic
    document.querySelector('#contact form').addEventListener('submit', function (e) {
      // Optionally, you can show a message before the form submits
      // Do not call e.preventDefault(); so the form submits to FormSubmit

      const form = this;
      setTimeout(() => {
        form.reset();
        alert("Your message has been sent successfully!");
      }, 100);
    });

    // --- FIXED SCROLL BUTTON LOGIC ---
    function scrollNextSection() {
      // Get all sections in DOM order
      const sections = Array.from(document.querySelectorAll("section"));
      // Find the section closest to the top (but not above)
      let currentSectionIndex = 0;
      for (let i = 0; i < sections.length; i++) {
        const rect = sections[i].getBoundingClientRect();
        if (rect.top <= window.innerHeight * 0.5 && rect.bottom > window.innerHeight * 0.2) {
          currentSectionIndex = i;
          break;
        }
      }
      // Scroll to next section, or to first if at the end
      if (currentSectionIndex < sections.length - 1) {
        sections[currentSectionIndex + 1].scrollIntoView({ behavior: "smooth" });
      } else {
        sections[0].scrollIntoView({ behavior: "smooth" });
      }
    }

    window.addEventListener("scroll", () => {
      const scrollBtn = document.getElementById("scrollBtn");
      const sections = Array.from(document.querySelectorAll("section"));
      let currentSectionIndex = 0;
      for (let i = 0; i < sections.length; i++) {
        const rect = sections[i].getBoundingClientRect();
        if (rect.top <= window.innerHeight * 0.5 && rect.bottom > window.innerHeight * 0.2) {
          currentSectionIndex = i;
          break;
        }
      }
      if (currentSectionIndex < sections.length - 1) {
        scrollBtn.innerHTML = "▼ Scroll Down";
      } else {
        scrollBtn.innerHTML = "▲ Scroll Up";
      }
    });

    // --- END FIX ---

    let autoScrollInterval = null;
    let currentProjectIndex = 0;

    function autoScrollProjects() {
      const container = document.querySelector('.projects-container');
      const cards = container.querySelectorAll('.project-card');
      if (cards.length === 0) return;

      currentProjectIndex = (currentProjectIndex + 1) % cards.length;
      const card = cards[currentProjectIndex];
      card.scrollIntoView({ behavior: 'smooth', inline: 'start' });
    }

    function startAutoScrollProjects() {
      if (!autoScrollInterval) {
        autoScrollInterval = setInterval(autoScrollProjects, 4000);
      }
    }

    function stopAutoScrollProjects() {
      if (autoScrollInterval) {
        clearInterval(autoScrollInterval);
        autoScrollInterval = null;
      }
    }

    function isElementInViewport(el) {
      const rect = el.getBoundingClientRect();
      return (
        rect.top < window.innerHeight &&
        rect.bottom > 0
      );
    }

    let myWorkActivated = false;
    window.addEventListener('scroll', function () {
      const myWorkSection = document.getElementById('work');
      if (isElementInViewport(myWorkSection)) {
        if (!myWorkActivated) {
          myWorkActivated = true;

          setTimeout(startAutoScrollProjects, 1200);
        }
      } else {
        stopAutoScrollProjects();
        myWorkActivated = false;
      }
    });

    // --- MODIFICATION: Pause auto-scroll on project card hover ---
    document.addEventListener('DOMContentLoaded', function () {
      const container = document.querySelector('.projects-container');
      if (!container) return;
      const cards = container.querySelectorAll('.project-card');
      cards.forEach(card => {
        card.addEventListener('mouseenter', stopAutoScrollProjects);
        card.addEventListener('mouseleave', function () {
          // Only restart if section is in view
          const myWorkSection = document.getElementById('work');
          if (isElementInViewport(myWorkSection)) {
            startAutoScrollProjects();
          }
        });
      });
    });
