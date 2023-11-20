import { useEffect, ReactNode, useState } from 'react';
import { fr } from '@codegouvfr/react-dsfr';
import { OrchestratedElement } from '../../typeStromae/type';
import { ComponentType } from '../../typeLunatic/type-source';

function ErrorMessage({ errorMessage }: { errorMessage: ReactNode }) {
	if (errorMessage && Array.isArray(errorMessage)) {
		return (
			<>
				{errorMessage.map((message, i) => {
					return <p key={i}>{message}</p>;
				})}
			</>
		);
	}
	return <>{errorMessage}</>;
}

function checkIfIsRoundAbout(components?: ComponentType[]) {
	if (Array.isArray(components)) {
		return components.reduce(
			(status, { componentType }) => status || componentType === 'Roundabout',
			false
		);
	}
	return true;
}

export function AlertesControles(props: OrchestratedElement) {
	const { currentErrors, criticality, getComponents } = props;
	const type = criticality ? 'fr-alert--error' : 'fr-alert--warning';
	const [isInRoundabout, setIsRoundabout] = useState(false);

	useEffect(() => {
		if (currentErrors) {
			document.getElementById('alert-errors')?.focus();
		}
	}, [currentErrors]);

	useEffect(() => {
		const components = getComponents?.();
		setIsRoundabout(checkIfIsRoundAbout(components));
	}, [getComponents]);

	if (currentErrors && isInRoundabout) {
		const content = Object.values(currentErrors)
			.flat()
			.map(({ errorMessage, id }) => {
				return (
					<div key={id} className="message-error" id="alertText">
						<ErrorMessage errorMessage={errorMessage} />
					</div>
				);
			});

		return (
			<div
				aria-labelledby="alertHeading"
				aria-describedby="alertText"
				id="alert-errors"
				className={fr.cx('fr-alert', type, 'fr-mb-3w')}
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
