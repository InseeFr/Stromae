import { HeaderType } from '../header/HeaderType';

const DEFAULT_HEADER: HeaderType = {
  brandTop: "Intitulé",
  quickAccessItems: [],
  homeLinkProps: {
    href: "/",
    title:
      "Accueil - Nom de l’entité (ministère, secrétariat d‘état, gouvernement)",
  },
  serviceTitle: "Titre par défaut",
  operatorLogo: {
    alt: "[À MODIFIER - texte alternatif de l’image]",
    imgUrl: `${process.env.PUBLIC_URL}/logoINSEE.png`,
    orientation: "horizontal",
  },
};
