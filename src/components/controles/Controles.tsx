import { OrchestratedElement } from '../orchestrator';

/**
 * Display lunatic controls.
 * @param props
 * @returns
 */
export function Controles(props: OrchestratedElement) {
	const { getModalErrors } = props;
	if (typeof getModalErrors === 'function') {
		// const modalErrors = getModalErrors();
	}
	return <></>;
}
