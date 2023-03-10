import { ButtonsGroup } from '@codegouvfr/react-dsfr/ButtonsGroup';
import { OrchestratedElement } from '../orchestrator';

export function Navigation(props: OrchestratedElement) {
	const {
		goNextPage = () => null,
		goPreviousPage,
		isFirstPage,
		isLastPage,
	} = props;

	function handleClick() {
		goNextPage();
	}

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
					onClick: handleClick,
					disabled: isLastPage,
				},
			]}
			inlineLayoutWhen="always"
		/>
	);
}
