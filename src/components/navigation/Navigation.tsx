import { OrchestratedElement } from '../orchestrator';
import { ButtonsGroup } from '@codegouvfr/react-dsfr/ButtonsGroup';
import { Controls } from './Controls';
import { NavigationButtons } from './NavigationButtons';

export function Navigation(props: OrchestratedElement) {
	return (
		<Controls {...props}>
			<NavigationButtons {...props} />
		</Controls>
	);
}
