import {OrchestratedElement} from '../../typeStromae/type';
import {ComponentsRenderer} from '../ComponentsRenderer';

type Props = Pick<OrchestratedElement, "currentErrors" | "disabled" | "getComponents">

export function Formulaire(props: Props) {
	const { getComponents, currentErrors, disabled = false } = props;

	return (
		<form
			id="stromae-form"
		>
			<ComponentsRenderer getComponents={getComponents} currentErrors={currentErrors} disabled={disabled} except={["QuestionExplication"]} />
		</form>
	);
}
