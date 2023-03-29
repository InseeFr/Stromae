import { Alert } from '@codegouvfr/react-dsfr/Alert';
import { OrchestratedElement } from '../orchestrator';

export function AlertesSaving(props: OrchestratedElement) {
	const { savingFailure } = props;
	if (savingFailure) {
		const { status } = savingFailure;
		if (status === 200) {
			return (
				<Alert
					closable
					description="Vos données sont sauvegardées."
					severity="info"
					small
				/>
			);
		}
		if (status === 500) {
			return (
				<Alert
					closable
					description="Vos données n'ont put être saugardées..."
					severity="error"
					title="Une erreur est survenue lors de la sauvegarde de vos données"
				/>
			);
		}
	}
	return null;
}
