import { cloneElement, PropsWithChildren } from 'react';
import { LunaticError } from '../../typeLunatic/type';
import { OrchestratedElement } from './Orchestrator';

type ControlsType = {} & OrchestratedElement;

export enum CriticalityEnum {
	FORMAT = 'FORMAT',
	ERROR = 'ERROR',
	WARN = 'WARN',
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

export function Controls(props: PropsWithChildren<ControlsType>) {
	const {
		children = [],
		getModalErrors = () => null,
		goNextPage = () => null,
	} = props;

	const modalErrors = flatErrors(getModalErrors());
	const criticality = getCriticality(modalErrors);

	function skip() {
		goNextPage({ block: true });
	}

	const effective = Array.isArray(children) ? children : [children];

	return (
		<>
			{effective.map(function (element, key) {
				return cloneElement(
					element as React.ReactElement<OrchestratedElement>,
					{
						...props,
						goNextPage: modalErrors && criticality ? skip : goNextPage,
					}
				);
			})}
		</>
	);
}
