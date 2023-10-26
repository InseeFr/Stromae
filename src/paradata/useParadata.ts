import { useRef, useEffect } from 'react';
import { useMetadata } from '../hooks/useMetadata';

async function mockApi(events: Array<unknown>) {
	window.setTimeout(() => {
		console.log('clean!', events);
	}, 50);
}

export function useParadata() {
	const map = useRef(new Map<string, null>());
	const tampon = useRef<Array<{ type: string; timestamp: number }>>([]);
	const metadata = useMetadata();

	const cally = async () => {
		// console.log('Array.isArray(tampon.current), tampon.current');
		tampon.current.push({ type: 'blur', timestamp: new Date().getTime() });

		await persist();
	};

	useEffect(() => {
		if (metadata?.paradata) {
			// TODO
		}
	}, [metadata]);

	async function persist() {
		if (tampon.current.length > 3) {
			const temp = tampon.current;
			tampon.current = [];
			await mockApi(temp);

			return true;
		}
		return false;
	}

	const elmt = document.getElementById('kkxuu8ov-nom');
	if (elmt && !map.current.has('kkxuu8ov-nom')) {
		map.current.set('kkxuu8ov-nom', null);
		elmt.addEventListener('blur', cally);
	}

	return () => {
		document.getElementById('kkxuu8ov-nom')?.removeEventListener('blur', cally);
		// vider un tampon
	};
}
