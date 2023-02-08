import { useCallback, cloneElement } from "react";
import { useParams } from "react-router";
import { useOidc } from "@axa-fr/react-oidc";
import { HeaderProps } from "./Header";

type HeaderAuthProps = {
  children: JSX.Element;
};

function HeaderAuth({ children }: HeaderAuthProps) {
  const { login, logout, isAuthenticated } = useOidc();
  const { survey } = useParams();

  const handleOidcAuth = useCallback(
    function () {
      if (isAuthenticated) {
        logout(`${window.origin}/questionnaire/${survey}/deconnexion`);
      } else {
        login(`${window.origin}/questionnaire/${survey}/deconnexion`);
      }
    },
    [isAuthenticated, login, logout, survey]
  );

  return (
    <>
      {cloneElement(children as React.ReactElement<HeaderProps>, {
        handleOidcAuth,
        isAuthenticated,
      })}
    </>
  );
}

export default HeaderAuth;
