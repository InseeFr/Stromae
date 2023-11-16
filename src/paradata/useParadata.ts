import { useRef, useEffect, useState } from 'react';
import { useMetadata } from '../hooks/useMetadata';

export type ParadataComponent = {
	id: string;
	events: Array<'blur' | 'focus' | 'input'>;
};

export type ParadataType = {
	level: '1' | '2';
	components: Array<ParadataComponent>;
};

export type EventHandler = {
	event: 'blur' | 'focus' | 'input';
};

async function mockApi(events: Array<unknown>) {
	window.setTimeout(() => {
		console.log('clean : ', events);
	}, 50);
}

export function useParadata({ pageTag }: { pageTag?: string }) {
	const map = useRef(new Map<string, null>());
	const eventHandlers = useRef<Record<string, Array<(e?: InputEvent) => any>>>(
		{}
	);
	const [paradata, setParadata] = useState<ParadataComponent>();
	const tampon = useRef<
		Array<{ type: string; element: string; timestamp: number }>
	>([]);
	const [components, setComponents] = useState<[ParadataComponent] | []>([]);
	const metadata = useMetadata();

	const cally = async (e: Event) => {
		tampon.current.push({
			type: e.type,
			element: (e.target as HTMLInputElement).id,
			timestamp: new Date().getTime(),
		});
		await persist();
	};

	useEffect(() => {
		if (metadata?.paradata) {
			setParadata(metadata?.paradata);
			setComponents(metadata?.paradata?.components);
		}
	}, [metadata]);

	async function persist() {
		if (tampon.current.length > 0) {
			const temp = tampon.current;
			tampon.current = [];
			await mockApi(temp);

			return true;
		}
		return false;
	}

	/**
	 * à écrire en propre !
	 */
	useEffect(() => {
		const finded: Record<string, any> = {};
		// ajout des nouveau handler
		components.forEach((cmp) => {
			const elmt = document.getElementById(cmp.id);

			if (elmt) {
				const handlers = [];
				finded[cmp.id] = null;

				// valider elmt.tagName === INPUT éventuellement
				cmp.events.forEach((ev) => {
					if (ev === 'input') {
						const callback = (e: Event) => {
							const target = e.target as HTMLInputElement;
							console.log(cmp.id, ev, target.value);
						};
						elmt.addEventListener('input', callback);
						handlers.push(callback);
					} else {
						const callback = () => {
							console.log(cmp.id, ev);
						};
						elmt.addEventListener(ev, callback);
						handlers.push(callback);
					}
				});
			}
		});

		// tous les handlers pour des id non trouvés doivent être virés
		Object.entries(eventHandlers.current).forEach(([id, handlers]) => {
			// si handler !== null et lenght et !finded, removeEventListener sur all
		});
	}, [pageTag, components]);

	// 	const manageEventListner = (add: boolean) => {
	// 		if (components.length) {
	// 			components.forEach((component: Component) => {
	// 				const elmt = document.getElementById(component.id);
	// 				if (elmt && !map.current.has(component.id)) {
	// 					map.current.set(component.id, null);

	// 					component.events.forEach((ev: string) => {
	// 						if (add) {
	// 							elmt.addEventListener(ev, cally);
	// 						} else {
	// 							elmt.removeEventListener(ev, cally);
	// 						}
	// 					});
	// 				}
	// 			});
	// 		}
	// 	};

	// 	manageEventListner(true);

	// 	return () => {
	// 		manageEventListner(false);
	// 	};
}
