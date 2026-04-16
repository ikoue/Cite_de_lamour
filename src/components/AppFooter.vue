<template>
  <footer class="footer">
    <div class="container">
      <div class="footer-header">
        <div class="footer-logo">
          <img src="/logo.png" alt="Cité de l'amour Logo" class="logo-image">
        </div>
        <h2 class="footer-title">CITÉ DE L'AMOUR</h2>
      </div>

      <div class="footer-divider"></div>

      <div class="footer-main">
        <div class="footer-newsletter">
          <h3 class="footer-section-title">RESTONS CONNECTÉS</h3>
        </div>
        <div class="footer-links-grid">
          <div class="footer-column">
            <h3>L'ÉGLISE</h3>
            <router-link to="/commencer-ici">Commencer ici</router-link>
            <router-link to="/#vision">Notre vision</router-link>
            <router-link to="/#evenements">Nos événements</router-link>
            <router-link to="/#programs">Nos programmes</router-link>
          </div>
          <div class="footer-column">
            <h3>DÉPARTEMENTS</h3>
            <router-link to="/departement/jeunes-adultes">Jeunes adultes</router-link>
            <router-link to="/departement/hommes">Hommes</router-link>
            <router-link to="/departement/femmes">Femmes</router-link>
            <router-link to="/departement/ados">Ados</router-link>
            <router-link to="/departement/juniors">Juniors</router-link>
            <router-link to="/departement/chorale">Groupe de louange</router-link>
            <router-link to="/departement/intercession">Intercession</router-link>
            <router-link to="/departement/groupe-pastoral">Conseil pastoral</router-link>
            <router-link to="/departement/evangelisation">Évangélisation</router-link>
            <router-link to="/departement/medias">Médias</router-link>
          </div>
          <div class="footer-column">
            <h3>S'IMPLIQUER</h3>
            <router-link to="/se-joindre">Se joindre à nous</router-link>
            <router-link to="/faire-un-don">Faire un don</router-link>
          </div>
        </div>
      </div>

      <div class="footer-address-section">
        <div class="footer-address">
          <i class="fas fa-map-marker-alt"></i>
          <span>332 avenue saint-sacrement<br>Québec, QC, G1N 3Y2</span>
        </div>
      </div>

      <div class="footer-divider"></div>

      <div class="footer-slogan-section">
        <p class="footer-slogan">Cité de l'Amour – Là où l'amour transforme des vies</p>
      </div>

      <div class="footer-bottom">
        <div class="footer-bottom-left">
          <p class="footer-copyright">&copy; 2025 CITÉ DE L'AMOUR</p>
        </div>
        <div class="footer-bottom-right">
          <div class="footer-social">
            <a href="https://www.youtube.com/@lacitedelamour?si=c95knlQON0_hjLZd" target="_blank" rel="noopener noreferrer" class="social-icon" aria-label="YouTube">
              <i class="fab fa-youtube"></i>
            </a>
            <a href="https://www.instagram.com/citedelamour?igsh=MTJ5eHZlYWY4YWcxaw==" target="_blank" rel="noopener noreferrer" class="social-icon" aria-label="Instagram">
              <i class="fab fa-instagram"></i>
            </a>
            <a href="https://www.facebook.com/share/1KYkeJiemi/?mibextid=wwXIfr" target="_blank" rel="noopener noreferrer" class="social-icon" aria-label="Facebook">
              <i class="fab fa-facebook-f"></i>
            </a>
            <a href="https://www.tiktok.com/@citedelamour?_r=1&_t=ZS-92ZyAVWSCTR" target="_blank" rel="noopener noreferrer" class="social-icon" aria-label="TikTok">
              <i class="fab fa-tiktok"></i>
            </a>
          </div>
        </div>
      </div>
    </div>
  </footer>
</template>

<script setup>
</script>
