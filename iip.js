// Data Proyek
const projectData = {
  gang: {
    title: "Website Gang Modern",
    desc: "Website ini dibuat untuk menampilkan informasi lingkungan dengan desain modern dan sederhana."
  },
  leonathanporto: {
    title: "Website Portofolio Leonathan",
    desc: "Representasi digital dari perjalanan kreatif di bidang videografi dan desain grafis."
  },
  tokoemme: {
    title: "Emme Shop",
    desc: "Toko online gadget pilihan yang mengutamakan kemudahan transaksi."
  }
};

document.addEventListener("DOMContentLoaded", () => {
  // --- Fitur Dark Mode ---
  const themeToggle = document.getElementById("themeToggle");
  const themeIcon = document.querySelector(".theme-icon");
  const themeText = document.querySelector(".theme-text");
  const themeColorMeta = document.querySelector('meta[name="theme-color"]');

  function setTheme(theme) {
    if (theme === "dark") {
      document.body.setAttribute("data-theme", "dark");
      if (themeIcon) themeIcon.textContent = "☾";
      if (themeText) themeText.textContent = "Dark";
      if (themeColorMeta) themeColorMeta.setAttribute("content", "#0c1220");
    } else {
      document.body.removeAttribute("data-theme");
      if (themeIcon) themeIcon.textContent = "☀";
      if (themeText) themeText.textContent = "Light";
      if (themeColorMeta) themeColorMeta.setAttribute("content", "#f5f7fb");
    }
    localStorage.setItem("theme", theme);
  }

  const savedTheme = localStorage.getItem("theme") || 
                     (window.matchMedia("(prefers-color-scheme: dark)").matches ? "dark" : "light");
  setTheme(savedTheme);

  themeToggle?.addEventListener("click", () => {
    const isDark = document.body.getAttribute("data-theme") === "dark";
    setTheme(isDark ? "light" : "dark");
  });

  // --- Animasi Scroll (Intersection Observer) ---
  const scrollObserver = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
      if (entry.isIntersecting) {
        entry.target.classList.add("show");
        scrollObserver.unobserve(entry.target); // Hanya animasi sekali
      }
    });
  }, { threshold: 0.1 });

  // Gabungkan semua elemen yang ingin dianimasikan
  const animateMe = document.querySelectorAll(".section, .project-card, .hero-card, .profile-card, .content-card");
  animateMe.forEach(el => {
    el.classList.add("fade-in");
    scrollObserver.observe(el);
  });

  // --- Fitur Modal ---
  const modal = document.getElementById("modal");
  const modalTitle = document.getElementById("modal-title");
  const modalDesc = document.getElementById("modal-desc");
  const closeBtn = document.querySelector(".close");

  document.querySelectorAll(".detail-btn").forEach(btn => {
    btn.addEventListener("click", () => {
      const key = btn.getAttribute("data-project");
      if (projectData[key]) {
        modalTitle.textContent = projectData[key].title;
        modalDesc.textContent = projectData[key].desc;
        modal.style.display = "flex";
      }
    });
  });

  const closeModal = () => modal.style.display = "none";
  closeBtn?.addEventListener("click", closeModal);
  window.addEventListener("click", (e) => { if (e.target === modal) closeModal(); });
});
