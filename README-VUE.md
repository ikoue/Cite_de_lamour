# Cité de l'amour — Version Vue 3

Ce dossier contient l’application **Vue 3 + Vite** en parallèle du site actuel (HTML/CSS/JS). Vous pouvez faire évoluer le site avec Vue tout en gardant l’ancien site intact.

## Prérequis

- **Node.js** 18+ (avec npm) : [nodejs.org](https://nodejs.org)

## Installation

À la racine du projet :

```bash
npm install
```

## Lancer l’app en développement

```bash
npm run dev
```

Le serveur Vite démarre sur **http://localhost:5173**.  
Ouvrez **http://localhost:5173/index-vue.html** pour voir l’app Vue (le menu « Menu » et la page d’accueil avec événements, programmes, départements sont déjà en Vue).

- Le **site actuel** reste sur **index.html** (par ex. via XAMPP ou en ouvrant `index.html` directement).
- La **version Vue** est sur **index-vue.html** en dev.

## Build pour la production

```bash
npm run build
```

Les fichiers générés sont dans le dossier **`dist/`** :

- `dist/index-vue.html` → point d’entrée de l’app Vue
- `dist/assets/` → JS et CSS compilés

Pour utiliser la version Vue comme page d’accueil :

1. Copiez le contenu de `dist/` vers votre serveur (ou `htdocs`).
2. Renommez `index-vue.html` en `index.html` (ou configurez le serveur pour que la page par défaut soit `index-vue.html`).

## Structure Vue

```
src/
├── main.js              # Point d’entrée Vue
├── App.vue              # Layout (header, menu, footer, router-view)
├── router/
│   └── index.js         # Routes (accueil, commencer-ici, départements, etc.)
├── components/
│   ├── AppHeader.vue
│   ├── AppFooter.vue
│   ├── DropdownMenu.vue
│   └── EventCard.vue
├── composables/
│   └── useChurchEvents.js   # Événements (cultes dimanche/vendredi), formatage dates
└── views/
    ├── HomeView.vue         # Accueil (hero, vision, événements, programmes, départements)
    ├── CommencerIciView.vue # À migrer depuis commencer-ici.html
    ├── SeJoindreView.vue
    ├── NouveauxConvertisView.vue
    ├── FaireUnDonView.vue
    └── DepartementView.vue  # Page département par slug
```

## Fichiers statiques (images, CSS, data)

En **développement**, Vite sert les fichiers à la **racine du projet** (logo, images, `data/*.json`, `styles.css`). Les chemins du type `/logo.png`, `/data/events.json`, `/styles.css` pointent vers la racine.

Pour le **build** :

- Placez les assets (images, `styles.css`, `data/`) dans **`public/`** pour qu’ils soient recopiés tels quels dans `dist/`.  
  Exemple : `public/logo.png`, `public/styles.css`, `public/data/events.json`.
- Ou copiez après build le contenu de votre site actuel (images, CSS, data) dans `dist/`.

## Migrer une page HTML vers Vue

1. Créer ou compléter une vue dans `src/views/` (ex. `CommencerIciView.vue`).
2. Copier le contenu utile depuis la page HTML existante (sections, textes, structure).
3. Remplacer les liens `<a href="...">` par `<router-link to="...">` si besoin.
4. Les styles dans `styles.css` s’appliquent déjà si le HTML et les classes restent les mêmes.

## Routes (mode hash)

Les URLs sont de la forme : `index-vue.html#/`, `index-vue.html#/commencer-ici`, `index-vue.html#/departement/jeunes-adultes`, etc.  
Cela évite de configurer le serveur pour l’histoire HTML5 et permet d’ouvrir l’app directement depuis un fichier.
