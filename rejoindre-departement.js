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

async function submitJoinDept(e) {
  e.preventDefault();

  const form = e.target;
  const data = new FormData(form);

  const prenom = (data.get('prenom') || '').trim();
  const nom = (data.get('nom') || '').trim();
  const telephone = (data.get('telephone') || '').trim();
  const courriel = (data.get('courriel') || '').trim();
  const departement = (data.get('departement') || '').trim();

  if (!prenom || !nom || !telephone || !courriel || !departement) {
    setStatus("Veuillez remplir tous les champs obligatoires (*)", "error");
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

    const payload = await res.json().catch(() => null);
    if (!payload) throw new Error('Réponse serveur invalide.');

    if (payload.ok) {
      setStatus(payload.message || 'Demande envoyée ✅', 'success');
      form.reset();
    } else {
      setStatus(payload.message || "Impossible d'envoyer la demande.", 'error');
    }
  } catch (err) {
    setStatus("Erreur serveur. Ouvre via http://localhost/... (XAMPP).", "error");
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
