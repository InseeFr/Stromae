import { useParams } from "react-router-dom";
import { OidcSecure } from "@axa-fr/react-oidc";
import Layout from "../../components/layout";

export type QuestionnaireParams = {
  survey: string;
  unit: string;
};

type QuestionnaireProps = {};

function Questionnaire(props: QuestionnaireProps) {
  const { survey, unit } = useParams<QuestionnaireParams>();

  return (
    <OidcSecure>
      <Layout survey={survey}>
        <div>Questionnaire : {survey}</div>
      </Layout>
    </OidcSecure>
  );
}

export default Questionnaire;
