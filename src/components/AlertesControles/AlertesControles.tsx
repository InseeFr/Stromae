import { useEffect } from 'react';
import { fr } from '@codegouvfr/react-dsfr';

import { OrchestratedElement } from '../../typeStromae/type';

export function AlertesControles(props: OrchestratedElement) {
	const { currentErrors, criticality } = props;
	const type = criticality ? 'fr-alert--error' : 'fr-alert--warning';

	useEffect(
		() => {
			if (currentErrors) {
				document.getElementById('alert-errors')?.focus();
			}
		},
		[currentErrors]
	);

	if (currentErrors) {
		const content = Object.values(currentErrors)
			.flat()
			.map(({ errorMessage, id }) => {
				return (
					<div key={id} className="message-error">
						{errorMessage}
					</div>
				);
			});

		return (
			<div
				id="alert-errors"
				className={`${fr.cx('fr-alert', type)} fr-mb-3w`}
				tabIndex={-1}
			>
				<h3 className={fr.cx('fr-alert__title')}>Il y a un problème</h3>
				{content}
			</div>
		);
	}
	return null;
}
