import { useCallback, cloneElement } from "react";
import { useParams } from "react-router";
import { useOidc } from "../../lib/oidc";
import { HeaderProps } from "./Header";

type HeaderAuthProps = {
  children: JSX.Element;
};

function HeaderAuth({ children }: HeaderAuthProps) {
  const { login, logout, isAuthenticated } = useOidc();
  const { survey, unit } = useParams();

  const handleOidcAuth = useCallback(
    function () {
      if (isAuthenticated) {
        logout(
          `${window.origin}/questionnaire/${survey}/unite-enquetee/${unit}/deconnexion`
        );
      } else {
        login(
          `${window.origin}/questionnaire/${survey}/unite-enquetee/${unit}`
        );
      }
    },
    [isAuthenticated, login, logout, survey, unit]
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
