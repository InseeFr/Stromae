import { useParams } from "react-router-dom";
import { OidcSecure } from "@axa-fr/react-oidc";
import Layout from "../../components/layout";

export type QuestionnaireParams = {
  survey: string;
};

type QuestionnaireProps = {};

function Questionnaire(props: QuestionnaireProps) {
  const { survey } = useParams<QuestionnaireParams>();

  return (
    <Layout survey={survey}>
      <OidcSecure>
        <div>Questionnaire : {survey}</div>
      </OidcSecure>
    </Layout>
  );
}

export default Questionnaire;
