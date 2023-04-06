import { useEffect, useState, useCallback, PropsWithChildren } from 'react';
import { useLunatic } from '@inseefr/lunatic';
import * as custom from '@inseefr/lunatic-dsfr';
import { OrchestratorProps } from './Orchestrator';
import { CloneElements } from './CloneElements';
import { OrchestratedElement } from '../../typeStromae/type';

export function UseLunatic(props: PropsWithChildren<OrchestratorProps>) {
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
		paginated,
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
			paginated,
		]
	);

	const {
		getComponents,
		goPreviousPage,
		goNextPage,
		isFirstPage,
		isLastPage,
		goToPage,
		getData,
		Provider,
		compileControls,
		pageTag,
	} = useLunatic(source, data, args);

	return (
		<Provider>
			<CloneElements<OrchestratedElement>
				compileControls={compileControls}
				getComponents={getComponents}
				goPreviousPage={goPreviousPage}
				goNextPage={goNextPage}
				isFirstPage={isFirstPage}
				isLastPage={isLastPage}
				goToPage={goToPage}
				getData={getData}
				currentChange={currentChange}
				pageTag={pageTag}
			>
				{children}
			</CloneElements>
		</Provider>
	);
}
