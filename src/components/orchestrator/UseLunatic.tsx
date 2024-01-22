import { useLunatic } from '@inseefr/lunatic';
import * as custom from '@inseefr/lunatic-dsfr';
import {
	PropsWithChildren,
	useCallback,
	useEffect,
	useMemo,
	useRef,
	useState,
} from 'react';
import { usePrevious } from '../../lib/commons/usePrevious';
import {
	CollectStatusEnum,
	OrchestratedElement,
	PersonalizationElement,
	SavingFailure,
} from '../../typeStromae/type';
import { CloneElements } from './CloneElements';
import { OrchestratorProps } from './Orchestrator';
import { useQuestionnaireTitle } from './useQuestionnaireTitle';
import { useRedirectIfAlreadyValidated } from './useRedirectIfAlreadyValidated';
import { useSaving } from './useSaving';

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
	const [waiting, setWaiting] = useState(false);
	const [failure, setFailure] = useState<SavingFailure>();
	const [currentChange, setCurrentChange] = useState<{ name: string }>();
	const { data, stateData, personalization = [] } = surveyUnitData ?? {};
	const personalizationMap = useMemo<
		Record<string, string | number | boolean | Array<string>>
	>(() => createPersonalizationMap(personalization), [personalization]);
	const { currentPage: pageFromAPI, state } = stateData ?? {};
	const [refreshControls, setRefreshControls] = useState(false);
	const shouldSync = useRef(false);
	const initialCollectStatus = state ?? CollectStatusEnum.Init;

	useRedirectIfAlreadyValidated(initialCollectStatus);

	const { listenChange, saveChange } = useSaving({
		setWaiting,
		setFailure,
		initialCollectStatus,
	});

	const onChange = useCallback(
		({ name }: { name: string }, value: unknown) => {
			listenChange(name, value);
			setCurrentChange({ name });
			setRefreshControls(true);
		},
		[listenChange]
	);

	useEffect(() => {
		setArgs({
			getReferentiel,
			custom,
			preferences,
			features,
			savingType,
			autoSuggesterLoading,
			workersBasePath: `${window.location.origin}/workers`,
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

	// Gestion de la sauvegarde : tout ce qui était dans le composant Save
	const previousPageTag = usePrevious(pageTag);
	const isNewPage =
		pageTag !== undefined &&
		previousPageTag !== undefined &&
		previousPageTag !== pageTag;

	const handleGoNext = useCallback(() => {
		shouldSync.current = true;
		goNextPage?.();
	}, [goNextPage]);

	const handleGoBack = useCallback(() => {
		shouldSync.current = true;
		goPreviousPage?.();
	}, [goPreviousPage]);

	if (isNewPage && shouldSync.current) {
		shouldSync.current = false;
		saveChange({ pageTag, getData });
	}
	return (
		<Provider>
			<CloneElements<OrchestratedElement>
				compileControls={compileControls}
				getComponents={getComponents}
				goPreviousPage={handleGoBack}
				goNextPage={handleGoNext}
				isFirstPage={isFirstPage}
				isLastPage={isLastPage}
				goToPage={goToPage}
				getData={getData}
				pageTag={pageTag}
				disabled={disabled}
				pageFromAPI={pageFromAPI}
				personalization={personalizationMap}
				initialCollectStatus={initialCollectStatus}
				refreshControls={refreshControls}
				setRefreshControls={setRefreshControls}
				waiting={waiting}
				savingFailure={failure}
				currentChange={currentChange}
			>
				{children}
			</CloneElements>
		</Provider>
	);
}
