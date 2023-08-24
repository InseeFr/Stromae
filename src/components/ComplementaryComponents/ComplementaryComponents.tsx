import { OrchestratedElement } from '../../typeStromae/type';
import { ComponentsRenderer } from '../ComponentsRenderer';
import { makeStyles } from 'tss-react/dsfr';

const useStyles = makeStyles()({
	root: {
		padding: 0,
		'+ .lunatic-component-with-dsfr': {
			marginBottom: 0,
		},
	},
});

/**
 * Components displayed at the bottom of the page
 * For instance QuestionExplication to show more detail about a question
 */
export function ComplementaryComponents(props: OrchestratedElement) {
	const { getComponents, currentErrors, disabled = false } = props;
	const { classes, cx } = useStyles();
	const only = ['QuestionExplication'];

	if (!getComponents) {
		return null;
	}

	const components = getComponents({ only });

	if (components.length === 0) {
		return null;
	}

	return (
		<div
			id="complementary-components"
			className={cx(classes.root, 'fr-col-12')}
		>
			<ComponentsRenderer
				getComponents={getComponents}
				currentErrors={currentErrors}
				disabled={disabled}
				only={only}
			/>
		</div>
	);
}
