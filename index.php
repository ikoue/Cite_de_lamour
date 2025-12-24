<?php
  $pageTitle = "Accueil — Cité de l'amour";
  require __DIR__ . "/includes/header.php";
?>

<section class="hero">
  <div class="hero-media" role="img" aria-label="Image de couverture (placeholder)"></div>
  <div class="hero-overlay container">
    <h1>LÀ OÙ L’AMOUR TRANSFORME DES VIES</h1>
    <p>là où l’amour transforme des vies</p>
  </div>
</section>

<section class="container section">
  <article class="card vision">
    <div class="vision-icon" aria-hidden="true">❤</div>
    <div>
      <h2>Notre vision</h2>
      <p>
        Nous aspirons à bâtir et équiper une communauté fondée sur l’amour,
        afin de transformer des vies et impacter le monde.
      </p>
    </div>
  </article>
</section>

<section class="container section">
  <div class="section-head">
    <h2>Nos événements</h2>
    <div class="section-line"></div>
  </div>

  <div class="carousel">
    <button class="carousel-btn" aria-label="Précédent">‹</button>

    <div class="events-grid">
      <?php
        $events = [
          ["day"=>"25","time"=>"19h00","title"=>"Nom de l’événement","desc"=>"Description de l’événement..."],
          ["day"=>"02","time"=>"20h00","title"=>"Nom de l’événement","desc"=>"Description de l’événement..."],
          ["day"=>"10","time"=>"19h00","title"=>"Nom de l’événement","desc"=>"Description de l’événement..."],
        ];
        foreach ($events as $e):
      ?>
      <article class="event-card">
        <div class="event-img"></div>
        <div class="event-body">
          <div class="event-date">
            <span class="badge"><?= htmlspecialchars($e["day"]) ?></span>
            <span class="time"><?= htmlspecialchars($e["time"]) ?></span>
          </div>
          <h3><?= htmlspecialchars($e["title"]) ?></h3>
          <p class="muted"><?= htmlspecialchars($e["desc"]) ?></p>
          <a class="btn btn-secondary" href="#">Voir détail</a>
        </div>
      </article>
      <?php endforeach; ?>
    </div>

    <button class="carousel-btn" aria-label="Suivant">›</button>
  </div>

  <div class="center">
    <a class="btn btn-primary btn-wide" href="#">Voir tous les événements</a>
  </div>
</section>

<section class="container section">
  <h2 class="center-title">Nos programmes</h2>

  <div class="programs-grid">
    <div class="program">
      <div class="program-ico">⛪</div>
      <div class="program-text">
        <strong>Culte de célébration</strong>
        <span class="muted">Dimanche</span>
      </div>
    </div>

    <div class="program">
      <div class="program-ico">📖</div>
      <div class="program-text">
        <strong>Étude biblique des jeunes</strong>
        <span class="muted">Mardi</span>
      </div>
    </div>

    <div class="program">
      <div class="program-ico">🏠</div>
      <div class="program-text">
        <strong>Cellule de maison</strong>
        <span class="muted">1x / semaine</span>
      </div>
    </div>

    <div class="program">
      <div class="program-ico">👥</div>
      <div class="program-text">
        <strong>Rencontre Hommes/Femmes</strong>
        <span class="muted">Vendredi</span>
      </div>
    </div>
  </div>
</section>

<section class="container section">
  <h2 class="center-title">Nos départements</h2>

  <div class="carousel">
    <button class="carousel-btn" aria-label="Précédent">‹</button>

    <div class="depts-grid">
      <?php
        $depts = ["Jeunes Adultes","Hommes","Les Femmes","Juniors","Évangélisation"];
        foreach ($depts as $d):
      ?>
      <article class="dept-card">
        <div class="dept-img"></div>
        <div class="dept-label">
          <h3><?= htmlspecialchars($d) ?></h3>
          <p class="muted">Courte description…</p>
        </div>
      </article>
      <?php endforeach; ?>
    </div>

    <button class="carousel-btn" aria-label="Suivant">›</button>
  </div>

  <div class="center">
    <a class="btn btn-primary btn-wide" href="#">Voir tous les départements</a>
  </div>
</section>

<?php require __DIR__ . "/includes/footer.php"; ?>
