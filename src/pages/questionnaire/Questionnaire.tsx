import { useParams } from 'react-router-dom';
import { useDocumentTitle } from '../../useDocumentTitle';
import { Orchestrator } from '../../components/orchestrator';
import { Layout } from '../../components/layout';
import { Navigation } from '../../components/navigation';
import { Formulaire } from '../../components/formulaire';
import { LoadFromApi } from '../../components/loadSourceData/LoadFromApi';
import { OidcSecure } from '../../lib/oidc';
import { Controles } from '../../components/controles';

export type QuestionnaireParams = {
	survey?: string;
	unit?: string;
};

export type QuestionnaireProps = {
	isPublic?: boolean;
	onChange?: (args: any) => void;
};

export function Questionnaire({ onChange }: QuestionnaireProps) {
	const { survey, unit } = useParams();
	useDocumentTitle('Questionnaire');
	return (
		<OidcSecure>
			<LoadFromApi survey={survey} unit={unit}>
				<Layout>
					<Orchestrator onChange={onChange} activeControls={true}>
						<Controles />
						<Formulaire />
						<Navigation />
					</Orchestrator>
				</Layout>
			</LoadFromApi>
		</OidcSecure>
	);
}
