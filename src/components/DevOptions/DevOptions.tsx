import { OrchestratedElement } from '../../typeStromae/type';
import { Button } from '@codegouvfr/react-dsfr/Button';

const ENV = process.env.NODE_ENV;

export function DevOptions(props: OrchestratedElement) {
	const { getData } = props;
	function handleClick() {
		const variables = getData?.(false);
		console.log({ variables });
	}
	if (ENV === 'development') {
		return (
			<div
				style={{
					position: 'fixed',
					bottom: '5px',
					right: '5px',
					textAlign: 'center',
					fontSize: '8px',
				}}
			>
				<div>Only available when NODE_ENV === 'development'</div>
				<Button
					priority="primary"
					onClick={handleClick}
					title="get-data-for-dev-purpose"
					nativeButtonProps={{
						form: 'stromae-form',
						type: 'button',
					}}
					id="get-lunatic-data-button"
				>
					getData from Lunatic
				</Button>
			</div>
		);
	}
	return null;
}
