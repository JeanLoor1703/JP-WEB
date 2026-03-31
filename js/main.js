document.addEventListener('DOMContentLoaded', () => {
    // ===== Mobile Menu Toggle =====
    const mobileMenuBtn = document.getElementById('mobile-menu-btn');
    const mobileMenu = document.getElementById('mobile-menu');
    const menuIcon = document.getElementById('menu-icon');

    if (mobileMenuBtn && mobileMenu && menuIcon) {
        mobileMenuBtn.addEventListener('click', () => {
            mobileMenu.classList.toggle('hidden');
            if (mobileMenu.classList.contains('hidden')) {
                menuIcon.className = 'fas fa-bars';
            } else {
                menuIcon.className = 'fas fa-times';
            }
        });
    }

    // ===== FAQ Accordion =====
    document.querySelectorAll('.accordion-btn').forEach(btn => {
        btn.addEventListener('click', () => {
            const content = btn.nextElementSibling;
            const icon = btn.querySelector('.fa-chevron-down');

            // Close all others
            document.querySelectorAll('.accordion-content').forEach(c => {
                if (c !== content) {
                    c.classList.remove('active');
                    const otherIcon = c.previousElementSibling.querySelector('.fa-chevron-down');
                    if (otherIcon) otherIcon.style.transform = 'rotate(0deg)';
                }
            });

            if (content) {
                content.classList.toggle('active');
                if (icon) {
                    icon.style.transform = content.classList.contains('active') ? 'rotate(180deg)' : 'rotate(0deg)';
                }
            }
        });
    });

    // ===== Smooth Scroll + Close Mobile Menu =====
    document.querySelectorAll('a[href^="#"]').forEach(anchor => {
        anchor.addEventListener('click', function (e) {
            e.preventDefault();
            const target = document.querySelector(this.getAttribute('href'));
            if (target) {
                target.scrollIntoView({ behavior: 'smooth', block: 'start' });
                if (mobileMenu && menuIcon) {
                    mobileMenu.classList.add('hidden');
                    menuIcon.className = 'fas fa-bars';
                }
            }
        });
    });

    // ===== Header Scroll Effect =====
    window.addEventListener('scroll', () => {
        const header = document.getElementById('header');
        if (header) {
            if (window.scrollY > 80) {
                header.classList.add('shadow-lg', 'bg-sapphire/95');
            } else {
                header.classList.remove('shadow-lg');
            }
        }
    });

    // ===== Portfolio Filter =====
    const filterBtns = document.querySelectorAll('.filter-btn');
    const portfolioItems = document.querySelectorAll('.portfolio-item');

    filterBtns.forEach(btn => {
        btn.addEventListener('click', () => {
            // Update active button
            filterBtns.forEach(b => b.classList.remove('active'));
            btn.classList.add('active');

            const filter = btn.dataset.filter;

            portfolioItems.forEach(item => {
                const category = item.dataset.category;

                if (filter === 'all' || category === filter) {
                    item.classList.remove('hidden-item');
                    item.classList.add('visible-item');
                } else {
                    item.classList.remove('visible-item');
                    item.classList.add('hidden-item');
                }
            });
        });
    });

    // Make functions global so they can be accessed from inline onclick handlers in HTML
    window.openLightbox = function(card) {
        const img = card.querySelector('img');
        const title = card.querySelector('h3');
        const desc = card.querySelector('p');

        document.getElementById('lightbox-img').src = img.src;
        document.getElementById('lightbox-title').textContent = title.textContent;
        document.getElementById('lightbox-desc').textContent = desc.textContent;
        document.getElementById('lightbox').classList.add('active');
        document.body.style.overflow = 'hidden';
    };

    window.closeLightbox = function(e) {
        document.getElementById('lightbox').classList.remove('active');
        document.body.style.overflow = '';
    };

    // Close on Escape key
    document.addEventListener('keydown', (e) => {
        if (e.key === 'Escape') {
            const lightbox = document.getElementById('lightbox');
            if (lightbox && lightbox.classList.contains('active')) {
                window.closeLightbox();
            }
        }
    });

    window.toggleVideoSound = function(card) {
        const video = card.querySelector('video');
        const icon = card.querySelector('.sound-icon');

        if (video.muted) {
            // Mute all other videos first
            document.querySelectorAll('.video-card video').forEach(v => {
                v.muted = true;
                const otherIcon = v.closest('.video-card').querySelector('.sound-icon');
                if (otherIcon) {
                    otherIcon.className = 'fas fa-volume-up text-sapphire text-xl sound-icon';
                }
            });

            video.muted = false;
            if (icon) icon.className = 'fas fa-volume-mute text-sapphire text-xl sound-icon';
        } else {
            video.muted = true;
            if (icon) icon.className = 'fas fa-volume-up text-sapphire text-xl sound-icon';
        }
    };

    // ===== Autoplay videos when visible (Intersection Observer) =====
    const videoObserver = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            const video = entry.target.querySelector('video');
            if (video) {
                if (entry.isIntersecting) {
                    video.play().catch(() => { });
                } else {
                    video.pause();
                    video.muted = true;
                    const icon = entry.target.querySelector('.sound-icon');
                    if (icon) icon.className = 'fas fa-volume-up text-sapphire text-xl sound-icon';
                }
            }
        });
    }, { threshold: 0.3 });

    document.querySelectorAll('.video-card').forEach(card => {
        videoObserver.observe(card);
    });
});
