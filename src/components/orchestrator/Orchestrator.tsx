import { JSXElementConstructor, ReactElement } from 'react';
import { PropsWithChildren } from 'react';
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
};

/**
 * Type pour tous les enfants de Orchestrator, qui vont recevoir les fonctions
 * générées par useLunatic.
 */
export type OrchestratedElement = {
	readonly getComponents?: () => Array<ComponentType>;
	readonly goPreviousPage?: () => void;
	readonly goNextPage?: (arg?: { block: boolean }) => void;
	readonly goToPage?: () => void;
	getErrors?: () => Record<string, Record<string, Array<LunaticError>>>;
	getModalErrors?: () => Record<string, Array<LunaticError>>;
	readonly getCurrentErrors?: () => Record<string, Array<LunaticError>>;
	// pageTag,
	readonly isFirstPage?: boolean;
	readonly isLastPage?: boolean;
	// pager,
	// waiting,
	readonly onChange?: (...args: any) => void;
	readonly getData?: () => any;
	readonly activeControls?: boolean;
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
}: PropsWithChildren<OrchestratorProps>) {
	return (
		<LoadSourceData onChange={onChange} activeControls={activeControls}>
			<UseLunatic>
				<Controls>{children}</Controls>
			</UseLunatic>
		</LoadSourceData>
	);
}
