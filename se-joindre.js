
document.addEventListener('DOMContentLoaded', () => {
  initRevealAnimations();

  // petite animation sur l'image hero si présente
  const heroImg = document.getElementById('joinHeroImage');
  if (heroImg) heroImg.classList.add('floaty');

  // Scroll vers l'ancre si présente dans l'URL
  if (window.location.hash === '#rejoindre-departement') {
    setTimeout(() => {
      const targetSection = document.getElementById('rejoindre-departement');
      if (targetSection) {
        targetSection.scrollIntoView({ behavior: 'smooth', block: 'start' });
      }
    }, 100);
  }

  // Scroll vers la section contact si présente dans l'URL
  if (window.location.hash === '#contact') {
    setTimeout(() => {
      const targetSection = document.getElementById('contact');
      if (targetSection) {
        targetSection.scrollIntoView({ behavior: 'smooth', block: 'start' });
      }
    }, 100);
  }

  // formulaire
  const contactForm = document.getElementById('contactForm');
  if (contactForm) contactForm.addEventListener('submit', handleFormSubmit);
});

function initRevealAnimations() {
  const prefersReduced =
    window.matchMedia && window.matchMedia('(prefers-reduced-motion: reduce)').matches;

  const revealEls = document.querySelectorAll('.reveal');

  if (prefersReduced) {
    revealEls.forEach(el => el.classList.add('is-visible'));
    return;
  }

  const observer = new IntersectionObserver(
    entries => {
      entries.forEach(entry => {
        if (entry.isIntersecting) {
          entry.target.classList.add('is-visible');
          observer.unobserve(entry.target);
        }
      });
    },
    { threshold: 0.12 }
  );

  revealEls.forEach(el => observer.observe(el));
}

// Fonction de validation du format de téléphone (format canadien/américain)
function validatePhone(phone) {
  // Supprime les espaces, tirets, parenthèses
  const cleaned = phone.replace(/[\s\-\(\)]/g, '');
  // Format accepté: 10 chiffres (sans indicatif) ou 11 chiffres (avec indicatif 1)
  // Exemples: 8193865582, 18193865582, (819) 386-5582, 819-386-5582
  const phoneRegex = /^1?\d{10}$/;
  return phoneRegex.test(cleaned);
}

// Fonction de validation du format d'email
function validateEmail(email) {
  const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
  return emailRegex.test(email);
}

function showFieldError(fieldId, errorId, message) {
  const field = document.getElementById(fieldId);
  const errorEl = document.getElementById(errorId);
  if (field && errorEl) {
    field.style.borderColor = '#d32f2f';
    errorEl.textContent = message;
    errorEl.style.display = 'block';
  }
}

function clearFieldError(fieldId, errorId) {
  const field = document.getElementById(fieldId);
  const errorEl = document.getElementById(errorId);
  if (field && errorEl) {
    field.style.borderColor = '';
    errorEl.style.display = 'none';
  }
}

async function handleFormSubmit(e) {
  e.preventDefault();

  const form = e.target;
  const formData = new FormData(form);

  const fullName = (formData.get('fullName') || '').trim();
  const phone = (formData.get('phone') || '').trim();
  const email = (formData.get('email') || '').trim();

  // Réinitialiser les erreurs
  clearFieldError('phone', 'phoneError');
  clearFieldError('email', 'emailError');
  showStatus('', 'clear');

  // Validation du nom complet
  if (!fullName) {
    showStatus('Veuillez remplir le champ obligatoire : Nom complet.', 'error');
    return;
  }

  // Validation : au moins un des deux (téléphone ou email) doit être rempli
  if (!phone && !email) {
    showStatus('Veuillez remplir au moins un des champs : Téléphone ou Email.', 'error');
    return;
  }

  // Validation du format du téléphone si rempli
  if (phone && !validatePhone(phone)) {
    showFieldError('phone', 'phoneError', 'Format invalide. Exemple: (819) 386-5582 ou 8193865582');
    showStatus('Format de téléphone invalide.', 'error');
    return;
  }

  // Validation du format de l'email si rempli
  if (email && !validateEmail(email)) {
    showFieldError('email', 'emailError', 'Format d\'email invalide. Exemple: nom@exemple.com');
    showStatus('Format d\'email invalide.', 'error');
    return;
  }

  const btn = form.querySelector('button[type="submit"]');
  const btnHtml = btn ? btn.innerHTML : '';

  if (btn) {
    btn.disabled = true;
    btn.classList.add('is-loading');
    btn.innerHTML = `<span>Envoi...</span> <i class="fas fa-spinner fa-spin"></i>`;
  }

  showStatus('', 'clear');

  try {
    const res = await fetch('send-contact.php', {
      method: 'POST',
      body: formData,
    });

    // Vérifier si la réponse est OK (status 200-299)
    if (!res.ok) {
      throw new Error(`Erreur HTTP ${res.status}: ${res.statusText}`);
    }

    const payload = await res.json().catch(() => null);

    if (!payload) {
      // Si ce n'est pas du JSON, essayer de lire le texte de la réponse
      const text = await res.text();
      throw new Error(`Réponse serveur invalide. Réponse reçue: ${text.substring(0, 100)}`);
    }

    if (payload.ok) {
      showStatus(payload.message || 'Message envoyé ✅', 'success');
      form.reset();
    } else {
      showStatus(payload.message || "Impossible d'envoyer le message.", 'error');
    }
  } catch (err) {
    // Message d'erreur plus détaillé
    let errorMessage = "Erreur lors de l'envoi du message. ";
    
    if (err.message.includes('Failed to fetch') || err.message.includes('NetworkError')) {
      errorMessage += "Le serveur PHP n'est pas accessible. Assurez-vous d'ouvrir le site via un serveur local (http://localhost/...) et non directement le fichier HTML.";
    } else if (err.message.includes('HTTP')) {
      errorMessage += err.message;
    } else {
      errorMessage += err.message;
    }
    
    showStatus(errorMessage, 'error');
    console.error('Erreur détaillée:', err);
  } finally {
    if (btn) {
      btn.disabled = false;
      btn.classList.remove('is-loading');
      btn.innerHTML = btnHtml;
    }
  }
}

function showStatus(text, type) {
  const statusEl = document.getElementById('formStatus');
  if (!statusEl) return;

  if (type === 'clear') {
    statusEl.textContent = '';
    statusEl.className = 'form-status';
    return;
  }

  statusEl.textContent = text;
  statusEl.className = `form-status ${type}`;
}
 