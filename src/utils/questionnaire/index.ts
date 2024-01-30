import { LunaticComponentDefinition } from '../../typeLunatic/type';
import { DeclarationType, LunaticSource } from '../../typeLunatic/type-source';

const removeDeclartionsAfterFromDeclarations = (
	declarations: DeclarationType[]
): DeclarationType[] => {
	if (Array.isArray(declarations))
		return declarations.filter(
			({ position }) => position !== 'AFTER_QUESTION_TEXT'
		);
	return [];
};

/**
 * Remove declarations with position AFTER_QUESTION_TEXT from component
 * @param component
 * @returns
 */
const removeDeclarationsAfterFromComponent = (
	component: LunaticComponentDefinition
): LunaticComponentDefinition => {
	// We keep declarations AFTER_QUESTION_TEXT for Sequence and Subsequence
	if (
		component.componentType === 'Sequence' ||
		component.componentType === 'Subsequence'
	) {
		return component;
	}

	const declarationsWithoutAfter = removeDeclartionsAfterFromDeclarations(
		component.declarations
	);

	// For components which includes components like Loop
	if ('components' in component) {
		const newComponents = component.components.map(
			removeDeclarationsAfterFromComponent
		);
		return {
			...component,
			declarations: declarationsWithoutAfter,
			components: newComponents,
		};
	}

	return {
		...component,
		declarations: declarationsWithoutAfter,
	};
};

/**
 * This function remove declarations AFTER_QUESTION_TEXT because they are not actually supported by Lunatic-DSFR.
 * Only Sequence and Subsequence works fine.
 * @param source
 * @returns the source without declarations AFTER_QUESTION_TEXT inside component (except for Sequence and Subsequence component)
 */
export const removeDeclarationsAfterFromSource = (
	source?: LunaticSource
): LunaticSource | undefined => {
	if (source && Array.isArray(source.components)) {
		const componentsWithoutDeclartionsAfter = source.components.map(
			removeDeclarationsAfterFromComponent
		);
		return {
			...source,
			components: componentsWithoutDeclartionsAfter,
		};
	}
	return source;
};
