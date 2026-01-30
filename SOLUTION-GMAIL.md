# Solution pour l'authentification Gmail

## ⚠️ IMPORTANT : Google a changé sa politique

Depuis **mai 2022**, Google **ne permet plus** l'utilisation de votre mot de passe Gmail normal pour les applications tierces (comme PHPMailer). Même si votre mot de passe fonctionne pour vous connecter à Gmail dans le navigateur, il **ne fonctionnera pas** pour SMTP.

## ✅ Solution : Créer un mot de passe d'application

### Pourquoi un mot de passe d'application ?

- **Sécurité** : Plus sécurisé que votre mot de passe principal
- **Obligatoire** : Google l'exige maintenant pour toutes les applications tierces
- **Spécifique** : Un mot de passe unique pour votre site web

### Comment créer un mot de passe d'application Gmail

1. **Activez la validation en deux étapes** (si pas déjà fait) :
   - Allez sur : https://myaccount.google.com/security
   - Cliquez sur "Validation en deux étapes"
   - Suivez les instructions

2. **Créez le mot de passe d'application** :
   - Allez sur : https://myaccount.google.com/apppasswords
   - Si vous ne voyez pas cette option, assurez-vous que la validation en deux étapes est activée
   - Sélectionnez :
     - **App** : "Mail"
     - **Device** : "Autre (nom personnalisé)"
     - **Nom** : "Cité de l'amour"
   - Cliquez sur "Générer"

3. **Copiez le mot de passe** :
   - Google affichera 16 caractères, par exemple : `abcd efgh ijkl mnop`
   - **Important** : Copiez-le **sans les espaces** : `abcdefghijklmnop`
   - Ce mot de passe ne sera affiché qu'une seule fois !

4. **Utilisez-le dans config.mail.php** :
   ```php
   'smtp_pass' => 'abcdefghijklmnop',  // Votre mot de passe d'application (16 caractères)
   ```

## 🔍 Vérification

Après avoir configuré le mot de passe d'application :

1. Testez avec : `http://localhost/Cite_de_lamour/test-smtp.php`
2. Vous devriez voir "✅ Email envoyé avec succès!"

## ❓ Questions fréquentes

### "Mais mon mot de passe fonctionne sur Gmail !"
- Oui, il fonctionne pour vous connecter à Gmail dans le navigateur
- Mais Google bloque maintenant son utilisation pour SMTP (sécurité)
- C'est pourquoi vous devez créer un mot de passe d'application séparé

### "Je ne vois pas l'option 'Mots de passe des applications'"
- Assurez-vous que la validation en deux étapes est activée
- Essayez d'accéder directement : https://myaccount.google.com/apppasswords
- Si toujours invisible, votre compte pourrait être un compte Google Workspace (entreprise)

### "Mon mot de passe d'application ne fonctionne pas"
- Vérifiez qu'il fait exactement 16 caractères (sans espaces)
- Assurez-vous qu'il n'y a pas d'espaces avant ou après
- Créez-en un nouveau et réessayez

## 🔐 Sécurité

- Ne partagez jamais votre mot de passe d'application
- Ne le commitez pas dans Git
- Vous pouvez le révoquer à tout moment sur https://myaccount.google.com/apppasswords

