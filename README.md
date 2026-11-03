# El Jabri Soukaina — Developer Portfolio

Un portfolio de développeuse au design rose, réalisé avec **HTML, CSS et JavaScript**, pour présenter mon profil, mon parcours et mes projets.

Typographie expressive, détails inspirés du code et interactions légères : un espace créatif autour du développement web.

## Fonctionnalités

- Navigation fixe avec menu adapté aux mobiles et indication de la section active.
- Sections **Hero**, **About**, **Education**, **Skills**, **Experience**, **Projects** et **Footer**.
- Photo intégrée dans une présentation inspirée d'une fenêtre de navigateur.
- Mise en page responsive pour ordinateur, tablette et mobile.
- Filtrage des projets par catégorie.
- Aperçus interactifs dans des fenêtres modales.
- Icônes de réseaux sociaux **Font Awesome** dans le footer.
- Navigation au clavier, styles de focus et prise en compte de la réduction des animations.
- Polices et icônes incluses dans les fichiers du projet.

## Technologies

| Technologie | Utilisation |
| --- | --- |
| HTML5 | Structure et contenu des sections |
| CSS3 | Thème rose, responsive, Grid, Flexbox et animations |
| JavaScript | Navigation, filtres et démonstrations interactives |
| Font Awesome | Icônes d'interface et de réseaux sociaux |
| Local Storage | Sauvegarde locale des tâches du projet Focus |

**Aucun framework, gestionnaire de paquets ou outil de compilation n'est nécessaire.**

## Organisation des fichiers

Placez ce `README.md` à la racine du dossier extrait du portfolio, aux côtés de `index.html`.

| Fichier ou dossier | Rôle |
| --- | --- |
| `index.html` | Contenu du portfolio et structure des sections |
| `style.css` | Styles, couleurs, typographie et adaptation aux écrans |
| `script.js` | Interactions et configuration des coordonnées |
| `assets/businesswoman.webp` | Photo utilisée dans la section Hero |
| `assets/fonts/` | Polices DM Sans et DM Serif Display, avec leurs licences |
| `assets/fontawesome/` | Icônes Font Awesome et licence associée |
| `README.md` | Présentation et instructions du projet |

## Démarrage

1. Téléchargez ou clonez le dépôt.
2. Ouvrez le dossier du projet.
3. Ouvrez **`index.html`** dans un navigateur récent.

Pour utiliser un serveur local, si Python est installé, exécutez cette commande depuis le dossier contenant `index.html` :

```bash
python -m http.server 8000
```

Ouvrez ensuite [http://localhost:8000](http://localhost:8000).

## Personnalisation

### Profil et parcours

Modifiez `index.html` pour ajouter votre présentation, vos formations, vos compétences, vos expériences et vos vrais projets. Les formations et expériences présentes sont des **entrées à compléter**.

### Photo

Remplacez `assets/businesswoman.webp` par votre photo en conservant ce nom, ou mettez à jour le chemin de l'image dans `index.html`. Adaptez également son texte alternatif.

### Couleurs

Les principales couleurs se trouvent dans les variables `:root` de `style.css`, notamment :

```css
--paper: #fcf7f8;
--ink: #302b31;
--pink: #ce3d70;
--pink-dark: #b92d5e;
--blush: #f7e9ee;
```

### Contact et réseaux sociaux

Renseignez l'objet `CONTACT` au début de `script.js` avec votre adresse e-mail et vos URL de profil réelles :

```javascript
const CONTACT = {
  email: "",
  github: "",
  linkedin: "",
  instagram: "",
  codepen: "",
};
```

Les URL de réseaux sociaux doivent commencer par `https://`. Une fois l'adresse e-mail renseignée, le bouton **Say hello** ouvre le client de messagerie via `mailto:`. Il n'y a pas de formulaire d'envoi ni de serveur de messagerie intégré.

## Projets de démonstration

Les trois projets inclus sont des **concepts interactifs créés pour ce portfolio**. Ils ne représentent pas des réalisations professionnelles déclarées.

| Projet | Concept | Interaction disponible |
| --- | --- | --- |
| **Bloom** | Vitrine de boutique | Ajouter ou retirer des favoris pendant l'aperçu |
| **Focus** | Gestionnaire de tâches | Ajouter, terminer et supprimer des tâches, conservées dans ce navigateur |
| **Palette** | Exploration de couleurs | Parcourir des palettes et copier les codes hexadécimaux |

La copie des couleurs utilise le presse-papiers lorsque le navigateur l'autorise ; sinon, le code est sélectionné pour une copie manuelle. Les données de Focus restent dans le stockage local du navigateur.

## Ajouter le projet à GitHub

Pour un **nouveau dépôt GitHub vide**, exécutez les commandes suivantes depuis le dossier du portfolio. Remplacez `VOTRE_COMPTE` et `VOTRE_DEPOT` par vos informations.

```bash
git init
git add .
git commit -m "Add Soukaina developer portfolio"
git branch -M main
git remote add origin https://github.com/VOTRE_COMPTE/VOTRE_DEPOT.git
git push -u origin main
```

Si le dépôt existe déjà sur votre ordinateur, ajoutez simplement ce fichier `README.md` à sa racine, puis :

```bash
git add README.md
git commit -m "Add portfolio README"
git push
```

## Crédits

- **Portfolio :** El Jabri Soukaina.
- **Icônes :** Font Awesome — licence incluse dans `assets/fontawesome/`.
- **Typographie :** DM Sans et DM Serif Display — licences incluses dans `assets/fonts/`.
- **Photo :** image fournie pour le projet.

---

*A little code. A lot of possibility.*
