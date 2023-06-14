import { useState } from 'react';
import { useNavigate } from 'react-router';
import { Input } from '@codegouvfr/react-dsfr/Input';
import { Button } from '@codegouvfr/react-dsfr/Button';
import { Grid } from '../../../components/Grid/Grid';
import { NomenclaturesType } from '../Visualize';
import { ListeNomenclatures } from '../ListeNomenclatures';

export type SelectResourceProps = {
	setNomenclatures: (nomenclatures: NomenclaturesType) => void;
};

export function SelectResources({ setNomenclatures }: SelectResourceProps) {
	const navigate = useNavigate();
	const [source, setSource] = useState<string>('');
	const [metadata, setMetadata] = useState<string>('');
	const [data, setData] = useState<string>('');

	function onClick(): void {
		if (source) {
			const pathname = `/visualize`;
			navigate({ pathname, search: `?source=${source}` });
		}
		return undefined;
	}

	return (
		<Grid>
			<Input
				hintText="a valide uri"
				label="Uri Source."
				state="default"
				nativeInputProps={{
					value: source,
					onChange: (e: React.ChangeEvent<HTMLInputElement>) => {
						setSource(e.target.value);
					},
				}}
				stateRelatedMessage="Text de validation / d'explication de l'erreur"
			/>
			<Input
				label="Uri metadata"
				hintText="a valide uri"
				state="default"
				stateRelatedMessage="Text de validation / d'explication de l'erreur"
				nativeInputProps={{
					value: metadata,
					onChange: (e: React.ChangeEvent<HTMLInputElement>) => {
						setMetadata(e.target.value);
					},
				}}
			/>
			<Input
				hintText="a valide uri"
				label="Uri Data."
				state="default"
				stateRelatedMessage="Text de validation / d'explication de l'erreur"
				nativeInputProps={{
					value: data,
					onChange: (e: React.ChangeEvent<HTMLInputElement>) => {
						setData(e.target.value);
					},
				}}
			/>
			<ListeNomenclatures setNomenclatures={setNomenclatures} />
			<Button onClick={onClick}>Visualize!</Button>
		</Grid>
	);
}
