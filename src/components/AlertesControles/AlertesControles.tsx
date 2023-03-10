import { fr } from '@codegouvfr/react-dsfr';
import { OrchestratedElement } from '../orchestrator/Orchestrator';

export function AlertesControles(props: OrchestratedElement) {
	const { modalErrors, criticality } = props;
	const type = criticality ? 'fr-alert--error' : 'fr-alert--warning';
	if (modalErrors) {
		return (
			<div className={fr.cx('fr-alert', type)}>
				<h3 className="fr-alert__title">Il y a un problème</h3>
				<p>Les erreurs à afficher</p>
			</div>
		);
	}
	return null;
}
