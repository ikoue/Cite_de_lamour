# Guide de Modification des Images

Ce guide vous explique comment modifier facilement les images de fond et les images du site.

## 📁 Fichier de Configuration

Toutes les images sont configurées dans le fichier **`data/images.json`**

## 🖼️ Comment Modifier les Images

### 1. Image de Fond Hero (Page d'accueil)

Ouvrez `data/images.json` et modifiez la section `hero` :

```json
"hero": {
    "url": "VOTRE_URL_IMAGE_ICI",
    "description": "Image de fond pour la section hero (page d'accueil)"
}
```

**Exemples d'URLs :**
- Image locale : `"images/hero-background.jpg"`
- Image Unsplash : `"https://images.unsplash.com/photo-XXXXX"`
- Image externe : `"https://votresite.com/image.jpg"`

### 2. Image de Fond des Pages (Commencer ici, etc.)

Modifiez la section `pageHero` :

```json
"pageHero": {
    "url": "VOTRE_URL_IMAGE_ICI",
    "description": "Image de fond pour les pages"
}
```

### 3. Image Hero de la Page "Se joindre à nous"

Modifiez la section `joinHero` :

```json
"joinHero": {
    "url": "VOTRE_URL_IMAGE_ICI",
    "description": "Image de fond pour la page 'Se joindre à nous'"
}
```

### 4. Images des Événements

Dans la section `events`, modifiez les URLs par ID :

```json
"events": [
    {
        "id": 1,
        "url": "VOTRE_URL_IMAGE_EVENEMENT_1"
    },
    {
        "id": 2,
        "url": "VOTRE_URL_IMAGE_EVENEMENT_2"
    }
]
```

### 5. Images des Départements

Dans la section `departments`, modifiez par nom de département :

```json
"departments": [
    {
        "id": 1,
        "name": "Hommes",
        "url": "VOTRE_URL_IMAGE_HOMMES"
    },
    {
        "id": 2,
        "name": "Femmes",
        "url": "VOTRE_URL_IMAGE_FEMMES"
    }
]
```

## 📝 Utiliser vos Propres Images

### Option 1 : Images Locales

1. Créez un dossier `images/` dans le dossier `cite-amour/`
2. Placez vos images dans ce dossier
3. Utilisez le chemin relatif : `"images/votre-image.jpg"`

**Exemple :**
```json
"hero": {
    "url": "images/notre-eglise.jpg"
}
```

### Option 2 : Images Externes

Utilisez l'URL complète de votre image :

```json
"hero": {
    "url": "https://votresite.com/images/hero.jpg"
}
```

### Option 3 : Images Unsplash

Trouvez une image sur Unsplash et copiez son URL :

```json
"hero": {
    "url": "https://images.unsplash.com/photo-XXXXX?ixlib=rb-4.0.3&auto=format&fit=crop&w=2070&q=80"
}
```

## 🔄 Après Modification

1. Sauvegardez le fichier `data/images.json`
2. Rechargez la page dans votre navigateur (F5 ou Ctrl+R)
3. Les nouvelles images seront automatiquement chargées

## ⚠️ Notes Importantes

- **Format d'images recommandé** : JPG, PNG, WebP
- **Taille recommandée** : 
  - Images hero : 1920x1080px minimum
  - Images événements/départements : 800x600px minimum
- **Poids des images** : Essayez de garder les images sous 500KB pour un chargement rapide
- **Serveur local** : N'oubliez pas d'utiliser un serveur local (voir `demarrer.bat`) pour que les images locales fonctionnent

## 🎨 Conseils pour Choisir des Images

- **Hero** : Choisissez une image inspirante et lumineuse
- **Événements** : Images de communauté, de rassemblement
- **Départements** : Images représentatives de chaque groupe (hommes, femmes, jeunes, etc.)

## 📞 Besoin d'Aide ?

Si vous avez des difficultés à modifier les images, vérifiez :
1. Que le fichier JSON est bien formaté (pas d'erreurs de syntaxe)
2. Que les URLs sont correctes
3. Que les images existent et sont accessibles
4. Que vous utilisez un serveur local (pas file://)



