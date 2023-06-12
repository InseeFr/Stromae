import { useSearchParams } from 'react-router-dom';
import { VisualizeResources } from './VisualizeResources';
import { SelectResources } from './SelectResourses';

// const RP = {
// 	source: 'http%3A%2F%2Flocalhost%3A3000%2Frp%2Fsource.json',
// 	data: 'http%3A%2F%2Flocalhost%3A3000%2Frp%2Fdata.json',
// 	metadata: 'http%3A%2F%2Flocalhost%3A3000%2Frp%2Fmetadata.json',
// 	nomenclatures: {
// 		'libelles-PCS2020': '/rp/nomenclatures/libelles-PCS2020.json',
// 		'communes-2019': '/rp/nomenclatures/communes-2019.json',
// 	},
// };

export function Visualize() {
	const [searchParams] = useSearchParams();
	const sourceUrl = searchParams.get('source');
	const metadataUrl = searchParams.get('metadata');
	const dataUrl = searchParams.get('data');

	if (sourceUrl) {
		return (
			<VisualizeResources
				source={sourceUrl}
				metadata={metadataUrl ?? undefined}
				data={dataUrl ?? undefined}
			/>
		);
	}

	return <SelectResources />;
}
