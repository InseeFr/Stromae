import {
	cloneElement,
	PropsWithChildren,
	useCallback,
	useEffect,
	useState,
} from 'react';
import { LunaticError } from '../../typeLunatic/type';
import { OrchestratedElement } from './Orchestrator';

export enum CriticalityEnum {
	FORMAT = 'FORMAT',
	ERROR = 'ERROR',
	WARN = 'WARN',
}

function getErrors(
	getCurrentErrors?: () => Record<string, Array<LunaticError>>
) {
	if (typeof getCurrentErrors === 'function') {
		return getCurrentErrors();
	}

	return undefined;
}

function flatErrors(errors: Record<string, Array<LunaticError>> | null) {
	if (errors) {
		return Object.values(errors).flat();
	}
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
	const {
		children = [],
		getModalErrors = () => null,
		getCurrentErrors,
		goNextPage = () => null,
	} = props;

	const modalErrors = flatErrors(getModalErrors());
	const criticality = getCriticality(modalErrors);
	const [onErrors, setOnErrors] = useState<boolean>(false);
	const [currentErrors, setCurrentsErrors] =
		useState<Record<string, Array<LunaticError>>>();

	const errors = getErrors(getCurrentErrors);

	useEffect(
		function () {
			if (modalErrors) {
				setOnErrors(true);
			}
			if (!modalErrors && onErrors) {
				// trick for modal
				goNextPage();
			}
		},
		[modalErrors, onErrors, goNextPage]
	);

	function skip() {
		goNextPage({ block: true });
	}

	const effective = Array.isArray(children) ? children : [children];

	const handleGoNextPage = useCallback(
		function () {
			if (errors) {
				setCurrentsErrors(errors);
			}
			console.log({ errors });
			goNextPage();
		},
		[goNextPage, errors]
	);

	return (
		<>
			{effective.map(function (element, key) {
				return cloneElement(
					element as React.ReactElement<OrchestratedElement>,
					{
						...props,
						modalErrors,
						criticality,
						goNextPage: modalErrors && criticality ? skip : handleGoNextPage,
						currentErrors,
					}
				);
			})}
		</>
	);
}
