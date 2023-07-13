import { OrchestratedElement } from '../../typeStromae/type';
import { ComponentsRenderer } from '../ComponentsRenderer';

export function ComplementaryComponents(props: OrchestratedElement) {
	const { getComponents, currentErrors, disabled = false } = props;
	// eslint-disable-next-line no-console
	console.log("toto")
	return (
		<div id="complementary-components">
			<ComponentsRenderer getComponents={getComponents} currentErrors={currentErrors} disabled={disabled} only={["QuestionExplication"]} />
		</div>
	);
}
