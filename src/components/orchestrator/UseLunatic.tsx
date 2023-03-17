import { useEffect, useState } from 'react';
import { useLunatic } from '@inseefr/lunatic';
import * as custom from '@inseefr/lunatic-dsfr';
import { cloneElement } from 'react';
import {
	OrchestratedElement,
	OrchestratorProps,
	NestedOrchestratedElement,
} from './Orchestrator';

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
		preferences,
		features,
	} = props;
	const [args, setArgs] = useState<Record<string, unknown>>({});
	const { data } = surveyUnitData || {};

	useEffect(
		function () {
			setArgs({
				onChange,
				getReferentiel,
				activeControls,
				custom,
				preferences,
				features,
			});
		},
		[onChange, getReferentiel, activeControls, preferences, features]
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
		Provider,
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
