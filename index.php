<?php
$to = "kururugis3@gmail.com";
$subject = "Test Mail XAMPP";
$message = "Ceci est un test depuis XAMPP.";
$headers = "From: kururugis3@gmail.com";

if (mail($to, $subject, $message, $headers)) {
    echo "Mail envoyé avec succès ✅";
} else {
    echo "Échec de l'envoi ❌";
}
?>

<?php
  $pageTitle = "Accueil — Cité de l'amour";
  require __DIR__ . "/includes/header.php";
?>

<!-- Hero Section -->
<section class="hero" id="heroSection">
    <div class="hero-overlay"></div>
    <div class="hero-content">
        <h1 class="hero-title">
            <span class="hero-title-part" data-part="1">LÀ OÙ</span>
            <span class="hero-title-part" data-part="2">L'AMOUR TRANSFORME</span>
            <span class="hero-title-part" data-part="3">DES VIES</span>
        </h1>
        <p class="hero-subtitle">Bienvenu(e) à la cité de l'amour</p>
    </div>
</section>

<!-- Vision Section -->
<section class="vision" id="vision">
    <div class="container">
        <h2 class="section-title">Notre vision</h2>
        <div class="vision-content-wrapper">
            <div class="vision-text-block">
                <p class="vision-main-text">
                    NOTRE VISION EST DE VOIR LE QUÉBEC TRANSFORMÉ PAR L'AMOUR DE JÉSUS-CHRIST EN PROCLAMANT AVEC PASSION L'ÉVANGILE, VIVANT UNE COMMUNION FRATERNELLE SINCÈRE ET EN SERVANT NOTRE PROCHAIN AVEC PASSION ET GÉNÉROSITÉ.
                </p>
                <a href="se-joindre.html" class="vision-cta-btn">
                    <i class="fas fa-heart"></i> JOINS-TOI À NOUS
                </a>
            </div>
            <div class="vision-images-grid">
                <div class="vision-image-card image-1">
                    <img src="visionremplacement1.jpeg" alt="Notre vision">
                </div>
                <div class="vision-image-card image-2">
                    <img src="visionremplacement2.jpeg" alt="Notre vision">
                </div>
                <div class="vision-image-card image-3">
                    <img src="notrevision3.jpg" alt="Notre vision">
                </div>
            </div>
        </div>
    </div>
</section>

<!-- Events Section -->
<section class="events" id="evenements">
    <div class="container">
        <h2 class="section-title">Nos événements</h2>
        <div class="carousel-wrapper">
            <button class="carousel-btn prev-btn" id="eventsPrev">
                <i class="fas fa-chevron-left"></i>
            </button>
            <div class="carousel-container" id="eventsCarousel">
                <!-- Events will be dynamically loaded here -->
            </div>
            <button class="carousel-btn next-btn" id="eventsNext">
                <i class="fas fa-chevron-right"></i>
            </button>
        </div>
        <div class="text-center">
            <button class="btn-primary" id="viewAllEvents">Voir tous les événements</button>
        </div>
    </div>
</section>

<!-- Programs Section -->
<section class="programs" id="programs">
    <div class="container">
        <h2 class="section-title">Nos programmes</h2>
        <div class="programs-grid" id="programsGrid">
            <!-- Programs will be dynamically loaded here -->
        </div>
    </div>
</section>

<!-- Departments Section -->
<section class="departments" id="departements">
    <div class="container">
        <h2 class="section-title">Nos départements</h2>
        <div class="departments-grid" id="departmentsGrid">
            <!-- Departments will be dynamically loaded here -->
        </div>
    </div>
</section>

<?php require __DIR__ . "/includes/footer.php"; ?>
