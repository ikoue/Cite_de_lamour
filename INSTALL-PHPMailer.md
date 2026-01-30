# Installation de PHPMailer

## Méthode 1 : Installation automatique (recommandée)

1. Ouvrez votre navigateur et allez à :
   ```
   http://localhost/Cite_de_lamour/install-phpmailer.php
   ```

2. Le script téléchargera et installera automatiquement PHPMailer.

## Méthode 2 : Installation manuelle

Si la méthode automatique ne fonctionne pas :

1. **Téléchargez PHPMailer** :
   - Allez sur : https://github.com/PHPMailer/PHPMailer/releases
   - Téléchargez la dernière version (fichier ZIP)

2. **Extrayez le fichier ZIP**

3. **Copiez les fichiers** dans `vendor/phpmailer/phpmailer/` :
   - `PHPMailer-6.x.x/src/PHPMailer.php` → `vendor/phpmailer/phpmailer/PHPMailer.php`
   - `PHPMailer-6.x.x/src/Exception.php` → `vendor/phpmailer/phpmailer/Exception.php`
   - `PHPMailer-6.x.x/src/SMTP.php` → `vendor/phpmailer/phpmailer/SMTP.php`

4. **Vérifiez la structure** :
   ```
   vendor/
   ├── autoload.php
   └── phpmailer/
       └── phpmailer/
           ├── PHPMailer.php
           ├── Exception.php
           └── SMTP.php
   ```

## Vérification

Après l'installation, le formulaire "Rejoindre un département" devrait fonctionner sans l'erreur "PHPMailer non installé".

## Configuration

N'oubliez pas de configurer `config.mail.php` avec vos identifiants Gmail :
- `smtp_user` : votre adresse Gmail
- `smtp_pass` : votre mot de passe d'application Gmail (pas votre mot de passe habituel)

Pour obtenir un mot de passe d'application Gmail :
1. Allez sur https://myaccount.google.com/apppasswords
2. Sélectionnez "Mail" et créez un mot de passe d'application
3. Utilisez ce mot de passe dans `config.mail.php`

