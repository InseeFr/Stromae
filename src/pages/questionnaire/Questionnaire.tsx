import { useParams } from 'react-router-dom';
import { useDocumentTitle } from '../../useDocumentTitle';
import { Orchestrator } from '../../components/orchestrator';
import { Layout } from '../../components/layout';
import { Precedent } from '../../components/navigation/Precedent';
import { Continuer } from '../../components/navigation/Continuer';
import { Formulaire } from '../../components/formulaire';
import { LoadFromApi } from '../../components/loadSourceData/LoadFromApi';
import { OidcSecure } from '../../lib/oidc';
import { AlertesControles } from '../../components/AlertesControles';

export type QuestionnaireParams = {
	survey?: string;
	unit?: string;
};

export type QuestionnaireProps = {
	onChange?: (args: any) => void;
};

const FEATURES = ['VTL', 'MD'];

export function Questionnaire({ onChange }: QuestionnaireProps) {
	const { survey, unit } = useParams();
	useDocumentTitle('Questionnaire');
	return (
		<OidcSecure>
			<LoadFromApi survey={survey} unit={unit}>
				<Layout>
					<Orchestrator
						onChange={onChange}
						activeControls={true}
						features={FEATURES}
					>
						<Precedent />
						<AlertesControles />
						<Formulaire />
						<Continuer />
					</Orchestrator>
				</Layout>
			</LoadFromApi>
		</OidcSecure>
	);
}
