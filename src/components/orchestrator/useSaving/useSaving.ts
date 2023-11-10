import { useCallback, useRef } from 'react';
import { SavingFailure } from '../../../typeStromae/type';

export function useSaving() {
	const changes = useRef<Map<string, unknown>>(new Map());

	const listenChange = useCallback((componentName: string, value: unknown) => {
		changes.current.set(componentName, value);
	}, []);

	const saveChange = useCallback(async () => {
		return { waiting: false, failure: { status: 200 } as SavingFailure };
	}, []);

	return { listenChange, saveChange };
}

// const makeSave = useCallback(
// 	async ( ) => {
// 		try {
// 			// setSavingFailure(undefined);
// 			// setWaiting(true);
// 			const somethingToSave = await saveChange( );
// 			// setWaiting(false);
// 			// if (somethingToSave) {
// 			// 	setSavingFailure({ status: 200 });
// 			// }
// 		} catch (e) {
// 			// setSavingFailure({ status: 500 });
// 			// setWaiting(false);
// 		}
// 	},
// 	[saveChange]
// );
