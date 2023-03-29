import { ComponentType } from '../../typeLunatic/type-source';

export function isComponentsContainSequence(
	components: Array<ComponentType>
): boolean {
	return components.reduce(function (status, component) {
		const { componentType } = component;
		return status || componentType === 'Sequence';
	}, false);
}
