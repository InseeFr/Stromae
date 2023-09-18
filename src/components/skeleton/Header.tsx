import { fr } from '@codegouvfr/react-dsfr';
import { Skeleton } from '@mui/material';

export function Header() {
	return (
		<div
			className={fr.cx('fr-col-12', 'fr-m-2w')}
			aria-live="polite"
			aria-busy="true"
		>
			<Skeleton height={113} variant="rectangular" />
		</div>
	);
}
