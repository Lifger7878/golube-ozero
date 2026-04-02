// script.js

// Mobile navigation function
const mobileNavToggle = () => {
    const nav = document.querySelector('.nav');
    const toggleButton = document.querySelector('.nav-toggle');

    toggleButton.addEventListener('click', () => {
        nav.classList.toggle('is-active');
    });
};

// Scroll animations using Intersection Observer API
const animateOnScroll = () => {
    const elements = document.querySelectorAll('.animate');
    const observerOptions = {
        root: null,
        threshold: 0.1
    };

    const observerCallback = (entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                entry.target.classList.add('fade-in');
                observer.unobserve(entry.target);
            }
        });
    };

    const observer = new IntersectionObserver(observerCallback, observerOptions);
    elements.forEach(element => observer.observe(element));
};

// Enhanced modal gallery functionality
const initModalGallery = () => {
    const modals = document.querySelectorAll('.modal');
    const images = document.querySelectorAll('.gallery img');
    const closeButtons = document.querySelectorAll('.modal-close');

    images.forEach((image, index) => {
        image.addEventListener('click', () => {
            modals[index].classList.add('is-active');
            document.body.style.overflow = 'hidden'; // prevent scrolling behind the modal
        });
    });

    closeButtons.forEach((button, index) => {
        button.addEventListener('click', () => {
            modals[index].classList.remove('is-active');
            document.body.style.overflow = 'auto';
        });
    });

    // Keyboard navigation
    document.addEventListener('keyup', (event) => {
        if (event.key === "Escape") {
            modals.forEach(modal => modal.classList.remove('is-active'));
            document.body.style.overflow = 'auto';
        }
    });
};

// Touch support for modal gallery
const handleTouch = () => {
    const modals = document.querySelectorAll('.modal');
    modals.forEach(modal => {
        modal.addEventListener('touchstart', (e) => {
            const touch = e.touches[0];
            const modalImage = modal.querySelector('img');
            if (touch) {
               const bounds = modalImage.getBoundingClientRect();
               if (touch.clientX < bounds.left || touch.clientX > bounds.right ||
                   touch.clientY < bounds.top || touch.clientY > bounds.bottom) {
                   modal.classList.remove('is-active');
               }
            }
        });
    });
};

// Initialize functions
const init = () => {
    mobileNavToggle();
    animateOnScroll();
    initModalGallery();
    handleTouch();
};

// Run initialization
document.addEventListener('DOMContentLoaded', init);