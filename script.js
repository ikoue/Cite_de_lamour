// Data Management
let eventsData = [];
let programsData = [];
let departmentsData = [];

// Carousel State
let currentEventsIndex = 0;
let currentDeptsIndex = 0;
let itemsPerView = getItemsPerView();

// Initialize the application
document.addEventListener('DOMContentLoaded', () => {
    loadData();
    setupEventListeners();
    setupSmoothScroll();
});

// Load data from JSON files
async function loadData() {
    try {
        const [events, programs, departments] = await Promise.all([
            fetch('data/events.json').then(res => res.json()),
            fetch('data/programs.json').then(res => res.json()),
            fetch('data/departments.json').then(res => res.json())
        ]);

        eventsData = events;
        programsData = programs;
        departmentsData = departments;

        renderEvents();
        renderPrograms();
        renderDepartments();
    } catch (error) {
        console.error('Error loading data:', error);
        // Fallback to default data if files can't be loaded
        loadDefaultData();
    }
}

// Fallback default data
function loadDefaultData() {
    eventsData = [
        {
            id: 1,
            date: "25",
            time: "19h00",
            name: "Culte de célébration",
            description: "Rejoignez-nous pour un temps de louange et d'adoration en communauté.",
            image: "https://images.unsplash.com/photo-1511632765486-a01980e01a18?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&q=80"
        }
    ];
    programsData = [
        {
            id: 1,
            name: "Culte de célébration",
            day: "Dimanche",
            icon: "church",
            time: "10h00"
        }
    ];
    departmentsData = [
        { id: 1, name: "Hommes", image: "https://images.unsplash.com/photo-1529156069898-49953e39b3ac?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&q=80", description: "Ministère dédié aux hommes" },
        { id: 2, name: "Femmes", image: "https://images.unsplash.com/photo-1522337360788-8b13dee7a37e?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&q=80", description: "Ministère dédié aux femmes" },
        { id: 3, name: "Couples/Mariages", image: "https://images.unsplash.com/photo-1511285560929-80b456fea0bc?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&q=80", description: "Accompagnement pour les couples" },
        { id: 4, name: "Jeunes adultes", image: "https://images.unsplash.com/photo-1522071820081-009f0129c71c?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&q=80", description: "Communauté pour les jeunes adultes" },
        { id: 5, name: "Soutien Pastoral", image: "https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&q=80", description: "Soutien et accompagnement pastoral" },
        { id: 6, name: "Juniors", image: "https://images.unsplash.com/photo-1503454537195-1dcabb73ffb9?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&q=80", description: "Programmes pour les enfants" },
        { id: 7, name: "Chœur", image: "https://images.unsplash.com/photo-1493225457124-a3eb161ffa5f?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&q=80", description: "Ministère de la musique" },
        { id: 8, name: "Évangélisme", image: "https://images.unsplash.com/photo-1511632765486-a01980e01a18?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&q=80", description: "Partage de l'Évangile" }
    ];
    renderEvents();
    renderPrograms();
    renderDepartments();
}

// Render Events Carousel
function renderEvents() {
    const carousel = document.getElementById('eventsCarousel');
    if (!carousel) return;

    carousel.innerHTML = eventsData.map(event => `
        <div class="event-card">
            <img src="${event.image}" alt="${event.name}" class="event-image" onerror="this.src='https://via.placeholder.com/320x200?text=${encodeURIComponent(event.name)}'">
            <div class="event-content">
                <div class="event-date">${event.date}</div>
                <div class="event-time">${event.time}</div>
                <h3 class="event-name">${event.name}</h3>
                <p class="event-description">${event.description}</p>
                <button class="btn-detail" onclick="showEventDetail(${event.id})">Voir détail</button>
            </div>
        </div>
    `).join('');

    updateCarouselPosition('events');
}

