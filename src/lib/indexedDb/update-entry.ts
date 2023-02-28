export function updateEntry<T>(db: IDBDatabase, name: string, entry: T) {
	return new Promise(function (resolve, reject) {
		try {
			const transaction = db.transaction(name, 'readwrite');
			const store = transaction.objectStore(name);
			const request = store.add(entry);

			request.onsuccess = function () {
				resolve('success');
			};

			request.onerror = function (e) {
				reject(e);
			};
		} catch (e) {
			reject(e);
		}
	});
}
