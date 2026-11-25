# Portfolio BUT 1 · Génie mécanique et productique

Portfolio étudiant en français, responsive et sans dépendance de compilation. Il s’appuie sur le référentiel BUT GMP : quatre compétences (C1 à C4), trois situations professionnelles (bureau d’études, bureau des méthodes, organisation industrielle) et la situation transversale « Agir en technicien supérieur ».

## Ajouter ses informations et ses preuves

Tout le contenu modifiable se trouve dans `data.js`. Commence par remplacer l’identité, l’IUT, les coordonnées et les textes de présentation. Les descriptions du référentiel sont des repères de formation ; elles ne prétendent pas décrire tes réalisations.

Ajoute ensuite une entrée dans le tableau `evidence` pour chaque trace que tu souhaites présenter :

```js
{
  context: "SAÉ / TP / TD / projet personnel",
  date: "Semestre 1 · 2026",
  title: "Titre de la réalisation",
  description: "Le besoin, ma contribution, les outils utilisés et le résultat.",
  reflection: "Ce que j’ai appris, ce qui a été difficile et la prochaine étape.",
  competencies: ["C1", "C2"],
  link: "https://…"
}
```

Le lien est facultatif. Il peut pointer vers une image, un document ou une réalisation publiée. Ne partage que des éléments que tu as le droit de rendre publics et masque les informations confidentielles. Une preuve peut être un extrait de dossier, une photo annotée, une maquette, un compte rendu ou une production personnelle — pas un extrait de cours.

Dans `assessment`, remplace « À autoévaluer » par ton appréciation de chaque compétence. Relie-la à une preuve et note aussi les marges de progression : en BUT 1, l’objectif est de mobiliser les compétences de niveau 1 dans un cas simple.

## Déploiement GitHub Pages

Le workflow `.github/workflows/pages.yml` publie le site après chaque mise à jour de la branche `main`. Dans le dépôt, vérifie **Settings → Pages → Build and deployment → Source → GitHub Actions**. La première publication peut prendre quelques minutes.

Le site s’imprime ou s’exporte en PDF depuis le bouton en bas de page. Le contenu reste autonome et peut être adapté pour extraire des parties dans un bilan oral ou un autre support.
