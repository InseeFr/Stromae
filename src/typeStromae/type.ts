import type { LunaticData, LunaticError } from '../typeLunatic/type';
import { ComponentType } from '../typeLunatic/type-source';

export type StateData = {
	state: string | null; //'INIT' | 'COMPLETED' | 'VALIDATED' | 'TOEXTRACT' | 'EXTRACTED' | null;
	date: number;
	currentPage: string;
};

export type SurveyUnitData = {
	data: LunaticData;
	stateData: StateData;
	personalization?: unknown;
};

export type SavingFailure = { status: 200 | 400 | 500 };

export type DataVariables = Record<string, unknown>;

type VariableValue = {
	EDITED: unknown;
	FORCED: unknown;
	PREVIOUS: unknown;
	COLLECTED: unknown;
};

export type VariablesType = {
	EXTERNAL: Record<string, VariableValue>;
	COLLECTED: Record<string, VariableValue>;
	CALCULATED: Record<string, VariableValue>;
};

export type OrchestratedElement = {
	// useLunatic interface
	readonly getComponents?: () => Array<ComponentType>;
	readonly goPreviousPage?: () => void;
	readonly goNextPage?: (arg?: { block: boolean }) => void;
	readonly goToPage?: (page: { page: string; iteration?: number }) => void;
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
	readonly compileControls?: () => {
		isCritical: boolean;
		currentErrors?: Record<string, Array<LunaticError>>;
	};
	readonly pageTag?: string;
	// controls errors
	currentErrors?: Record<string, Array<LunaticError>>;
	criticality?: boolean;
	// handleChange
	currentChange?: { name: string };
	// saving
	savingFailure?: SavingFailure;
	// disabled all components
	disabled?: boolean;
	currentPage?: string;
};

export type QuestionnaireParams = {
	survey: string;
	unit?: string;
};
