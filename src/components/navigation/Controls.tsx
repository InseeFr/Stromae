import { useCallback, cloneElement, useState, useEffect, useRef } from 'react';
import { LunaticError } from '../../typeLunatic/type-source';
import { OrchestratedElement } from '../orchestrator';
import { NestedOrchestratedElement } from '../orchestrator/Orchestrator';
import { ModalErrors } from './ModalErrors';

/**
 *
 * @param props
 * @returns
 */
export function Controls(
	props: NestedOrchestratedElement<OrchestratedElement>
) {
	const {
		children,
		getModalErrors = () => null,
		goNextPage: gnpOriginal = () => null,
		goPreviousPage: gppOriginal = () => null,
	} = props;
	const [displayModal, setDisplayModal] = useState<boolean>(false);
	// const [errors, setErrors] = useState<Array<LunaticError>>();
	const errors = useRef<Array<LunaticError>>();

	const goNextPage = useCallback(
		function () {
			gnpOriginal();
		},
		[gnpOriginal]
	);

	const goPreviousPage = useCallback(
		function () {
			gppOriginal();
		},
		[gppOriginal]
	);

	function onClose() {
		setDisplayModal(false);
	}

	function onSkip() {
		goNextPage();
	}

	const modalErrors = getModalErrors();
	console.log({ modalErrors });

	return (
		<>
			<ModalErrors
				display={false}
				errors={errors.current}
				onClose={onClose}
				onSkip={onSkip}
			/>
			{cloneElement(children, { goNextPage, goPreviousPage })}
		</>
	);
}
