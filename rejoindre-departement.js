document.addEventListener('DOMContentLoaded', () => {
  initRevealAnimations();

  const form = document.getElementById('joinDeptForm');
  if (form) form.addEventListener('submit', submitJoinDept);
});

function initRevealAnimations() {
  const prefersReduced =
    window.matchMedia && window.matchMedia('(prefers-reduced-motion: reduce)').matches;
  const revealEls = document.querySelectorAll('.reveal');

  if (prefersReduced) {
    revealEls.forEach(el => el.classList.add('is-visible'));
    return;
  }

  const obs = new IntersectionObserver(entries => {
    entries.forEach(e => {
      if (e.isIntersecting) {
        e.target.classList.add('is-visible');
        obs.unobserve(e.target);
      }
    });
  }, { threshold: 0.12 });

  revealEls.forEach(el => obs.observe(el));
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

async function submitJoinDept(e) {
  e.preventDefault();

  const form = e.target;
  const data = new FormData(form);

  const prenom = (data.get('prenom') || '').trim();
  const nom = (data.get('nom') || '').trim();
  const telephone = (data.get('telephone') || '').trim();
  const courriel = (data.get('courriel') || '').trim();
  const departement = (data.get('departement') || '').trim();

  // Réinitialiser les erreurs
  clearFieldError('telephone', 'telephoneError');
  clearFieldError('courriel', 'courrielError');
  setStatus('', 'clear');

  // Validation des champs obligatoires
  if (!prenom || !nom || !departement) {
    setStatus("Veuillez remplir tous les champs obligatoires (*)", "error");
    return;
  }

  // Validation : au moins un des deux (téléphone ou courriel) doit être rempli
  if (!telephone && !courriel) {
    setStatus("Veuillez remplir au moins un des champs : Téléphone ou Courriel.", "error");
    return;
  }

  // Validation du format du téléphone si rempli
  if (telephone && !validatePhone(telephone)) {
    showFieldError('telephone', 'telephoneError', 'Format invalide. Exemple: (819) 386-5582 ou 8193865582');
    setStatus('Format de téléphone invalide.', 'error');
    return;
  }

  // Validation du format du courriel si rempli
  if (courriel && !validateEmail(courriel)) {
    showFieldError('courriel', 'courrielError', 'Format d\'email invalide. Exemple: nom@exemple.com');
    setStatus('Format de courriel invalide.', 'error');
    return;
  }

  const btn = form.querySelector('button[type="submit"]');
  const btnHtml = btn ? btn.innerHTML : '';
  if (btn) {
    btn.disabled = true;
    btn.classList.add('is-loading');
    btn.innerHTML = `<span>Envoi...</span> <i class="fas fa-spinner fa-spin"></i>`;
  }
  setStatus('', 'clear');

  try {
    const res = await fetch('send-join-departement.php', {
      method: 'POST',
      body: data
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
      setStatus(payload.message || 'Demande envoyée ✅', 'success');
      form.reset();
    } else {
      setStatus(payload.message || "Impossible d'envoyer la demande.", 'error');
    }
  } catch (err) {
    // Message d'erreur plus détaillé
    let errorMessage = "Erreur lors de l'envoi de la demande. ";
    
    if (err.message.includes('Failed to fetch') || err.message.includes('NetworkError')) {
      errorMessage += "Le serveur PHP n'est pas accessible. Assurez-vous d'ouvrir le site via un serveur local (http://localhost/...) et non directement le fichier HTML.";
    } else if (err.message.includes('HTTP')) {
      errorMessage += err.message;
    } else {
      errorMessage += err.message;
    }
    
    setStatus(errorMessage, "error");
    console.error('Erreur détaillée:', err);
  } finally {
    if (btn) {
      btn.disabled = false;
      btn.classList.remove('is-loading');
      btn.innerHTML = btnHtml;
    }
  }
}

function setStatus(text, type) {
  const el = document.getElementById('joinDeptStatus');
  if (!el) return;

  if (type === 'clear') {
    el.textContent = '';
    el.className = 'form-status';
    return;
  }
  el.textContent = text;
  el.className = `form-status ${type}`;
}
