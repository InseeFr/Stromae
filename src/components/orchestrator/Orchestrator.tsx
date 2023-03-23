import { JSXElementConstructor, ReactElement, PropsWithChildren } from 'react';
import {
	LunaticSource,
	ComponentType,
	LunaticError,
} from '../../typeLunatic/type-source';
import { SurveyUnitData } from '../../typeStromae/type';
import { LoadSourceData } from './LoadSourceData';
import { UseLunatic } from './UseLunatic';
import { Controls } from './Controls';

export type OrchestratorProps = {
	source?: LunaticSource;
	surveyUnitData?: SurveyUnitData;
	suggesterFetcher?: any;
	onChange?: (...args: any) => void;
	getReferentiel?: (name: string) => Promise<Array<unknown>>;
	activeControls?: boolean;
	autoSuggesterLoading?: boolean;
	features?: Array<string>;
	preferences?: Array<string>;
	savingType?: string;
};

/**
 * Type pour tous les enfants de Orchestrator, qui vont recevoir les fonctions
 * générées par useLunatic.
 */
export type OrchestratedElement = {
	// useLunatic interface
	readonly getComponents?: () => Array<ComponentType>;
	readonly goPreviousPage?: () => void;
	readonly goNextPage?: (arg?: { block: boolean }) => void;
	readonly goToPage?: () => void;
	readonly getErrors?: () => Record<
		string,
		Record<string, Array<LunaticError>>
	>;
	readonly getModalErrors?: () => Record<string, Array<LunaticError>>;
	readonly getCurrentErrors?: () => Record<string, Array<LunaticError>>;
	readonly isFirstPage?: boolean;
	readonly isLastPage?: boolean;
	readonly onChange?: (...args: any) => void;
	readonly getData?: () => any;
	readonly activeControls?: boolean;
	readonly compileControls?: () => void;
	// controls errors
	modalErrors?: Array<LunaticError>;
	currentErrors?: Record<string, Array<LunaticError>>;
	criticality?: boolean;
	pageTag?: string;
};

/**
 * Element with a child of type OrchestratedElement
 */
export type NestedOrchestratedElement<T> = {
	children: ReactElement<OrchestratedElement, JSXElementConstructor<T>>;
} & T;

export function Orchestrator({
	children,
	onChange,
	activeControls,
	features,
	preferences,
	autoSuggesterLoading,
}: PropsWithChildren<OrchestratorProps>) {
	return (
		<LoadSourceData onChange={onChange} activeControls={activeControls}>
			<UseLunatic
				features={features}
				preferences={preferences}
				autoSuggesterLoading={autoSuggesterLoading}
			>
				<Controls>{children}</Controls>
			</UseLunatic>
		</LoadSourceData>
	);
}
