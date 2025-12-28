// Initialize page
document.addEventListener('DOMContentLoaded', () => {
    setupPasteurButtons();
    setupScrollAnimations();
    setupMissionLinks();
});

// Setup pasteur section buttons
function setupPasteurButtons() {
    const pasteurLink = document.querySelector('.pasteur-link');

    if (pasteurLink) {
        pasteurLink.addEventListener('click', (e) => {
            e.preventDefault();
            alert('Page de détails du pasteur à venir...');
            // You can implement redirect to pasteur detail page
        });
    }
}

// Setup scroll animations for histoire items
function setupScrollAnimations() {
    const histoireItems = document.querySelectorAll('.histoire-item');
    
    if (histoireItems.length === 0) return;
    
    // Options for Intersection Observer
    const observerOptions = {
        threshold: 0.1,
        rootMargin: '0px 0px -50px 0px'
    };
    
    // Create Intersection Observer
    const observer = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                entry.target.classList.add('visible');
                // Optionally stop observing after animation
                observer.unobserve(entry.target);
            }
        });
    }, observerOptions);
    
    // Observe each histoire item
    histoireItems.forEach(item => {
        observer.observe(item);
    });
}

// Setup mission links
function setupMissionLinks() {
    const missionLinks = document.querySelectorAll('.mission-link');
    
    missionLinks.forEach(link => {
        link.addEventListener('click', (e) => {
            e.preventDefault();
            const linkText = link.textContent.trim();
            alert(`Fonctionnalité "${linkText}" à venir...`);
            // You can implement redirect to appropriate page
        });
    });
}