// Render Programs Grid
function renderPrograms() {
    const grid = document.getElementById('programsGrid');
    if (!grid) return;

    const iconMap = {
        'church': 'fas fa-church',
        'users': 'fas fa-users',
        'home': 'fas fa-home',
        'user-friends': 'fas fa-user-friends',
        'child': 'fas fa-child',
        'pray': 'fas fa-hands-praying'
    };

    grid.innerHTML = programsData.map(program => `
        <div class="program-item">
            <div class="program-icon">
                <i class="${iconMap[program.icon] || 'fas fa-calendar'}"></i>
            </div>
            <h3 class="program-name">${program.name}</h3>
            <p class="program-day">${program.day} - ${program.time}</p>
        </div>
    `).join('');
}

// Render Departments Grid
function renderDepartments() {
    const grid = document.getElementById('departmentsGrid');
    if (!grid) return;

    // Ensure all departments are displayed
    if (departmentsData.length === 0) {
        grid.innerHTML = '<p>Aucun département disponible</p>';
        return;
    }

    grid.innerHTML = departmentsData.map(dept => `
        <div class="dept-card" onclick="showDepartmentDetail(${dept.id})">
            <img src="${dept.image}" alt="${dept.name}" class="dept-image" onerror="this.src='https://via.placeholder.com/300x200?text=${encodeURIComponent(dept.name)}'">
            <div class="dept-name">${dept.name}</div>
        </div>
    `).join('');

    console.log(`Affichage de ${departmentsData.length} départements`);
}

// Carousel Navigation
function setupEventListeners() {
    // Events carousel
    const eventsPrev = document.getElementById('eventsPrev');
    const eventsNext = document.getElementById('eventsNext');
    
    if (eventsPrev) {
        eventsPrev.addEventListener('click', () => navigateCarousel('events', -1));
    }
    if (eventsNext) {
        eventsNext.addEventListener('click', () => navigateCarousel('events', 1));
    }

    // Departments grid - no carousel navigation needed

    // View all buttons
    const viewAllEvents = document.getElementById('viewAllEvents');
    if (viewAllEvents) {
        viewAllEvents.addEventListener('click', () => {
            alert('Affichage de tous les événements...');
            // You can implement a modal or redirect to events page
        });
    }

    // Contact button
    const contactBtn = document.querySelector('.btn-contact');
    if (contactBtn) {
        contactBtn.addEventListener('click', () => {
            alert('Formulaire de contact à venir...');
            // You can implement a contact form modal
        });
    }

    // Dropdown menu toggle
    const menuToggle = document.getElementById('menuToggle');
    const dropdownMenu = document.getElementById('dropdownMenu');
    
    if (menuToggle && dropdownMenu) {
        menuToggle.addEventListener('click', (e) => {
            e.preventDefault();
            dropdownMenu.classList.toggle('active');
        });

        // Close menu when clicking outside
        dropdownMenu.addEventListener('click', (e) => {
            if (e.target === dropdownMenu) {
                dropdownMenu.classList.remove('active');
            }
        });

        // Close menu on escape key
        document.addEventListener('keydown', (e) => {
            if (e.key === 'Escape' && dropdownMenu.classList.contains('active')) {
                dropdownMenu.classList.remove('active');
            }
        });
    }

    // Mobile menu toggle (for responsive nav)
    const mobileMenuToggle = document.querySelector('.menu-toggle');
    if (mobileMenuToggle && !menuToggle) {
        mobileMenuToggle.addEventListener('click', toggleMobileMenu);
    }

    // Keyboard navigation for carousels
    document.addEventListener('keydown', (e) => {
        if (e.key === 'ArrowLeft') {
            navigateCarousel('events', -1);
            navigateCarousel('depts', -1);
        } else if (e.key === 'ArrowRight') {
            navigateCarousel('events', 1);
            navigateCarousel('depts', 1);
        }
    });
}

// Navigate carousel
function navigateCarousel(type, direction) {
    if (type === 'events') {
        const maxIndex = Math.max(0, eventsData.length - itemsPerView);
        currentEventsIndex = Math.max(0, Math.min(maxIndex, currentEventsIndex + direction));
        updateCarouselPosition('events');
    }
}

// Update carousel position
function updateCarouselPosition(type) {
    if (type === 'events') {
        const carousel = document.getElementById('eventsCarousel');
        if (!carousel) return;

        const cardWidth = 320;
        const gap = 32; // 2rem = 32px
        const offset = (cardWidth + gap) * currentEventsIndex;
        
        carousel.style.transform = `translateX(-${offset}px)`;

        // Update button states
        updateCarouselButtons(type);
    }
}

