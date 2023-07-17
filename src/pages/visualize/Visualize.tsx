import { LoadFromUrl } from '../../components/loadSourceData/LoadFromUrl';
import { Orchestrator } from '../../components/orchestrator';
import { Formulaire } from '../../components/formulaire';
import { Layout } from '../../components/layout/Layout';
import { Precedent } from '../../components/navigation/Precedent';
import { Continuer } from '../../components/navigation/Continuer';
import { ContinueOrRestart } from '../../components/ContinueOrRestart/ContinueOrRestart';
import { Grid } from '../../components/Grid/Grid';
import { AlertesControles } from '../../components/AlertesControles';
import { AlertesSaving } from '../../components/AlertSaving/AlertesSaving';
import { useDocumentTitle } from '../../utils/useDocumentTitle';
import { ComplementaryComponents } from '../../components/ComplementaryComponents';
// import { WhyThisQuestion } from '../../components/whyThisQuestion';


const RP = {
	source: '/rp/source.json',
	data: '/rp/data.json',
	metadata: '/rp/metadata.json',
	nomenclatures: {
		'libelles-PCS2020': '/rp/nomenclature/pcs2020-lp.json',
		'communes-2019': '/rp/nomenclature/communes-2019.json',
		'nationalite': '/rp/nomenclature/L_NATIONETR-1-1-0.json',
		'pays': '/rp/nomenclature/L_PAYS-1-1-0.json',
	},
};

function onChange() {}

export function Visualize() {
	useDocumentTitle('Visualisation de questionnaire');
	return (
		<LoadFromUrl
			urlSource={RP.source}
			urlData={RP.data}
			urlMetadata={RP.metadata}
			urlNomenclatures={RP.nomenclatures}
		>
			<Layout>
				<Orchestrator onChange={onChange}>
	        <ContinueOrRestart />
						<Precedent />
						<Grid>
							<AlertesSaving />
							<AlertesControles />
							<Formulaire />
							<Continuer />
						</Grid>
							<ComplementaryComponents />
				</Orchestrator>
			</Layout>
		</LoadFromUrl>
	);
}
