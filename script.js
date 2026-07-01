// Inisialisasi Ikon Lucide saat halaman dimuat
document.addEventListener('DOMContentLoaded', () => {
    if (window.lucide) {
        window.lucide.createIcons();
    }
    
    // Panggil fungsi-fungsi utama
    initTheme();
    initNavbar();
    initTypewriter();
    initAboutTabs();
    initPortfolioFilter();
    initScrollReveal();
    initContactForm();
});

/* ==========================================
   1. PENGATURAN TEMA (DARK / LIGHT MODE)
   ========================================== */
function initTheme() {
    const themeToggle = document.getElementById('themeToggle');
    const body = document.body;
    
    // Default tema adalah dark mode (tanpa kelas light-theme)
    // Periksa apakah pengguna sebelumnya memilih mode terang
    const currentTheme = localStorage.getItem('theme');
    if (currentTheme === 'light') {
        body.classList.add('light-theme');
    }
    
    themeToggle.addEventListener('click', () => {
        body.classList.toggle('light-theme');
        
        // Simpan preferensi di localStorage
        if (body.classList.contains('light-theme')) {
            localStorage.setItem('theme', 'light');
        } else {
            localStorage.setItem('theme', 'dark');
        }
    });
}

/* ==========================================
   2. STICKY NAVBAR & MOBILE MENU
   ========================================== */
function initNavbar() {
    const header = document.querySelector('.header');
    const menuToggle = document.getElementById('menuToggle');
    const navMenu = document.getElementById('navMenu');
    const navLinks = document.querySelectorAll('.nav-link');
    
    // Efek mengecilkan Navbar saat Scroll
    window.addEventListener('scroll', () => {
        if (window.scrollY > 50) {
            header.classList.add('scrolled');
        } else {
            header.classList.remove('scrolled');
        }
        
        // Perbarui Nav Link Aktif berdasarkan Scroll Posisi
        updateActiveNavLink();
    });
    
    // Toggle Menu Mobile
    menuToggle.addEventListener('click', () => {
        navMenu.classList.toggle('open');
        const icon = menuToggle.querySelector('i');
        if (navMenu.classList.contains('open')) {
            icon.setAttribute('data-lucide', 'x');
        } else {
            icon.setAttribute('data-lucide', 'menu');
        }
        if (window.lucide) window.lucide.createIcons();
    });
    
    // Tutup menu jika link diklik
    navLinks.forEach(link => {
        link.addEventListener('click', () => {
            navMenu.classList.remove('open');
            const icon = menuToggle.querySelector('i');
            icon.setAttribute('data-lucide', 'menu');
            if (window.lucide) window.lucide.createIcons();
        });
    });
    
    function updateActiveNavLink() {
        const sections = document.querySelectorAll('section');
        const scrollPosition = window.scrollY + 200; // Offset
        
        sections.forEach(section => {
            const top = section.offsetTop;
            const height = section.offsetHeight;
            const id = section.getAttribute('id');
            
            if (scrollPosition >= top && scrollPosition < top + height) {
                navLinks.forEach(link => {
                    link.classList.remove('active');
                    if (link.getAttribute('href') === `#${id}`) {
                        link.classList.add('active');
                    }
                });
            }
        });
    }
}

/* ==========================================
   3. EFEK MENGETIK (TYPEWRITER)
   ========================================== */
function initTypewriter() {
    const typewriterElement = document.getElementById('typewriter');
    if (!typewriterElement) return;
    
    const words = ["Software Engineer", "UI/UX Designer", "Fullstack Developer"];
    let wordIndex = 0;
    let charIndex = 0;
    let isDeleting = false;
    let typingSpeed = 100;
    
    function type() {
        const currentWord = words[wordIndex];
        
        if (isDeleting) {
            // Hapus karakter
            typewriterElement.textContent = currentWord.substring(0, charIndex - 1);
            charIndex--;
            typingSpeed = 50; // Lebih cepat saat menghapus
        } else {
            // Tambah karakter
            typewriterElement.textContent = currentWord.substring(0, charIndex + 1);
            charIndex++;
            typingSpeed = 150; // Normal saat mengetik
        }
        
        // Logika transisi kata
        if (!isDeleting && charIndex === currentWord.length) {
            // Berhenti sejenak di akhir kata sebelum mulai menghapus
            typingSpeed = 2000;
            isDeleting = true;
        } else if (isDeleting && charIndex === 0) {
            isDeleting = false;
            wordIndex = (wordIndex + 1) % words.length;
            typingSpeed = 500; // Jeda sebelum mulai kata baru
        }
        
        setTimeout(type, typingSpeed);
    }
    
    // Mulai typewriter loop
    setTimeout(type, 500);
}

/* ==========================================
   4. TENTANG SAYA - TABS INTERAKTIF
   ========================================== */
