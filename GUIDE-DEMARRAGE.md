# 🚀 Guide de Démarrage Rapide

## ⚡ Démarrage en 3 étapes

### Étape 1 : Ouvrir le dossier
Naviguez vers le dossier `cite-amour` dans l'explorateur de fichiers.

### Étape 2 : Lancer le serveur
**Sur Windows :**
- Double-cliquez sur `demarrer.bat`
- OU cliquez-droit sur `demarrer.ps1` → "Exécuter avec PowerShell"

### Étape 3 : Ouvrir dans le navigateur
Ouvrez votre navigateur et allez à : **http://localhost:8000**

---

## ❓ Questions fréquentes

### Q: Pourquoi ai-je besoin d'un serveur local ?
**R:** Les fichiers JSON doivent être chargés via HTTP. Ouvrir directement `index.html` peut bloquer le chargement des données pour des raisons de sécurité (CORS).

### Q: Je n'ai ni Python ni PHP, que faire ?
**R:** Vous avez 3 options :
1. **Installer Python** (recommandé) : https://www.python.org/downloads/
   - Cochez "Add Python to PATH" lors de l'installation
2. **Installer PHP** : https://www.php.net/downloads.php
3. **Ouvrir directement** `index.html` (certaines fonctionnalités peuvent ne pas fonctionner)

### Q: Le site ne fonctionne pas, que faire ?
**R:** Vérifiez :
1. ✅ Le serveur est bien démarré (vous voyez des messages dans la console)
2. ✅ Vous utilisez l'adresse http://localhost:8000 (pas file://)
3. ✅ Tous les fichiers sont dans le bon dossier
4. ✅ La console du navigateur (F12) ne montre pas d'erreurs

### Q: Comment arrêter le serveur ?
**R:** Dans la fenêtre de commande, appuyez sur **Ctrl+C**

### Q: Puis-je modifier le port 8000 ?
**R:** Oui ! Modifiez les scripts `demarrer.bat` ou `demarrer.ps1` et changez `8000` par le port de votre choix.

---

## 🎯 Structure des fichiers

```
cite-amour/
├── index.html          ← Page principale (ouvrir dans le navigateur)
├── styles.css          ← Styles du site
├── script.js           ← Fonctionnalités dynamiques
├── data/               ← Données JSON
│   ├── events.json
│   ├── programs.json
│   └── departments.json
├── demarrer.bat        ← Script de démarrage Windows
├── demarrer.ps1        ← Script PowerShell
└── README.md           ← Documentation complète
```

---

## 🔧 Dépannage

### Erreur : "python n'est pas reconnu"
**Solution :** Python n'est pas installé ou pas dans le PATH.
- Installez Python depuis python.org
- Cochez "Add Python to PATH" lors de l'installation
- Redémarrez votre ordinateur

### Erreur : "php n'est pas reconnu"
**Solution :** PHP n'est pas installé.
- Installez PHP depuis php.net
- Ajoutez PHP au PATH système

### Le site s'ouvre mais les données ne se chargent pas
**Solution :** Vous ouvrez probablement `index.html` directement.
- Utilisez un serveur local (voir Étape 2)
- Vérifiez que l'URL commence par `http://localhost`

### Les images ne s'affichent pas
**Solution :** Les images utilisent des URLs externes (Unsplash).
- Vérifiez votre connexion internet
- Les images se chargeront automatiquement

---

## 📞 Besoin d'aide ?

Si vous rencontrez des problèmes :
1. Vérifiez la console du navigateur (F12 → Console)
2. Vérifiez que tous les fichiers sont présents
3. Assurez-vous d'utiliser un serveur local (pas file://)

---

**Bon développement ! 🎉**


