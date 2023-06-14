import { useState, useCallback } from 'react';
import { Input } from '@codegouvfr/react-dsfr/Input';
import { Button } from '@codegouvfr/react-dsfr/Button';
import { NomenclaturesType } from './Visualize';

/**
 * Rang de la liste du tableau de nomenclature
 * saisi par l'utilisateur.
 */
type EntryRow = {
	name: string;
	uri: string;
};

function Row({
	name,
	uri,
	index,
	onChange,
	deleteRow,
}: EntryRow & {
	index: number;
	onChange: (index: number, name: string, uri: string) => void;
	deleteRow: (index: number) => void;
}) {
	return (
		<li style={{ display: 'flex', flexDirection: 'row' }}>
			<Input
				label="Nom"
				style={{ marginRight: '1em' }}
				nativeInputProps={{
					value: name,
					onChange: (e: React.ChangeEvent<HTMLInputElement>) => {
						onChange(index, e.target.value, uri);
					},
				}}
			/>
			<Input
				label="Uri"
				nativeInputProps={{
					value: uri,
					onChange: (e: React.ChangeEvent<HTMLInputElement>) => {
						onChange(index, name, e.target.value);
					},
				}}
			/>
			<Button
				iconId={'fr-icon-close-line'}
				onClick={function noRefCheck() {
					deleteRow(index);
				}}
				title="Supprimer"
				priority="tertiary no outline"
			/>
		</li>
	);
}

/**
 * transforme la liste issu du composant html en un object exploitable
 * par stromae Record<name,uri>.
 * Fait à minima, sans réel vérification du contenu des champs de saisi.
 * @param rows Array<EntryRow>
 * @returns Record<string,string>
 */
function extractNomenclaturesFromList(rows: Array<EntryRow> = []) {
	return rows.reduce((a, { name, uri }) => {
		if (name.trim().length) {
			return { ...a, [name]: uri };
		}
		return a;
	}, {});
}

export function ListeNomenclatures({
	setNomenclatures,
}: {
	setNomenclatures: (n: NomenclaturesType) => void;
}) {
	const [rows, setRows] = useState<Array<EntryRow>>(() => {
		// Pour test
		setNomenclatures({
			'communes-2019': '/rp/nomenclatures/communes-2019.json',
		});
		return [
			{ name: 'communes-2019', uri: '/rp/nomenclatures/communes-2019.json' },
		];
	});

	const onChange = useCallback(
		(index: number, name: string, uri: string) => {
			const newRows = rows.map((row, i) => {
				if (i === index) {
					return { name, uri };
				}
				return row;
			});

			const nomenclatures = extractNomenclaturesFromList(newRows);

			setNomenclatures(nomenclatures);
			setRows(newRows);
		},
		[rows, setNomenclatures]
	);

	const addOne = useCallback(() => {
		setRows([...rows, { name: 'nouveau', uri: 'https://' }]);
	}, [rows]);

	const deleteRow = useCallback(
		(index: number) => {
			const newRows = rows.reduce((a: Array<EntryRow>, row, i) => {
				if (i === index) {
					return a;
				}
				return [...a, row];
			}, []);
			const nomenclatures = extractNomenclaturesFromList(newRows);

			setNomenclatures(nomenclatures);
			setRows(newRows);
		},
		[rows, setNomenclatures]
	);

	return (
		<>
			<Button onClick={addOne} priority="secondary">
				Ajouter un nouveau référentiel
			</Button>
			<ul style={{ listStyle: 'none' }}>
				{rows.map(({ name, uri }, i) => {
					return (
						<Row
							key={i}
							name={name}
							uri={uri}
							onChange={onChange}
							index={i}
							deleteRow={deleteRow}
						/>
					);
				})}
			</ul>
		</>
	);
}
