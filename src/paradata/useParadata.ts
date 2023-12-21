import { useRef, useEffect, useState, useCallback, useMemo } from 'react';
import { useMetadata } from '../hooks/useMetadata';
import { createPostEvent } from './createPostEvent';

export type ParadataComponent = {
	id: string;
	events: Array<EventHandler['event']>;
};

export type ParadataType = {
	isActive: boolean;
	level: '1' | '2';
	sendLimit: number;
	components: Array<ParadataComponent> | [];
};

export type EventHandler = {
	event: 'blur' | 'focus' | 'change' | 'click';
};

export type eventType = {
	type: string;
	element: string;
	value?: string | undefined;
};

const inputListners = ['focus', 'blur', 'change'];
const buttonListners = ['focus', 'blur', 'click'];
const defaultListners = ['focus', 'blur'];

export function useParadata({
	pageTag,
	unit,
}: {
	pageTag?: string;
	survey?: string;
	unit?: string;
}) {
	const map = useRef(new Map<string, null>());

	const postEvent = useMemo(() => createPostEvent({ unit }), [unit]);
	const [components, setComponents] = useState<ParadataComponent[] | []>([]);
	const [activateParadata, setActivateParadata] = useState<boolean>(false);
	const [paradataLevel, setparadataLevel] =
		useState<ParadataType['level']>('1');

	const targetNode = document.getElementById('stromae-form');
	const metadata = useMetadata();

	function builderEvent({ type, element, value }: eventType) {
		return {
			type,
			element,
			timestamp: new Date().getTime(),
			value,
		};
	}

	const handleInput = useCallback(
		async (e: Event) => {
			const target = e.target as HTMLInputElement;

			await postEvent(
				false,
				builderEvent({
					type: e.type,
					element: target.id,
					value: e.type === 'change' ? target.value : undefined,
				})
			);
		},
		[postEvent]
	);

	const handleButton = useCallback(
		async (e: Event) => {
			const target = e.target as HTMLButtonElement;

			await postEvent(
				false,
				builderEvent({
					type: e.type,
					element: target.id,
				})
			);
		},
		[postEvent]
	);

	const handleDefault = useCallback(
		async (e: Event) => {
			const target = e.target as HTMLElement;

			await postEvent(
				false,
				builderEvent({
					type: e.type,
					element: target.id,
				})
			);
		},
		[postEvent]
	);

	const manageListners = useCallback(() => {
		if (components.length) {
			components.forEach((component: ParadataComponent) => {
				const elmt = document.getElementById(component.id);
				if (elmt && !map.current.has(component.id)) {
					map.current.set(component.id, null);
					component.events.forEach((ev: EventHandler['event']) => {
						switch (elmt.tagName) {
							case 'INPUT':
								elmt.addEventListener(ev, handleInput);
								break;
							case 'BUTTON':
								elmt.addEventListener(ev, handleButton);
								break;
							default:
								elmt.addEventListener(ev, handleDefault);
						}
					});
				}
			});
		}
	}, [components, handleInput, handleButton, handleDefault]);

	const manageAllListners = useCallback(() => {
		// chnage type any to accept HTMLFormControlsCollection
		const elements = (targetNode as any).elements;
		for (const element of elements) {
			if (element && !map.current.has(element.id)) {
				map.current.set(element.id, null);
				switch (element.tagName) {
					case 'INPUT':
						inputListners.forEach((ev) => {
							element.addEventListener(ev, handleInput);
						});
						break;
					case 'BUTTON':
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
	}, [handleButton, handleDefault, handleInput, targetNode]);

	const mutationObserver = useMemo(
		() =>
			new MutationObserver(
				paradataLevel === '1' ? manageListners : manageAllListners
			),
		[manageAllListners, paradataLevel, manageListners]
	);

	const config = { childList: true, subtree: true };
	if (targetNode && activateParadata)
		mutationObserver.observe(targetNode, config);

	useEffect(() => {
		return () => {
			mutationObserver.disconnect();
		};
	}, [mutationObserver]);

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
	}, [
		pageTag,
		components,
		activateParadata,
		manageAllListners,
		manageListners,
		paradataLevel,
		targetNode,
	]);

	useEffect(() => {
		postEvent(true);
	}, [pageTag, postEvent]);
}
