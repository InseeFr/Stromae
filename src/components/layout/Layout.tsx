import { useEffect, useState } from "react";
import { FooterType } from "../../lib/surveys/getMetadataSurvey";
import HeaderType from "../header/HeaderType";
import surveys from "../../lib/surveys/surveys";
import Header from "../../components/header/Header";
import HeaderAuth from "../../components/header/HeaderAuth";
import Footer from "../../components/footer/Footer";
import SkipLinks from "@codegouvfr/react-dsfr/SkipLinks";

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
  const [header, setHeader] = useState<HeaderType | undefined>(undefined);
  const [footer, setFooter] = useState<FooterType | undefined>(undefined);

  useEffect(
    function () {
      async function init() {
        if (survey) {
          const data = await surveys.getMetadataSurvey(survey);
          if (data) {
            const { Header, Footer } = data;
            setHeader(Header);
            setFooter(Footer);
          }
        }
      }
      init();
    },
    [survey]
  );

  return (
    <div data-id="welcome" className="stromae-welcome">
      <HeaderAuth>
        <Header header={header} />
      </HeaderAuth>
      <main>{children}</main>
      <footer>TODO</footer>
      <SkipLinks links={defaultLinks} />
      <main id="contenu">Welcome {survey}</main>
      <Footer footer={footer} />
    </div>
  );
}

export default Layout;
