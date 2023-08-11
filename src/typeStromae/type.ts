import type { LunaticData, LunaticError } from '../typeLunatic/type';
import { ComponentType } from '../typeLunatic/type-source';
import { HeaderType } from '../components/Header/HeaderType';
import { FooterType } from '../components/footer/FooterType';

export type StateData = {
	// 'INIT' | 'COMPLETED' | 'VALIDATED' | 'TOEXTRACT' | 'EXTRACTED' | null;
	state?: string | null;
	date: number;
	currentPage: string;
};

export type PersonalizationElement = {
	name: string | 'bannerLabel';
	value: string | number | boolean;
};

export type SurveyUnitData = {
	data: LunaticData;
	stateData: StateData;
	personalization: Array<PersonalizationElement>;
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

export enum CollectStatusEnum {
	Init = 'INIT',
	Completed = 'COMPLETED',
	Validated = 'VALIDATED',
}

export type OrchestratedElement = {
	// useLunatic interface
	readonly getComponents?: (arg?: {
		only?: string[];
		except?: string[];
	}) => Array<ComponentType>;
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
	personalization?: Record<string, string | number | boolean>;
	// controls errors
	currentErrors?: Record<string, Array<LunaticError>>;
	criticality?: boolean;
	// handleChange
	currentChange?: { name: string };
	// saving
	savingFailure?: SavingFailure;
	waiting?: boolean;
	// disabled all components
	disabled?: boolean;
	// dernière page sauvegardé, obtenu par l'API (!= de pageTag)
	currentPage?: string;
	// etat du questionnaire fournit par l'API ('INIT' | 'COLLECTED' | 'VALIDATED')
	collectStatus?: string | null;
	only?: string[];
	except?: string[];
	title?: string;
};

export type QuestionnaireParams = {
	survey: string;
	unit?: string;
};

export type LinkType = {
	title: string;
	link: Record<string, string>;
};

export type SubmitType = {
	DescriptionAdditional: string;
	TitleAdditionalInformation: string;
	Feedback: LinkType;
	Results: LinkType;
};

export interface MetadataSurvey {
	Header: HeaderType;
	Footer: FooterType;
	Submit: SubmitType;
}
