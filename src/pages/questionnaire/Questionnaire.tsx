import { useParams } from "react-router-dom";
import { OidcSecure } from "../../lib/oidc";
import Orchestrator from "../../components/orchestrator";
import Layout from "../../components/layout";
import Pager from "./Pager";
import Page from "./Page";

export type QuestionnaireParams = {
  survey: string;
  unit: string;
};

type QuestionnaireProps = {};

function Questionnaire(props: QuestionnaireProps) {
  const { survey } = useParams<QuestionnaireParams>();

  return (
    <OidcSecure>
      <Layout survey={survey}>
        <Orchestrator survey={survey}>
          <Page />
          <Pager />
        </Orchestrator>
      </Layout>
    </OidcSecure>
  );
}

export default Questionnaire;
