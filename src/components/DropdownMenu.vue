<template>
  <div
    class="dropdown-menu"
    :class="{ active: open }"
    id="dropdownMenu"
  >
    <div class="dropdown-menu-content">
      <div class="dropdown-menu-header">
        <h3 class="dropdown-menu-title">= Menu =</h3>
        <button
          type="button"
          class="dropdown-menu-close"
          aria-label="Fermer le menu"
          @click="$emit('close')"
        >
          <i class="fas fa-times"></i>
        </button>
      </div>
      <div class="dropdown-menu-body">
        <div class="dropdown-menu-section">
          <h4 class="dropdown-menu-section-title">L'ÉGLISE</h4>
          <ul class="dropdown-menu-list">
            <li><router-link to="/" class="dropdown-menu-link" @click="$emit('close')">Accueil</router-link></li>
            <li><router-link to="/commencer-ici" class="dropdown-menu-link" @click="$emit('close')">Commencer ici</router-link></li>
            <li><router-link to="/#vision" class="dropdown-menu-link" @click="$emit('close')">Notre vision</router-link></li>
            <li><router-link to="/#evenements" class="dropdown-menu-link" @click="$emit('close')">Nos événements</router-link></li>
            <li><router-link to="/#programs" class="dropdown-menu-link" @click="$emit('close')">Nos programmes</router-link></li>
          </ul>
        </div>
        <div class="dropdown-menu-section">
          <h4 class="dropdown-menu-section-title">DÉPARTEMENTS</h4>
          <ul class="dropdown-menu-list">
            <li><router-link to="/departement/jeunes-adultes" class="dropdown-menu-link" @click="$emit('close')">Jeunes adultes</router-link></li>
            <li><router-link to="/departement/hommes" class="dropdown-menu-link" @click="$emit('close')">Hommes</router-link></li>
            <li><router-link to="/departement/femmes" class="dropdown-menu-link" @click="$emit('close')">Femmes</router-link></li>
            <li><router-link to="/departement/ados" class="dropdown-menu-link" @click="$emit('close')">Ados</router-link></li>
            <li><router-link to="/departement/juniors" class="dropdown-menu-link" @click="$emit('close')">Juniors</router-link></li>
            <li><router-link to="/departement/chorale" class="dropdown-menu-link" @click="$emit('close')">Groupe de louange</router-link></li>
            <li><router-link to="/departement/intercession" class="dropdown-menu-link" @click="$emit('close')">Intercession</router-link></li>
            <li><router-link to="/departement/groupe-pastoral" class="dropdown-menu-link" @click="$emit('close')">Conseil pastoral</router-link></li>
            <li><router-link to="/departement/evangelisation" class="dropdown-menu-link" @click="$emit('close')">Évangélisation</router-link></li>
            <li><router-link to="/departement/medias" class="dropdown-menu-link" @click="$emit('close')">Médias</router-link></li>
          </ul>
        </div>
        <div class="dropdown-menu-section">
          <h4 class="dropdown-menu-section-title">S'IMPLIQUER</h4>
          <ul class="dropdown-menu-list">
            <li><router-link to="/se-joindre" class="dropdown-menu-link" @click="$emit('close')">Se joindre à nous</router-link></li>
            <li><router-link to="/nouveaux-convertis" class="dropdown-menu-link" @click="$emit('close')">Marcher avec Christ</router-link></li>
            <li><router-link to="/faire-un-don" class="dropdown-menu-link" @click="$emit('close')">Faire un don</router-link></li>
          </ul>
        </div>
      </div>
      <div class="dropdown-menu-footer">
        <div class="dropdown-menu-footer-links">
          <a href="#" class="dropdown-menu-footer-link">Politique de confidentialité</a>
          <a href="#" class="dropdown-menu-footer-link">Témoins + Cookies</a>
        </div>
        <div class="dropdown-menu-social">
          <a href="#" aria-label="YouTube"><i class="fab fa-youtube"></i></a>
          <a href="#" aria-label="Facebook"><i class="fab fa-facebook"></i></a>
          <a href="#" aria-label="Instagram"><i class="fab fa-instagram"></i></a>
          <a href="#" aria-label="Spotify"><i class="fab fa-spotify"></i></a>
        </div>
      </div>
    </div>
  </div>
</template>

<script setup>
defineProps({
  open: { type: Boolean, default: false },
})
defineEmits(['close'])
</script>

