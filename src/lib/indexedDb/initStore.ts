import { SuggesterType } from '../../typeLunatic/type-source';
import { openStorage } from './openStorage';
import { clearStore } from './clearStore';
import { updateEntry } from './update-entry';
import { CONSTANTES } from './constantes';

export async function initStore(storeInfo: SuggesterType) {
	const { version, name } = storeInfo;
	const db = await openStorage(name, version);
	if (db) {
		await clearStore(db, CONSTANTES.STORE_DATA_NAME);
		await clearStore(db, CONSTANTES.STORE_INFO_NAME);
		await updateEntry<SuggesterType>(db, CONSTANTES.STORE_INFO_NAME, storeInfo);
	}
}
