import { useParams } from "react-router-dom";
import Layout from "../../components/layout";

type PortailProps = {};

export type QuestionnaireParams = {
  survey: string;
};

function Deconnexion(props: PortailProps) {
  const { survey } = useParams<QuestionnaireParams>();

  return (
    <Layout survey={survey}>
      <div>Portail : {survey}</div>
      <div>Logout</div>
    </Layout>
  );
}

export default Deconnexion;
