
document.addEventListener('DOMContentLoaded', () => {
  initRevealAnimations();

  // petite animation sur l'image hero si présente
  const heroImg = document.getElementById('joinHeroImage');
  if (heroImg) heroImg.classList.add('floaty');

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

async function handleFormSubmit(e) {
  e.preventDefault();

  const form = e.target;
  const formData = new FormData(form);

  const fullName = (formData.get('fullName') || '').trim();
  const phone = (formData.get('phone') || '').trim();

  if (!fullName || !phone) {
    showStatus('Veuillez remplir les champs obligatoires (*) : Nom complet et Téléphone.', 'error');
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

    const payload = await res.json().catch(() => null);

    if (!payload) throw new Error('Réponse serveur invalide.');

    if (payload.ok) {
      showStatus(payload.message || 'Message envoyé ✅', 'success');
      form.reset();
    } else {
      showStatus(payload.message || "Impossible d'envoyer le message.", 'error');
    }
  } catch (err) {
    showStatus(
      "Erreur serveur. Assure-toi d'ouvrir le site via XAMPP (http://localhost/...) et pas en file://",
      'error'
    );
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
 