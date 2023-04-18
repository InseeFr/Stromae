import { Button } from '@codegouvfr/react-dsfr/Button';

import { isComponentsContainSequence } from '../../lib/commons/isComponentscontainSequence';
import { ComponentType } from '../../typeLunatic/type-source';
import { OrchestratedElement } from '../../typeStromae/type';

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
			<Button priority="primary" onClick={handleClick} className="fr-mt-1w">
				{buttonContent}
			</Button>
		);
	}
	return null;
}
