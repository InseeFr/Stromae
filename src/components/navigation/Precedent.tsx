import { useRef, useEffect } from 'react';
import Button from '@codegouvfr/react-dsfr/Button';

import { OrchestratedElement } from '../../typeStromae/type';
import { usePrevious } from '../../lib/commons/usePrevious';

export function Precedent(props: OrchestratedElement) {
	const { goPreviousPage = () => null, isFirstPage, pageTag } = props;

	const buttonRef = useRef<HTMLButtonElement>(null);
	const previousPage = usePrevious<string>(pageTag);

	useEffect(
		() => {
			if (pageTag !== previousPage && buttonRef.current) {
				buttonRef.current.focus();
			}
		},
		[pageTag, previousPage]
	);

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
					ref={buttonRef}
				>
					Précédent
				</Button>
			</div>
		);
	}
	return null;
}
