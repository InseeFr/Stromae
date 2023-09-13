import { Skeleton } from '@mui/material';

import { useDocumentTitle } from '../../utils/useDocumentTitle';

export function Form() {
	useDocumentTitle('Page de chargement');
	return (
		<div aria-live="polite" aria-busy="true">
			<Skeleton />
			<Skeleton />
			<Skeleton />
		</div>
	);
}
