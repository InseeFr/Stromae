import { useCallback, useState } from 'react';
import { Button } from '@codegouvfr/react-dsfr/Button';
import { useNavigate, useParams } from 'react-router';
import { isComponentsContainSequence } from '../../lib/commons/isComponentscontainSequence';
import { ComponentType } from '../../typeLunatic/type-source';
import { CollectStatusEnum, OrchestratedElement } from '../../typeStromae/type';
import { uriPostEnvoi, uri404 } from '../../lib/domainUri';
import { useSaveSurveyUnitStateData } from '../../hooks/useSaveSurveyUnitData';

function getButtonTitle(getComponents: () => Array<ComponentType>) {
	if (getComponents) {
		const components = getComponents();
		return components.reduce((acc, component) => {
			if (component.componentType === 'Sequence') {
				return `Commencer la saise des questions concernant l'étape ${component.title}`;
			}
			return acc;
		}, `Passer à l'étape suivante`);
	}
	return `Passer à l'étape suivante`;
}

function getStatus(
	getComponents: () => Array<ComponentType>,
	isLastPage: boolean,
	saving: boolean
) {
	if (isLastPage) {
		return 'Envoyer mes réponses';
	}
	if (saving) {
		return 'Vos données sont en cours de sauvegarde';
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
	const [saving, setSaving] = useState(false);
	const {
		goNextPage = () => null,
		isLastPage,
		getComponents = () => [],

		pageTag,
	} = props;
	const navigate = useNavigate();
	const saveSuData = useSaveSurveyUnitStateData();
	const { unit, survey } = useParams();
	const buttonContent = getStatus(getComponents, isLastPage ?? false, saving);

	const handleClick = useCallback(
		(event: React.MouseEvent) => {
			event.preventDefault();

			if (isLastPage) {
				setSaving(true);
				saveSuData({
					pageTag,
					collectStatus: CollectStatusEnum.Validated,
				})
					.then(() => {
						navigate(uriPostEnvoi(survey, unit));
						setSaving(false);
					})
					.catch(() => {
						navigate(uri404());
						setSaving(false);
					});
			}

			window.scrollTo(0, 0);
			document.getElementById('button-precedent')?.focus();
			goNextPage();
		},
		[goNextPage, isLastPage, unit, survey, navigate, saveSuData, pageTag]
	);

	return (
		<Button
			priority="primary"
			onClick={handleClick}
			title={getButtonTitle(getComponents)}
			nativeButtonProps={{
				form: 'stromae-form',
				type: 'submit',
				'aria-disabled': saving,
			}}
			id="continue-button"
			disabled={saving}
		>
			{buttonContent}
		</Button>
	);
}
