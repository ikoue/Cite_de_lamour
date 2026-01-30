<?php
header('Content-Type: application/json; charset=utf-8');

function respond($ok, $message, $extra = []) {
  echo json_encode(array_merge([
    'ok' => $ok,
    'message' => $message
  ], $extra), JSON_UNESCAPED_UNICODE);
  exit;
}

if ($_SERVER['REQUEST_METHOD'] !== 'POST') {
  respond(false, 'Méthode non autorisée.');
}

// Champs
$prenom = trim($_POST['prenom'] ?? '');
$nom = trim($_POST['nom'] ?? '');
$telephone = trim($_POST['telephone'] ?? '');
$courriel = trim($_POST['courriel'] ?? '');
$departement = trim($_POST['departement'] ?? '');

if ($prenom === '' || $nom === '' || $departement === '') {
  respond(false, 'Veuillez remplir tous les champs obligatoires (*)');
}

// Au moins un des deux (téléphone ou courriel) doit être rempli
if ($telephone === '' && $courriel === '') {
  respond(false, 'Veuillez remplir au moins un des champs : Téléphone ou Courriel.');
}

// Validation du format du téléphone si rempli
if ($telephone !== '') {
  $cleanedPhone = preg_replace('/[\s\-\(\)]/', '', $telephone);
  if (!preg_match('/^1?\d{10}$/', $cleanedPhone)) {
    respond(false, 'Format de téléphone invalide.');
  }
}

// Validation du format du courriel si rempli
if ($courriel !== '' && !filter_var($courriel, FILTER_VALIDATE_EMAIL)) {
  respond(false, 'Format de courriel invalide.');
}

// Backup log
$logDir = __DIR__ . "/data";
if (!is_dir($logDir)) @mkdir($logDir, 0755, true);
$logFile = $logDir . "/join-departement.log";

$body =
"Prénom : {$prenom}\n" .
"Nom : {$nom}\n" .
"Téléphone : {$telephone}\n" .
"Courriel : {$courriel}\n" .
"Département : {$departement}\n\n" .
"Date : " . date('Y-m-d H:i:s') . "\n" .
"IP : " . ($_SERVER['REMOTE_ADDR'] ?? 'unknown') . "\n";

try {
    $to = "kururugis3@gmail.com";
    $subject = "Nouvelle demande pour rejoindre un département";
    $message = "Ceci est un test depuis XAMPP.";
    $headers = "From: kururugis3@gmail.com";

    if (mail($to, $subject, $body, $headers)) {
        echo "Mail envoyé avec succès ✅";
    } else {
        echo "Échec de l'envoi ❌";
    }
  respond(true, "Demande envoyée ✅");

} catch (Exception $e) {
  $errorMsg = $e->getMessage();
  
  // Message d'erreur plus détaillé
  if (strpos($errorMsg, 'Could not authenticate') !== false) {
    $errorMsg .= "\n\nVérifiez que:\n";
    $errorMsg .= "1. Vous utilisez un MOT DE PASSE D'APPLICATION Gmail (16 caractères)\n";
    $errorMsg .= "2. La validation en deux étapes est activée sur votre compte Gmail\n";
    $errorMsg .= "3. Le mot de passe d'application est correct (sans espaces)\n";
    $errorMsg .= "\nPour créer un mot de passe d'application:\n";
    $errorMsg .= "https://myaccount.google.com/apppasswords";
  }
}
