const themeToggle = document.getElementById("themeToggle");
const themeIcon = document.querySelector(".theme-icon");
const themeText = document.querySelector(".theme-text");
const themeColorMeta = document.querySelector('meta[name="theme-color"]');

function setTheme(theme) {
  if (theme === "dark") {
    document.body.setAttribute("data-theme", "dark");
    themeIcon.textContent = "☾";
    themeText.textContent = "Dark";
    themeColorMeta.setAttribute("content", "#0c1220");
  } else {
    document.body.removeAttribute("data-theme");
    themeIcon.textContent = "☀";
    themeText.textContent = "Light";
    themeColorMeta.setAttribute("content", "#f5f7fb");
  }

  localStorage.setItem("theme", theme);
}

const savedTheme = localStorage.getItem("theme");
if (savedTheme) {
  setTheme(savedTheme);
} else {
  const prefersDark = window.matchMedia("(prefers-color-scheme: dark)").matches;
  setTheme(prefersDark ? "dark" : "light");
}

themeToggle.addEventListener("click", () => {
  const isDark = document.body.getAttribute("data-theme") === "dark";
  setTheme(isDark ? "light" : "dark");
});

const elements = document.querySelectorAll(".section, .project-card");

const observer = new IntersectionObserver(entries => {
  entries.forEach(entry => {
    if (entry.isIntersecting) {
      entry.target.classList.add("fade-in", "show");
    }
  });
});

elements.forEach(el => observer.observe(el));

const modal = document.getElementById("modal");
const modalTitle = document.getElementById("modal-title");
const modalDesc = document.getElementById("modal-desc");
const closeBtn = document.querySelector(".close");

const projectData = {
  gang: {
    title: "Website Gang Modern",
    desc: "Website ini dibuat untuk menampilkan informasi lingkungan dengan desain modern dan sederhana agar mudah diakses semua orang."
  },
  leonathanporto: {
    title: "Website Portofolio Leonathan",
    desc: "Representasi digital dari perjalanan kreatif seorang santri yang bergerak di bidang videografi dan desain grafis. Website ini menampilkan karya visual yang memadukan estetika modern dengan pesan bermakna, dirancang dengan antarmuka yang sederhana namun tetap elegan demi kenyamanan pengguna."
  },
  tokoemme: {
    title: "Emme Shop",
    desc: "Toko online gadget pilihan yang mengutamakan kemudahan transaksi. Menampilkan antarmuka yang bersih dan responsif, memudahkan pengguna untuk menemukan perangkat impian mereka kapan saja dan di mana saja."
  }
};

document.querySelectorAll(".detail-btn").forEach(btn => {
  btn.addEventListener("click", () => {
    const key = btn.getAttribute("data-project");
    modalTitle.textContent = projectData[key].title;
    modalDesc.textContent = projectData[key].desc;
    modal.style.display = "flex";
  });
});

closeBtn.addEventListener("click", () => {
  modal.style.display = "none";
});

window.addEventListener("click", (e) => {
  if (e.target === modal) {
    modal.style.display = "none";
  }
});

document.addEventListener("DOMContentLoaded", function() {
  // 1. Pilih semua elemen utama yang ingin dianimasikan secara otomatis
  // (Saya pilihkan elemen berukuran sedang-besar agar animasinya tidak terlihat norak)
  const autoAnimateElements = document.querySelectorAll(`
    .hero-card, 
    .profile-card, 
    .content-card, 
    .project-card, 
    .section-head, 
    .stats div,
    .contact-icons a
  `);

  // 2. Buat pengawas (Observer)
  const observer = new IntersectionObserver((entries) => {
    entries.forEach((entry) => {
      // Jika elemen masuk ke layar, tambahkan class 'show'
      if (entry.isIntersecting) {
        entry.target.classList.add('show');
        
        // Opsional: Hentikan pantauan setelah animasi selesai agar tidak berulang & menghemat baterai HP
        observer.unobserve(entry.target); 
      }
    });
  }, { 
    threshold: 0.1 // Mulai animasi saat 10% bagian elemen muncul di layar
  });

  // 3. Tempelkan class 'fade-in' secara otomatis dan mulai pantau
  autoAnimateElements.forEach((el) => {
    el.classList.add('fade-in');
    observer.observe(el);
  });
});
