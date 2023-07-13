import { OrchestratedElement } from '../../typeStromae/type';
import { ComponentsRenderer } from '../ComponentsRenderer';

export function Formulaire(props: OrchestratedElement) {
	const { getComponents, currentErrors, disabled = false } = props;

	return (
		<form
			id="stromae-form"
		>
			<ComponentsRenderer getComponents={getComponents} currentErrors={currentErrors} disabled={disabled} except={["QuestionExplication"]} />
		</form>
	);
}
