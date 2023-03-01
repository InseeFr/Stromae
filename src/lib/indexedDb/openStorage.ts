/* eslint-disable no-restricted-globals */
import { CONSTANTES } from './constantes';
import { getIDB } from './get-idb';

const IDB_REF = getIDB();

export function openStorage(
	name: string,
	idbVersion: number = 1
): Promise<IDBDatabase> {
	return new Promise(function (resolve, reject) {
		if (!IDB_REF) {
			reject('indexedDb not supported !');
		}
		const request = IDB_REF.open(name, idbVersion);
		let db: IDBDatabase;
		let doIt = true;

		request.onupgradeneeded = function (e: IDBVersionChangeEvent) {
			doIt = false;
			db = this.result;
			const store = db.createObjectStore(CONSTANTES.STORE_DATA_NAME, {
				keyPath: 'id',
			});
			db.createObjectStore(CONSTANTES.STORE_INFO_NAME, {
				keyPath: 'name',
			});
			store.createIndex(CONSTANTES.STORE_INDEX_NAME, 'tokens', {
				multiEntry: true,
			});

			const txn = this.transaction;
			if (txn) {
				txn.oncomplete = function () {
					resolve(db);
				};
			}
		};

		request.onsuccess = function () {
			if (doIt) {
				resolve(request.result);
			}
		};

		request.onerror = function (e) {
			reject(e);
		};
	});
}
