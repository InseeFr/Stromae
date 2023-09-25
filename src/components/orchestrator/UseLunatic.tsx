import { useEffect, useState, PropsWithChildren, useCallback } from 'react';
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

export function createPersonalizationMap(
	personalization: Array<PersonalizationElement>
) {
	return personalization.reduce((acc, { name, value }) => {
		return { ...acc, [name]: value };
	}, {});
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
	const [args, setArgs] = useState<Record<string, unknown>>({});

	const [personalizationMap, setPersonalizationMap] = useState<
		Record<string, string | number | boolean | Array<string>>
	>({});
	const { data, stateData, personalization = [] } = surveyUnitData ?? {};
	const { currentPage: pageFromAPI, state } = stateData ?? {};
	const [currentChange, setCurrentChange] = useState<{ name: string }>();
	const [handleChangeCalled, setHandleChangeCalled] = useState(false);

	const onChange = useCallback(({ name }: { name: string }, value: unknown) => {
		setCurrentChange({ name });
		setHandleChangeCalled(true);
	}, []);

	useEffect(() => {
		setPersonalizationMap(createPersonalizationMap(personalization));
	}, [personalization]);

	useEffect(() => {
		setArgs({
			getReferentiel,
			custom,
			preferences,
			features,
			savingType,
			autoSuggesterLoading,
			onChange,
		});
	}, [
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
				handleChangeCalled={handleChangeCalled}
				setHandleChangeCalled={setHandleChangeCalled}
			>
				{children}
			</CloneElements>
		</Provider>
	);
}
