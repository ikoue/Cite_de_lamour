// Mission Carousel Management
let currentMissionIndex = 0;
const missionCards = document.querySelectorAll('.mission-card');
const totalMissions = missionCards.length;

// Initialize mission carousel
document.addEventListener('DOMContentLoaded', () => {
    setupMissionCarousel();
    setupPasteurButtons();
});

// Setup mission carousel
function setupMissionCarousel() {
    const prevBtn = document.getElementById('missionPrev');
    const nextBtn = document.getElementById('missionNext');
    const carousel = document.getElementById('missionCarousel');
    const dots = document.querySelectorAll('.pagination-dot');

    if (!carousel) return;

    // Button event listeners
    if (prevBtn) {
        prevBtn.addEventListener('click', () => navigateMission(-1));
    }
    if (nextBtn) {
        nextBtn.addEventListener('click', () => navigateMission(1));
    }

    // Dot event listeners
    dots.forEach((dot, index) => {
        dot.addEventListener('click', () => goToMission(index));
    });

    // Auto-play (optional)
    // setInterval(() => navigateMission(1), 5000);

    // Update initial state
    updateMissionCarousel();
}

// Navigate mission carousel
function navigateMission(direction) {
    currentMissionIndex += direction;
    
    if (currentMissionIndex < 0) {
        currentMissionIndex = totalMissions - 1;
    } else if (currentMissionIndex >= totalMissions) {
        currentMissionIndex = 0;
    }
    
    updateMissionCarousel();
}

// Go to specific mission card
function goToMission(index) {
    currentMissionIndex = index;
    updateMissionCarousel();
}

// Update mission carousel position and dots
function updateMissionCarousel() {
    const carousel = document.getElementById('missionCarousel');
    const dots = document.querySelectorAll('.pagination-dot');
    
    if (!carousel) return;

    // Calculate offset
    const cardWidth = 320; // min-width of mission-card
    const gap = 32; // 2rem gap
    const offset = (cardWidth + gap) * currentMissionIndex;
    
    carousel.style.transform = `translateX(-${offset}px)`;

    // Update pagination dots
    dots.forEach((dot, index) => {
        if (index === currentMissionIndex) {
            dot.classList.add('active');
        } else {
            dot.classList.remove('active');
        }
    });

    // Update button states
    updateMissionButtons();
}

// Update mission carousel button states
function updateMissionButtons() {
    const prevBtn = document.getElementById('missionPrev');
    const nextBtn = document.getElementById('missionNext');

    // For circular navigation, buttons are always enabled
    // But you can add visual feedback if needed
}

// Setup pasteur section buttons
function setupPasteurButtons() {
    const listenBtn = document.querySelector('.btn-listen');
    const contactBtn = document.querySelector('.btn-contact-pasteur');

    if (listenBtn) {
        listenBtn.addEventListener('click', () => {
            alert('Fonctionnalité "Écouter un message" à venir...');
            // You can implement audio player or redirect to audio page
        });
    }

    if (contactBtn) {
        contactBtn.addEventListener('click', () => {
            alert('Formulaire de contact à venir...');
            // You can implement contact form modal
        });
    }
}

// Handle window resize for mission carousel
let resizeTimeout;
window.addEventListener('resize', () => {
    clearTimeout(resizeTimeout);
    resizeTimeout = setTimeout(() => {
        updateMissionCarousel();
    }, 250);
});

