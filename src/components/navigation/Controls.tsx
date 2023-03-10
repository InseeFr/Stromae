import { fr } from '@codegouvfr/react-dsfr';
import { cloneElement } from 'react';
import { LunaticError } from '../../typeLunatic/type-source';
import { OrchestratedElement } from '../orchestrator';
import { NestedOrchestratedElement } from '../orchestrator/Orchestrator';

export enum CriticalityEnum {
	FORMAT = 'FORMAT',
	ERROR = 'ERROR',
	WARN = 'WARN',
}

function flatErrors(errors: Record<string, Array<LunaticError>> | null) {
	if (errors) {
		return Object.values(errors).flat();
	}
}

function getCriticality(errors?: Array<LunaticError>) {
	if (errors) {
		return errors.reduce(function (status, { criticality, typeOfControl }) {
			return (
				status ||
				(typeOfControl === CriticalityEnum.FORMAT &&
					criticality.startsWith(CriticalityEnum.ERROR))
			);
		}, false);
	}
	return false;
}

function AlertErrors({
	errors,
	criticality,
}: {
	errors?: Array<LunaticError>;
	criticality: boolean;
}) {
	if (errors) {
		return (
			<div className={fr.cx('fr-alert', 'fr-alert--error')}>
				<h3 className="fr-alert__title">Erreur : titre du message</h3>
				<p>Les erreurs à afficher</p>
			</div>
		);
	}
	return null;
}

/**
 *
 * @param props
 * @returns
 */
export function Controls(
	props: NestedOrchestratedElement<OrchestratedElement>
) {
	const {
		children,
		getModalErrors = () => null,
		goNextPage = () => null,
		goPreviousPage = () => null,
	} = props;

	const modalErrors = flatErrors(getModalErrors());
	const criticality = getCriticality(modalErrors);

	function skip() {
		goNextPage({ block: true });
	}

	return (
		<>
			<AlertErrors errors={modalErrors} criticality={criticality} />
			{cloneElement(children, {
				goNextPage: modalErrors && criticality ? skip : goNextPage,
				goPreviousPage,
				modalErrors,
				criticality,
			})}
		</>
	);
}
