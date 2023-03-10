import { useEffect, useState } from 'react';
import { useLunatic } from '@inseefr/lunatic';
import { cloneElement, PropsWithChildren } from 'react';
import {
	OrchestratedElement,
	OrchestratorProps,
	NestedOrchestratedElement,
} from './Orchestrator';

/**
 * Provider pas encore à dispo dans la version en ligne de lunatic.
 * @param param0
 * @returns
 */
export function MockProvider({
	children,
}: {
	children?: PropsWithChildren<{}>;
}) {
	return <>{children}</>;
}

export function UseLunatic(
	props: NestedOrchestratedElement<OrchestratorProps>
) {
	const {
		source,
		surveyUnitData,
		children,
		onChange,
		getReferentiel,
		activeControls,
	} = props;
	const [args, setArgs] = useState<Record<string, unknown>>({
		onChange,
		getReferentiel,
	});
	const { data } = surveyUnitData || {};

	useEffect(
		function () {
			setArgs({ onChange, getReferentiel, activeControls });
		},
		[onChange, getReferentiel, activeControls]
	);

	const {
		getComponents,
		goPreviousPage,
		goNextPage,
		isFirstPage,
		isLastPage,
		goToPage,
		getCurrentErrors,
		getModalErrors,
		getErrors,
		getData,
		Provider = MockProvider,
	} = useLunatic(source, data, args);

	return (
		<Provider>
			{cloneElement(children as React.ReactElement<OrchestratedElement>, {
				getComponents,
				goPreviousPage,
				goNextPage,
				isFirstPage,
				isLastPage,
				goToPage,
				getCurrentErrors,
				getModalErrors,
				getErrors,
				activeControls,
				getData,
				onChange,
			})}
		</Provider>
	);
}
