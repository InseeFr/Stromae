import { OrchestratedElement } from '../Orchestrator';

type Strategy = Pick<OrchestratedElement, 'getData'> & {
	changes: Record<string, null>;
	clean: () => void;
};

async function partial(s: Strategy) {
	const { changes, getData, clean } = s;
	if (getData && Object.keys(changes).length) {
		// Risque d'être très couteux et inutile (ajouter une fonction dans lunatic)
		const vFromL = getData(true);
		const variables = Object.assign(vFromL.COLLECTED, vFromL.CALCULATED);
		const dataToSave = Object.keys(changes).reduce(function (values, name) {
			if (name in variables) {
				const value = variables[name];
				return { ...values, [name]: value };
			}
			return values;
		}, {});
		console.log('Data to save', dataToSave);
		// TODO const result = await api.save(data)...
		// TODO save state-data
		clean();
	}

	return true;
}

async function complete(s: Strategy) {
	return true;
}

export function createSavingStrategy(stategy: string) {
	switch (stategy) {
		case 'complete':
			return complete;
		default:
			return partial;
	}
}
