import Orchestrator from '../../components/orchestrator';
import Layout from '../../components/layout';
import Navigation from '../../components/navigation';
import Formulaire from '../../components/formulaire';
import useDocumentTitle from '../../useDocumentTitle';
import LoadFromApi from '../../components/loadSourceData/LoadFromApi';
import { QuestionnaireProps, QuestionnaireParams } from './Questionnaire';

function Questionnaire({
	survey,
	unit,
	onChange,
}: QuestionnaireProps & QuestionnaireParams) {
	useDocumentTitle('Questionnaire');
	return (
		<LoadFromApi survey={survey} unit={unit}>
			<Layout>
				<Orchestrator onChange={onChange}>
					<Formulaire />
					<Navigation />
				</Orchestrator>
			</Layout>
		</LoadFromApi>
	);
}

export default Questionnaire;
