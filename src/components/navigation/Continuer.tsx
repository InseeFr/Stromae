import { Button } from '@codegouvfr/react-dsfr/Button';
import { OrchestratedElement } from '../orchestrator';

export function Continuer(props: OrchestratedElement) {
	const { goNextPage = () => null, isLastPage } = props;

	function handleClick() {
		goNextPage();
	}

	if (!isLastPage) {
		return (
			<div className="fr-grid-row fr-grid-row--center fr-grid-row--middle fr-mt-md-4w">
				<div className="fr-col-lg-6 fr-col-12">
					<Button priority="primary" onClick={handleClick}>
						Continuer
					</Button>
				</div>
			</div>
		);
	}
	return null;
}
