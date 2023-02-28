import LoadFromUrl from '../../components/loadSourceData/LoadFromUrl';
import Orchestrator from '../../components/orchestrator';
import Formulaire from '../../components/formulaire';
import Navigation from '../../components/navigation';
import Layout from '../../components/layout/Layout';

const RP = {
	source: '/rp/source.json',
	data: '/rp/data.json',
	metadata: '/rp/metadata.json',
	requiredNomenclatures: '/rp/required-nomenclatures.json',
	nomenclatures: {
		'libelles-PCS2020': '/rp/nomenclatures/libelles-PCS2020.json',
		'communes-2019': '/rp/nomenclatures/communes-2019.json',
	},
};

function onChange() {}

function Visualize() {
	return (
		<LoadFromUrl
			urlSource={RP.source}
			urlData={RP.data}
			urlMetadata={RP.metadata}
			urlRequiredNomenclatures={RP.requiredNomenclatures}
			urlNomenclatures={RP.nomenclatures}
		>
			<Layout>
				<Orchestrator onChange={onChange}>
					<Formulaire />
					<Navigation />
				</Orchestrator>
			</Layout>
		</LoadFromUrl>
	);
}

export default Visualize;
