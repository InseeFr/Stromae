import { useSearchParams } from 'react-router-dom';
import { useNavigate } from 'react-router';
import { decompressFromEncodedURIComponent } from 'lz-string';
import { Layout } from '../../components/layout';
import { useDocumentTitle } from '../../utils/useDocumentTitle';
import { VisualizeWelcomeContainer } from '../../components/Welcome';
import { LoadFromUrl } from '../../components/loadSourceData/LoadFromUrl';
import { LoadSourceData } from '../../components/orchestrator/LoadSourceData';

export function VisualizeWelcome() {
  const [searchParams] = useSearchParams();
  const resources = searchParams.get('resources');
  useDocumentTitle("Page d'accueil");

  const navigate = useNavigate();

  if (resources) {
		const { data, source, metadata, nomenclatures } = JSON.parse(
			decompressFromEncodedURIComponent(resources)
		);

    if (source && source.length) {
      return (
        <LoadFromUrl
          urlSource={source}
          urlData={data}
          urlMetadata={metadata}
          urlNomenclatures={nomenclatures}
        >
          <Layout>
            <LoadSourceData>
              <VisualizeWelcomeContainer />
            </LoadSourceData>
          </Layout>
        </LoadFromUrl>
      );
    }
  }
  navigate({pathname: '/visualize'})
  return null;
}
