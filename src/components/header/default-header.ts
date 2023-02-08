import HeaderType from "../header/HeaderType";

const DEFAULT_HEADER: HeaderType = {
  brandTop: "Sous-titre logo",
  quickAccessItems: [],
  homeLinkProps: {
    href: "/",
    title:
      "Accueil - Nom de l’entité (ministère, secrétariat d‘état, gouvernement)",
  },
  serviceTitle: "Le recensement de la population",
  operatorLogo: {
    alt: "[À MODIFIER - texte alternatif de l’image]",
    imgUrl: `${process.env.PUBLIC_URL}/logoINSEE.png`,
    orientation: "horizontal",
  },
};

export default DEFAULT_HEADER;
