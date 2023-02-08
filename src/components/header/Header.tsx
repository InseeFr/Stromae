import { useState, useEffect, useCallback } from "react";
import { Header as HeaderDSFR } from "@codegouvfr/react-dsfr/Header";
import HeaderType, { QuickAccessItem } from "./HeaderType";

function getAuthLabel(isAuthenticated: boolean): string {
  if (isAuthenticated) {
    return "Me déconnecter";
  }
  return "Me connecter";
}

export type HeaderProps = {
  header?: HeaderType;
  readonly handleOidcAuth?: () => void;
  isAuthenticated?: boolean;
};

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

function Header(props: HeaderProps) {
  const { header, handleOidcAuth, isAuthenticated = false } = props;
  const [config, setConfig] = useState(DEFAULT_HEADER);

  const {
    brandTop,
    quickAccessItems,
    homeLinkProps,
    serviceTitle,
    operatorLogo,
  } = config;

  useEffect(
    function () {
      if (header) {
        // TODO
      }
    },
    [header]
  );

  return (
    <HeaderDSFR
      brandTop={brandTop}
      homeLinkProps={homeLinkProps}
      serviceTitle={serviceTitle}
      operatorLogo={operatorLogo}
      quickAccessItems={[
        {
          iconId: "fr-icon-lock-line",
          buttonProps: {
            onClick: handleOidcAuth,
          },
          text: getAuthLabel(isAuthenticated),
        },
      ]}
    />
  );
}

export default Header;
