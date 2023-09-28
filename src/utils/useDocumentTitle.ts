import { useEffect } from 'react';

export function useDocumentTitle(title?: string | null) {
	useEffect(() => {
		if (title) {
			document.title = title;
		}
	}, [title]);
}
