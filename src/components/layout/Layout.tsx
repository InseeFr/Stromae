import { useEffect, useState, useRef } from "react";
import FooterType from "../footer/FooterType";
import HeaderType from "../header/HeaderType";
import surveys from "../../lib/surveys/surveysApi";
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

  return (
    <>
      <HeaderAuth>
        <Header header={header} />
      </HeaderAuth>
      <SkipLinks links={defaultLinks} />
      <main>{children}</main>
      <Footer footer={footer} />
    </>
  );
}

export default Layout;
