import {useEffect, useState, PropsWithChildren, useCallback, useMemo} from 'react';
import { useLunatic } from '@inseefr/lunatic';
import * as custom from '@inseefr/lunatic-dsfr';
import { OrchestratedElement } from '../../typeStromae/type';
import { OrchestratorProps } from './Orchestrator';
import { CloneElements } from './CloneElements';
import { useQuestionnaireTitle } from './useQuestionnaireTitle';

export function UseLunatic(props: PropsWithChildren<OrchestratorProps>) {
	const {
		source,
		surveyUnitData,
		children,
		getReferentiel,
		preferences,
		features,
		savingType,
		autoSuggesterLoading,
		paginated,
		disabled,
		metadata,
	} = props;
	const { data, stateData = { currentPage: '1' } } = surveyUnitData ?? {};
	const { currentPage } = stateData;
	const [currentChange, setCurrentChange] = useState<{ name: string }>();

	const onChange = useCallback(({ name }: { name: string }, value: unknown) => {
		setCurrentChange({ name });
	}, []);

	const args = useMemo(() => ({
			getReferentiel,
			custom,
			preferences,
			features,
			savingType,
			autoSuggesterLoading,
			onChange,
	}), [
		getReferentiel,
		preferences,
		features,
		savingType,
		autoSuggesterLoading,
		onChange,
		paginated,
	]);

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
		pager,
	} = useLunatic(source, data, args);

	const defaultTitle = metadata?.Header?.serviceTitle;
	useQuestionnaireTitle({ source, page: pager.page, defaultTitle: typeof defaultTitle === 'string' ? defaultTitle : 'Enquête Insee'  });

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
				disabled={disabled}
				currentPage={currentPage}
			>
				{children}
			</CloneElements>
		</Provider>
	);
}
