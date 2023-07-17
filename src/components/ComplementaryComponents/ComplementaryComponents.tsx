import { OrchestratedElement } from '../../typeStromae/type';
import { ComponentsRenderer } from '../ComponentsRenderer';
import { makeStyles } from "@codegouvfr/react-dsfr/tss";

const useStyles = makeStyles()({
	root: {"padding": 0}
});

export function ComplementaryComponents(props: OrchestratedElement) {
	const { getComponents, currentErrors, disabled = false } = props;
	const { classes, cx } = useStyles();
	const only = ["QuestionExplication"]

	if (getComponents) {
		const checkComponents = getComponents().filter((component) => {
			const { componentType } = component;

			return (!only || (only && only.includes(componentType)))
		})

		if (checkComponents.length > 0){
			return (
				<div id="complementary-components" className={cx(classes.root, "fr-col-12")}>
					<ComponentsRenderer getComponents={getComponents} currentErrors={currentErrors} disabled={disabled} only={only} />
				</div>
			);
		}
	}
	return null;
}
