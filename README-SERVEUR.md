# 🚀 Comment démarrer le site

## ⚠️ IMPORTANT : Serveur local requis

Ce site utilise des fichiers JSON comme base de données. Pour que tout fonctionne correctement, **vous devez démarrer un serveur local**.

## 📋 Méthodes pour démarrer le serveur

### Méthode 1 : Script automatique (RECOMMANDÉ)

**Sur Windows :**
- Double-cliquez sur `demarrer-serveur.bat`
- Ou faites un clic droit → "Exécuter avec PowerShell" sur `demarrer-serveur.ps1`

### Méthode 2 : Ligne de commande

1. Ouvrez un terminal dans le dossier `cite-amour`
2. Exécutez une de ces commandes :

**Avec Python (recommandé) :**
```bash
python -m http.server 8000
```

**Avec Node.js :**
```bash
npx http-server -p 8000
```

**Avec PHP :**
```bash
php -S localhost:8000
```

### Méthode 3 : Extension VS Code

Si vous utilisez VS Code, installez l'extension "Live Server" et cliquez sur "Go Live" en bas à droite.

## 🌐 Accéder au site

Une fois le serveur démarré, ouvrez votre navigateur et allez à :

- **Site public :** http://localhost:8000/
- **Interface admin :** http://localhost:8000/admin/

## ✅ Vérification

Si le serveur fonctionne correctement :
- Les départements, événements et programmes s'affichent dans l'interface admin
- Le message "Chargement des départements..." disparaît
- Vous voyez "✅ X départements chargés avec succès"

## ❌ Problèmes courants

**"Impossible de charger les départements"**
→ Le serveur local n'est pas démarré. Utilisez une des méthodes ci-dessus.

**"Données chargées depuis le localStorage"**
→ Le fichier JSON n'a pas pu être chargé. Vérifiez que le serveur est bien démarré et rechargez la page.

**Port 8000 déjà utilisé**
→ Utilisez un autre port : `python -m http.server 8080` (puis http://localhost:8080)


