import { useCallback, cloneElement } from "react";
import { useOidc } from "@axa-fr/react-oidc";
import { HeaderProps } from "./Header";

type HeaderAuthProps = {
  children: JSX.Element;
};

function HeaderAuth({ children }: HeaderAuthProps) {
  const { login, logout, isAuthenticated } = useOidc();

  const handleOidcAuth = useCallback(
    function () {
      if (isAuthenticated) {
        logout();
      } else {
        login();
      }
    },
    [isAuthenticated, login, logout]
  );
  return (
    <>
      {cloneElement(children as React.ReactElement<HeaderProps>, {
        handleOidcAuth,
      })}
    </>
  );
}

export default HeaderAuth;
