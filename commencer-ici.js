// Initialize page
document.addEventListener('DOMContentLoaded', () => {
    setupPasteurButtons();
});

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


