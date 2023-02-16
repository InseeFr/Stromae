import { useEffect, useState, useRef } from "react";
import FooterType from "../footer/FooterType";
import HeaderType from "../header/HeaderType";
import surveys from "../../lib/surveys/surveysApi";
import Header from "../../components/header/Header";
import HeaderAuth from "../../components/header/HeaderAuth";
import Footer from "../../components/footer/Footer";
import SkipLinks from "@codegouvfr/react-dsfr/SkipLinks";
import LayoutPlaceholder from "../skeleton/Layout";

export type WelcomeSurveyParams = {
  survey: string;
};

type LayoutProps = {
  survey?: string;
  children: JSX.Element | JSX.Element[];
};

const defaultLinks = [
  {
    anchor: "#contenu",
    label: "Contenu",
  },
];

function Layout({ children, survey }: LayoutProps) {
  const alreadyLoad = useRef(false);
  const [header, setHeader] = useState<HeaderType | undefined>(undefined);
  const [footer, setFooter] = useState<FooterType | undefined>(undefined);

  useEffect(
    function () {
      if (survey && !alreadyLoad.current) {
        alreadyLoad.current = true;
        (async function () {
          try {
            const data = await surveys.getMetadataSurvey(survey);
            if (data) {
              const { Header, Footer } = data;
              setHeader(Header);
              setFooter(Footer);
            }
          } catch (e) {
            // TODO
          }
        })();
      }
    },
    [survey, alreadyLoad]
  );
  if (header && footer) {
    return (
      <div data-id="welcome" className="stromae-welcome">
        <SkipLinks links={defaultLinks} />
        <HeaderAuth>
          <Header header={header} />
        </HeaderAuth>
        <main id="contenu">{children}</main>
        <Footer footer={footer} />
      </div>
    );
  } else {
    return <LayoutPlaceholder />;
  }
}

export default Layout;
