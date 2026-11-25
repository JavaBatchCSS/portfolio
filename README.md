# Portfolio BUT 1 · 2026

Un portfolio étudiant en français, responsive et sans dépendance de build. Le site est prêt à être publié sur GitHub Pages.

## Personnaliser le contenu

Ouvre `data.js` et remplace les exemples par tes informations :

- identité, formation, ville et présentation ;
- étapes de ton parcours ;
- projets (titre, description, catégories, couleurs, lien) ;
- compétences et points forts ;
- adresse e-mail.

Les textes d’exemple sont des indications à remplacer. Pour ajouter un lien vers un projet, renseigne son URL dans la propriété `link`. Laisse-la vide si le projet ne possède pas encore de lien public.

## Déploiement GitHub Pages

Le workflow `.github/workflows/pages.yml` publie automatiquement le site à chaque mise à jour de la branche `main`. Dans le dépôt GitHub, vérifie que **Settings → Pages → Build and deployment → Source** est réglé sur **GitHub Actions**. La première publication peut prendre quelques minutes.

## Fonctionnalités

- navigation mobile, thème clair/sombre mémorisé et mise en page adaptative ;
- impression ou export PDF depuis le navigateur ;
- animations qui respectent la préférence de réduction des mouvements ;
- contenu regroupé dans `data.js` pour une mise à jour facile.

Pour prévisualiser le site, ouvre `index.html` dans un navigateur. Aucun outil de compilation n’est nécessaire.
