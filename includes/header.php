<?php
?>
<!doctype html>
<html lang="fr">
<head>
  <meta charset="utf-8" />
  <meta name="viewport" content="width=device-width, initial-scale=1" />
  <title><?= isset($pageTitle) ? htmlspecialchars($pageTitle) : "Photo du logo"; ?></title>
  <link rel="stylesheet" href="/assets/css/style.css" />
</head>
<body>
<header class="site-header">
  <div class="topbar">
    <a class="brand" href="/">
  <img
    src="assets/images/logo.jpeg"
    alt="Cité de l'amour"
    class="brand-logo"
  >
</a>


    <nav class="nav" aria-label="Navigation principale">
      <a href="#" class="nav-link">Commencer ici</a>
      <a href="#" class="nav-link">Se joindre à nous</a>
      <a href="#" class="nav-link">Menu</a>
    </nav>

    <button class="burger" aria-label="Ouvrir le menu" aria-expanded="false">
      ☰
    </button>

    <a class="btn btn-primary" href="#">Nous contacter</a>
  </div>
</header>

<main class="page">
