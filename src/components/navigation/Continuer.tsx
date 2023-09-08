import { useCallback } from 'react';
import { Button } from '@codegouvfr/react-dsfr/Button';
import { useNavigate, useParams } from 'react-router';
import { isComponentsContainSequence } from '../../lib/commons/isComponentscontainSequence';
import { ComponentType } from '../../typeLunatic/type-source';
import { OrchestratedElement } from '../../typeStromae/type';
import { uriPostEnvoi, uri404 } from '../../lib/domainUri';
import { fr } from '@codegouvfr/react-dsfr';

function getStatus(
	getComponents: () => Array<ComponentType>,
	isLastPage: boolean
) {
	if (isLastPage) {
		return 'Envoyer mes réponses';
	}
	if (getComponents) {
		const components = getComponents();
		if (isComponentsContainSequence(components)) {
			return 'Commencer';
		}
	}
	return 'Continuer';
}

/**
 * Le bouton de navigation en bas de page sur le questionnaire.
 * @param props
 * @returns
 */
export function Continuer(props: OrchestratedElement) {
	const {
		goNextPage = () => null,
		isLastPage,
		getComponents = () => [],
		// `waiting` is activated to communicate to users that an API request is in process
		waiting = false,
	} = props;
	const navigate = useNavigate();
	const { unit, survey } = useParams();
	const buttonContent = waiting
		? `Chargement`
		: getStatus(getComponents, isLastPage ?? false);

	const handleClick = useCallback(
		(event: React.MouseEvent) => {
			event.preventDefault();
			if (isLastPage) {
				try {
					navigate(uriPostEnvoi(survey, unit));
				} catch (e) {
					navigate(uri404());
				}
			}
			goNextPage();
		},
		[goNextPage, isLastPage, unit, survey, navigate]
	);

	return (
		<>
			<Button
				priority="primary"
				onClick={handleClick}
				className={fr.cx('fr-mt-1w')}
				nativeButtonProps={{
					form: 'stromae-form',
					type: 'submit',
					'aria-atomic': true,
					'aria-disabled': waiting,
				}}
				iconId={waiting ? 'fr-icon-refresh-line' : undefined}
				disabled={waiting}
			>
				{buttonContent}
			</Button>
		</>
	);
}
