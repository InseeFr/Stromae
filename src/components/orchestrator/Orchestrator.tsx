import { useEffect, useState } from 'react';
import { useLunatic } from '@inseefr/lunatic';
import { cloneElement, PropsWithChildren } from 'react';
import {
	LunaticSource,
	ComponentType,
	LunaticError,
} from '../../typeLunatic/type-source';
import { SurveyUnitData } from '../../typeStromae/type';

export type OrchestratorProps = {
	source?: LunaticSource;
	surveyUnitData?: SurveyUnitData;
	suggesterFetcher?: any;
	onChange?: (...args: any) => void;
	getReferentiel: (name: string) => Promise<Array<unknown>>;
};

/**
 * Type pour tous les enfants de Orchestrator, qui vont recevoir les fonctions
 * générées par useLunatic.
 */
export type OrchestratedElement = {
	readonly getComponents?: () => Array<ComponentType>;
	readonly goPreviousPage?: () => void;
	readonly goNextPage?: () => void;
	readonly goToPage?: () => void;
	// getErrors,
	// getModalErrors,
	readonly getCurrentErrors?: () => Array<LunaticError>;
	// pageTag,
	readonly isFirstPage?: boolean;
	readonly isLastPage?: boolean;
	// pager,
	// waiting,
	readonly onChange?: (...args: any) => void;
	readonly getData?: () => any;
};

/**
 * Provider pas encore à dispo dans la version en ligne de lunatic.
 * @param param0
 * @returns
 */
function MockProvider({ children }: { children?: PropsWithChildren<{}> }) {
	return <>{children}</>;
}

export function Orchestrator(props: PropsWithChildren<OrchestratorProps>) {
	const { source, surveyUnitData, children, onChange, getReferentiel } = props;
	const [args, setArgs] = useState({ onChange, getReferentiel });
	const { data } = surveyUnitData || {};
	useEffect(
		function () {
			setArgs({ onChange, getReferentiel });
		},
		[onChange, getReferentiel]
	);

	const {
		getComponents,
		goPreviousPage,
		goNextPage,
		isFirstPage,
		isLastPage,
		goToPage,
		getCurrentErrors,
		getData,
		Provider = MockProvider,
	} = useLunatic(source, data, args);

	if (children) {
		const effective = Array.isArray(children) ? children : [children];

		return (
			<Provider>
				{effective.map(function (element, key) {
					return cloneElement(
						element as React.ReactElement<OrchestratedElement>,
						{
							getComponents,
							goPreviousPage,
							goNextPage,
							isFirstPage,
							isLastPage,
							goToPage,
							getCurrentErrors,
							key,
							getData,
							onChange,
						}
					);
				})}
			</Provider>
		);
	}
	return null;
}
