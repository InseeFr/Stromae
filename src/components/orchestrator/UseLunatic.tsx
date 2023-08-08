import { useEffect, useState, PropsWithChildren, useCallback } from 'react';
import { useLunatic } from '@inseefr/lunatic';
import * as custom from '@inseefr/lunatic-dsfr';
import {
	OrchestratedElement,
	PersonalizationElement,
} from '../../typeStromae/type';
import { OrchestratorProps } from './Orchestrator';
import { CloneElements } from './CloneElements';

function createPersonalizationMap(
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
	} = props;
	const [args, setArgs] = useState<Record<string, unknown>>({});
	const [personalizationMap, setPersonalizationMap] = useState<
		Record<string, string>
	>({});
	const {
		data,
		stateData = { currentPage: '1' },
		personalization = [],
	} = surveyUnitData ?? {};
	const { currentPage } = stateData;
	const [currentChange, setCurrentChange] = useState<{ name: string }>();

	const onChange = useCallback(({ name }: { name: string }, value: unknown) => {
		setCurrentChange({ name });
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
				disabled={disabled}
				currentPage={currentPage}
				personalization={personalizationMap}
			>
				{children}
			</CloneElements>
		</Provider>
	);
}
