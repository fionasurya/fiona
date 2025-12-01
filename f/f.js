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

    navLinks.forEach(link => {
        link.addEventListener('click', function(e) {
            e.preventDefault();
            
            // Remove active class from all links and pages
            navLinks.forEach(l => l.classList.remove('active'));
            pages.forEach(page => page.classList.remove('active'));

            // Add active class to clicked link
            this.classList.add('active');

            // Show corresponding page
            const targetId = this.getAttribute('href').substring(1);
            document.getElementById(targetId).classList.add('active');
        });
    });

    // Spotify Button
    const spotifyBtn = document.getElementById('spotify-btn');
    const musicPage = document.getElementById('music');

    spotifyBtn.addEventListener('click', function() {
        // Hide all pages and remove active class from all nav links
        pages.forEach(page => page.classList.remove('active'));
        navLinks.forEach(link => link.classList.remove('active'));

        // Show music page
        musicPage.classList.add('active');
    });

    // Skill Categories Accordion
    const categories = document.querySelectorAll('.category');

    categories.forEach(category => {
        const header = category.querySelector('.category-header');
        
        header.addEventListener('click', function() {
            category.classList.toggle('active');
        });
    });

// Jika ingin menampilkan alert dan tetap membuka maps
const locationLink = document.getElementById('location-link');
locationLink.addEventListener('click', function(e) {
    // Tidak menggunakan preventDefault(), jadi link tetap terbuka
    alert('Lokasi: SMK 1 Nglegok - Jl. Raya Nglegok No.1, Nglegok, Kec. Nglegok, Kabupaten Blitar, Jawa Timur 66181');
    // Biarkan link terbuka secara normal
});
    // Initialize first page
    document.getElementById('home').classList.add('active');
});