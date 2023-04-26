import { useEffect } from 'react';
import { fr } from '@codegouvfr/react-dsfr';

import { OrchestratedElement } from '../../typeStromae/type';

export function AlertesControles(props: OrchestratedElement) {
	const { currentErrors, criticality } = props;
	const type = criticality ? 'fr-alert--error' : 'fr-alert--warning';

	useEffect(() => {
		if (currentErrors) {
			document.getElementById('alert-errors')?.focus();
		}
	}, [currentErrors]);

	if (currentErrors) {
		const content = Object.values(currentErrors)
			.flat()
			.map(({ errorMessage, id }) => {
				return (
					<div key={id} className="message-error" id="alertText">
						{errorMessage}
					</div>
				);
			});

		return (
			<div
				aria-labelledby="alertHeading"
				aria-describedby="alertText"
				id="alert-errors"
				className={`${fr.cx('fr-alert', type)} fr-mb-3w`}
				role="alert"
				tabIndex={-1}
			>
				<h3 id="alertHeading" className={fr.cx('fr-alert__title')}>
					Il y a un problème
				</h3>
				{content}
			</div>
		);
	}
	return null;
}
