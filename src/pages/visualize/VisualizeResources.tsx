import { LoadFromUrl } from '../../components/loadSourceData/LoadFromUrl';
import { Orchestrator } from '../../components/orchestrator';
import { Formulaire } from '../../components/formulaire';
import { Layout } from '../../components/layout/Layout';
import { Precedent } from '../../components/navigation/Precedent';
import { Continuer } from '../../components/navigation/Continuer';

type VisualizeResourcesProps = {
	source?: string;
	data?: string;
	metadata?: string;
};

export function VisualizeResources(props: VisualizeResourcesProps) {
	const { source, data, metadata } = props;
	return (
		<LoadFromUrl urlSource={source} urlData={data} urlMetadata={metadata}>
			<Layout>
				<Orchestrator>
					<Precedent />
					<Formulaire />
					<Continuer />
				</Orchestrator>
			</Layout>
		</LoadFromUrl>
	);
}
