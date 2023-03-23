import { PropsWithChildren, useCallback, useEffect, useState } from 'react';
import { LunaticError } from '../../typeLunatic/type';
import { OrchestratedElement } from './Orchestrator';
import { CloneElements } from './CloneElements';

export enum CriticalityEnum {
	FORMAT = 'FORMAT',
	ERROR = 'ERROR',
	WARN = 'WARN',
}

function extractErrors(
	getErrors?: () => Record<string, Record<string, Array<LunaticError>>>,
	pageTag?: string
) {
	if (typeof getErrors === 'function') {
		const errors = getErrors();
		if (pageTag && pageTag in errors) {
			return errors[pageTag];
		}
	}

	return undefined;
}

function flatErrors(errors?: Record<string, Array<LunaticError>>) {
	if (errors) {
		return Object.values(errors).flat();
	}

	return [];
}

function getCriticality(errors?: Array<LunaticError>) {
	if (errors) {
		return errors.reduce(function (status, { criticality, typeOfControl }) {
			return (
				status ||
				(typeOfControl === CriticalityEnum.FORMAT &&
					criticality.startsWith(CriticalityEnum.ERROR))
			);
		}, false);
	}
	return false;
}

export function Controls(props: PropsWithChildren<OrchestratedElement>) {
	const [askForTurn, setAskForturn] = useState<boolean>(false);
	const [currentErrors, setCurrentErrors] =
		useState<Record<string, Array<LunaticError>>>();
	const [criticality, setCriticality] = useState<boolean>();
	const {
		children = [],
		pageTag,
		getErrors,
		goNextPage = () => null,
		compileControls = () => console.error('compileControls is not a function!'),
		...rest
	} = props;

	const handleGoNext = useCallback(
		function () {
			compileControls();
			setAskForturn(true);
		},
		[compileControls]
	);

	useEffect(
		function () {
			if (askForTurn) {
				const errors = extractErrors(getErrors, pageTag);
				const flat = flatErrors(errors);
				setAskForturn(false);
				if (flat.length) {
					setCurrentErrors(errors);
					setCriticality(getCriticality(flat));
				} else {
					goNextPage();
					setCurrentErrors(undefined);
					setCriticality(undefined);
				}
			}
		},
		[askForTurn, getErrors, pageTag, goNextPage]
	);

	return (
		<CloneElements
			{...rest}
			goNextPage={handleGoNext}
			criticality={criticality}
			currentErrors={currentErrors}
		>
			{children}
		</CloneElements>
	);
}
