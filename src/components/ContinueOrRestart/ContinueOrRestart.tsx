import { useState, useEffect } from 'react';
import { OrchestratedElement } from '../../typeStromae/type';
import { ModalContinueOrRestart } from './ModalContinueOrRestart';
import { parsePageTag } from '../../lib/commons/parsePageTag';

export function ContinueOrRestart(props: OrchestratedElement) {
	const { currentPage, goToPage } = props;
	const [init, setInit] = useState(false);
	const [display, setDisplay] = useState(false);
	const { page, iteration } = parsePageTag(currentPage);

	useEffect(
		function () {
			if (!init) {
				setInit(true);
				if (currentPage !== '1') {
					setDisplay(true);
				}
			}
		},
		[init, currentPage]
	);

	if (display) {
		return (
			<ModalContinueOrRestart
				display={display}
				close={() => setDisplay(false)}
				goToPage={goToPage}
				currentPage={page}
				iteration={iteration ? parseInt(iteration) : undefined}
			/>
		);
	}
	return null;
}
