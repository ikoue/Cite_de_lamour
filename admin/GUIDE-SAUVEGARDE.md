# Guide de Sauvegarde - Interface Admin

## ⚠️ IMPORTANT : Comment voir vos modifications sur le site

Quand vous ajoutez, modifiez ou supprimez des **événements**, **départements** ou **programmes** dans l'interface admin, ces modifications sont **temporaires** jusqu'à ce que vous les sauvegardiez.

## 📋 Processus de Sauvegarde

### Étape 1 : Modifier dans l'Interface Admin
1. Connectez-vous à l'interface admin (`admin/index.html`)
2. Ajoutez, modifiez ou supprimez vos événements/départements/programmes
3. Un **rappel orange** apparaîtra en haut à droite pour vous rappeler de sauvegarder

### Étape 2 : Télécharger le Fichier JSON
1. Cliquez sur le bouton **"Télécharger [nom].json"** en bas de la section
   - Pour les événements : "Télécharger events.json"
   - Pour les départements : "Télécharger departments.json"
   - Pour les programmes : "Télécharger programs.json"
2. Le fichier sera téléchargé dans votre dossier **Téléchargements**

### Étape 3 : Remplacer le Fichier
1. Ouvrez votre dossier de projet : `cite-amour/data/`
2. **Remplacez** le fichier existant par celui que vous venez de télécharger :
   - `events.json` → remplacez par le fichier téléchargé
   - `departments.json` → remplacez par le fichier téléchargé
   - `programs.json` → remplacez par le fichier téléchargé

### Étape 4 : Voir les Modifications
1. **Rechargez** la page d'accueil (`index.html`)
2. Vos modifications seront maintenant visibles sur le site !

## 🔄 Exemple Complet

**Scénario :** Vous voulez ajouter un nouvel événement "Retraite spirituelle"

1. ✅ Dans l'admin : Cliquez sur "Événements" → "Ajouter un événement"
2. ✅ Remplissez le formulaire et cliquez sur "Enregistrer"
3. ✅ Un rappel orange apparaît : "N'oubliez pas de télécharger events.json"
4. ✅ Cliquez sur "Télécharger events.json" en bas de la page
5. ✅ Le fichier `events.json` est téléchargé
6. ✅ Copiez ce fichier dans `cite-amour/data/events.json` (remplacez l'ancien)
7. ✅ Rechargez `index.html` → Le nouvel événement apparaît !

## 💡 Astuce

- Vous pouvez modifier plusieurs éléments avant de télécharger
- Tous les changements seront dans le fichier téléchargé
- N'oubliez pas de **remplacer** le fichier dans `data/` pour voir les changements sur le site

## ⚠️ Pourquoi ce processus ?

Pour des raisons de sécurité, le JavaScript côté client ne peut pas modifier directement les fichiers sur votre ordinateur. C'est pourquoi vous devez :
1. Télécharger le fichier JSON mis à jour
2. Le remplacer manuellement dans le dossier `data/`

Cela garantit que vous contrôlez exactement quels fichiers sont modifiés sur votre système.





