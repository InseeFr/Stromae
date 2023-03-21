import {
	PropsWithChildren,
	cloneElement,
	useRef,
	useEffect,
	ReactElement,
} from 'react';
import { OrchestratedElement, OrchestratorProps } from './Orchestrator';

const SAVING_STRATEGY = process.env.REACT_APP_SAVING_STRATEGY || 'partial';
const SAVING_TIME = process.env.REACT_APP_SAVING_TIME || 'page';

type SavingType = {
	children: Array<ReactElement<OrchestratedElement>>;
} & OrchestratedElement;

export function Saving(props: SavingType) {
	const { getData, getComponents } = props; // save complete/save on sequence
	const changes = useRef<Record<string, unknown>>({});

	const { children } = props;
	if (children) {
		children.map(function (component) {
			return cloneElement(component, { ...props });
		});
	}

	return null;
}
