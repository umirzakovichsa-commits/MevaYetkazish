// Fruit Data
const fruits = [
    {
        id: 1,
        name: "Qizil Olma",
        category: "urugli",
        categoryLabel: "Urug'li meva",
        image: "assets/apple.jpg",
        description: "Tabiiy va sharbatga boy qizil olmalar. Salomatlik uchun juda foydali, tarkibida temir va vitaminlar ko'p."
    },
    {
        id: 2,
        name: "Shirin Banan",
        category: "tropik",
        categoryLabel: "Tropik meva",
        image: "assets/banana.jpg",
        description: "Pishib yetilgan, shirin va xushbo'y bananlar. Energiya beruvchi va organizm uchun eng foydali tropik meva."
    },
    {
        id: 3,
        name: "Sarxil Apelsin",
        category: "sitrus",
        categoryLabel: "Sitrus meva",
        image: "assets/orange.jpg",
        description: "Sitrus mevalarining eng sarasi. C vitaminiga boy, immunitetni ko'taruvchi va juda tetiklashtiruvchi shirin apelsinlar."
    },
    {
        id: 4,
        name: "Shirin Qulupnay",
        category: "rezavor",
        categoryLabel: "Rezavor meva",
        image: "assets/strawberry.jpg",
        description: "Xushbo'y hidli va shirin ta'mli qulupnaylar. Yozning eng sevimli rezavor mevasi, tabiiy sharoitda yetishtirilgan."
    },
    {
        id: 5,
        name: "Sarxil Uzum",
        category: "rezavor",
        categoryLabel: "Rezavor meva",
        image: "assets/grapes.jpg",
        description: "Bog'larimizdan yangi uzilgan sarxil uzumlar. Shirin ta'm va vitaminlarga boy, dasturxoningiz ko'rki."
    },
    {
        id: 6,
        name: "Katta Tarvuz",
        category: "poliz",
        categoryLabel: "Poliz mahsuloti",
        image: "assets/watermelon.jpg",
        description: "Yozning eng sarxil va chanqoqbosar mevasi. Qip-qizil, shirin va suvli tarvuzlar bevosita polizdan keltiriladi."
    }
];

// DOM Elements
const fruitsGrid = document.getElementById('fruitsGrid');
const searchInput = document.getElementById('searchInput');
const categoriesContainer = document.getElementById('categoriesContainer');
const emptyState = document.getElementById('emptyState');
const header = document.querySelector('.header');
const mobileMenuToggle = document.getElementById('mobileMenuToggle');
const mobileNav = document.getElementById('mobileNav');
const mobileNavOverlay = document.getElementById('mobileNavOverlay');
const navLinks = document.querySelectorAll('.nav-link');
const mobileNavLinks = document.querySelectorAll('.mobile-nav-link');

// Filter State
let currentCategory = 'all';
let searchQuery = '';

