import {
	cloneElement,
	PropsWithChildren,
	useCallback,
	useEffect,
	useState,
} from 'react';
import { LunaticError } from '../../typeLunatic/type';
import { OrchestratedElement } from './Orchestrator';

type ControlsType = {} & OrchestratedElement;

export enum CriticalityEnum {
	FORMAT = 'FORMAT',
	ERROR = 'ERROR',
	WARN = 'WARN',
}

function extractErrors(
	getErrors?: () => Record<string, Array<LunaticError>>,
	pageTag?: string
) {
	if (typeof getErrors === 'function') {
		const errors = getErrors();
		if (pageTag && pageTag in errors) {
			return Object.values(errors[pageTag]).flat();
		}
	}

	return undefined;
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

export function Controls(props: PropsWithChildren<ControlsType>) {
	const [askForTurn, setAskForturn] = useState<boolean>(false);
	const [currentErrors, setCurrentErrors] = useState<Array<LunaticError>>();
	const [criticality, setCriticality] = useState<boolean>();
	const {
		children = [],
		pageTag,
		getErrors,
		goNextPage = () => null,
		compileControls = () => console.error('compileControls is not a function!'),
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
				setAskForturn(false);
				if (errors && errors.length) {
					setCurrentErrors(errors);
					setCriticality(getCriticality(errors));
				} else {
					goNextPage();
					setCurrentErrors(undefined);
					setCriticality(undefined);
				}
			}
		},
		[askForTurn, getErrors, pageTag, goNextPage]
	);

	const effective = Array.isArray(children) ? children : [children];
	return (
		<>
			{effective.map(function (element, key) {
				return cloneElement(
					element as React.ReactElement<OrchestratedElement>,
					{
						...props,
						goNextPage: handleGoNext,
						criticality,
						currentErrors,
						key,
					}
				);
			})}
		</>
	);
}
