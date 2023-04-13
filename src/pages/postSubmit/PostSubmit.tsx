import { useParams } from 'react-router-dom';
import { Layout } from '../../components/layout';
import { useDocumentTitle } from '../../useDocumentTitle';
import { LoadFromApi } from '../../components/loadSourceData/LoadFromApi';
import { PostSubmitSurvey } from '../../components/postSubmit'

export function PostSubmit() {
  const { survey, unit } = useParams();
  useDocumentTitle("Page d'accueil");

  return (
    <LoadFromApi survey={survey} unit={unit}>
      <Layout>
        <PostSubmitSurvey />
      </Layout>
    </LoadFromApi>
  );
}
