import { useState } from 'react';

import { OrchestratedElement } from '../../typeStromae/type';
import { parsePageTag } from '../../lib/commons/parsePageTag';

import { ModalContinueOrRestart } from './ModalContinueOrRestart';

export function ContinueOrRestart(props: OrchestratedElement) {
	const { currentPage, goToPage } = props;
	const [display, setDisplay] = useState(currentPage !== '1');
	const { page, iteration } = parsePageTag(currentPage);

	if (display) {
		return (
			<ModalContinueOrRestart
				display={display}
				close={() => setDisplay(false)}
				goToPage={goToPage}
				currentPage={page}
				iteration={iteration ? parseInt(iteration, 10) : undefined}
			/>
		);
	}
	return null;
}
