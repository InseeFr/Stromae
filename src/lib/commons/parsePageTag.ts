export function parsePageTag(pageTag?: string) {
	if (!pageTag) {
		return { page: '1', iteration: undefined };
	}
	const [page, iteration] = pageTag.split('#');
	return { page, iteration };
}
