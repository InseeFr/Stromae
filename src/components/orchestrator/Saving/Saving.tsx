import { PropsWithChildren } from 'react';
import { OrchestratedElement } from '../../../typeStromae/type';
import { SaveOnPage } from './SaveOnPage';
import { SaveOnSequence } from './SaveOnSequence';
import { CloneElements } from '../CloneElements';

// or sequence
export const SAVING_TIME = process.env.REACT_APP_SAVING_TIME || 'page';

export function Saving(props: PropsWithChildren<OrchestratedElement>) {
	const { children, ...rest } = props;
	const { readOnly } = rest;

	if (readOnly) {
		return (
			<CloneElements<OrchestratedElement> {...rest}>{children}</CloneElements>
		);
	}
	if (SAVING_TIME === 'sequence') {
		return <SaveOnSequence {...rest}>{children}</SaveOnSequence>;
	}
	return <SaveOnPage {...rest}>{children}</SaveOnPage>;
}
