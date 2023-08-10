import { useState, useCallback } from 'react';
import { OrchestratedElement } from '../../typeStromae/type';
import { ModalContinueOrRestart } from './ModalContinueOrRestart';

export function ContinueOrRestart(props: OrchestratedElement) {
	const { currentPage, goToPage } = props;
	const [display, setDisplay] = useState(currentPage && currentPage !== '1');

	function onClose() {
		setDisplay(false);
	}

	const onContinue = useCallback(() => {
		if (!currentPage) {
			return;
		}
		goToPage?.({ page: currentPage });
		setDisplay(false);
	}, [currentPage, goToPage]);

	const onRestart = useCallback(() => {
		goToPage?.({ page: '1' });
		setDisplay(false);
	}, [goToPage]);

	if (!display) {
		return null;
	}
	return (
		<ModalContinueOrRestart
			onContinue={onContinue}
			onRestart={onRestart}
			onClose={onClose}
		/>
	);
}
