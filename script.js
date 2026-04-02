// ===== НАВІГАЦІЯ МОБІЛЬНА ВЕРСІЯ =====
document.addEventListener('DOMContentLoaded', () => {
    const navToggle = document.getElementById('navToggle');
    const navMenu = document.getElementById('navMenu');
    const navLinks = document.querySelectorAll('.nav-link');

    // Меню мобільної версії
    if (navToggle) {
        navToggle.addEventListener('click', () => {
            navMenu.classList.toggle('active');
        });

        // Закриття меню при натисканні на посилання
        navLinks.forEach(link => {
            link.addEventListener('click', () => {
                navMenu.classList.remove('active');
            });
        });
    }

    // ===== АНІМАЦІЯ ПРОКРУЧУВАННЯ =====
    const reveals = document.querySelectorAll('.reveal');
    const observer = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                entry.target.classList.add('active');
                observer.unobserve(entry.target);
            }
        });
    }, { threshold: 0.1 });

    reveals.forEach(reveal => observer.observe(reveal));

    // ===== МОДАЛЬНА ГАЛЕРЕЯ =====
    const modal = document.getElementById('modal');
    const modalImg = document.getElementById('modal-img');
    const modalClose = document.querySelector('.modal-close');
    const modalNext = document.querySelector('.modal-next');
    const modalPrev = document.querySelector('.modal-prev');
    let currentImageIndex = 0;
    let allImages = [];

    function updateAllImages() {
        allImages = Array.from(document.querySelectorAll('.card img')).map(img => img.src);
    }

    function openModal(src) {
        updateAllImages();
        currentImageIndex = allImages.indexOf(src);
        modalImg.src = src;
        modal.classList.add('active');
        document.body.style.overflow = 'hidden';
    }

    function closeModal() {
        modal.classList.remove('active');
        document.body.style.overflow = 'auto';
    }

    function showNextImage() {
        currentImageIndex = (currentImageIndex + 1) % allImages.length;
        modalImg.src = allImages[currentImageIndex];
    }

    function showPrevImage() {
        currentImageIndex = (currentImageIndex - 1 + allImages.length) % allImages.length;
        modalImg.src = allImages[currentImageIndex];
    }

    // Обробники для кликів на карти
    document.querySelectorAll('.btn-view').forEach(btn => {
        btn.addEventListener('click', (e) => {
            const card = e.target.closest('.card');
            const img = card.querySelector('img');
            openModal(img.src);
        });
    });

    // Обробники для модального вікна
    modalClose.addEventListener('click', closeModal);
    modal.addEventListener('click', (e) => {
        if (e.target === modal) closeModal();
    });
    modalNext.addEventListener('click', showNextImage);
    modalPrev.addEventListener('click', showPrevImage);

    // Клавіатурна навігація в модалі
    document.addEventListener('keydown', (e) => {
        if (modal.classList.contains('active')) {
            if (e.key === 'Escape') closeModal();
            if (e.key === 'ArrowRight') showNextImage();
            if (e.key === 'ArrowLeft') showPrevImage();
        }
    });

    // ===== ПЛАВНА ПРОКРУТКА ДО ЯКОРІВ =====
    document.querySelectorAll('a[href^="#"]').forEach(anchor => {
        anchor.addEventListener('click', function(e) {
            e.preventDefault();
            const target = document.querySelector(this.getAttribute('href'));
            if (target) {
                target.scrollIntoView({ behavior: 'smooth' });
            }
        });
    });
});
