import { ComponentType } from '../../../typeLunatic/type-source';
import { OrchestratedElement } from '../Orchestrator';

type Strategy = Pick<OrchestratedElement, 'criticality' | 'getComponents'>;

function atChangePage(s: Strategy) {
	const { criticality } = s;
	if (criticality) {
		return false;
	}
	return true;
}

function isComponentsContainSequence(
	components: Array<ComponentType>
): boolean {
	return components.reduce(function (status, component) {
		const { componentType } = component;
		return status || componentType === 'Sequence';
	}, false);
}

function atChangeSequence(s: Strategy) {
	const { getComponents = () => [], criticality } = s;
	const components = getComponents();
	console.log('ici');
	if (criticality) {
		return false;
	}
	return isComponentsContainSequence(components);
}

export function createTimeToSave(strategy?: string) {
	switch (strategy) {
		case 'sequence':
			return atChangeSequence;

		default:
			return atChangePage;
	}
}
