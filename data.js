// Remplace les champs personnels et ajoute tes vraies preuves dans ce fichier.
// Les contenus de référence décrivent le BUT GMP ; ils ne sont pas des réalisations personnelles.
window.PORTFOLIO = {
  name: "Prénom Nom",
  program: "BUT Génie mécanique et productique · 1re année",
  programShort: "BUT 1 · GMP",
  location: "IUT à compléter",
  about: "Je suis étudiant en première année de BUT Génie mécanique et productique. Ce portfolio rassemble mes réalisations, mes apprentissages et ma progression.",
  aboutDetail: "Présente les domaines qui t’intéressent, tes expériences et ton projet professionnel. Sélectionne les réalisations qui illustrent le mieux ton parcours.",
  currently: "À compléter",
  email: "email@exemple.fr",

  competencies: [
    { id: "C1", name: "Spécifier", summary: "Déterminer le besoin d’un client.", level: "Niveau 1 · cas simple" },
    { id: "C2", name: "Développer", summary: "Proposer des solutions adaptées au besoin et aux contraintes.", level: "Niveau 1 · cas simple" },
    { id: "C3", name: "Réaliser", summary: "Concrétiser une solution.", level: "Niveau 1 · cas simple" },
    { id: "C4", name: "Exploiter", summary: "Comprendre le cycle de vie du produit et du système de production.", level: "Niveau 1 · cas simple" }
  ],

  situations: [
    {
      id: "BE",
      name: "Bureau d’études",
      subtitle: "Concevoir un produit",
      description: "Partir du besoin des utilisateurs pour proposer, concevoir et faire évoluer une solution mécanique.",
      actions: [
        { code: "C1", text: "Identifier les besoins des utilisateurs finaux et définir le cahier des charges." },
        { code: "C2", text: "Proposer des solutions préliminaires ; étudier le prédimensionnement cinématique, statique ou dynamique." },
        { code: "C3", text: "Réaliser une conception détaillée : maquette numérique, cotation et dimensionnement." },
        { code: "C4", text: "Prendre en compte le cycle de vie du produit et les retours clients." }
      ]
    },
    {
      id: "BM",
      name: "Bureau des méthodes",
      subtitle: "Industrialiser un produit",
      description: "Préparer les procédés, les moyens et les documents nécessaires à la fabrication et à l’assemblage.",
      actions: [
        { code: "C1", text: "Identifier les paramètres produit, les contraintes client (quantité, qualité, coût, délai) et les moyens disponibles." },
        { code: "C2", text: "Élaborer et valider l’APEF, la gamme de fabrication et la gamme d’assemblage." },
        { code: "C3", text: "Préparer un dossier de production et mettre en œuvre des postes ou îlots de production." },
        { code: "C4", text: "Analyser les indicateurs, proposer des actions correctives et contribuer à l’amélioration continue." }
      ]
    },
    {
      id: "OPI",
      name: "Organisation industrielle",
      subtitle: "Organiser et piloter une production",
      description: "Organiser les ressources et suivre une production en intégrant ses contraintes humaines et techniques.",
      actions: [
        { code: "C1", text: "Identifier les contraintes de production et les capacités des moyens disponibles." },
        { code: "C2", text: "Définir l’implantation d’une ligne selon la cadence, les procédés, la sécurité et l’ergonomie." },
        { code: "C3", text: "Définir des indicateurs qualité et des documents de suivi et de contrôle." },
        { code: "C4", text: "Contribuer à la planification, à l’amélioration continue et à la remontée des données." }
      ]
    }
  ],

  // Ajoute une entrée par réalisation réelle. Exemple et règles de tri dans README.md.
  evidence: [],
};
