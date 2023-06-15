import { LoadFromUrl } from '../../components/loadSourceData/LoadFromUrl';
import { OrchestratorReadOnly } from '../../components/orchestrator';
import { Formulaire } from '../../components/formulaire';
import { Layout } from '../../components/layout/Layout';
import { Precedent } from '../../components/navigation/Precedent';
import { Continuer } from '../../components/navigation/Continuer';
import { NomenclaturesType } from './Visualize';

type VisualizeResourcesProps = {
	source?: string;
	data?: string;
	metadata?: string;
	nomenclatures?: NomenclaturesType;
	readOnly?: boolean;
};

export function VisualizeResources(props: VisualizeResourcesProps) {
	const { source, data, metadata, nomenclatures, readOnly } = props;

	return (
		<LoadFromUrl
			urlSource={source}
			urlData={data}
			urlMetadata={metadata}
			urlNomenclatures={nomenclatures}
		>
			<Layout>
				<OrchestratorReadOnly readOnly={readOnly}>
					<Precedent />
					<Formulaire />
					<Continuer />
				</OrchestratorReadOnly>
			</Layout>
		</LoadFromUrl>
	);
}
