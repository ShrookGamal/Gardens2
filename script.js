document.addEventListener('DOMContentLoaded', () => {
    const menuToggle = document.getElementById('mobile-menu');
    const mobileNav = document.getElementById('mobile-nav-content');
    const menuIcon = menuToggle.querySelector('i');

    menuToggle.addEventListener('click', () => {
        mobileNav.classList.toggle('active');
        if (mobileNav.classList.contains('active')) {
            menuIcon.classList.replace('fa-bars', 'fa-times');
        } else {
            menuIcon.classList.replace('fa-times', 'fa-bars');
        }
    });
    const header = document.querySelector('header');
    
    const handleHeaderScroll = () => {
        if (window.scrollY > 50) {
            header.classList.add('scrolled');
        } else {
            header.classList.remove('scrolled');
        }
    };

    const sections = document.querySelectorAll('section[id]');
    const navLinks = document.querySelectorAll('.nav-links li a');
    const scrollSpy = () => {
        const scrollY = window.pageYOffset;

        sections.forEach(current => {
            const sectionHeight = current.offsetHeight;
            const sectionTop = current.offsetTop - 100; 
            const sectionId = current.getAttribute('id');
            const activeLink = document.querySelector(`.nav-links a[href*="${sectionId}"]`);

            if (scrollY > sectionTop && scrollY <= sectionTop + sectionHeight) {
                navLinks.forEach(link => link.classList.remove('active'));
                if (activeLink) activeLink.classList.add('active');
            }
        });
    };
    window.addEventListener('scroll', () => {
        handleHeaderScroll();
        scrollSpy();
    });

    document.querySelectorAll('a[href^="#"]').forEach(anchor => {
        anchor.addEventListener('click', function(e) {
            const targetId = this.getAttribute('href');
                if (targetId !== "#") {
                e.preventDefault();
                const targetSection = document.querySelector(targetId);
                
                if (targetSection) {
                    
                    mobileNav.classList.remove('active');
                    menuIcon.classList.replace('fa-times', 'fa-bars');

                    
                    window.scrollTo({
                        top: targetSection.offsetTop - 80, 
                        behavior: 'smooth'
                    });
                }
            }
        });
    });

    
    const observerOptions = {
        threshold: 0.15 
    };

    const observer = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                entry.target.classList.add('active');
                observer.unobserve(entry.target);
            }
        });
    }, observerOptions);
    document.querySelectorAll('.animate-on-scroll').forEach((el) => {
        observer.observe(el);
    });

});