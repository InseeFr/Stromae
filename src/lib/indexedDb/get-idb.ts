/* eslint-disable no-restricted-globals */
export function getIDB(): IDBFactory {
	const what: any = self || window;
	return (
		what.indexedDB ||
		what.mozIndexedDB ||
		what.webkitIndexedDB ||
		what.msIndexedDB
	);
}
