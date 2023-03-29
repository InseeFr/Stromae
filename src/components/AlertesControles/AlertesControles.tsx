import { fr } from '@codegouvfr/react-dsfr';
import { OrchestratedElement } from '../orchestrator/Orchestrator';

export function AlertesControles(props: OrchestratedElement) {
	const { currentErrors, criticality } = props;
	const type = criticality ? 'fr-alert--error' : 'fr-alert--warning';
	if (currentErrors) {
		const content = Object.values(currentErrors)
			.flat()
			.map(function ({ errorMessage, id }) {
				return (
					<div key={id} className="message-error">
						{errorMessage}
					</div>
				);
			});
		return (

			<div className={`${fr.cx('fr-alert', type)} fr-mb-3w`}>
				<h3 className={fr.cx('fr-alert__title')}>Il y a un problème</h3>
				{content}
			</div>

		);
	}
	return null;
}
