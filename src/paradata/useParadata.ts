import { useRef, useEffect, useState } from 'react';
import { useMetadata } from '../hooks/useMetadata';


export type Component = {
	id: string;
	events: string[];
}

async function mockApi(events: Array<unknown>) {
	window.setTimeout(() => {
		console.log('clean : ', events);
	}, 50);
}

export function useParadata() {
	const map = useRef(new Map<string, null>());
	const tampon = useRef<Array<{ type: string; element: string; timestamp: number }>>([]);
	const [components, setComponents] = useState<[Component] | []>([]);
	const metadata = useMetadata();

	const cally = async (e: Event) => {
		tampon.current.push({ type: e.type, element: (e.target as HTMLInputElement).id, timestamp: new Date().getTime() });
		await persist();
	};

	useEffect(() => {
		if (metadata?.paradata) {
			setComponents(metadata?.paradata?.components);
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

	const manageEventListner = (add: boolean) => {
		if (components.length) {
			components.forEach((component: Component) => {
				const elmt = document.getElementById(component.id);
				if (elmt && !map.current.has(component.id)) {
					map.current.set(component.id, null);
					component.events.forEach((ev: string) => {
						if (add) {
							elmt.addEventListener(ev, cally);
						} else {
							elmt.removeEventListener(ev, cally);
						}
					})
				}
			})
		}
	}


	manageEventListner(true);


	return () => {
		manageEventListner(false);
	};
}
