import Button from '@codegouvfr/react-dsfr/Button';
import { OrchestratedElement } from '../orchestrator';

export function Precedent(props: OrchestratedElement) {
	const { goPreviousPage = () => null, isFirstPage } = props;

	function handleClick() {
		goPreviousPage();
	}
	if (!isFirstPage) {
		return (
			<div className="fr-col-12">
				<Button
					priority="tertiary no outline"
					iconId="fr-icon-arrow-left-line"
					onClick={handleClick}
				>
					Précédent
				</Button>
			</div>
		);
	}
	return null;
}
