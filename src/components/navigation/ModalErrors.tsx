import { useEffect, useState } from 'react';
import { LunaticError } from '../../typeLunatic/type-source';
import { ModalHeader } from './ModalHeader';
import { ModalFooter } from './ModalFooter';
import { ModalContainer } from './ModalContainer';
import { ModalContent } from './ModalContent';

type ErrorsType = {
	display: boolean;
	errors?: Array<LunaticError>;
	onClose: () => void;
	onSkip: () => void;
};

export enum CriticalityEnum {
	FORMAT = 'FORMAT',
	ERROR = 'ERROR',
}

function getCriticality(errors: Array<LunaticError>) {
	return errors.reduce(function (status, { criticality, typeOfControl }) {
		return (
			status ||
			(typeOfControl === CriticalityEnum.FORMAT &&
				criticality === CriticalityEnum.ERROR)
		);
	}, false);
}

export function ModalErrors(props: ErrorsType) {
	const { display, errors, onClose, onSkip } = props;
	const [criticality, setCriticality] = useState<boolean>();

	useEffect(
		function () {
			if (errors) {
				setCriticality(getCriticality(errors));
			}
		},
		[errors]
	);

	if (display) {
		return (
			<ModalContainer>
				<ModalHeader onClose={onClose} />
				<ModalContent />
				<ModalFooter critical={criticality} onSkip={onSkip} onClose={onClose} />
			</ModalContainer>
		);
	}
	return <></>;
}
