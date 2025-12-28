// Contact Form Handler
document.addEventListener('DOMContentLoaded', () => {
    const contactForm = document.getElementById('contactForm');
    
    if (contactForm) {
        contactForm.addEventListener('submit', handleFormSubmit);
    }
});

// Handle form submission
function handleFormSubmit(e) {
    e.preventDefault();
    
    const formData = new FormData(e.target);
    const data = {
        fullName: formData.get('fullName'),
        phone: formData.get('phone'),
        email: formData.get('email'),
        message: formData.get('message')
    };
    
    // Validate required fields
    if (!data.fullName || !data.phone) {
        alert('Veuillez remplir tous les champs obligatoires (*)');
        return;
    }
    
    // Validate phone format (basic)
    const phoneRegex = /^[\d\s\-\+\(\)]+$/;
    if (!phoneRegex.test(data.phone)) {
        alert('Veuillez entrer un numéro de téléphone valide');
        return;
    }
    
    // Validate email if provided
    if (data.email) {
        const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
        if (!emailRegex.test(data.email)) {
            alert('Veuillez entrer une adresse email valide');
            return;
        }
    }
    
    // Simulate form submission
    console.log('Form data:', data);
    
    // Show success message
    showSuccessMessage();
    
    // Reset form
    e.target.reset();
}

// Show success message
function showSuccessMessage() {
    // Create success message element
    const successMsg = document.createElement('div');
    successMsg.className = 'form-success-message';
    successMsg.innerHTML = `
        <i class="fas fa-check-circle"></i>
        <p>Merci ! Votre message a été envoyé avec succès. Nous vous contacterons bientôt.</p>
    `;
    
    // Insert before form
    const form = document.getElementById('contactForm');
    form.parentNode.insertBefore(successMsg, form);
    
    // Remove message after 5 seconds
    setTimeout(() => {
        successMsg.remove();
    }, 5000);
    
    // Scroll to message
    successMsg.scrollIntoView({ behavior: 'smooth', block: 'center' });
}



