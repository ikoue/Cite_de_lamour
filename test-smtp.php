<?php
/**
 * Script de test SMTP
 * Utilisez ce script pour tester votre configuration SMTP
 * Accédez-y via: http://localhost/Cite_de_lamour/test-smtp.php
 */

require __DIR__ . '/vendor/autoload.php';
use PHPMailer\PHPMailer\PHPMailer;
use PHPMailer\PHPMailer\Exception;

// Charger la configuration
$configFile = __DIR__ . '/config.mail.php';
if (!file_exists($configFile)) {
    die("Erreur: config.mail.php introuvable");
}
$cfg = require $configFile;

$SMTP_USER = $cfg['smtp_user'] ?? '';
$SMTP_PASS = $cfg['smtp_pass'] ?? '';
$TO_EMAIL = $cfg['to_email'] ?? '';

echo "<h1>Test de configuration SMTP</h1>";
echo "<p><strong>Email SMTP:</strong> " . htmlspecialchars($SMTP_USER) . "</p>";

// Afficher le mot de passe (masqué)
if (empty($SMTP_PASS)) {
    echo "<p><strong>Mot de passe:</strong> <span style='color:red;'>NON CONFIGURÉ</span></p>";
} else {
    $passLength = strlen($SMTP_PASS);
    $maskedPass = str_repeat('*', $passLength);
    echo "<p><strong>Mot de passe:</strong> " . $maskedPass . " (" . $passLength . " caractères)</p>";
}

echo "<p><strong>Email de destination:</strong> " . htmlspecialchars($TO_EMAIL) . "</p>";

if (empty($SMTP_USER) || empty($SMTP_PASS)) {
    die("<p style='color:red;'>Erreur: Configuration incomplète dans config.mail.php</p>");
}

// Vérifier le format du mot de passe
$passLength = strlen($SMTP_PASS);
if ($passLength != 16) {
    echo "<div style='background:#fff3cd; border:1px solid #ffc107; padding:15px; margin:15px 0;'>";
    echo "<h3 style='color:#856404;'>⚠️ Attention : Format de mot de passe incorrect</h3>";
    echo "<p><strong>Longueur actuelle :</strong> " . $passLength . " caractères</p>";
    echo "<p><strong>Longueur attendue :</strong> 16 caractères exactement</p>";
    echo "<p><strong>Votre mot de passe :</strong> " . str_repeat('*', $passLength) . "</p>";
    echo "<hr>";
    echo "<p><strong>⚠️ IMPORTANT :</strong> Google ne permet plus l'utilisation de votre mot de passe Gmail normal pour SMTP.</p>";
    echo "<p>Même si votre mot de passe fonctionne pour vous connecter à Gmail dans le navigateur, il <strong>ne fonctionnera pas</strong> pour envoyer des emails via SMTP.</p>";
    echo "<p><strong>Solution :</strong> Vous devez créer un <strong>mot de passe d'application</strong> spécifique :</p>";
    echo "<ol>";
    echo "<li>Allez sur <a href='https://myaccount.google.com/apppasswords' target='_blank'>https://myaccount.google.com/apppasswords</a></li>";
    echo "<li>Assurez-vous que la validation en deux étapes est activée</li>";
    echo "<li>Créez un nouveau mot de passe d'application pour 'Mail'</li>";
    echo "<li>Copiez les 16 caractères (sans espaces) dans config.mail.php</li>";
    echo "</ol>";
    echo "</div>";
}

echo "<hr>";
echo "<h2>Test d'envoi d'email...</h2>";

try {
    $mail = new PHPMailer(true);
    
    // Activer le débogage
    $mail->SMTPDebug = 2;
    $mail->Debugoutput = function($str, $level) {
        echo "<pre style='background:#f0f0f0; padding:5px; margin:5px 0;'>" . htmlspecialchars($str) . "</pre>";
    };

    $mail->isSMTP();
    $mail->Host = 'smtp.gmail.com';
    $mail->SMTPAuth = true;
    $mail->Username = $SMTP_USER;
    $mail->Password = $SMTP_PASS;
    $mail->SMTPSecure = PHPMailer::ENCRYPTION_STARTTLS;
    $mail->Port = 587;
    
    $mail->SMTPOptions = array(
        'ssl' => array(
            'verify_peer' => false,
            'verify_peer_name' => false,
            'allow_self_signed' => true
        )
    );
    
    $mail->Timeout = 30;
    $mail->CharSet = 'UTF-8';

    $mail->setFrom($SMTP_USER, "Test Cité de l'amour");
    $mail->addAddress($TO_EMAIL);

    $mail->Subject = "Test SMTP - Cité de l'amour";
    $mail->Body = "Ceci est un email de test pour vérifier la configuration SMTP.\n\n";
    $mail->Body .= "Date: " . date('Y-m-d H:i:s') . "\n";
    $mail->isHTML(false);

    $mail->send();
    echo "<p style='color:green; font-weight:bold;'>✅ Email envoyé avec succès!</p>";
    echo "<p>Vérifiez votre boîte de réception: " . htmlspecialchars($TO_EMAIL) . "</p>";

} catch (Exception $e) {
    echo "<p style='color:red; font-weight:bold;'>❌ Erreur: " . htmlspecialchars($e->getMessage()) . "</p>";
    
    if (strpos($e->getMessage(), 'Could not authenticate') !== false) {
        echo "<div style='background:#fff3cd; border:1px solid #ffc107; padding:15px; margin:15px 0;'>";
        echo "<h3>Problème d'authentification détecté</h3>";
        echo "<p><strong>Solutions possibles:</strong></p>";
        echo "<ol>";
        echo "<li>Assurez-vous d'utiliser un <strong>mot de passe d'application Gmail</strong> (16 caractères)</li>";
        echo "<li>Vérifiez que la <strong>validation en deux étapes</strong> est activée sur votre compte Gmail</li>";
        echo "<li>Créez un nouveau mot de passe d'application sur: <a href='https://myaccount.google.com/apppasswords' target='_blank'>https://myaccount.google.com/apppasswords</a></li>";
        echo "<li>Le mot de passe d'application doit être copié <strong>sans espaces</strong></li>";
        echo "</ol>";
        echo "</div>";
    }
}

echo "<hr>";
echo "<p><a href='index.php'>Retour à l'accueil</a></p>";

