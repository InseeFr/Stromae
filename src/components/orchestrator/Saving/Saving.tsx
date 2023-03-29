import { PropsWithChildren } from 'react';
import { OrchestratedElement } from '../Orchestrator';
import { SaveOnPage } from './SaveOnPage';
import { SaveOnSequence } from './SaveOnSequence';

export const SAVING_TIME = process.env.REACT_APP_SAVING_TIME || 'page'; // or sequence

export function Saving(props: PropsWithChildren<OrchestratedElement>) {
	const { children, ...rest } = props;

	if (SAVING_TIME === 'sequence') {
		return <SaveOnSequence {...rest}>{children}</SaveOnSequence>;
	}
	return <SaveOnPage {...rest}>{children}</SaveOnPage>;
}
