import {
	PropsWithChildren,
	cloneElement,
	useRef,
	useEffect,
	ReactElement,
} from 'react';
import { CloneElements } from './CloneElements';
import { OrchestratedElement, OrchestratorProps } from './Orchestrator';

const SAVING_STRATEGY = process.env.REACT_APP_SAVING_STRATEGY || 'partial';
const SAVING_TIME = process.env.REACT_APP_SAVING_TIME || 'page';

export function Saving(props: PropsWithChildren<OrchestratedElement>) {
	const { children, ...rest } = props;
	const { getData, getComponents } = props; // save complete/save on sequence
	const changes = useRef<Record<string, unknown>>({});

	return <CloneElements {...rest}>{children}</CloneElements>;
}
