import { Notice } from '@codegouvfr/react-dsfr/Notice';

export function Banner() {
	return (
		<Notice
			isClosable
			onClose={function noRefCheck() {}}
			title="Vos réponses sont sauvegardées après chaque question. Vous pouvez ainsi revenir sur le questionnaire ultérieurement. N’oubliez pas d’envoyer votre questionnaire une fois qu’il sera complété."
		/>
	);
}
