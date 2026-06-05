// Data Proyek
const projectData = {
  gang: {
    title: "Website Gang Modern",
    desc: "Sebuah platform informasi digital lokal yang saya bangun secara mandiri khusus untuk warga di lingkungan gang saya sendiri (Kejawan Putih Tambak IIA). Proyek ini lahir sebagai solusi nyata untuk memodernisasi dan mempermudah alur pertukaran informasi antarwarga, mendata UMKM lokal secara terpusat, serta menyajikan pengumuman lingkungan agar lebih transparan, cepat, dan mudah diakses oleh semua usia melalui perangkat mobile maupun desktop.",
    image: "1.png" 
  },
  leonathanporto: {
    title: "Website Portofolio Leonathan",
    desc: "Website galeri digital premium yang saya bangun khusus untuk membantu teman saya, seorang desainer & videografer, dalam memamerkan karya visualnya secara profesional. Di proyek ini, saya bertanggung jawab penuh atas perancangan UI responsif, optimasi performa loading media (foto/video), penyusunan navigasi yang seamless, hingga proses deployment akhir menggunakan GitHub Pages.",
    image: "2.png"
  },
  tokoemme: {
    title: "Emme Shop",
    desc: "Sebuah proyek eksperimen pribadi yang saya bangun untuk mengeksplorasi potensi dan kapabilitas Google Sites dalam pembuatan platform e-commerce modern. Di proyek ini, saya berfokus mempelajari integrasi layout yang bersih, penyusunan katalog perangkat gadget secara responsif, serta optimalisasi antarmuka pengguna (UI) agar platform tetap terasa ringan, interaktif, dan mudah dinavigasi untuk proses transaksi digital.",
    image: "3.png"
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

  const animateMe = document.querySelectorAll(".section, .project-card, .hero-card, .profile-card, .content-card");
  animateMe.forEach(el => {
    el.classList.add("fade-in");
    scrollObserver.observe(el);
  });

  // --- Fitur Modal ---
 const modal = document.getElementById("modal");
  const modalTitle = document.getElementById("modal-title");
  const modalDesc = document.getElementById("modal-desc");
  const modalImg = document.getElementById("modal-img"); 
  const modalImgLink = document.getElementById("modal-img-link"); 
  const closeBtn = document.querySelector(".close");

  document.querySelectorAll(".detail-btn").forEach(btn => {
    btn.addEventListener("click", () => {
      const key = btn.getAttribute("data-project");
      
      if (projectData[key]) {
        modalTitle.textContent = projectData[key].title;
        modalDesc.textContent = projectData[key].desc;
        
        if (modalImg && modalImgLink) {
          if (projectData[key].image) {
            modalImg.src = projectData[key].image; 
            modalImg.alt = `Pratinjau ${projectData[key].title}`;
            modalImg.style.display = "block";
            
            // NAH INI KUNCINYA COK: Link-nya diarahkan ke file gambarnya langsung!
            modalImgLink.href = projectData[key].image; 
          } else {
            modalImg.style.display = "none";
            modalImgLink.removeAttribute("href");
          }
        }

        modal.style.display = "flex";
        document.body.style.overflow = "hidden";
      }
    });
  });

  const closeModal = () => {
    modal.style.display = "none";
    document.body.style.overflow = "auto";
  };

  closeBtn?.addEventListener("click", closeModal);
  window.addEventListener("click", (e) => { if (e.target === modal) closeModal(); });
});
