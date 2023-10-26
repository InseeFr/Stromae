import { useRef } from 'react';

async function mockApi(events: Array<unknown>) {
	window.setTimeout(() => {
		console.log('clean!', events);
	}, 50);
}

export function useParadata() {
	const map = useRef(new Map<string, null>());
	const tampon = useRef<Array<{ type: string }>>([]);

	const cally = async () => {
		console.log('Array.isArray(tampon.current), tampon.current');
		// tampon.current.push({ type: 'blur' });
		// await persist();
	};

	// async function persist() {
	// 	if (tampon.current.length > 3) {
	// 		const temp = tampon.current;
	// 		tampon.current = [];
	// 		await mockApi(temp);

	// 		return true;
	// 	}
	// 	return false;
	// }
	// document.getElementById('kkxuu8ov-nom')?.addEventListener('blur', cally);

	const elmt = document.getElementById('kkxuu8ov-nom');
	if (elmt && !map.current.has('kkxuu8ov-nom')) {
		console.log('how');
		map.current.set('kkxuu8ov-nom', null);
		elmt.addEventListener('blur', cally);
	}

	return () => {
		document.getElementById('kkxuu8ov-nom')?.removeEventListener('blur', cally);
		// vider un tampon
	};
}
