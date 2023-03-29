import { Button } from '@codegouvfr/react-dsfr/Button';
import { OrchestratedElement } from '../orchestrator';
import { isComponentsContainSequence } from '../../lib/commons/isComponentscontainSequence';
import { ComponentType } from '../../typeLunatic/type-source';

function getStatus(getComponents?: () => Array<ComponentType>) {
	if (getComponents) {
		const components = getComponents();
		if (isComponentsContainSequence(components)) {
			return 'Commencer';
		}
	}
	return 'Continuer';
}

export function Continuer(props: OrchestratedElement) {
	const { goNextPage = () => null, isLastPage, getComponents } = props;
	const buttonContent = getStatus(getComponents);

	function handleClick() {
		goNextPage();
	}

	if (!isLastPage) {
		return (
			<div className="fr-grid-row fr-grid-row--center fr-grid-row--middle fr-mt-3w fr-mb-5w fr-mb-md-7w">
				<div className="fr-col-lg-6 fr-col-12">
					<Button priority="primary" onClick={handleClick}>
						{buttonContent}
					</Button>
				</div>
			</div>
		);
	}
	return null;
}
