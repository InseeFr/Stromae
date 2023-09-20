import type { LunaticData, LunaticError } from '../typeLunatic/type';
import { ComponentType } from '../typeLunatic/type-source';
import { HeaderType } from '../components/Header/HeaderType';
import { FooterType } from '../components/footer/FooterType';

export enum CollectStatusEnum {
	Init = 'INIT',
	Completed = 'COMPLETED',
	Validated = 'VALIDATED',
}

export type StateData = {
	// 'INIT' | 'COMPLETED' | 'VALIDATED' | 'TOEXTRACT' | 'EXTRACTED' | null;
	state?: CollectStatusEnum | null;
	date: number;
	currentPage: string;
};

export type PersonalizationElement = {
	name: string | 'bannerLabel' | 'bannerLabelDependencies';
	value: string | number | boolean | Array<string>;
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
	personalization?: Record<string, string | number | boolean | Array<string>>;
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
	// Page given by API.getSuData at launch
	pageFromAPI?: string;
	// last status of survey, give by the API ('INIT' | 'COLLECTED' | 'VALIDATED')
	collectStatus?: CollectStatusEnum;
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

/*
 * MetadataSurvey avec ses types compatibles pour composer des pages optionnelles.
 */

export enum OptionalPageElementsEnum {
	Link = 'link',
	Title = 'title',
	Section = 'section',
	List = 'list',
}

export type OptionalPageElement = {
	type: OptionalPageElementsEnum;
	id?: string;
	className?: string;
};

export type SectionElement = OptionalPageElement & {
	type: OptionalPageElementsEnum.Section;
	title: string;
	paragraphs: Array<string> | string;
};

export type TitleElement = OptionalPageElement & {
	type: OptionalPageElementsEnum.Title;
	title: string;
};

export type LinkElement = OptionalPageElement & {
	type: OptionalPageElementsEnum.Link;
	content: string;
	href: string;
	title: string;
	target?: string;
};

export type ListElement = OptionalPageElement & {
	type: OptionalPageElementsEnum.List;
	items: Array<AcceptedElements & { element?: AcceptedElements }>;
};

export type AcceptedElements =
	| TitleElement
	| LinkElement
	| ListElement
	| SectionElement;

export type OptionalPage = Array<AcceptedElements>;

export type MetadataSurvey = {
	Header: HeaderType;
	Footer: FooterType;
	Submit: SubmitType;
	redirections: Record<string, string>;
	errorPage: Record<string, string>;
} & { optionalPages: Record<string, OptionalPage> };
