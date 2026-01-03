<?php
header('Content-Type: application/json; charset=utf-8');

function respond($ok, $message, $extra = []) {
  echo json_encode(array_merge([
    'ok' => $ok,
    'message' => $message,
  ], $extra), JSON_UNESCAPED_UNICODE);
  exit;
}

if ($_SERVER['REQUEST_METHOD'] !== 'POST') {
  respond(false, 'Méthode non autorisée.');
}

$to = "philippeiffot@gmail.com";

// Récupération + nettoyage
$fullName = trim($_POST['fullName'] ?? '');
$phone    = trim($_POST['phone'] ?? '');
$email    = trim($_POST['email'] ?? '');
$message  = trim($_POST['message'] ?? '');

if ($fullName === '' || $phone === '') {
  respond(false, 'Veuillez remplir les champs obligatoires (*) : Nom complet et Téléphone.');
}

if ($email !== '' && !filter_var($email, FILTER_VALIDATE_EMAIL)) {
  respond(false, 'Adresse email invalide.');
}

// Sujet + contenu
$subject = "Nouveau message - Formulaire Contact (Cité de l'amour)";
$body =
"Un nouveau message a été envoyé depuis la page Se joindre à nous.\n\n" .
"Nom : {$fullName}\n" .
"Téléphone : {$phone}\n" .
"Email : " . ($email !== '' ? $email : '(non fourni)') . "\n\n" .
"Message :\n{$message}\n\n" .
"----\n" .
"Date : " . date('Y-m-d H:i:s') . "\n" .
"IP : " . ($_SERVER['REMOTE_ADDR'] ?? 'unknown') . "\n";

// Headers
$headers = [];
$headers[] = "MIME-Version: 1.0";
$headers[] = "Content-Type: text/plain; charset=utf-8";
$headers[] = "From: no-reply@localhost";
if ($email !== '') {
  $headers[] = "Reply-To: {$email}";
}
$headersStr = implode("\r\n", $headers);

// Sauvegarde locale (au cas où mail() échoue sur XAMPP)
$logDir = __DIR__ . DIRECTORY_SEPARATOR . "data";
if (!is_dir($logDir)) {
  @mkdir($logDir, 0755, true);
}
$logFile = $logDir . DIRECTORY_SEPARATOR . "contact-messages.log";
$logEntry = "-----\n" . $body . "\n";
@file_put_contents($logFile, $logEntry, FILE_APPEND);

// Tentative d'envoi
$sent = @mail($to, $subject, $body, $headersStr);

if ($sent) {
  respond(true, "Message envoyé ✅ (destination: {$to})", ['sent' => true]);
} else {
  // Important : sur XAMPP Windows, mail() échoue souvent si SMTP non configuré.
  respond(true, "SMTP non configuré : message enregistré dans data/contact-messages.log ✅", ['sent' => false]);
}
