import { useState } from 'react';
import { useSearchParams } from 'react-router-dom';
import { SelectResources } from './SelectResources';
import { VisualizeResources } from './VisualizeResources';


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
