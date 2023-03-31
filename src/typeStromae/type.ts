import type {
	LunaticData,
	LunaticError,
	LunaticVariable,
} from '../typeLunatic/type';
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

export type DataVariables = Record<string, LunaticVariable>;

export type VariablesType = {
	EXTERNAL: Record<string, LunaticVariable & { variableType: 'EXTERNAL' }>;
	COLLECTED: Record<string, LunaticVariable & { variableType: 'COLLECTED' }>;
	CALCULATED: Record<string, LunaticVariable & { variableType: 'CALCULATED' }>;
};

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
	currentErrors?: Record<string, Array<LunaticError>>;
	criticality?: boolean;
	// handleChange
	currentChange?: { name: string };
	// saving
	savingFailure?: SavingFailure;
};

export type QuestionnaireParams = {
	survey: string;
	unit?: string;
};
