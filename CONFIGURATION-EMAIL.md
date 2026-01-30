# Configuration de l'envoi d'emails

## Problème actuel
L'erreur "Could not authenticate" signifie que le mot de passe d'application Gmail n'est pas configuré.

## Solution : Configurer le mot de passe d'application Gmail

### Étape 1 : Activer la validation en deux étapes (si pas déjà fait)

1. Allez sur https://myaccount.google.com/security
2. Dans la section "Connexion à Google", cliquez sur "Validation en deux étapes"
3. Suivez les instructions pour l'activer (nécessaire pour créer un mot de passe d'application)

### Étape 2 : Créer un mot de passe d'application

1. **Allez sur la page des mots de passe d'application** :
   - https://myaccount.google.com/apppasswords
   - OU allez sur https://myaccount.google.com/security → "Mots de passe des applications"

2. **Sélectionnez les options** :
   - **Sélectionnez l'app** : Choisissez "Mail"
   - **Sélectionnez l'appareil** : Choisissez "Autre (nom personnalisé)"
   - **Nom** : Entrez "Cité de l'amour" ou "Site web"

3. **Cliquez sur "Générer"**

4. **Copiez le mot de passe généré** :
   - Il sera affiché une seule fois
   - C'est une chaîne de 16 caractères (sans espaces)
   - Exemple : `abcd efgh ijkl mnop` → utilisez `abcdefghijklmnop`

### Étape 3 : Configurer config.mail.php

1. Ouvrez le fichier `config.mail.php` dans votre éditeur

2. Remplacez cette ligne :
   ```php
   'smtp_pass' => 'VOTRE_MOT_DE_PASSE_APPLICATION_ICI',
   ```
   
   Par votre mot de passe d'application (sans espaces) :
   ```php
   'smtp_pass' => 'abcdefghijklmnop',  // Remplacez par votre vrai mot de passe
   ```

3. Vérifiez que les autres paramètres sont corrects :
   ```php
   'smtp_user' => 'citedelamour@gmail.com',  // Votre adresse Gmail
   'to_email' => 'citedelamour@gmail.com',   // Email de destination
   ```

4. **Sauvegardez le fichier**

### Étape 4 : Tester

1. Essayez d'envoyer un formulaire depuis votre site
2. Si tout est correct, vous devriez voir : "Demande envoyée ✅"

## Dépannage

### Si vous ne voyez pas "Mots de passe des applications"
- Assurez-vous que la validation en deux étapes est activée
- Essayez d'accéder directement : https://myaccount.google.com/apppasswords

### Si l'erreur persiste
1. Vérifiez que le mot de passe d'application est correct (16 caractères, sans espaces)
2. Vérifiez que l'adresse email dans `smtp_user` est correcte
3. Vérifiez que la validation en deux étapes est bien activée sur votre compte Gmail

### Alternative : Utiliser un autre service email
Si Gmail pose problème, vous pouvez utiliser :
- **Outlook/Hotmail** : `smtp-mail.outlook.com`, port 587
- **Yahoo** : `smtp.mail.yahoo.com`, port 587
- **Autre serveur SMTP** : Modifiez les paramètres dans `send-join-departement.php`

## Sécurité

⚠️ **IMPORTANT** :
- Ne partagez jamais votre mot de passe d'application
- Ne commitez pas `config.mail.php` dans Git si il contient votre vrai mot de passe
- Utilisez toujours un mot de passe d'application, jamais votre mot de passe Gmail principal

