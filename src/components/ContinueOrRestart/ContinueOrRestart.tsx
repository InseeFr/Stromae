import { useState, useCallback } from 'react';
import { OrchestratedElement } from '../../typeStromae/type';
import { ModalContinueOrRestart } from './ModalContinueOrRestart';

export function ContinueOrRestart(props: OrchestratedElement) {
	const { pageFromAPI, goToPage } = props;
	const [display, setDisplay] = useState(pageFromAPI && pageFromAPI !== '1');

	function onClose() {
		setDisplay(false);
	}

	const onContinue = useCallback(() => {
		if (!pageFromAPI) {
			return;
		}
		goToPage?.({ page: pageFromAPI });
		setDisplay(false);
	}, [pageFromAPI, goToPage]);

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
