import { makeStyles } from '@codegouvfr/react-dsfr/tss';
import { OrchestratedElement } from '../../typeStromae/type';
import { ComponentsRenderer } from '../ComponentsRenderer';
import { Form } from '../skeleton/Form';

type Props = Pick<
	OrchestratedElement,
	'currentErrors' | 'disabled' | 'getComponents' | 'waiting' | 'pageTag'
>;

const useStyles = makeStyles()({
	root: {
		'+ .lunatic-component-with-dsfr': {
			marginBottom: '2rem',
		},
	},
});

export function Formulaire(props: Props) {
	const {
		getComponents,
		currentErrors,
		disabled = false,
		waiting,
		pageTag,
	} = props;
	const { classes, cx } = useStyles();
	if (waiting) {
		return <Form />;
	}
	return (
		<form id="stromae-form" className={cx(classes.root)}>
			<ComponentsRenderer
				focusKey={pageTag}
				getComponents={getComponents}
				currentErrors={currentErrors}
				disabled={disabled}
				except={['QuestionExplication', 'ConfirmationModal']}
			/>
		</form>
	);
}
