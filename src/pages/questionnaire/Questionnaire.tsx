import { useParams } from 'react-router-dom';
import { AlertesSaving } from '../../components/AlertSaving/AlertesSaving';
import { ComplementaryComponents } from '../../components/ComplementaryComponents/ComplementaryComponents';
import { ContinueOrRestart } from '../../components/ContinueOrRestart/ContinueOrRestart';
import { DraftBanner } from '../../components/DraftBanner/DraftBanner';
import { Grid } from '../../components/Grid/Grid';
import { Formulaire } from '../../components/formulaire';
import { Layout } from '../../components/layout';
import { LoadFromApi } from '../../components/loadSourceData/LoadFromApi';
import { Modals } from '../../components/modals';
import { Continuer } from '../../components/navigation/Continuer';
import { Precedent } from '../../components/navigation/Precedent';
import { Orchestrator } from '../../components/orchestrator';
import { OidcSecure } from '../../lib/oidc';
import { useDocumentTitle } from '../../utils/useDocumentTitle';
import { AlertesControles } from '../../components/AlertesControles';

export type QuestionnaireParams = {
	survey?: string;
	unit?: string;
};

export type QuestionnaireProps = {};

const FEATURES = ['VTL', 'MD'];
const COLLECTED = 'COLLECTED';

export function Questionnaire(props: QuestionnaireProps) {
	const { survey, unit } = useParams();
	useDocumentTitle('Questionnaire');

	return (
		<OidcSecure>
			<LoadFromApi survey={survey} unit={unit}>
				<Layout>
					<Orchestrator features={FEATURES} savingType={COLLECTED}>
						<DraftBanner />
						<AlertesControles />
						<ContinueOrRestart />
						<Precedent />
						<Grid>
							<AlertesSaving />
							<Formulaire />
							<Modals />
							<Continuer />
						</Grid>
						<ComplementaryComponents />
					</Orchestrator>
				</Layout>
			</LoadFromApi>
		</OidcSecure>
	);
}