function initAboutTabs() {
    const tabBtns = document.querySelectorAll('.tab-btn');
    const tabPanes = document.querySelectorAll('.tab-pane');
    
    // Animasi Progress Bar secara bertahap
    function animateProgressBars() {
        const activePane = document.querySelector('.tab-pane.active#skills');
        if (!activePane) return;
        
        const progressBars = activePane.querySelectorAll('.skill-progress');
        progressBars.forEach(bar => {
            const targetWidth = bar.getAttribute('data-width');
            bar.style.width = targetWidth;
        });
    }
    
    // Jalankan animasi pertama kali jika tab aktif adalah skill
    setTimeout(animateProgressBars, 300);
    
    tabBtns.forEach(btn => {
        btn.addEventListener('click', () => {
            const targetTab = btn.getAttribute('data-tab');
            
            // Nonaktifkan semua button & pane
            tabBtns.forEach(b => b.classList.remove('active'));
            tabPanes.forEach(p => p.classList.remove('active'));
            
            // Aktifkan button & pane target
            btn.classList.add('active');
            const targetPane = document.getElementById(targetTab);
            targetPane.classList.add('active');
            
            // Picu kembali animasi progress bar jika memilih tab keahlian
            if (targetTab === 'skills') {
                // Reset lebar dulu agar ada efek memanjang kembali
                const progressBars = targetPane.querySelectorAll('.skill-progress');
                progressBars.forEach(bar => bar.style.width = '0%');
                setTimeout(animateProgressBars, 50);
            }
        });
    });
}

/* ==========================================
   5. PEMFILTERAN PORTFOLIO (PROYEK)
   ========================================== */
function initPortfolioFilter() {
    const filterBtns = document.querySelectorAll('.filter-btn');
    const portfolioItems = document.querySelectorAll('.portfolio-item');
    
    filterBtns.forEach(btn => {
        btn.addEventListener('click', () => {
            const filterValue = btn.getAttribute('data-filter');
            
            // Perbarui tombol aktif
            filterBtns.forEach(b => b.classList.remove('active'));
            btn.classList.add('active');
            
            portfolioItems.forEach(item => {
                const itemCategory = item.getAttribute('data-category');
                
                // Animasi transisi filter
                if (filterValue === 'all' || itemCategory === filterValue) {
                    item.style.display = 'flex';
                    // Tambahkan sedikit delay untuk visual smooth
                    setTimeout(() => {
                        item.style.opacity = '1';
                        item.style.transform = 'scale(1)';
                    }, 50);
                } else {
                    item.style.opacity = '0';
                    item.style.transform = 'scale(0.8)';
                    setTimeout(() => {
                        item.style.display = 'none';
                    }, 300); // Harus sesuai dengan durasi transisi di CSS
                }
            });
        });
    });
}

/* ==========================================
   6. SCROLL REVEAL (INTERSECTION OBSERVER)
   ========================================== */
function initScrollReveal() {
    const reveals = document.querySelectorAll('.reveal');
    
    const observerOptions = {
        root: null,
        threshold: 0.15, // Memicu ketika 15% elemen terlihat
        rootMargin: '0px'
    };
    
    const observer = new IntersectionObserver((entries, observer) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                entry.target.classList.add('active');
                
                // Jika elemen yang terlihat memiliki bar keahlian, jalankan animasinya
                const skillsPane = entry.target.querySelector('#skills');
                if (skillsPane) {
                    const progressBars = skillsPane.querySelectorAll('.skill-progress');
                    progressBars.forEach(bar => {
                        const targetWidth = bar.getAttribute('data-width');
                        bar.style.width = targetWidth;
                    });
                }
                
                observer.unobserve(entry.target); // Hanya animasikan sekali
            }
        });
    }, observerOptions);
    
    reveals.forEach(reveal => {
        observer.observe(reveal);
    });
}

/* ==========================================
   7. FORMULIR KONTAK & TOAST SIMULATION
   ========================================== */
function initContactForm() {
    const contactForm = document.getElementById('contactForm');
    const toast = document.getElementById('toast');
    const toastMessage = document.getElementById('toastMessage');
    
    if (!contactForm) return;
    
    contactForm.addEventListener('submit', (e) => {
        e.preventDefault();
        
        const submitBtn = contactForm.querySelector('button[type="submit"]');
        const originalBtnText = submitBtn.innerHTML;
        
        // Ganti status tombol menjadi loading
        submitBtn.disabled = true;
        submitBtn.innerHTML = 'Mengirim... <i class="spinner-icon">⏳</i>';
        
        // Simulasi pengiriman data API (1.5 detik)
        setTimeout(() => {
            // Reset form
            contactForm.reset();
            
            // Pulihkan tombol
            submitBtn.disabled = false;
            submitBtn.innerHTML = originalBtnText;
            
            // Tampilkan Toast Sukses
            showToast('Pesan Anda berhasil dikirim! Terima kasih.');
        }, 1500);
    });
    
    function showToast(message) {
        toastMessage.textContent = message;
        toast.classList.add('show');
        
        // Sembunyikan kembali setelah 4 detik
        setTimeout(() => {
            toast.classList.remove('show');
        }, 4000);
    }
}
