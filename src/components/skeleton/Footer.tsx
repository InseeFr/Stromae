import { Skeleton } from '@mui/material';

export function Footer() {
	return (
		<div className="fr-col-12 fr-m-2w" aria-live="polite" aria-busy="true">
			<Skeleton height={250} variant="rectangular" />
		</div>
	);
}
