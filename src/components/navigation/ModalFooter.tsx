import { ButtonsGroup } from '@codegouvfr/react-dsfr/ButtonsGroup';
import { Button } from '@codegouvfr/react-dsfr/Button';

type ModalFooterType = {
	critical?: boolean;
	onClose: () => void;
	onSkip: () => void;
};

function ButtonBar(props: ModalFooterType) {
	const { critical, onClose, onSkip } = props;

	if (critical !== undefined) {
		if (critical) {
			return <Button onClick={onClose}>Corriger</Button>;
		}
	}
	return null;
}

export function ModalFooter(props: ModalFooterType) {
	const { critical, onClose, onSkip } = props;

	return (
		<div className="fr-modal__footer">
			<ButtonBar critical={critical} onClose={onClose} onSkip={onSkip} />
		</div>
	);
}

/* <ButtonsGroup
				buttons={[
					{
						children: 'Button 1 label',
						iconId: 'fr-icon-git-commit-fill',
						linkProps: {
							href: '#',
						},
					},
				]}
			/> */
