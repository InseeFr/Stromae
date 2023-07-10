import { useParams } from 'react-router-dom';

import { useDocumentTitle } from '../../utils/useDocumentTitle';
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
import { ContinueOrRestart } from '../../components/ContinueOrRestart/ContinueOrRestart';
import { WhyThisQuestion } from '../../components/whyThisQuestion';

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
						<ContinueOrRestart />
						<Precedent />
						<Grid>
							<AlertesSaving />
							<AlertesControles />
							<Formulaire />
							<Continuer />
							<WhyThisQuestion />
						</Grid>
					</Orchestrator>
				</Layout>
			</LoadFromApi>
		</OidcSecure>
	);
}
