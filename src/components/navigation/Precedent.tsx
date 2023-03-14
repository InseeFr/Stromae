import Button from '@codegouvfr/react-dsfr/Button';
import { OrchestratedElement } from '../orchestrator';

export function Precedent(props: OrchestratedElement) {
	const { goPreviousPage = () => null, isFirstPage } = props;

	function handleClick() {
		goPreviousPage();
	}
	if (!isFirstPage) {
		return (
			<div className="fr-grid-row fr-grid-row--center fr-grid-row--middle fr-mt-md-2w ">
				<div className="fr-col-lg-12 fr-col-12">
					<Button
						priority="tertiary no outline"
						iconId="fr-icon-arrow-left-line"
						onClick={handleClick}
					>
						Précédent
					</Button>
				</div>
			</div>
		);
	}
	return null;
}
