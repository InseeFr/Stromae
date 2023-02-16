import { useParams } from "react-router-dom";
import { OidcSecure } from "../../lib/oidc";
import Orchestrator from "../../components/orchestrator";
import Layout from "../../components/layout";
import Navigation from "../../components/navigation";
import Formulaire from "../../components/formulaire";
import useDocumentTitle from "../../useDocumentTitle";

export type QuestionnaireParams = {
  survey: string;
  unit: string;
};

type QuestionnaireProps = {
  onChange?: () => void;
};

function Questionnaire(props: QuestionnaireProps) {
  const { survey } = useParams<QuestionnaireParams>();
  useDocumentTitle("Questionnaire");
  return (
    <OidcSecure>
      <Layout survey={survey}>
        <Orchestrator survey={survey}>
          <Formulaire />
          <Navigation />
        </Orchestrator>
      </Layout>
    </OidcSecure>
  );
}

export default Questionnaire;
