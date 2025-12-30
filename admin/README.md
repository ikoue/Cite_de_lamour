# Interface d'Administration - Cité de l'amour

Interface sécurisée pour gérer le contenu du site web.

## 🔐 Accès à l'administration

1. Ouvrez `admin/index.html` dans votre navigateur
2. Connectez-vous avec :
   - **Nom d'utilisateur** : `admin`
   - **Mot de passe** : `admin123`

⚠️ **IMPORTANT** : Changez le mot de passe dans `admin/admin.js` avant la mise en production !

## 📋 Fonctionnalités

### 1. Gestion des Images ✅
- **Images de fond** : Modifier les images hero de toutes les pages
- **Images des événements** : Ajouter, modifier ou retirer des images
- **Images des départements** : Gérer les images de chaque département
- **Prévisualisation** : Voir les images avant de les enregistrer
- **Upload d'images** : Importer des images depuis votre appareil (conversion en base64)

### 2. Gestion des Événements ✅
- **Ajouter** : Créer de nouveaux événements avec nom, date, heure, description et image
- **Modifier** : Éditer les événements existants
- **Supprimer** : Retirer des événements
- **Gestion complète** : Tous les champs nécessaires pour afficher les événements sur le site

### 3. Gestion des Départements ✅
- **Informations de base** : Nom, description, image principale
- **Responsables** : Gérer jusqu'à 2 responsables avec nom, rôle et image
- **Vision** : Définir la vision du département
- **Éligibilité** : Définir les critères pour rejoindre le département
- **Activités** : Ajouter plusieurs activités avec titre, description et image
- **Modification complète** : Tous les champs utilisés sur les pages HTML des départements

### 4. Gestion des Programmes ✅
- **Ajouter** : Créer de nouveaux programmes avec nom, jour, heure et icône
- **Modifier** : Éditer les programmes existants
- **Supprimer** : Retirer des programmes
- **Gestion complète** : Tous les champs nécessaires pour afficher les programmes sur le site

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

## 🚀 Prochaines Améliorations (Optionnelles)

- Sauvegarde automatique des modifications
- Historique des modifications
- Recherche et filtrage dans les listes
- Validation avancée des formulaires
- Export/Import de sauvegarde complète





