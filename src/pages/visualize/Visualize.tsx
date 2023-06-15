import { useSearchParams } from 'react-router-dom';
import { decompressFromEncodedURIComponent } from 'lz-string';
import { VisualizeResources } from './VisualizeResources';
import { SelectResources } from './SelectResources';

export type NomenclaturesType = Record<string, string>;

export function Visualize() {
	const [searchParams] = useSearchParams();
	const readOnly = searchParams.get('readOnly');
	const resources = searchParams.get('resources');

	if (resources) {
		const { data, source, metadata, nomenclatures } = JSON.parse(
			decompressFromEncodedURIComponent(resources)
		);

		if (source && source.length) {
			return (
				<VisualizeResources
					source={source}
					metadata={metadata}
					data={data}
					readOnly={readOnly === 'true'}
					nomenclatures={nomenclatures}
				/>
			);
		}
	}
	return <SelectResources />;
}
