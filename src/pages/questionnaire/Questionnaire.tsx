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
    <OidcSecure>
      <Layout survey={survey}>
        <div>Questionnaire : {survey}</div>
      </Layout>
    </OidcSecure>
  );
}

export default Questionnaire;
