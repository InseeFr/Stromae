import { Button } from '@codegouvfr/react-dsfr/Button';
import { OrchestratedElement } from '../orchestrator';

export function Navigation(props: OrchestratedElement) {
	const { goNextPage = () => null, isLastPage } = props;

	function handleClick() {
		goNextPage();
	}
	if (!isLastPage) {
		return (
			<Button priority="primary" onClick={handleClick}>
				Continuer
			</Button>
		);
	}
	return null;
}
