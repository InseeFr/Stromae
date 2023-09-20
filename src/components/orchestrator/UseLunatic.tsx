import { PropsWithChildren, useCallback, useMemo, useState } from 'react';
import { useLunatic } from '@inseefr/lunatic';
import * as custom from '@inseefr/lunatic-dsfr';
import {
	CollectStatusEnum,
	OrchestratedElement,
	PersonalizationElement,
} from '../../typeStromae/type';
import { OrchestratorProps } from './Orchestrator';
import { CloneElements } from './CloneElements';
import { useQuestionnaireTitle } from './useQuestionnaireTitle';
import { useRedirectIfAlreadyValidated } from './useRedirectIfAlreadyValidated';

function getPersonalizationByName(
	personalization: Array<PersonalizationElement>
): Record<string, string | number | boolean> {
	return Object.fromEntries(personalization.map((p) => [p.name, p.value]));
}

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
	const { data, stateData, personalization = [] } = surveyUnitData ?? {};
	const { currentPage: pageFromAPI, state } = stateData ?? {};
	const [currentChange, setCurrentChange] = useState<{ name: string }>();
	const onChange = useCallback(({ name }: { name: string }, value: unknown) => {
		setCurrentChange({ name });
	}, []);
	const personalizationMap = useMemo(
		() => getPersonalizationByName(personalization),
		[personalization]
	);

	const args = useMemo(
		() => ({
			getReferentiel,
			custom,
			preferences,
			features,
			savingType,
			autoSuggesterLoading,
			onChange,
		}),
		[
			getReferentiel,
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
		pager,
	} = useLunatic(source, data, args);

	useEffect(() => {
		(
			document
				.getElementById('stromae-form')
				?.getElementsByTagName('legend')[0] as HTMLElement
		)?.focus();
	}, [pager]);

	const defaultTitle = metadata?.Header?.serviceTitle;
	useQuestionnaireTitle({
		source,
		page: pager.page,
		defaultTitle:
			typeof defaultTitle === 'string' ? defaultTitle : 'Enquête Insee',
	});

	const collectStatus = state ?? CollectStatusEnum.Init;
	useRedirectIfAlreadyValidated(collectStatus);

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
				pageFromAPI={pageFromAPI}
				personalization={personalizationMap}
				collectStatus={collectStatus}
			>
				{children}
			</CloneElements>
		</Provider>
	);
}
