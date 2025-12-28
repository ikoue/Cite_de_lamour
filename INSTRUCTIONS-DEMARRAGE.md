# 🚀 Instructions de Démarrage du Serveur

## ⚠️ IMPORTANT : Erreur 404

Si vous voyez une erreur 404 en accédant à `http://localhost:8000/data/departments.json`, c'est que **le serveur n'est pas démarré depuis le bon répertoire**.

## ✅ Solution : Démarrage Correct

### Méthode 1 : Utiliser le script batch (RECOMMANDÉ)

1. **Double-cliquez** sur `demarrer-serveur.bat` dans le dossier `cite-amour`
2. Une fenêtre de terminal s'ouvre
3. Vous devriez voir :
   ```
   ✅ Fichier trouvé !
   Démarrage du serveur...
   Serving HTTP on :: port 8000 (http://[::]:8000/) ...
   ```
4. **Ne fermez PAS cette fenêtre** - le serveur doit rester ouvert

### Méthode 2 : Ligne de commande manuelle

1. Ouvrez PowerShell ou CMD
2. Naviguez vers le dossier :
   ```powershell
   cd "C:\Users\BC\Desktop\projet electromagnetisme\cite-amour"
   ```
3. Vérifiez que vous êtes au bon endroit :
   ```powershell
   dir data\departments.json
   ```
   Vous devriez voir le fichier listé.
4. Démarrez le serveur :
   ```powershell
   python -m http.server 8000
   ```

### Méthode 3 : Depuis VS Code / Cursor

1. Ouvrez le terminal intégré (Ctrl+`)
2. Assurez-vous d'être dans le dossier `cite-amour`
3. Tapez :
   ```bash
   python -m http.server 8000
   ```

## 🔍 Vérification

Une fois le serveur démarré, testez dans votre navigateur :

1. **Test du fichier JSON :**
   ```
   http://localhost:8000/data/departments.json
   ```
   ✅ Vous devriez voir le contenu JSON avec les 8 départements
   ❌ Si erreur 404 : Le serveur n'est pas dans le bon répertoire

2. **Test de l'interface admin :**
   ```
   http://localhost:8000/admin/
   ```
   ✅ Vous devriez voir la page de connexion admin

3. **Test de la page d'accueil :**
   ```
   http://localhost:8000/
   ```
   ✅ Vous devriez voir la page d'accueil du site

## ⚠️ Problèmes Courants

### "Port 8000 already in use"
Un autre serveur utilise déjà le port 8000. Solutions :
- Fermez l'autre serveur
- Ou utilisez un autre port : `python -m http.server 8080` (puis http://localhost:8080)

### "python n'est pas reconnu"
Python n'est pas installé ou pas dans le PATH. Solutions :
- Installez Python depuis python.org
- Ou utilisez `py -m http.server 8000` au lieu de `python`

### Erreur 404 même après démarrage
Le serveur n'est pas dans le bon répertoire. Vérifiez :
```powershell
# Dans le terminal où le serveur tourne
pwd  # ou 'cd' pour voir le répertoire actuel
dir data\departments.json  # Vérifier que le fichier existe
```

## 📝 Structure Attendue

Le serveur doit être démarré depuis le dossier `cite-amour` qui contient :
```
cite-amour/
├── admin/
├── data/
│   ├── departments.json  ← Doit être accessible
│   ├── events.json
│   ├── images.json
│   └── programs.json
├── index.html
├── script.js
└── ...
```

## ✅ Checklist de Vérification

- [ ] Le serveur est démarré depuis `cite-amour/`
- [ ] Le terminal affiche "Serving HTTP on ... port 8000"
- [ ] `http://localhost:8000/data/departments.json` affiche le JSON
- [ ] `http://localhost:8000/admin/` affiche la page admin
- [ ] La fenêtre du serveur reste ouverte (ne pas fermer)


