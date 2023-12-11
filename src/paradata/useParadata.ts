import { useRef, useEffect, useState } from 'react';
import { useMetadata } from '../hooks/useMetadata';

export type ParadataComponent = {
	id: string;
	events: Array<EventHandler["event"]>;
};

export type ParadataType = {
	isActive: boolean;
	level: '1' | '2';
	components: Array<ParadataComponent> | [];
};

export type EventHandler = {
	event: 'blur' | 'focus' | 'change' | 'click';
};

export type tamponType = {
	type: string
	element: string;
	timestamp: number;
	value?: string
};

async function mockApi(events: Array<unknown>) {
	window.setTimeout(() => {
		console.log('clean : ', events);
	}, 50);
}

export function useParadata({ pageTag }: { pageTag?: string }) {
	const map = useRef(new Map<string, null>());
	const tampon = useRef<Array<tamponType>>([]);
	const [components, setComponents] = useState<ParadataComponent[] | []>([]);
	const [activateParadata, setActivateParadata] = useState<boolean>(false);
	const [paradataLevel, setparadataLevel] = useState<ParadataType["level"]>('1');
	const targetNode = document.getElementById("stromae-form");
	const metadata = useMetadata();
	const inputListners = ["focus", "blur", "change"];
	const buttonListners = ["focus", "blur", "click"];
	const defaultListners = ["focus", "blur"];

	const manageListners = () => {
		if (components.length) {
			components.forEach((component: ParadataComponent) => {
				const elmt = document.getElementById(component.id);
				if (elmt && !map.current.has(component.id)) {
					map.current.set(component.id, null);
					component.events.forEach((ev: EventHandler["event"]) => {
						switch (elmt.tagName) {
							case "INPUT":
								elmt.addEventListener(ev, handleInput);
								break;
							case "SELECT":
								elmt.addEventListener(ev, handleSelect);
								break;
							case "BUTTON":
								elmt.addEventListener(ev, handleButton);
								break;
							default:
								elmt.addEventListener(ev, handleDefault);
						}
					});
				}
			});
		}
	}

	const manageAllListners = () => {
		// chnage type any to accept HTMLFormControlsCollection
		const elements = (targetNode as any).elements;
		for (const element of elements) {
			if (element && !map.current.has(element.id)) {
				map.current.set(element.id, null);
				switch (element.tagName) {
					case "INPUT":
						inputListners.forEach((ev) => {
							element.addEventListener(ev, handleInput);
						});
						break;
					case "BUTTON":
						buttonListners.forEach((ev) => {
							element.addEventListener(ev, handleButton);
						});
						break;
					default:
						defaultListners.forEach((ev) => {
							element.addEventListener(ev, handleDefault);
						});
				}
			}
		}
	}
	const mutationObserver = new MutationObserver(paradataLevel === '1' ? manageListners : manageAllListners);
	const config = { childList: true, subtree: true };
	if (targetNode && activateParadata)
		mutationObserver.observe(targetNode, config);

	async function persist() {
		if (tampon.current.length > 0) {
			const temp = tampon.current;
			tampon.current = [];
			await mockApi(temp);

			return true;
		}
		return false;
	}

	const handleInput = async (e: Event) => {
		const target = e.target as HTMLInputElement;
		const structure: tamponType = {
			type: e.type,
			element: target.id,
			timestamp: new Date().getTime(),
		}
		if (e.type === 'change') structure.value = target.value;
		tampon.current.push(structure);
		await persist();
	}

	const handleSelect = async (e: Event) => {
		const target = e.target as HTMLSelectElement;
		const structure: tamponType = {
			type: e.type,
			element: target.id,
			timestamp: new Date().getTime(),
		}
		tampon.current.push(structure);
		await persist();
	}

	const handleButton = async (e: Event) => {
		const target = e.target as HTMLButtonElement;
		const structure: tamponType = {
			type: e.type,
			element: target.id,
			timestamp: new Date().getTime(),
		}
		tampon.current.push(structure);
		await persist();
	}

	const handleDefault = async (e: Event) => {
		const target = e.target as HTMLElement;
		const structure: tamponType = {
			type: e.type,
			element: target.id,
			timestamp: new Date().getTime(),
		}
		tampon.current.push(structure);
		await persist();
	}

	useEffect(() => {
		return () => {
			mutationObserver.disconnect();
		};
	}, []);

	useEffect(() => {
		if (metadata?.paradata) {
			const paradata: ParadataType = metadata?.paradata;
			setActivateParadata(paradata.isActive || false);
			setparadataLevel(paradata.level || '1');
			setComponents(paradata.components || []);
		}
	}, [metadata]);

	useEffect(() => {
		if (activateParadata) {
			if (paradataLevel === '1') {
				manageListners();
			} else if (paradataLevel === '2') {
				if (targetNode) {
					manageAllListners();
				}
			}
		}
	}, [pageTag, components]);
}
