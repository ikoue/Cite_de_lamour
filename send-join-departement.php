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

// Charger config SMTP (déjà utilisée chez toi)
$configFile = __DIR__ . '/config.mail.php';
if (!file_exists($configFile)) {
  respond(false, "Fichier config.mail.php introuvable.");
}
$cfg = require $configFile;

$SMTP_USER = $cfg['smtp_user'] ?? '';
$SMTP_PASS = $cfg['smtp_pass'] ?? '';
$TO_EMAIL  = $cfg['to_email'] ?? 'philippeiffot@gmail.com';
$FROM_NAME = $cfg['from_name'] ?? "Cité de l'amour - Départements";

if (!$SMTP_USER || !$SMTP_PASS || !$TO_EMAIL) {
  respond(false, "Config SMTP incomplète dans config.mail.php");
}

// Champs
$prenom = trim($_POST['prenom'] ?? '');
$nom = trim($_POST['nom'] ?? '');
$telephone = trim($_POST['telephone'] ?? '');
$courriel = trim($_POST['courriel'] ?? '');
$departement = trim($_POST['departement'] ?? '');

if ($prenom === '' || $nom === '' || $telephone === '' || $courriel === '' || $departement === '') {
  respond(false, 'Veuillez remplir tous les champs obligatoires (*)');
}
if (!filter_var($courriel, FILTER_VALIDATE_EMAIL)) {
  respond(false, 'Courriel invalide.');
}

// Backup log
$logDir = __DIR__ . "/data";
if (!is_dir($logDir)) @mkdir($logDir, 0755, true);
$logFile = $logDir . "/join-departement.log";

$body =
"Nouvelle demande pour rejoindre un département\n\n" .
"Prénom : {$prenom}\n" .
"Nom : {$nom}\n" .
"Téléphone : {$telephone}\n" .
"Courriel : {$courriel}\n" .
"Département : {$departement}\n\n" .
"Date : " . date('Y-m-d H:i:s') . "\n" .
"IP : " . ($_SERVER['REMOTE_ADDR'] ?? 'unknown') . "\n";

@file_put_contents($logFile, "-----\n" . $body . "\n", FILE_APPEND);

// PHPMailer (Composer)
$autoload = __DIR__ . '/vendor/autoload.php';
if (!file_exists($autoload)) {
  respond(false, "PHPMailer non installé. Fais: composer require phpmailer/phpmailer");
}
require $autoload;

use PHPMailer\PHPMailer\PHPMailer;
use PHPMailer\PHPMailer\Exception;

try {
  $mail = new PHPMailer(true);

  $mail->isSMTP();
  $mail->Host = 'smtp.gmail.com';
  $mail->SMTPAuth = true;
  $mail->Username = $SMTP_USER;
  $mail->Password = $SMTP_PASS;
  $mail->SMTPSecure = PHPMailer::ENCRYPTION_STARTTLS;
  $mail->Port = 587;

  $mail->setFrom($SMTP_USER, $FROM_NAME);
  $mail->addAddress($TO_EMAIL);

  // Reply-To = la personne qui a rempli le form
  $mail->addReplyTo($courriel, $prenom . ' ' . $nom);

  $mail->Subject = "Demande - Rejoindre un département ({$departement})";
  $mail->Body = $body;

  $mail->send();
  respond(true, "Demande envoyée ✅ (destination: {$TO_EMAIL})");

} catch (Exception $e) {
  respond(false, "Erreur SMTP: " . $e->getMessage());
}
