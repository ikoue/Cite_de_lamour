# Guide Git et GitHub pour l'équipe

## 📋 Prérequis
- Avoir Git installé sur votre ordinateur
- Avoir un compte GitHub
- Avoir créé un dépôt sur GitHub (ou avoir les droits d'accès)

---

## 🚀 PREMIÈRE FOIS - Configuration initiale

### 1. Vérifier que Git est installé
```bash
git --version
```

### 2. Configurer Git (si pas déjà fait)
```bash
git config --global user.name "Votre Nom"
git config --global user.email "votre.email@example.com"
```

### 3. Initialiser le dépôt Git dans le projet
```bash
cd cite-amour
git init
```

### 4. Créer un fichier .gitignore (pour ignorer certains fichiers)
Créez un fichier `.gitignore` avec ce contenu :
```
# Fichiers système
.DS_Store
Thumbs.db
*.log

# Dossiers temporaires
node_modules/
.env
*.tmp
```

### 5. Ajouter tous les fichiers
```bash
git add .
```

### 6. Faire le premier commit
```bash
git commit -m "Initial commit - Site Cité de l'Amour avec tous les départements"
```

### 7. Connecter au dépôt GitHub

**Option A : Si le dépôt GitHub existe déjà**
```bash
git remote add origin https://github.com/VOTRE-USERNAME/VOTRE-REPO.git
git branch -M main
git push -u origin main
```

**Option B : Si vous devez créer le dépôt GitHub**
1. Allez sur https://github.com
2. Cliquez sur "New repository"
3. Donnez un nom au dépôt (ex: "cite-amour")
4. Ne cochez PAS "Initialize with README"
5. Copiez l'URL du dépôt
6. Exécutez :
```bash
git remote add origin https://github.com/VOTRE-USERNAME/VOTRE-REPO.git
git branch -M main
git push -u origin main
```

---

## 🔄 TRAVAIL QUOTIDIEN - Partager vos modifications

### 1. Voir les fichiers modifiés
```bash
git status
```

### 2. Ajouter les fichiers modifiés
```bash
# Ajouter tous les fichiers modifiés
git add .

# OU ajouter un fichier spécifique
git add nom-du-fichier.html
```

### 3. Faire un commit avec un message descriptif
```bash
git commit -m "Description de vos modifications"
```

Exemples de messages :
- `git commit -m "Ajout de la page Département des Ados"`
- `git commit -m "Mise à jour des couleurs harmonisées avec le logo"`
- `git commit -m "Correction du header transparent sur la page Femmes"`

### 4. Pousser vers GitHub
```bash
git push
```

Si c'est la première fois sur cette branche :
```bash
git push -u origin main
```

---

## 📥 RÉCUPÉRER LES MODIFICATIONS DE L'ÉQUIPE

### 1. Récupérer les modifications depuis GitHub
```bash
git pull
```

### 2. Si vous avez des modifications locales non commitées
Git vous dira qu'il y a un conflit. Vous avez deux options :

**Option A : Sauvegarder vos modifications d'abord**
```bash
git stash
git pull
git stash pop
```

**Option B : Commit vos modifications d'abord**
```bash
git add .
git commit -m "Mes modifications avant pull"
git pull
```

### 3. Résoudre les conflits (si nécessaire)
Si Git détecte des conflits :
1. Ouvrez les fichiers en conflit
2. Cherchez les marqueurs `<<<<<<<`, `=======`, `>>>>>>>`
3. Modifiez le fichier pour garder le bon code
4. Sauvegardez
5. Ajoutez le fichier : `git add nom-du-fichier.html`
6. Finalisez : `git commit -m "Résolution des conflits"`

---

## 🌿 TRAVAILLER AVEC DES BRANCHES (Recommandé pour l'équipe)

### Créer une nouvelle branche pour une fonctionnalité
```bash
git checkout -b nom-de-la-branche
```

Exemple :
```bash
git checkout -b ajout-page-medias
```

### Travailler sur votre branche
```bash
# Faire vos modifications
git add .
git commit -m "Description"
git push -u origin nom-de-la-branche
```

### Fusionner votre branche dans main
1. Allez sur GitHub
2. Créez une "Pull Request"
3. Demandez à quelqu'un de la revoir
4. Fusionnez la branche

### Revenir sur la branche principale
```bash
git checkout main
git pull
```

---

## 📝 COMMANDES UTILES

### Voir l'historique des commits
```bash
git log --oneline
```

### Voir les différences avant de commit
```bash
git diff
```

### Annuler des modifications non commitées
```bash
git checkout -- nom-du-fichier.html
```

### Voir les branches
```bash
git branch
```

### Voir les dépôts distants
```bash
git remote -v
```

---

## ⚠️ BONNES PRATIQUES

1. **Faire des commits fréquents** avec des messages clairs
2. **Toujours faire `git pull` avant de commencer à travailler**
3. **Faire des commits avant de faire `git pull`** si vous avez des modifications
4. **Utiliser des branches** pour les grandes fonctionnalités
5. **Communiquer avec l'équipe** avant de modifier des fichiers partagés

---

## 🆘 EN CAS DE PROBLÈME

### Si vous avez fait une erreur dans le dernier commit
```bash
git commit --amend -m "Nouveau message"
```

### Si vous voulez annuler le dernier commit (mais garder les fichiers)
```bash
git reset --soft HEAD~1
```

### Si vous voulez tout annuler et revenir à la dernière version GitHub
```bash
git fetch origin
git reset --hard origin/main
```

⚠️ **ATTENTION** : Cette dernière commande supprime toutes vos modifications locales non commitées !

---

## 📞 BESOIN D'AIDE ?

Si vous avez des problèmes :
1. Vérifiez que vous êtes dans le bon dossier : `cd cite-amour`
2. Vérifiez l'état : `git status`
3. Vérifiez les logs : `git log --oneline -5`

