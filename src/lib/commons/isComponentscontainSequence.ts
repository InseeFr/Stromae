import { ComponentType } from '../../typeLunatic/type-source';

export function isComponentsContainSequence(
	components: Array<ComponentType>
): boolean {
	return components.some(function (component) {
		const { componentType } = component;
		return componentType === 'Sequence';
	}, false);
}
