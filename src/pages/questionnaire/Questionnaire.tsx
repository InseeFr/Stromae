import { useParams } from 'react-router-dom';
import { OidcSecure } from '../../lib/oidc';
import Orchestrator from '../../components/orchestrator';
import Layout from '../../components/layout';
import Navigation from '../../components/navigation';
import Formulaire from '../../components/formulaire';
import useDocumentTitle from '../../useDocumentTitle';
import LoadFromApi from '../../components/loadSourceData/LoadFromApi';

export type QuestionnaireParams = {
	survey: string;
	unit: string;
};

type QuestionnaireProps = {};

function onChange(...args: any) {
	console.log('change', ...args);
}

function Questionnaire(props: QuestionnaireProps) {
	const { survey, unit } = useParams<QuestionnaireParams>();
	useDocumentTitle('Questionnaire');
	return (
		<OidcSecure>
			<Layout survey={survey}>
				<LoadFromApi survey={survey} unit={unit}>
					<Orchestrator onChange={onChange}>
						<Formulaire />
						<Navigation />
					</Orchestrator>
				</LoadFromApi>
			</Layout>
		</OidcSecure>
	);
}

export default Questionnaire;
