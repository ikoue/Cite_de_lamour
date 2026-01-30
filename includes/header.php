<!DOCTYPE html>
<html lang="fr">
<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <title><?= isset($pageTitle) ? htmlspecialchars($pageTitle) : "Cité de l'amour - Là où l'amour transforme des vies" ?></title>
    <link rel="stylesheet" href="styles.css">
    <link rel="stylesheet" href="https://cdnjs.cloudflare.com/ajax/libs/font-awesome/6.4.0/css/all.min.css">
</head>
<body>
    <!-- Header -->
    <header class="header department-header-transparent">
        <div class="container">
            <div class="header-content">
                <div class="logo">
                    <img src="logo.png" alt="Cité de l'amour Logo" class="logo-image">
                </div>
                <nav class="nav">
                    <a href="commencer-ici.html" class="nav-link">Commencer ici</a>
                    <a href="se-joindre.html" class="nav-link">Se joindre à nous</a>
                    <a href="#menu" class="nav-link menu-toggle" id="menuToggle">
                        Menu <i class="fas fa-bars"></i>
                    </a>
                </nav>
            </div>
        </div>
    </header>

    <!-- Dropdown Menu -->
    <div class="dropdown-menu" id="dropdownMenu">
        <div class="dropdown-menu-content">
            <div class="dropdown-menu-header">
                <h3 class="dropdown-menu-title">= Menu =</h3>
                <button class="dropdown-menu-close" id="menuClose" aria-label="Fermer le menu">
                    <i class="fas fa-times"></i>
                </button>
            </div>
            <div class="dropdown-menu-body">
                <div class="dropdown-menu-section">
                    <h4 class="dropdown-menu-section-title">L'ÉGLISE</h4>
                    <ul class="dropdown-menu-list">
                        <li><a href="commencer-ici.html" class="dropdown-menu-link">Commencer ici</a></li>
                        <li><a href="index.php#vision" class="dropdown-menu-link">Notre vision</a></li>
                        <li><a href="index.php#evenements" class="dropdown-menu-link">Nos événements</a></li>
                        <li><a href="index.php#programs" class="dropdown-menu-link">Nos programmes</a></li>
                    </ul>
                </div>
                <div class="dropdown-menu-section">
                    <h4 class="dropdown-menu-section-title">DÉPARTEMENTS</h4>
                    <ul class="dropdown-menu-list">
                        <li><a href="departement-jeunes-adultes.html" class="dropdown-menu-link">Jeunes adultes</a></li>
                        <li><a href="departement-hommes.html" class="dropdown-menu-link">Hommes</a></li>
                        <li><a href="departement-femmes.html" class="dropdown-menu-link">Femmes</a></li>
                        <li><a href="departement-ados.html" class="dropdown-menu-link">Ados</a></li>
                        <li><a href="departement-juniors.html" class="dropdown-menu-link">Juniors</a></li>
                        <li><a href="departement-chorale.html" class="dropdown-menu-link">Groupe de louange</a></li>
                        <li><a href="departement-intercession.html" class="dropdown-menu-link">Intercession</a></li>
                        <li><a href="departement-groupe-pastoral.html" class="dropdown-menu-link">Groupe pastoral</a></li>
                        <li><a href="departement-evangelisation.html" class="dropdown-menu-link">Évangélisation</a></li>
                        <li><a href="departement-medias.html" class="dropdown-menu-link">Médias</a></li>
                    </ul>
                </div>
                <div class="dropdown-menu-section">
                    <h4 class="dropdown-menu-section-title">S'IMPLIQUER</h4>
                    <ul class="dropdown-menu-list">
                        <li><a href="se-joindre.html" class="dropdown-menu-link">Se joindre à nous</a></li>
                        <li><a href="faire_un_don.html" class="dropdown-menu-link">Faire un don</a></li>
                    </ul>
                </div>
            </div>
            <div class="dropdown-menu-footer">
                <div class="dropdown-menu-footer-links">
                    <a href="#" class="dropdown-menu-footer-link">Politique de confidentialité</a>
                    <a href="#" class="dropdown-menu-footer-link">Témoins + Cookies</a>
                </div>
                <div class="dropdown-menu-social">
                    <a href="https://www.youtube.com/@lacitedelamour?si=c95knlQON0_hjLZd" target="_blank" rel="noopener noreferrer" aria-label="YouTube"><i class="fab fa-youtube"></i></a>
                    <a href="https://www.facebook.com/share/1KYkeJiemi/?mibextid=wwXIfr" target="_blank" rel="noopener noreferrer" aria-label="Facebook"><i class="fab fa-facebook"></i></a>
                    <a href="https://www.instagram.com/citedelamour?igsh=MTJ5eHZlYWY4YWcxaw==" target="_blank" rel="noopener noreferrer" aria-label="Instagram"><i class="fab fa-instagram"></i></a>
                    <a href="https://www.tiktok.com/@citedelamour?_r=1&_t=ZS-92ZyAVWSCTR" target="_blank" rel="noopener noreferrer" aria-label="TikTok"><i class="fab fa-tiktok"></i></a>
                </div>
            </div>
        </div>
    </div>

