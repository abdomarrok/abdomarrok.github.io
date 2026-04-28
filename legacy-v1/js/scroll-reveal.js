(function () {
    'use strict';

    // Prevent animations on page load
    document.body.classList.add('preload');

    window.addEventListener('load', function () {
        setTimeout(function () {
            document.body.classList.remove('preload');
        }, 500);
    });

    // Intersection Observer for Scroll Reveal Animations
    const observerOptions = {
        threshold: 0.1,
        rootMargin: '0px 0px -50px 0px'
    };

    const observer = new IntersectionObserver(function (entries) {
        entries.forEach(function (entry) {
            if (entry.isIntersecting) {
                entry.target.classList.add('reveal');
                // Optional: stop observing after reveal
                observer.unobserve(entry.target);
            }
        });
    }, observerOptions);

    // Observe all elements with animate-on-scroll class
    function initScrollReveal() {
        const elements = document.querySelectorAll('.animate-on-scroll');
        elements.forEach(function (el) {
            observer.observe(el);
        });
    }

    // Initialize on DOM ready
    if (document.readyState === 'loading') {
        document.addEventListener('DOMContentLoaded', initScrollReveal);
    } else {
        initScrollReveal();
    }

    // Scroll Progress Indicator (optional)
    function updateScrollProgress() {
        const scrollProgress = document.querySelector('.scroll-progress');
        if (!scrollProgress) return;

        const scrollTop = window.pageYOffset || document.documentElement.scrollTop;
        const scrollHeight = document.documentElement.scrollHeight - document.documentElement.clientHeight;
        const progress = (scrollTop / scrollHeight) * 100;

        scrollProgress.style.transform = 'scaleX(' + (progress / 100) + ')';

        if (scrollTop > 100) {
            scrollProgress.classList.add('visible');
        } else {
            scrollProgress.classList.remove('visible');
        }
    }

    // Throttle scroll event for performance
    let scrollTimeout;
    window.addEventListener('scroll', function () {
        if (scrollTimeout) {
            window.cancelAnimationFrame(scrollTimeout);
        }
        scrollTimeout = window.requestAnimationFrame(function () {
            updateScrollProgress();
        });
    });

    // Header glassmorphism on scroll
    function updateHeader() {
        const header = document.querySelector('.main-header');
        if (!header) return;

        if (window.scrollY > 50) {
            header.classList.add('scrolled');
        } else {
            header.classList.remove('scrolled');
        }
    }

    window.addEventListener('scroll', updateHeader);

})();
