<?php
/**
 * Script d'installation manuelle de PHPMailer
 * Exécutez ce fichier via votre navigateur : http://localhost/Cite_de_lamour/install-phpmailer.php
 */

echo "<h1>Installation de PHPMailer</h1>";

$vendorDir = __DIR__ . '/vendor';
$phpmailerDir = $vendorDir . '/phpmailer/phpmailer';

// Créer le dossier vendor si nécessaire
if (!is_dir($vendorDir)) {
    mkdir($vendorDir, 0755, true);
    echo "<p>✓ Dossier vendor créé</p>";
}

// Créer le dossier phpmailer/phpmailer
if (!is_dir($phpmailerDir)) {
    mkdir($phpmailerDir, 0755, true);
    echo "<p>✓ Dossier phpmailer/phpmailer créé</p>";
}

// URL de téléchargement de PHPMailer (version stable)
$phpmailerZip = 'https://github.com/PHPMailer/PHPMailer/archive/refs/tags/v6.9.1.zip';
$zipFile = __DIR__ . '/phpmailer.zip';

echo "<p>Téléchargement de PHPMailer...</p>";

// Télécharger PHPMailer
$zipContent = @file_get_contents($phpmailerZip);

if ($zipContent === false) {
    echo "<p style='color:red;'>✗ Erreur: Impossible de télécharger PHPMailer depuis GitHub.</p>";
    echo "<p>Veuillez télécharger manuellement PHPMailer depuis: <a href='https://github.com/PHPMailer/PHPMailer/releases'>https://github.com/PHPMailer/PHPMailer/releases</a></p>";
    echo "<p>Extrayez le fichier ZIP et placez le contenu dans: vendor/phpmailer/phpmailer/</p>";
    exit;
}

file_put_contents($zipFile, $zipContent);
echo "<p>✓ PHPMailer téléchargé</p>";

// Extraire le ZIP
$zip = new ZipArchive();
if ($zip->open($zipFile) === TRUE) {
    $zip->extractTo(__DIR__ . '/temp_phpmailer');
    $zip->close();
    echo "<p>✓ Archive extraite</p>";
    
    // Déplacer les fichiers
    $extractedDir = __DIR__ . '/temp_phpmailer/PHPMailer-6.9.1';
    if (is_dir($extractedDir)) {
        // Copier les fichiers nécessaires
        $filesToCopy = [
            'src/PHPMailer.php',
            'src/Exception.php',
            'src/SMTP.php'
        ];
        
        foreach ($filesToCopy as $file) {
            $source = $extractedDir . '/' . $file;
            $dest = $phpmailerDir . '/' . basename($file);
            if (file_exists($source)) {
                copy($source, $dest);
                echo "<p>✓ " . basename($file) . " copié</p>";
            }
        }
        
        // Nettoyer
        function deleteDirectory($dir) {
            if (!file_exists($dir)) return;
            $files = array_diff(scandir($dir), array('.', '..'));
            foreach ($files as $file) {
                (is_dir("$dir/$file")) ? deleteDirectory("$dir/$file") : unlink("$dir/$file");
            }
            rmdir($dir);
        }
        
        deleteDirectory(__DIR__ . '/temp_phpmailer');
        unlink($zipFile);
        
        echo "<p>✓ Nettoyage effectué</p>";
    }
} else {
    echo "<p style='color:red;'>✗ Erreur: Impossible d'extraire l'archive ZIP.</p>";
    exit;
}

// Créer l'autoloader
$autoloadContent = <<<'AUTOLOAD'
<?php
/**
 * Autoloader simple pour PHPMailer
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
AUTOLOAD;

file_put_contents($vendorDir . '/autoload.php', $autoloadContent);
echo "<p>✓ Autoloader créé</p>";

echo "<h2 style='color:green;'>✓ Installation terminée avec succès!</h2>";
echo "<p>Vous pouvez maintenant utiliser PHPMailer dans vos scripts PHP.</p>";
echo "<p><a href='index.php'>Retour à l'accueil</a></p>";

