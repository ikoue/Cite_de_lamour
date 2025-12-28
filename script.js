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
    setupTitleAnimation();
});

// Setup title word-group animation
function setupTitleAnimation() {
    // Animation is handled by CSS with data-part attributes
    // No JavaScript needed for this animation
}

// Load data from JSON files
async function loadData() {
    try {
        const [events, programs, departments, images] = await Promise.all([
            fetch('data/events.json').then(res => res.json()),
            fetch('data/programs.json').then(res => res.json()),
            fetch('data/departments.json').then(res => res.json()),
            fetch('data/images.json').then(res => res.json()).catch(() => null)
        ]);

        eventsData = events;
        programsData = programs;
        departmentsData = departments;

        console.log('Programs loaded:', programsData.length, programsData);

        // Load background images
        if (images) {
            loadBackgroundImages(images);
        }

        renderEvents();
        renderPrograms();
        renderDepartments();
    } catch (error) {
        console.error('Error loading data:', error);
        // Fallback to default data if files can't be loaded
        loadDefaultData();
    }
}

// Load background images from configuration
function loadBackgroundImages(imagesConfig) {
    // Hero section background (page d'accueil)
    const heroSection = document.getElementById('heroSection');
    if (heroSection && imagesConfig.hero) {
        heroSection.style.backgroundImage = `linear-gradient(rgba(0, 0, 0, 0.4), rgba(0, 0, 0, 0.4)), url('${imagesConfig.hero.url}')`;
    }

    // Page hero backgrounds (Commencer ici, etc.)
    const pageHeroSection = document.getElementById('pageHeroSection');
    if (pageHeroSection && imagesConfig.pageHero) {
        pageHeroSection.style.backgroundImage = `linear-gradient(rgba(0, 0, 0, 0.4), rgba(0, 0, 0, 0.4)), url('${imagesConfig.pageHero.url}')`;
    }

    // Join page hero image
    const joinHeroImage = document.getElementById('joinHeroImage');
    if (joinHeroImage && imagesConfig.joinHero) {
        joinHeroImage.src = imagesConfig.joinHero.url;
    }

    // Update event images
    if (imagesConfig.events && eventsData) {
        eventsData.forEach((event, index) => {
            const eventImage = imagesConfig.events.find(img => img.id === event.id);
            if (eventImage) {
                event.image = eventImage.url;
            }
        });
    }

    // Update department images
    if (imagesConfig.departments && departmentsData) {
        departmentsData.forEach(dept => {
            const deptImage = imagesConfig.departments.find(img => img.name === dept.name);
            if (deptImage) {
                dept.image = deptImage.url;
            }
        });
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
            name: "Cultes de célébration",
            day: "Dimanche",
            icon: "church",
            time: "de 9h30 à 11h45"
        },
        {
            id: 2,
            name: "Cultes d'enseignement",
            day: "Vendredi",
            icon: "church",
            time: "de 18h30 à 20h30"
        },
        {
            id: 3,
            name: "École Biblique de l'Amour",
            day: "Mardi",
            icon: "users",
            time: "de 19h à 20h30"
        },
        {
            id: 4,
            name: "Rencontres Hommes/Femmes",
            day: "Mercredi (1 sur 2)",
            icon: "user-friends",
            time: "de 19h à 20h30"
        },
        {
            id: 5,
            name: "Cellules de maison",
            day: "Mercredi (1 sur 2)",
            icon: "home",
            time: "de 19h à 20h30"
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

// Calculate next Sunday
function getNextSunday() {
    const today = new Date();
    const dayOfWeek = today.getDay(); // 0 = Sunday, 1 = Monday, etc.
    const daysUntilSunday = dayOfWeek === 0 ? 7 : 7 - dayOfWeek; // If today is Sunday, get next Sunday (7 days)
    
    const nextSunday = new Date(today);
    nextSunday.setDate(today.getDate() + daysUntilSunday);
    nextSunday.setHours(19, 0, 0, 0); // Set to 7 PM
    
    return nextSunday;
}

// Format date for event display
function formatDateForEvent(date) {
    const months = ['janvier', 'février', 'mars', 'avril', 'mai', 'juin', 
                   'juillet', 'août', 'septembre', 'octobre', 'novembre', 'décembre'];
    const days = ['Dimanche', 'Lundi', 'Mardi', 'Mercredi', 'Jeudi', 'Vendredi', 'Samedi'];
    
    const dayName = days[date.getDay()];
    const day = date.getDate();
    const monthName = months[date.getMonth()];
    const year = date.getFullYear();
    
    return `${dayName} ${day} ${monthName} ${year}`;
}

// Render Events Carousel
function renderEvents() {
    const carousel = document.getElementById('eventsCarousel');
    if (!carousel) return;

    // Create default event if no events exist
    let eventsToRender = eventsData || [];
    if (eventsToRender.length === 0) {
        const nextSunday = getNextSunday();
        eventsToRender = [{
            id: 'default-culte',
            name: 'Culte de célébration',
            date: nextSunday.getDate().toString(),
            time: '19h00',
            description: 'Rejoignez-nous pour un temps de louange et d\'adoration en communauté.',
            image: null,
            isDefault: true,
            fullDate: nextSunday
        }];
    }

    // Check if we have only one event to center it
    const carouselWrapper = carousel.closest('.carousel-wrapper');
    if (eventsToRender.length === 1) {
        if (carouselWrapper) {
            carouselWrapper.classList.add('single-event');
        }
    } else {
        if (carouselWrapper) {
            carouselWrapper.classList.remove('single-event');
        }
    }

    // Helper function to format date
    function formatEventDate(event) {
        // If event has a fullDate (default event), use it
        if (event.fullDate) {
            return formatDateForEvent(event.fullDate);
        }
        
        // Otherwise, parse the date string
        const day = parseInt(event.date) || new Date().getDate();
        const months = ['janvier', 'février', 'mars', 'avril', 'mai', 'juin', 
                       'juillet', 'août', 'septembre', 'octobre', 'novembre', 'décembre'];
        const days = ['Dimanche', 'Lundi', 'Mardi', 'Mercredi', 'Jeudi', 'Vendredi', 'Samedi'];
        const today = new Date();
        let eventDate;
        
        // If day is less than current day, use next month
        if (day < today.getDate()) {
            eventDate = new Date(today.getFullYear(), today.getMonth() + 1, day);
        } else {
            eventDate = new Date(today.getFullYear(), today.getMonth(), day);
        }
        
        const dayName = days[eventDate.getDay()];
        const monthName = months[eventDate.getMonth()];
        const year = eventDate.getFullYear();
        
        return `${dayName} ${day} ${monthName} ${year}`;
    }

    // Helper function to format time range
    function formatTimeRange(timeStr) {
        // If time is like "19h00", convert to "de 19h00 à 20h30" format
        if (timeStr && timeStr.includes('h')) {
            const match = timeStr.match(/(\d+)h(\d+)?/);
            if (match) {
                const hour = parseInt(match[1]);
                const minutes = match[2] ? parseInt(match[2]) : 0;
                
                // Calculate end time (typically 2 hours later, ending at :45)
                let endHour = hour + 2;
                const endMinutes = 45;
                
                return `de ${timeStr} à ${endHour}h${endMinutes.toString().padStart(2, '0')}`;
            }
        }
        return timeStr ? `de ${timeStr}` : '';
    }

    carousel.innerHTML = eventsToRender.map(event => `
        <div class="event-card-new">
            <div class="event-image-container">
                ${event.image ? 
                    `<img src="${event.image}" alt="${event.name}" class="event-image-bg" onerror="this.onerror=null; this.style.display='none'; this.nextElementSibling.style.display='flex';">
                     <div class="event-image-placeholder" style="display: none;">
                        <svg viewBox="0 0 200 120" xmlns="http://www.w3.org/2000/svg">
                            <rect x="20" y="20" width="160" height="80" fill="none" stroke="rgba(255,255,255,0.3)" stroke-width="2" rx="4"/>
                            <path d="M 40 80 L 60 50 L 80 60 L 100 40 L 120 50 L 140 45 L 160 70 L 160 80 L 40 80 Z" 
                                  fill="rgba(255,255,255,0.2)" stroke="rgba(255,255,255,0.3)" stroke-width="1"/>
                            <circle cx="170" cy="30" r="8" fill="rgba(255,255,255,0.3)"/>
                        </svg>
                     </div>` :
                    `<div class="event-image-placeholder">
                        <svg viewBox="0 0 200 120" xmlns="http://www.w3.org/2000/svg">
                            <rect x="20" y="20" width="160" height="80" fill="none" stroke="rgba(255,255,255,0.3)" stroke-width="2" rx="4"/>
                            <path d="M 40 80 L 60 50 L 80 60 L 100 40 L 120 50 L 140 45 L 160 70 L 160 80 L 40 80 Z" 
                                  fill="rgba(255,255,255,0.2)" stroke="rgba(255,255,255,0.3)" stroke-width="1"/>
                            <circle cx="170" cy="30" r="8" fill="rgba(255,255,255,0.3)"/>
                        </svg>
                     </div>`
                }
                <div class="event-overlay-gradient"></div>
            </div>
            <div class="event-info-overlay">
                <div class="event-badge">
                    <i class="fas fa-calendar-alt"></i>
                    <span>Événement</span>
                </div>
                <h3 class="event-title">${event.name}</h3>
                <div class="event-details">
                    <div class="event-detail-item">
                        <i class="fas fa-calendar"></i>
                        <span class="event-date-full">${formatEventDate(event)}</span>
                    </div>
                    <div class="event-detail-item">
                        <i class="fas fa-clock"></i>
                        <span class="event-time-range">${formatTimeRange(event.time)}</span>
                    </div>
                </div>
                <a href="#" class="event-learn-more" onclick="showEventDetail('${event.id}'); return false;">
                    <span>En savoir plus</span>
                    <i class="fas fa-arrow-right"></i>
                </a>
            </div>
        </div>
    `).join('');

    // Show/hide navigation buttons based on number of events
    const prevBtn = document.getElementById('eventsPrev');
    const nextBtn = document.getElementById('eventsNext');
    
    if (eventsToRender.length >= 4) {
        if (prevBtn) prevBtn.style.display = 'flex';
        if (nextBtn) nextBtn.style.display = 'flex';
    } else {
        if (prevBtn) prevBtn.style.display = 'none';
        if (nextBtn) nextBtn.style.display = 'none';
    }

    updateCarouselPosition('events');
}

// Render Programs Grid
function renderPrograms() {
    const grid = document.getElementById('programsGrid');
    if (!grid) {
        console.error('Programs grid not found');
        return;
    }

    if (!programsData || programsData.length === 0) {
        console.error('No programs data available');
        grid.innerHTML = '<p style="text-align: center; padding: 2rem; color: #666;">Chargement des programmes...</p>';
        return;
    }

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
            <div class="program-icon-wrapper">
                <div class="program-icon">
                    <i class="${iconMap[program.icon] || 'fas fa-calendar'}"></i>
                </div>
            </div>
            <div class="program-content">
                <div class="program-badge">
                    <i class="fas fa-calendar-week"></i>
                    <span>Programme</span>
                </div>
                <h3 class="program-name">${program.name}</h3>
                <div class="program-details">
                    <div class="program-detail-item">
                        <i class="fas fa-calendar-day"></i>
                        <span class="program-day">${program.day}</span>
                    </div>
                    <div class="program-detail-item">
                        <i class="fas fa-clock"></i>
                        <span class="program-time">${program.time}</span>
                    </div>
                </div>
            </div>
        </div>
    `).join('');

    console.log(`Rendered ${programsData.length} programs`);
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
        // Get actual events count (including default if needed)
        const eventsCount = (eventsData && eventsData.length > 0) ? eventsData.length : 1;
        const maxIndex = Math.max(0, eventsCount - itemsPerView);
        currentEventsIndex = Math.max(0, Math.min(maxIndex, currentEventsIndex + direction));
        updateCarouselPosition('events');
    }
}

// Update carousel position
function updateCarouselPosition(type) {
    if (type === 'events') {
        const carousel = document.getElementById('eventsCarousel');
        if (!carousel) return;

        const cardWidth = window.innerWidth < 768 ? 300 : 400;
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
        // Get actual events count (including default if needed)
        const eventsCount = (eventsData && eventsData.length > 0) ? eventsData.length : 1;
        
        // Only show buttons if there are 4 or more events
        if (eventsCount < 4) {
            const prevBtn = document.getElementById('eventsPrev');
            const nextBtn = document.getElementById('eventsNext');
            if (prevBtn) prevBtn.style.display = 'none';
            if (nextBtn) nextBtn.style.display = 'none';
            return;
        }

        const currentIndex = currentEventsIndex;
        const dataLength = eventsCount;
        const maxIndex = Math.max(0, dataLength - itemsPerView);

        const prevBtn = document.getElementById('eventsPrev');
        const nextBtn = document.getElementById('eventsNext');

        if (prevBtn) {
            prevBtn.style.display = 'flex';
            prevBtn.style.opacity = currentIndex === 0 ? '0.5' : '1';
            prevBtn.style.cursor = currentIndex === 0 ? 'not-allowed' : 'pointer';
        }

        if (nextBtn) {
            nextBtn.style.display = 'flex';
            nextBtn.style.opacity = currentIndex >= maxIndex ? '0.5' : '1';
            nextBtn.style.cursor = currentIndex >= maxIndex ? 'not-allowed' : 'pointer';
        }
    }
}

// Show event detail (can be expanded to modal)
function showEventDetail(eventId) {
    // Check if it's the default event
    let event;
    if (eventId === 'default-culte' && (!eventsData || eventsData.length === 0)) {
        const nextSunday = getNextSunday();
        event = {
            id: 'default-culte',
            name: 'Culte de célébration',
            date: nextSunday.getDate().toString(),
            time: '19h00',
            description: 'Rejoignez-nous pour un temps de louange et d\'adoration en communauté.',
            fullDate: nextSunday
        };
    } else {
        event = eventsData.find(e => e.id == eventId);
    }
    
    if (event) {
        const dateStr = event.fullDate ? formatDateForEvent(event.fullDate) : formatEventDate(event);
        alert(`Détails de l'événement: ${event.name}\nDate: ${dateStr}\nHeure: ${event.time}\n\n${event.description || ''}`);
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

    // Animate section titles on scroll
    const sectionTitles = document.querySelectorAll('.section-title');
    sectionTitles.forEach((title, index) => {
        title.style.animationDelay = `${index * 0.2}s`;
        observer.observe(title);
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

