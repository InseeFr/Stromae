import { OrchestratedElement } from '../../typeStromae/type';
import { ComponentsRenderer } from '../ComponentsRenderer';
import { makeStyles } from '@codegouvfr/react-dsfr/tss';
import { Content } from '../skeleton/Content';

type Props = Pick<
	OrchestratedElement,
	'currentErrors' | 'disabled' | 'getComponents' | 'waiting'
>;

const useStyles = makeStyles()({
	root: {
		'+ .lunatic-component-with-dsfr': {
			marginBottom: '2rem',
		},
	},
});

export function Formulaire(props: Props) {
	const { getComponents, currentErrors, disabled = false, waiting } = props;
	const { classes, cx } = useStyles();
	if (waiting) {
		return <Content />;
	}
	return (
		<form id="stromae-form" className={cx(classes.root)}>
			<ComponentsRenderer
				getComponents={getComponents}
				currentErrors={currentErrors}
				disabled={disabled}
				except={['QuestionExplication', 'ConfirmationModal']}
			/>
		</form>
	);
}
