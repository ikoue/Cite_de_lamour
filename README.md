# Site Web - Cité de l'amour

Site web dynamique pour l'organisation "Cité de l'amour" avec fonctionnalités interactives.

## 🚀 Fonctionnalités

- **Design moderne et responsive** : Adapté à tous les appareils (desktop, tablette, mobile)
- **Carousels dynamiques** : Navigation fluide pour les événements et départements
- **Données dynamiques** : Chargement depuis des fichiers JSON
- **Animations** : Effets de scroll et transitions fluides
- **Navigation intuitive** : Menu responsive avec défilement fluide

## 📁 Structure du projet

```
cite-amour/
├── index.html          # Page principale
├── styles.css          # Styles CSS
├── script.js           # JavaScript pour les fonctionnalités dynamiques
├── data/
│   ├── events.json     # Données des événements
│   ├── programs.json   # Données des programmes
│   └── departments.json # Données des départements
└── README.md          # Ce fichier
```

## 🛠️ Installation et utilisation

> **⚠️ IMPORTANT** : Ce site est un site web statique qui **ne nécessite PAS de compilation**. 
> Les fichiers HTML, CSS et JavaScript sont directement utilisables par le navigateur.

### 🚀 Démarrage rapide (Windows)

**Méthode la plus simple :**
1. Double-cliquez sur `demarrer.bat` (ou `demarrer.ps1` pour PowerShell)
2. Le script détectera automatiquement Python ou PHP
3. Ouvrez votre navigateur à l'adresse : **http://localhost:8000**

### 📋 Options de démarrage

#### Option 1 : Script automatique (Recommandé)
- **Windows** : Double-cliquez sur `demarrer.bat`
- Le script cherchera automatiquement Python ou PHP

#### Option 2 : Ouvrir directement
Ouvrez simplement le fichier `index.html` dans votre navigateur.
> ⚠️ **Note** : Certaines fonctionnalités (chargement JSON) peuvent ne pas fonctionner sans serveur local.

#### Option 3 : Serveur local manuel

**Avec Python (si installé) :**
```bash
cd cite-amour
python -m http.server 8000
```
Puis ouvrez http://localhost:8000 dans votre navigateur.

**Avec PHP (si installé) :**
```bash
cd cite-amour
php -S localhost:8000
```

**Avec Node.js (si installé) :**
```bash
npm install -g http-server
cd cite-amour
http-server
```

### 🔍 Vérifier si Python/PHP est installé

**Windows (PowerShell) :**
```powershell
python --version
php --version
```

**Windows (CMD) :**
```cmd
python --version
php --version
```

Si aucune commande ne fonctionne, installez Python depuis https://www.python.org/downloads/

## 🎨 Personnalisation

### Modifier les événements
Éditez le fichier `data/events.json` pour ajouter, modifier ou supprimer des événements.

### Modifier les programmes
Éditez le fichier `data/programs.json` pour personnaliser les programmes.

### Modifier les départements
Éditez le fichier `data/departments.json` pour gérer les départements.

### Modifier les couleurs
Les couleurs principales sont définies dans `styles.css` via les variables CSS :
- `--color-primary` : Rouge (#8B0000)
- `--color-secondary` : Bleu foncé (#1a237e)
- `--color-white` : Blanc (#ffffff)

## 📱 Fonctionnalités dynamiques

1. **Carousels** : Navigation avec boutons précédent/suivant et clavier (flèches)
2. **Chargement dynamique** : Les données sont chargées depuis les fichiers JSON
3. **Animations au scroll** : Les éléments apparaissent progressivement
4. **Responsive** : Adaptation automatique selon la taille de l'écran

## 🔧 Technologies utilisées

- HTML5
- CSS3 (avec variables CSS et Flexbox/Grid)
- JavaScript (ES6+)
- Font Awesome (icônes)
- Images Unsplash (placeholder)

## 📝 Notes

- Les images utilisent des URLs Unsplash comme placeholders. Remplacez-les par vos propres images.
- Le site est entièrement statique et peut être hébergé sur n'importe quel serveur web.
- Pour une version avec backend, vous pouvez intégrer une API REST pour gérer les données.

## 🎯 Prochaines améliorations possibles

- Formulaire de contact fonctionnel
- Modales pour les détails d'événements/départements
- Système d'authentification pour l'administration
- Base de données pour les données dynamiques
- Blog ou actualités
- Calendrier interactif

