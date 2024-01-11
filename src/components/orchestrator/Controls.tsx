import { PropsWithChildren, useCallback, useEffect, useState } from 'react';
import { LunaticError } from '../../typeLunatic/type';
import { OrchestratedElement } from '../../typeStromae/type';
import { CloneElements } from './CloneElements';

export function Controls(props: PropsWithChildren<OrchestratedElement>) {
	const [currentErrors, setCurrentErrors] =
		useState<Record<string, Array<LunaticError>>>();
	const [warning, setWarning] = useState<boolean>(false);
	const [criticality, setCriticality] = useState<boolean>();

	const {
		children = [],
		getErrors,
		goNextPage = () => null,
		goPreviousPage = () => null,
		compileControls,
		pageTag,
		refreshControls,
		setRefreshControls,
		...rest
	} = props;

	useEffect(() => {
		if (!(currentErrors?.roundabout && pageTag?.includes('#'))) {
			return;
		}
		setWarning(false);
		setCurrentErrors(undefined);
		setCriticality(false);
	}, [pageTag, currentErrors]);

	const handleGoNext = useCallback(() => {
		let errors;
		if (compileControls) {
			errors = compileControls();
		}
		setRefreshControls?.(false);
		if (warning && !refreshControls) {
			setWarning(false);
			setCurrentErrors(undefined);
			setCriticality(false);
			goNextPage();
		} else if (errors) {
			setCriticality(errors.isCritical);
			setCurrentErrors(errors.currentErrors);
			if (errors.currentErrors && !errors.isCritical) {
				setWarning(true);
			} else if (!errors.currentErrors) {
				setWarning(false);
				goNextPage();
			}
		} else {
			goNextPage();
		}
	}, [
		compileControls,
		goNextPage,
		warning,
		refreshControls,
		setRefreshControls,
	]);

	const handleGoPrevious: () => void = useCallback(() => {
		setWarning(false);
		setCriticality(undefined);
		setCurrentErrors(undefined);
		goPreviousPage();
	}, [goPreviousPage]);

	return (
		<CloneElements<OrchestratedElement>
			{...rest}
			goNextPage={handleGoNext}
			goPreviousPage={handleGoPrevious}
			criticality={criticality}
			currentErrors={currentErrors}
			pageTag={pageTag}
		>
			{children}
		</CloneElements>
	);
}