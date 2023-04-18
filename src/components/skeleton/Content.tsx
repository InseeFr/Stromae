import { Skeleton } from '@mui/material';

import { useDocumentTitle } from '../../useDocumentTitle';

export function Content() {
	useDocumentTitle('Page de chargement');
	return (
		<div className="fr-container" aria-live="polite" aria-busy="true">
			<div className="fr-col-lg-6 fr-col-12 fr-my-6w fr-my-md-12w ">
				<Skeleton />
				<Skeleton />
				<Skeleton />
			</div>
		</div>
	);
}
