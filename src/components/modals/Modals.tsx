import {OrchestratedElement} from '../../typeStromae/type';
import {ComponentsRenderer} from '../ComponentsRenderer';
import { makeStyles } from "@codegouvfr/react-dsfr/tss";

type Props = Pick<OrchestratedElement, "currentErrors" | "disabled" | "getComponents">

const useStyles = makeStyles()({
	root: {
		"+ .lunatic-component-with-dsfr": {
			"marginBottom": "2rem"
		}
	}
});

export function Modals(props: Props) {
	const { getComponents, currentErrors, disabled = false, ...rest } = props;
	const { classes, cx } = useStyles();

	return (
		<div
			id="stromae-modals"
			className={cx(classes.root)}
		>
			<ComponentsRenderer getComponents={getComponents} currentErrors={currentErrors} disabled={disabled} only={["ConfirmationModal"]} {...rest} />
		</div>
	);
}