// ==========================================================================
// RENDER FRUITS
// ==========================================================================
function renderFruits() {
    // Filter fruits
    const filteredFruits = fruits.filter(fruit => {
        const matchesCategory = currentCategory === 'all' || fruit.category === currentCategory;
        const matchesSearch = fruit.name.toLowerCase().includes(searchQuery.toLowerCase()) || 
                              fruit.description.toLowerCase().includes(searchQuery.toLowerCase());
        return matchesCategory && matchesSearch;
    });

    // Clear Grid
    fruitsGrid.innerHTML = '';

    // Show/Hide Empty State
    if (filteredFruits.length === 0) {
        emptyState.style.display = 'block';
        fruitsGrid.style.display = 'none';
        return;
    } else {
        emptyState.style.display = 'none';
        fruitsGrid.style.display = 'grid';
    }

    // Generate Card Elements
    filteredFruits.forEach((fruit, index) => {
        const card = document.createElement('div');
        card.className = 'fruit-card';
        card.style.opacity = '0';
        card.style.transform = 'translateY(20px)';
        card.style.transition = `opacity 0.4s ease, transform 0.4s ease`;
        card.style.transitionDelay = `${index * 0.05}s`;

        // Create telegram direct link with default text for user's profile
        const encodedText = encodeURIComponent(`Salom! Men "${fruit.name}" mevasining narxini bilmoqchi edim.`);
        // Note: personal profile links do not directly support starting chat with message automatically,
        // but this shows intent and redirects clean to Telegram.
        const tgLink = `https://t.me/jajji_chikko`;

        card.innerHTML = `
            <div class="card-img-wrapper">
                <span class="card-badge">${fruit.categoryLabel}</span>
                <img src="${fruit.image}" alt="${fruit.name}" class="card-img" loading="lazy">
            </div>
            <div class="card-body">
                <h3 class="card-title">${fruit.name}</h3>
                <p class="card-desc">${fruit.description}</p>
                <a href="${tgLink}" target="_blank" rel="noopener noreferrer" class="btn btn-primary btn-card-action">
                    <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="currentColor" class="icon">
                        <path d="M12 2C6.48 2 2 6.48 2 12s4.48 10 10 10 10-4.48 10-10S17.52 2 12 2Zm4.64 6.8c-.15 1.58-.8 5.42-1.13 7.19-.14.75-.42 1-.68 1.03-.58.05-1.02-.38-1.58-.75-.88-.58-1.38-.94-2.23-1.5-.99-.65-.35-1.01.22-1.59.15-.15 2.71-2.48 2.76-2.69.01-.03.01-.14-.07-.2-.08-.06-.19-.04-.27-.02-.12.02-1.95 1.23-5.51 3.63-.52.36-.97.53-1.35.52-.42-.01-1.23-.24-1.83-.43-.74-.24-1.33-.37-1.28-.79.03-.22.33-.45.91-.69 3.56-1.55 5.93-2.57 7.12-3.07 3.39-1.42 4.09-1.66 4.55-1.67.1.01.33.03.48.15.13.1.17.24.18.34.02.09.01.23-.01.29Z"/>
                    </svg>
                    <span>Narxni aniqlashtirish</span>
                </a>
            </div>
        `;

        fruitsGrid.appendChild(card);

        // Trigger animation in next frame
        requestAnimationFrame(() => {
            card.style.opacity = '1';
            card.style.transform = 'translateY(0)';
        });
    });
}

// ==========================================================================
// SEARCH & FILTER HANDLERS
// ==========================================================================
// Search Event Listener
searchInput.addEventListener('input', (e) => {
    searchQuery = e.target.value;
    renderFruits();
});

// Category Click Event Listener
categoriesContainer.addEventListener('click', (e) => {
    if (e.target.classList.contains('category-btn')) {
        // Update active class
        document.querySelectorAll('.category-btn').forEach(btn => {
            btn.classList.remove('active');
        });
        e.target.classList.add('active');

        // Update state and re-render
        currentCategory = e.target.getAttribute('data-category');
        renderFruits();
    }
});

// ==========================================================================
// SCROLL EFFECTS (HEADER STICKY & ACTIVE SECTIONS)
// ==========================================================================
window.addEventListener('scroll', () => {
    // Header shadow/blur on scroll
    if (window.scrollY > 50) {
        header.classList.add('scrolled');
        header.style.boxShadow = '0 10px 30px rgba(18, 31, 21, 0.08)';
        header.style.height = '70px';
    } else {
        header.classList.remove('scrolled');
        header.style.boxShadow = 'none';
        header.style.height = '80px';
    }

    // Active link highlighting
    let currentSection = '';
    const sections = document.querySelectorAll('section');
    sections.forEach(section => {
        const sectionTop = section.offsetTop;
        const sectionHeight = section.clientHeight;
        if (window.scrollY >= (sectionTop - 120)) {
            currentSection = section.getAttribute('id');
        }
    });

    // Update Desktop Nav Links
    navLinks.forEach(link => {
        link.classList.remove('active');
        if (link.getAttribute('href') === `#${currentSection}`) {
            link.classList.add('active');
        }
    });

    // Update Mobile Nav Links
    mobileNavLinks.forEach(link => {
        link.classList.remove('active');
        if (link.getAttribute('href') === `#${currentSection}`) {
            link.classList.add('active');
        }
    });
});

// ==========================================================================
// MOBILE DRAWER TOGGLE
// ==========================================================================
function toggleMobileMenu() {
    mobileMenuToggle.classList.toggle('open');
    mobileNav.classList.toggle('open');
    mobileNavOverlay.classList.toggle('open');
    document.body.style.overflow = mobileNav.classList.contains('open') ? 'hidden' : 'auto';
}

mobileMenuToggle.addEventListener('click', toggleMobileMenu);
mobileNavOverlay.addEventListener('click', toggleMobileMenu);

// Close menu when clicking link on mobile
mobileNavLinks.forEach(link => {
    link.addEventListener('click', () => {
        if (mobileNav.classList.contains('open')) {
            toggleMobileMenu();
        }
    });
});

// ==========================================================================
// INITIAL SETUP
// ==========================================================================
document.addEventListener('DOMContentLoaded', () => {
    renderFruits();
});
