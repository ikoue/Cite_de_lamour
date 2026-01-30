<?php
/**
 * Autoloader simple pour PHPMailer
 * 
 * Pour installer PHPMailer manuellement:
 * 1. Téléchargez PHPMailer depuis: https://github.com/PHPMailer/PHPMailer/releases
 * 2. Extrayez le fichier ZIP
 * 3. Copiez les fichiers suivants dans vendor/phpmailer/phpmailer/:
 *    - src/PHPMailer.php
 *    - src/Exception.php
 *    - src/SMTP.php
 */

spl_autoload_register(function ($class) {
    $prefix = 'PHPMailer\\PHPMailer\\';
    $base_dir = __DIR__ . '/phpmailer/phpmailer/';
    
    $len = strlen($prefix);
    if (strncmp($prefix, $class, $len) !== 0) {
        return;
    }
    
    $relative_class = substr($class, $len);
    $file = $base_dir . str_replace('\\', '/', $relative_class) . '.php';
    
    if (file_exists($file)) {
        require $file;
    }
});

