document.addEventListener('DOMContentLoaded', function() {
    // Matrix Effect
    const canvas = document.getElementById('matrix');
    const ctx = canvas.getContext('2d');

    function resizeCanvas() {
        canvas.width = window.innerWidth;
        canvas.height = window.innerHeight;
    }

    resizeCanvas();
    window.addEventListener('resize', resizeCanvas);

    // Karakter untuk efek matrix
    const chars = "01";
    const charsArray = chars.split('');

    const fontSize = 14;
    const columns = canvas.width / fontSize;

    // Array untuk melacak posisi y setiap kolom
    const drops = [];
    for (let i = 0; i < columns; i++) {
        drops[i] = Math.floor(Math.random() * canvas.height / fontSize);
    }

    function drawMatrix() {
        // Mengisi background dengan semi transparan untuk efek trail
        ctx.fillStyle = 'rgba(0, 0, 0, 0.04)';
        ctx.fillRect(0, 0, canvas.width, canvas.height);

        // Warna ungu neon untuk karakter
        ctx.fillStyle = '#8A2BE2';
        ctx.font = `${fontSize}px monospace`;

        for (let i = 0; i < drops.length; i++) {
            // Mengambil karakter acak
            const text = charsArray[Math.floor(Math.random() * charsArray.length)];

            // Menggambar karakter
            ctx.fillText(text, i * fontSize, drops[i] * fontSize);

            // Mengembalikan karakter ke atas setelah melewati batas dan secara acak
            if (drops[i] * fontSize > canvas.height && Math.random() > 0.975) {
                drops[i] = 0;
            }

            drops[i]++;
        }
    }

    // Jalankan efek matrix
    setInterval(drawMatrix, 35);

    // Typing Effect
    const typedTextElement = document.getElementById('typed-text');
    const text = "Fiona Surya Suci Ramadhani";
    let index = 0;

    function typeWriter() {
        if (index < text.length) {
            typedTextElement.innerHTML += text.charAt(index);
            index++;
            setTimeout(typeWriter, 100);
        }
    }

    // Start typing effect when home page is active
    const homePage = document.getElementById('home');
    const observer = new MutationObserver(function(mutations) {
        mutations.forEach(function(mutation) {
            if (mutation.attributeName === 'class') {
                if (homePage.classList.contains('active') && index === 0) {
                    typeWriter();
                }
            }
        });
    });

    observer.observe(homePage, { attributes: true });

    // Navigation
    const navLinks = document.querySelectorAll('.nav-link');
    const pages = document.querySelectorAll('.page');

    // Function to navigate to page
    function navigateToPage(pageId) {
        // Remove active class from all pages and nav links
        pages.forEach(page => page.classList.remove('active'));
        navLinks.forEach(link => link.classList.remove('active'));

        // Add active class to target page
        document.getElementById(pageId).classList.add('active');
        
        // Add active class to corresponding nav link
        const correspondingLink = document.querySelector(`.nav-link[href="#${pageId}"]`);
        if (correspondingLink) {
            correspondingLink.classList.add('active');
        }
    }

    // Add click event to all nav links
    navLinks.forEach(link => {
        link.addEventListener('click', function(e) {
            e.preventDefault();
            
            const targetId = this.getAttribute('href').substring(1);
            navigateToPage(targetId);
            
            // Close mobile menu if open
            closeMobileMenu();
        });
    });

    // Spotify Button
    const spotifyBtn = document.getElementById('spotify-btn');
    const musicPage = document.getElementById('music');

    spotifyBtn.addEventListener('click', function() {
        navigateToPage('music');
        closeMobileMenu();
    });

    // Skill Categories Accordion
    const categories = document.querySelectorAll('.category');

    categories.forEach(category => {
        const header = category.querySelector('.category-header');
        
        header.addEventListener('click', function() {
            category.classList.toggle('active');
        });
    });

    // Hamburger Menu for Mobile
    const hamburger = document.getElementById('hamburger');
    const mobileMenu = document.getElementById('nav-menu-mobile');

    function toggleMobileMenu() {
        mobileMenu.classList.toggle('active');
        // Animate hamburger bars
        hamburger.classList.toggle('active');
    }

    function closeMobileMenu() {
        mobileMenu.classList.remove('active');
        hamburger.classList.remove('active');
    }

    hamburger.addEventListener('click', function(e) {
        e.stopPropagation();
        toggleMobileMenu();
    });

    // Close mobile menu when clicking outside
    document.addEventListener('click', function(e) {
        if (!hamburger.contains(e.target) && !mobileMenu.contains(e.target)) {
            closeMobileMenu();
        }
    });

    // Close mobile menu on window resize (if resized to desktop)
    window.addEventListener('resize', function() {
        if (window.innerWidth > 768) {
            closeMobileMenu();
        }
    });

    // Initialize first page
    document.getElementById('home').classList.add('active');
});
