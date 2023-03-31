import { JSXElementConstructor, ReactElement, PropsWithChildren } from 'react';
import { LunaticSource } from '../../typeLunatic/type-source';
import { OrchestratedElement, SurveyUnitData } from '../../typeStromae/type';
import { LoadSourceData } from './LoadSourceData';
import { UseLunatic } from './UseLunatic';
import { Controls } from './Controls';
import { Saving } from './Saving';

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
