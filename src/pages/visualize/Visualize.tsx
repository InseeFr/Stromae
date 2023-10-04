import { useState } from 'react';
import { useSearchParams } from 'react-router-dom';
import { AuthSecure } from '../../lib/oidc';
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
			<AuthSecure>
				<VisualizeResources
					source={sourceUrl}
					metadata={metadataUrl ?? undefined}
					data={dataUrl ?? undefined}
					readOnly={readOnly === 'true'}
					nomenclatures={nomenclatures}
				/>
			</AuthSecure>
		);
	}
	return (
		<AuthSecure>
			<SelectResources setNomenclatures={setNomenclatures} />
		</AuthSecure>
	);
}