// Update carousel button states
function updateCarouselButtons(type) {
    if (type === 'events') {
        const currentIndex = currentEventsIndex;
        const dataLength = eventsData.length;
        const maxIndex = Math.max(0, dataLength - itemsPerView);

        const prevBtn = document.getElementById('eventsPrev');
        const nextBtn = document.getElementById('eventsNext');

        if (prevBtn) {
            prevBtn.style.opacity = currentIndex === 0 ? '0.5' : '1';
            prevBtn.style.cursor = currentIndex === 0 ? 'not-allowed' : 'pointer';
        }

        if (nextBtn) {
            nextBtn.style.opacity = currentIndex >= maxIndex ? '0.5' : '1';
            nextBtn.style.cursor = currentIndex >= maxIndex ? 'not-allowed' : 'pointer';
        }
    }
}

// Show event detail (can be expanded to modal)
function showEventDetail(eventId) {
    const event = eventsData.find(e => e.id === eventId);
    if (event) {
        alert(`Détails de l'événement: ${event.name}\nDate: ${event.date}\nHeure: ${event.time}\n\n${event.description}`);
        // You can implement a modal here
    }
}

// Show department detail (can be expanded to modal)
function showDepartmentDetail(deptId) {
    const dept = departmentsData.find(d => d.id === deptId);
    if (dept) {
        alert(`Département: ${dept.name}\n\n${dept.description}`);
        // You can implement a modal here
    }
}

// Smooth scroll for navigation links
function setupSmoothScroll() {
    document.querySelectorAll('a[href^="#"]').forEach(anchor => {
        anchor.addEventListener('click', function (e) {
            e.preventDefault();
            const target = document.querySelector(this.getAttribute('href'));
            if (target) {
                target.scrollIntoView({
                    behavior: 'smooth',
                    block: 'start'
                });
            }
        });
    });
}

// Mobile menu toggle
function toggleMobileMenu() {
    const nav = document.querySelector('.nav');
    nav.classList.toggle('mobile-open');
}

// Get items per view based on screen size
function getItemsPerView() {
    const width = window.innerWidth;
    if (width < 768) {
        return 1;
    } else if (width < 1024) {
        return 2;
    }
    return 3;
}

// Responsive carousel adjustment
function adjustCarouselForScreen() {
    const newItemsPerView = getItemsPerView();
    if (newItemsPerView !== itemsPerView) {
        itemsPerView = newItemsPerView;
        currentEventsIndex = 0;
        currentDeptsIndex = 0;
        updateCarouselPosition('events');
        updateCarouselPosition('depts');
    }
}

// Handle window resize with debounce
let resizeTimeout;
window.addEventListener('resize', () => {
    clearTimeout(resizeTimeout);
    resizeTimeout = setTimeout(() => {
        adjustCarouselForScreen();
    }, 250);
});

// Add animation on scroll
const observerOptions = {
    threshold: 0.1,
    rootMargin: '0px 0px -50px 0px'
};

const observer = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
        if (entry.isIntersecting) {
            entry.target.style.opacity = '1';
            entry.target.style.transform = 'translateY(0)';
        }
    });
}, observerOptions);

// Observe sections for scroll animations
document.addEventListener('DOMContentLoaded', () => {
    const sections = document.querySelectorAll('.vision-card, .event-card, .program-item, .dept-card');
    sections.forEach(section => {
        section.style.opacity = '0';
        section.style.transform = 'translateY(20px)';
        section.style.transition = 'opacity 0.6s ease, transform 0.6s ease';
        observer.observe(section);
    });

    // Department page buttons
    const contactDeptBtn = document.querySelector('.btn-contact-dept');
    const registerDeptBtn = document.querySelector('.btn-register-dept');

    if (contactDeptBtn) {
        contactDeptBtn.addEventListener('click', () => {
            alert('Formulaire de contact à venir...');
            // You can redirect to contact form or open modal
        });
    }

    if (registerDeptBtn) {
        registerDeptBtn.addEventListener('click', () => {
            window.location.href = 'se-joindre.html';
        });
    }
});

