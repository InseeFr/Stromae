import { Alert } from '@codegouvfr/react-dsfr/Alert';
import { OrchestratedElement } from '../orchestrator';

export function AlertesSaving(props: OrchestratedElement) {
	const { savingFailure } = props;
	if (savingFailure) {
		const { status } = savingFailure;
		if (status === 500) {
			return (
				<Alert
					className="fr-mb-3w"
					closable
					description="Vos données n'ont pu être sauvegardées, veuillez réessayer ou contacter l'assistance."
					severity="error"
					title="Une erreur est survenue lors de la sauvegarde de vos données"
				/>
			);
		}
	}
	return null;
}
