import { useState, useEffect, useCallback } from "react";
import { Header as HeaderDSFR } from "@codegouvfr/react-dsfr/Header";
import HeaderType from "./HeaderType";
import DEFAULT_HEADER from "./default-header";

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

function Header(props: HeaderProps) {
  const { header, handleOidcAuth, isAuthenticated = false } = props;
  const [config, setConfig] = useState<HeaderType>(DEFAULT_HEADER);

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
