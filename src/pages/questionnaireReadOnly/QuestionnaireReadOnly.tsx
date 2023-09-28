import { useParams } from 'react-router-dom';
import { ComplementaryComponents } from '../../components/ComplementaryComponents';
import { Grid } from '../../components/Grid/Grid';
import { Formulaire } from '../../components/formulaire';
import { Layout } from '../../components/layout';
import { LoadFromApi } from '../../components/loadSourceData/LoadFromApi';
import { Modals } from '../../components/modals';
import { Continuer } from '../../components/navigation/Continuer';
import { Precedent } from '../../components/navigation/Precedent';
import { OrchestratorReadOnly } from '../../components/orchestrator';
import { OidcSecure } from '../../lib/oidc';
import { useDocumentTitle } from '../../utils/useDocumentTitle';

export type QuestionnaireParams = {
	survey?: string;
	unit?: string;
};

const FEATURES = ['VTL', 'MD'];
const COLLECTED = 'COLLECTED';

export function QuestionnaireReadOnly() {
	const { survey, unit } = useParams();
	useDocumentTitle('Questionnaire');
	return (
		<OidcSecure>
			<LoadFromApi survey={survey} unit={unit}>
				<Layout>
					<OrchestratorReadOnly
						features={FEATURES}
						savingType={COLLECTED}
					>
						<Precedent />
						<Grid>
							<Formulaire />
							<Modals />
							<Continuer />
						</Grid>
						<ComplementaryComponents />
					</OrchestratorReadOnly>
				</Layout>
			</LoadFromApi>
		</OidcSecure>
	);
}
