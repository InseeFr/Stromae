import { useState, useEffect } from 'react';
import { OrchestratedElement } from '../../typeStromae/type';
import { ModalContinueOrRestart } from './ModalContinueOrRestart';

function checkPageTag(pageTag?: string) {
	if (pageTag) {
		const [page, iteration] = pageTag.split('#');
		return { page, iteration };
	}
	return { page: '1', iteration: undefined };
}

export function ContinueOrRestart(props: OrchestratedElement) {
	const { currentPage, goToPage } = props;
	const [init, setInit] = useState<boolean>(false);
	const [display, setDisplay] = useState<boolean>(false);
	const { page, iteration } = checkPageTag(currentPage);

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
