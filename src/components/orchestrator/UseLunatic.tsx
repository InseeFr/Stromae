import { useEffect, useState, useCallback } from 'react';
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
		getReferentiel,
		activeControls,
		preferences,
		features,
		savingType,
		autoSuggesterLoading,
	} = props;
	const [args, setArgs] = useState<Record<string, unknown>>({});
	const { data } = surveyUnitData || {};
	const [currentChange, setCurrrentChange] = useState<{ name: string }>();

	const onChange = useCallback(function ({ name }: { name: string }) {
		setCurrrentChange({ name });
	}, []);

	useEffect(
		function () {
			setArgs({
				getReferentiel,
				activeControls,
				custom,
				preferences,
				features,
				savingType,
				autoSuggesterLoading,
				onChange,
			});
		},
		[
			getReferentiel,
			activeControls,
			preferences,
			features,
			savingType,
			autoSuggesterLoading,
			onChange,
		]
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
				currentChange,
			})}
		</Provider>
	);
}
