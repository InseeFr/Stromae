import { AlertesSaving } from '../../components/AlertSaving/AlertesSaving';
import { ComplementaryComponents } from '../../components/ComplementaryComponents';
import { ContinueOrRestart } from '../../components/ContinueOrRestart/ContinueOrRestart';
import { ModalWarningVizu } from '../../components/ContinueOrRestart/WarningVisu';
import { DraftBanner } from '../../components/DraftBanner/DraftBanner';
import { Grid } from '../../components/Grid/Grid';
import { Formulaire } from '../../components/formulaire';
import { Layout } from '../../components/layout/Layout';
import { LoadFromUrl } from '../../components/loadSourceData/LoadFromUrl';
import { Modals } from '../../components/modals';
import { Continuer } from '../../components/navigation/Continuer';
import { Precedent } from '../../components/navigation/Precedent';
import {
	Orchestrator,
	OrchestratorReadOnly,
} from '../../components/orchestrator';

type VisualizeResourcesProps = {
	source?: string;
	data?: string;
	metadata?: string;
	nomenclatures?: Record<string, string>;
	readOnly?: boolean;
};

export function VisualizeResources(props: VisualizeResourcesProps) {
	const { source, data, metadata, nomenclatures, readOnly } = props;

	const FinalOrchestrator = readOnly ? OrchestratorReadOnly : Orchestrator;

	return (
		<LoadFromUrl
			urlSource={source}
			urlData={data}
			urlMetadata={metadata}
			urlNomenclatures={nomenclatures}
		>
			<Layout>
				<FinalOrchestrator>
					<DraftBanner />
					<ContinueOrRestart />
					<Precedent />
					<Grid>
						<AlertesSaving />
						<Formulaire />
						<Modals />
						<ModalWarningVizu />
						<Continuer />
					</Grid>
					<ComplementaryComponents />
				</FinalOrchestrator>
			</Layout>
		</LoadFromUrl>
	);
}
