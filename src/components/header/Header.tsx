import { Header as HeaderDSFR } from "@codegouvfr/react-dsfr/Header";
import { HeaderType } from "../../lib/surveys/getMetadataSurvey";

interface HeaderProps {
  header?: HeaderType;
}

const DEFAULT_HEADER = {
  brandTop: "valeur par défaut.",
};

function Header(props: HeaderProps) {
  const { brandTop } = props.header || DEFAULT_HEADER;

  return (
    <HeaderDSFR
      brandTop={brandTop}
      homeLinkProps={{
        href: "/",
        title:
          "Accueil - Nom de l’entité (ministère, secrétariat d‘état, gouvernement)",
      }}
      serviceTitle="Le recensement de la population"
      operatorLogo={{
        alt: "[À MODIFIER - texte alternatif de l’image]",
        imgUrl: (process.env.PUBLIC_URL + "/logoINSEE.png") as string,
        orientation: "horizontal",
      }}
      quickAccessItems={[
        {
          iconId: "fr-icon-add-circle-line",
          linkProps: {
            href: "#",
          },
          text: "Contacter l’assistance",
        },
        {
          iconId: "fr-icon-lock-line",
          linkProps: {
            href: "#",
          },
          text: "Me déconnecter",
        },
      ]}
    />
  );
}

export default Header;
