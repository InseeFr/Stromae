import { PropsWithChildren, useCallback, useState } from 'react';
import { CloneElements } from './CloneElements';
import { LunaticError } from '../../typeLunatic/type';
import { OrchestratedElement } from './Orchestrator';

export enum CriticalityEnum {
	FORMAT = 'FORMAT',
	ERROR = 'ERROR',
	WARN = 'WARN',
}

export function Controls(props: PropsWithChildren<OrchestratedElement>) {
	const [currentErrors, setCurrentErrors] =
		useState<Record<string, Array<LunaticError>>>();
	const [warning, setWarning] = useState<boolean>(false);
	const [criticality, setCriticality] = useState<boolean>();
	const {
		children = [],
		getErrors,
		goNextPage = () => null,
		compileControls,
		...rest
	} = props;

	const handleGoNext = useCallback(
		function () {
			if (warning) {
				setWarning(false);
				setCurrentErrors(undefined);
				setCriticality(false);
				goNextPage();
			} else if (compileControls) {
				const errors = compileControls();
				setCriticality(errors.isCritical);
				setCurrentErrors(errors.currentErrors);
				if (errors.currentErrors && !errors.isCritical) {
					setWarning(true);
				} else if (!errors.currentErrors) {
					goNextPage();
				}
			}
		},
		[compileControls, goNextPage, warning]
	);

	return (
		<CloneElements<OrchestratedElement>
			{...rest}
			goNextPage={handleGoNext}
			criticality={criticality}
			currentErrors={currentErrors}
		>
			{children}
		</CloneElements>
	);
}
