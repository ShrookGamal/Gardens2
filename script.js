document.addEventListener('DOMContentLoaded', () => {

    // 1. التحكم في قائمة الموبايل (Hamburger Menu)
    const menuToggle = document.getElementById('mobile-menu');
    const mobileNav = document.getElementById('mobile-nav-content');
    const menuIcon = menuToggle.querySelector('i');

    menuToggle.addEventListener('click', () => {
        mobileNav.classList.toggle('active');
        
        // تبديل الأيقونة بين Bars و X
        if (mobileNav.classList.contains('active')) {
            menuIcon.classList.replace('fa-bars', 'fa-times');
        } else {
            menuIcon.classList.replace('fa-times', 'fa-bars');
        }
    });

    // 2. التحكم في الهيدر عند التمرير (تغيير الخلفية والطول)
    const header = document.querySelector('header');
    
    const handleHeaderScroll = () => {
        if (window.scrollY > 50) {
            header.classList.add('scrolled');
        } else {
            header.classList.remove('scrolled');
        }
    };

    // 3. وظيفة ScrollSpy (تحديث الرابط النشط تلقائياً أثناء التمرير)
    const sections = document.querySelectorAll('section[id]');
    const navLinks = document.querySelectorAll('.nav-links li a');

    const scrollSpy = () => {
        const scrollY = window.pageYOffset;

        sections.forEach(current => {
            const sectionHeight = current.offsetHeight;
            const sectionTop = current.offsetTop - 100; // إزاحة لتناسب الهيدر الثابت
            const sectionId = current.getAttribute('id');
            
            // تحديد الرابط المناسب للسكشن الحالي
            const activeLink = document.querySelector(`.nav-links a[href*="${sectionId}"]`);

            if (scrollY > sectionTop && scrollY <= sectionTop + sectionHeight) {
                navLinks.forEach(link => link.classList.remove('active'));
                if (activeLink) activeLink.classList.add('active');
            }
        });
    };

    // دمج وظائف السكرول في مستمع واحد لتحسين الأداء
    window.addEventListener('scroll', () => {
        handleHeaderScroll();
        scrollSpy();
    });

    // 4. التنقل الناعم (Smooth Scroll) عند الضغط على الروابط
    document.querySelectorAll('a[href^="#"]').forEach(anchor => {
        anchor.addEventListener('click', function(e) {
            const targetId = this.getAttribute('href');
            
            // التأكد أن الرابط ليس مجرد #
            if (targetId !== "#") {
                e.preventDefault();
                const targetSection = document.querySelector(targetId);
                
                if (targetSection) {
                    // إغلاق قائمة الموبايل إذا كانت مفتوحة
                    mobileNav.classList.remove('active');
                    menuIcon.classList.replace('fa-times', 'fa-bars');

                    // التمرير السلس للمكان المطلوب
                    window.scrollTo({
                        top: targetSection.offsetTop - 80, // تعويض ارتفاع الهيدر
                        behavior: 'smooth'
                    });
                }
            }
        });
    });

    // 5. أنميشن ظهور العناصر عند التمرير (Intersection Observer)
    const observerOptions = {
        threshold: 0.15 // تفعيل الأنميشن لما يظهر 15% من العنصر
    };

    const observer = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                entry.target.classList.add('active');
                // بمجرد ظهور العنصر لا نحتاج لمراقبته مرة أخرى
                observer.unobserve(entry.target);
            }
        });
    }, observerOptions);

    // استهداف كل العناصر التي تحمل كلاس الأنميشن
    document.querySelectorAll('.animate-on-scroll').forEach((el) => {
        observer.observe(el);
    });

});