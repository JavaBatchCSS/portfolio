# Portfolio BUT 1 · Génie mécanique et productique

Portfolio en français, responsive et sans dépendance de compilation. La page d’accueil présente une matrice chronologique : les lignes correspondent aux réalisations classées par date et unité d’enseignement ; les colonnes C1 à C4 indiquent les compétences mobilisées. Les filtres permettent de retrouver les traces par UE, situation professionnelle ou mot-clé.

## Personnaliser les informations

Modifie `data.js` :

- renseigne ton nom, ton établissement, ton courriel et les textes de présentation ;
- ajoute tes réalisations dans `evidence` ;
- conserve les identifiants de compétence `C1` à `C4` et les situations `BE`, `BM`, `OPI`.

Une entrée de preuve suit cette structure :

```js
{
  date: "2026-03-15",
  ue: "UE à renseigner",
  context: "SAÉ, TP, TD ou projet personnel",
  title: "Titre de la réalisation",
  description: "Le travail effectué, les outils utilisés et le résultat obtenu.",
  reflection: "Ce que j’ai appris, les difficultés rencontrées et la prochaine étape.",
  competencies: ["C1", "C2"],
  situations: ["BE"],
  link: "preuves/mon-document.pdf"
}
```

La date au format `AAAA-MM-JJ` permet de classer les traces de la plus récente à la plus ancienne. Une réalisation liée à plusieurs compétences apparaît dans plusieurs colonnes de la matrice. Le lien peut être une URL publique ou un chemin relatif vers un fichier ajouté au dépôt. N’ajoute que des documents que tu peux partager et masque toute information confidentielle. Une preuve doit montrer un travail réalisé, pas simplement reprendre un support de cours.

## Déploiement

GitHub Pages publie directement la branche `main` depuis la racine du dépôt. Après une modification de `data.js`, valide le changement : Pages reconstruira automatiquement le site à l’adresse `https://javabatchcss.github.io/portfolio/`.

Le bouton en bas de page permet d’imprimer ou d’enregistrer le portfolio en PDF.
