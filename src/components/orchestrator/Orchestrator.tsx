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
import { Saving } from './Saving';
import type { LunaticVariable } from '../../typeLunatic/type';

export type VariablesType = {
	EXTERNAL: Record<string, LunaticVariable & { variableType: 'EXTERNAL' }>;
	COLLECTED: Record<string, LunaticVariable & { variableType: 'COLLECTED' }>;
	CALCULATED: Record<string, LunaticVariable & { variableType: 'CALCULATED' }>;
};

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
	readonly getData?: (refreshCalculated: boolean) => VariablesType;
	readonly activeControls?: boolean;
	readonly compileControls?: () => {
		isCritical: boolean;
		currentErrors?: Record<string, Array<LunaticError>>;
	};
	// controls errors
	modalErrors?: Array<LunaticError>;
	currentErrors?: Record<string, Array<LunaticError>>;
	criticality?: boolean;
	currentChange?: { name: string };
};

/**
 * Element with a child of type OrchestratedElement
 */
export type NestedOrchestratedElement<T> = {
	children: ReactElement<OrchestratedElement, JSXElementConstructor<T>>;
} & T;

export function Orchestrator({
	children,
	activeControls,
	features,
	preferences,
	autoSuggesterLoading,
}: PropsWithChildren<OrchestratorProps>) {
	return (
		<LoadSourceData activeControls={activeControls}>
			<UseLunatic
				features={features}
				preferences={preferences}
				autoSuggesterLoading={autoSuggesterLoading}
			>
				<Controls>
					<Saving>{children}</Saving>
				</Controls>
			</UseLunatic>
		</LoadSourceData>
	);
}
