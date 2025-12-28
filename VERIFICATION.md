# ✅ Vérification du Serveur

## 📋 Checklist

### 1. Serveur Local
- [ ] Le serveur Python est démarré dans le dossier `cite-amour`
- [ ] Commande utilisée : `python -m http.server 8000`
- [ ] Le serveur répond sur `http://localhost:8000`

### 2. Fichiers JSON
Vérifiez que ces fichiers existent dans `cite-amour/data/` :
- [x] `departments.json` (3 Ko, modifié le 27/12/2025 14:55)
- [x] `events.json` (3 Ko, modifié le 27/12/2025 08:55)
- [x] `images.json` (4 Ko, modifié le 27/12/2025 15:29)
- [x] `programs.json` (1 Ko, modifié le 27/12/2025 17:55)

### 3. Tests à Effectuer

#### Test 1 : Accès direct au fichier JSON
Ouvrez dans votre navigateur :
```
http://localhost:8000/data/departments.json
```

**Résultat attendu :** Vous devriez voir le contenu JSON avec les 8 départements.

**Si erreur 404 :** Le serveur n'est pas démarré ou vous n'êtes pas dans le bon dossier.

**Si erreur CORS :** Vous accédez via `file:///` au lieu de `http://localhost:8000`

#### Test 2 : Interface Admin
Ouvrez dans votre navigateur :
```
http://localhost:8000/admin/
```

**Résultat attendu :** 
- Page de connexion admin
- Après connexion, vous pouvez voir les départements

#### Test 3 : Console du Navigateur
1. Ouvrez `http://localhost:8000/admin/`
2. Appuyez sur **F12** pour ouvrir les outils de développement
3. Allez dans l'onglet **Console**
4. Cliquez sur "Départements" dans le menu
5. Regardez les messages dans la console

**Messages attendus :**
```
🔄 Starting loadDepartmentsData()...
📡 Fetching ../data/departments.json...
📡 Response status: 200 OK
📦 Data received: [...]
✅ Departments loaded from JSON file: 8 items
🎨 renderDepartmentsList() called
✅ Container found: [object HTMLDivElement]
📊 Rendering departments list, count: 8
```

#### Test 4 : Test des Chemins
Ouvrez dans votre navigateur :
```
http://localhost:8000/admin/test-paths.html
```

Cette page testera automatiquement les chemins et vous dira lequel fonctionne.

## 🔧 Solutions aux Problèmes Courants

### Problème : "Impossible de charger depuis le fichier JSON"
**Solution :**
1. Vérifiez que le serveur est démarré : `python -m http.server 8000` dans le dossier `cite-amour`
2. Vérifiez l'URL : utilisez `http://localhost:8000/admin/` et non `file:///`
3. Vérifiez que le fichier existe : `cite-amour/data/departments.json`

### Problème : Le dropdown est vide
**Solution :**
1. Ouvrez la console (F12)
2. Cliquez sur "Forcer le dropdown" dans la section Départements
3. Regardez les messages dans la console
4. Tapez dans la console : `departmentsData` pour voir si les données sont chargées

### Problème : "Aucun département pour le moment"
**Solution :**
1. Vérifiez que `departments.json` contient bien 8 départements
2. Vérifiez que le fichier est valide JSON (pas de syntaxe incorrecte)
3. Rechargez la page après avoir démarré le serveur

## 📞 Commandes Utiles

### Démarrer le serveur
```bash
cd cite-amour
python -m http.server 8000
```

### Vérifier que le serveur fonctionne
Ouvrez : `http://localhost:8000/` dans votre navigateur

### Tester le fichier JSON directement
Ouvrez : `http://localhost:8000/data/departments.json` dans votre navigateur

### Vérifier dans la console
```javascript
// Dans la console du navigateur (F12)
fetch('../data/departments.json')
  .then(r => r.json())
  .then(d => console.log('Départements:', d))
```



