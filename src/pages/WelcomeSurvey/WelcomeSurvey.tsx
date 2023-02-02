import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import { HeaderType } from "../../lib/surveys/getMetadataSurvey";
import surveys from "../../lib/surveys/surveys";
import Header from "../../components/header/Header";

export type WelcomeSurveyParams = {
  survey: string;
};

interface WelcomeSurveyProps {}

function WelcomeSurvey(props: WelcomeSurveyProps) {
  const { survey } = useParams<WelcomeSurveyParams>();
  const [header, setHeader] = useState<HeaderType | undefined>(undefined);
  useEffect(
    function () {
      async function init() {
        if (survey) {
          const data = await surveys.getMetadataSurvey(survey);
          if (data) {
            const { Header } = data;
            setHeader(Header);
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
      Welcome {survey}
    </div>
  );
}

export default WelcomeSurvey;
