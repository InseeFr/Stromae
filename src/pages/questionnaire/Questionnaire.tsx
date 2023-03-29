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
import { AlertesSaving } from '../../components/AlertSaving/AlertesSaving';
import { Grid } from '../../components/Grid/Grid';

export type QuestionnaireParams = {
	survey?: string;
	unit?: string;
};

export type QuestionnaireProps = {};

const FEATURES = ['VTL', 'MD'];
const COLLECTED = 'COLLECTED';

export function Questionnaire() {
	const { survey, unit } = useParams();
	useDocumentTitle('Questionnaire');
	return (
		<OidcSecure>
			<LoadFromApi survey={survey} unit={unit}>
				<Layout>
					<Orchestrator
						activeControls={true}
						features={FEATURES}
						savingType={COLLECTED}
						autoSuggesterLoading={true}
					>
						<Precedent />
						<Grid>
							<AlertesControles />
							<Formulaire />
							<Continuer />
							<AlertesSaving />
						</Grid>
					</Orchestrator>
				</Layout>
			</LoadFromApi>
		</OidcSecure>
	);
}
