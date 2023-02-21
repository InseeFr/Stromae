import LoadFromUrl from '../../components/loadSourceData/LoadFromUrl';
import Orchestrator from '../../components/orchestrator';
import Formulaire from '../../components/formulaire';
import Navigation from '../../components/navigation';

const RP = {
	source: '/rp/source.json',
	data: '/rp/data.json',
	metadata: '/rp/metadata.json',
};

function onChange() {}

function Visualize() {
	return (
		<LoadFromUrl urlSource={RP.source} urlData={RP.data}>
			<Orchestrator onChange={onChange}>
				<Formulaire />
				<Navigation />
			</Orchestrator>
		</LoadFromUrl>
	);
}

export default Visualize;
