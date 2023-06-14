import { useState } from 'react';
import { useSearchParams } from 'react-router-dom';
import { VisualizeResources } from './VisualizeResources';
import { SelectResources } from './SelectResources';

// const RP = {
// 	source: 'http%3A%2F%2Flocalhost%3A3000%2Frp%2Fsource.json',
// 	data: 'http%3A%2F%2Flocalhost%3A3000%2Frp%2Fdata.json',
// 	metadata: 'http%3A%2F%2Flocalhost%3A3000%2Frp%2Fmetadata.json',
// 	nomenclatures: {
// 		'libelles-PCS2020': '/rp/nomenclatures/libelles-PCS2020.json',
// 		'communes-2019': '/rp/nomenclatures/communes-2019.json',
// 	},
// };

export type NomenclaturesType = Record<string, string>;

export function Visualize() {
	const [searchParams] = useSearchParams();
	const sourceUrl = searchParams.get('source');
	const metadataUrl = searchParams.get('metadata');
	const dataUrl = searchParams.get('data');
	const readOnly = searchParams.get('readOnly');
	const [nomenclatures, setNomenclatures] = useState<NomenclaturesType>({});

	if (sourceUrl) {
		return (
			<VisualizeResources
				source={sourceUrl}
				metadata={metadataUrl ?? undefined}
				data={dataUrl ?? undefined}
				readOnly={readOnly === 'true'}
				nomenclatures={nomenclatures}
			/>
		);
	}
	return <SelectResources setNomenclatures={setNomenclatures} />;
}
