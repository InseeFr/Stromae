import { OrchestratedElement } from '../orchestrator';
import { ButtonsGroup } from '@codegouvfr/react-dsfr/ButtonsGroup';

export function Navigation(props: OrchestratedElement) {
	const { goNextPage, goPreviousPage, isFirstPage, isLastPage } = props;

	return (
		<ButtonsGroup
			buttons={[
				{
					children: 'Page précédente',
					iconId: 'fr-icon-arrow-left-line',
					onClick: goPreviousPage,
					disabled: isFirstPage,
				},
				{
					children: 'Page Suivante',
					iconId: 'fr-icon-arrow-right-line',
					onClick: goNextPage,
					disabled: isLastPage,
				},
			]}
			inlineLayoutWhen="always"
		/>
	);
}
