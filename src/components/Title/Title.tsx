import { useEffect } from 'react';
import { OrchestratedElement } from '../../typeStromae/type';

export function Title(props: OrchestratedElement) {
	const { title } = props;
	useEffect(() => {
		if (title) {
			document.title = title;
		}
	}, [title]);
	return <></>;
}
