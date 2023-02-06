import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import { HeaderType, FooterType } from "../../lib/surveys/getMetadataSurvey";
import surveys from "../../lib/surveys/surveys";
import Header from "../../components/header/Header";
import Footer from "../../components/footer/Footer";

export type WelcomeSurveyParams = {
  survey: string;
};

interface WelcomeSurveyProps {}

function WelcomeSurvey(props: WelcomeSurveyProps) {
  const { survey } = useParams<WelcomeSurveyParams>();
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
      <Header header={header} />
      <main>Welcome {survey}</main>
      <Footer footer={footer} />
    </div>
  );
}

export default WelcomeSurvey;
