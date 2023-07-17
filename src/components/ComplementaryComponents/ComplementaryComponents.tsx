import { OrchestratedElement } from '../../typeStromae/type';
import { ComponentsRenderer } from '../ComponentsRenderer';

export function ComplementaryComponents(props: OrchestratedElement) {
	const { getComponents, currentErrors, disabled = false } = props;
	const only = ["QuestionExplication"]

	if (getComponents) {
		const checkComponents = getComponents().filter((component) => {
			const { componentType } = component;

			return (!only || (only && only.includes(componentType)))
		})

		if (checkComponents.length > 0){
			return (
				<div id="complementary-components">
					<ComponentsRenderer getComponents={getComponents} currentErrors={currentErrors} disabled={disabled} only={only} />
				</div>
			);
		}
	}
	return null;
}
