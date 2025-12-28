# Interface d'Administration - Cité de l'amour

Interface sécurisée pour gérer le contenu du site web.

## 🔐 Accès à l'administration

1. Ouvrez `admin/index.html` dans votre navigateur
2. Connectez-vous avec :
   - **Nom d'utilisateur** : `admin`
   - **Mot de passe** : `admin123`

⚠️ **IMPORTANT** : Changez le mot de passe dans `admin/admin.js` avant la mise en production !

## 📋 Fonctionnalités

### 1. Gestion des Images
- **Images de fond** : Modifier les images hero de toutes les pages
- **Images des événements** : Ajouter, modifier ou retirer des images
- **Images des départements** : Gérer les images de chaque département
- **Prévisualisation** : Voir les images avant de les enregistrer

### 2. Gestion des Événements (À venir)
- Ajouter, modifier ou supprimer des événements
- Gérer les dates, heures et descriptions

### 3. Gestion des Départements (À venir)
- Modifier les informations des départements
- Gérer les responsables et descriptions

### 4. Gestion des Programmes (À venir)
- Ajouter ou modifier les programmes
- Gérer les horaires et jours

## 🎯 Comment Utiliser

### Modifier une Image de Fond

1. Connectez-vous à l'interface admin
2. Allez dans "Gestion des Images"
3. Modifiez l'URL dans le champ correspondant
4. Cliquez sur "Prévisualiser" pour voir l'image
5. Cliquez sur "Enregistrer toutes les modifications"
6. Remplacez le fichier `data/images.json` avec le fichier téléchargé

### Ajouter une Image d'Événement

1. Cliquez sur "Ajouter une image" dans la section Événements
2. Entrez l'ID de l'événement et l'URL de l'image
3. Cliquez sur "Ajouter"
4. Enregistrez toutes les modifications

### Retirer une Image

1. Trouvez l'image dans la liste
2. Cliquez sur "Retirer"
3. Confirmez la suppression
4. Enregistrez toutes les modifications

## 🔒 Sécurité

- **Authentification** : L'interface est protégée par un mot de passe
- **Session** : La session reste active jusqu'à déconnexion
- **Changement de mot de passe** : Modifiez `ADMIN_CREDENTIALS` dans `admin.js`

## 📝 Structure des Fichiers

```
admin/
├── index.html          # Interface d'administration
├── admin-styles.css    # Styles de l'interface admin
├── admin.js            # Logique de l'interface admin
└── README.md           # Ce fichier
```

## ⚠️ Notes Importantes

- Les modifications sont téléchargées en fichier JSON
- Vous devez remplacer manuellement le fichier `data/images.json`
- Utilisez un serveur local pour que tout fonctionne correctement
- Sauvegardez toujours vos fichiers avant de les modifier

## 🚀 Prochaines Améliorations

- Gestion complète des événements
- Gestion complète des départements
- Gestion complète des programmes
- Upload d'images directement depuis l'interface
- Historique des modifications


