import { useState, useEffect, useCallback } from "react";
import { Header as HeaderDSFR } from "@codegouvfr/react-dsfr/Header";
import HeaderType, { QuickAccessItem } from "./HeaderType";

export type HeaderProps = {
  header?: HeaderType;
  readonly handleOidcAuth?: () => void;
  isAuthenticated?: boolean;
};

const DEFAULT_HEADER: HeaderType = {
  brandTop: "Sous-titre logo",
  quickAccessItems: [],
};

function Header(props: HeaderProps) {
  const { header, handleOidcAuth, isAuthenticated = false } = props;
  const [quickAccess, setQuickAccess] = useState([]);
  const [brandTop, setBrandTop] = useState(DEFAULT_HEADER.brandTop);

  const onClickAuth = useCallback(function () {}, []);

  useEffect(
    function () {
      if (header) {
        const { brandTop: bt, quickAccessItems: qaci } = header;
      }
    },
    [header]
  );

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
        ...quickAccess,
        {
          iconId: "fr-icon-lock-line",
          buttonProps: {
            onClick: onClickAuth,
          },
          text: "Me déconnecter",
        },
      ]}
    />
  );
}

export default Header;
