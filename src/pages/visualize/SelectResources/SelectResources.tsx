import { Button } from '@codegouvfr/react-dsfr/Button';
import { Header } from '@codegouvfr/react-dsfr/Header';
import { Input } from '@codegouvfr/react-dsfr/Input';
import { useState } from 'react';
import { useNavigate } from 'react-router';
import { Grid } from '../../../components/Grid/Grid';
import { ListeNomenclatures } from '../ListeNomenclatures';
import { NomenclaturesType } from '../Visualize';

export type SelectResourceProps = {
	nomenclatures: NomenclaturesType;
	setNomenclatures: (nomenclatures: NomenclaturesType) => void;
};

function makePath(
	source: string,
	data?: string,
	metadata?: string,
	nomenclatures?: NomenclaturesType
) {
	let query = `?source=${source}`;
	if (data?.length) {
		query = `${query}&data=${data}`;
	}
	if (metadata?.length) {
		query = `${query}&metadata=${metadata}`;
	}
	if (nomenclatures) {
		query = `${query}&nomenclatures=${JSON.stringify(nomenclatures)}`;
	}
	return {
		pathname: '/visualize',
		search: query,
	};
}

export function SelectResources({
	nomenclatures,
	setNomenclatures,
}: SelectResourceProps) {
	const navigate = useNavigate();
	const [source, setSource] = useState<string>('');
	const [metadata, setMetadata] = useState<string>('');
	const [data, setData] = useState<string>('');

	function onClick(): void {
		if (source) {
			navigate(makePath(source, data, metadata, nomenclatures));
		}
		return undefined;
	}

	return (
		<>
			<Header
				brandTop={<>Hello World!</>}
				homeLinkProps={{
					to: '/visualize',
					title: 'Stromae - collecte web',
				}}
				serviceTitle="Filière d'enquête"
				serviceTagline="Application de collecte internet"
			/>
			<Grid>
				<h1>Prévisualisation d'enquête.</h1>
				<h2>Fichier source de l'enquête.</h2>
				<Input
					hintText="une url valide"
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
				<h2>Fichier de métadonnées de l'enquête.</h2>
				<Input
					label="Uri metadata"
					hintText="une url valide"
					state="default"
					stateRelatedMessage="Text de validation / d'explication de l'erreur"
					nativeInputProps={{
						value: metadata,
						onChange: (e: React.ChangeEvent<HTMLInputElement>) => {
							setMetadata(e.target.value);
						},
					}}
				/>
				<h2>Fichier de données de l'enquête.</h2>
				<Input
					hintText="une url valide"
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
				<h2>Référentiels de suggestion.</h2>
				<p>
					Ajouter de nouveaux référentiels du suggestion. Pour être utiliser,
					ils devront aussi figurer dans la section suggesters du fichier
					source.
				</p>
				<ListeNomenclatures
					nomenclatures={nomenclatures}
					setNomenclatures={setNomenclatures}
				/>
				<Button onClick={onClick}>Visualiser le questionnaire</Button>
			</Grid>
		</>
	);
}
