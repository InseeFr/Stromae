import { useMemo } from 'react';
import { LunaticSource } from '../../typeLunatic/type-source';
import { useDocumentTitle } from '../../utils/useDocumentTitle';
import { objectHasKey } from '../../lib/commons/object';

function getTitleByPage(
	source?: LunaticSource,
	defaultTitle = ''
): Record<string, string> {
	let sequenceTitle = defaultTitle;
	const titleEntries =
		source?.components.map((c) => {
			if (c.componentType === 'Sequence') {
				sequenceTitle = c.title ?? defaultTitle ?? '';
			}
			return [c.page, sequenceTitle];
		}) ?? [];
	return Object.fromEntries(titleEntries);
}

/**
 * Set the page title according to the current sequence in the form
 */
export function useQuestionnaireTitle({
	source,
	page,
	defaultTitle,
}: {
	source?: LunaticSource;
	page: string;
	defaultTitle: string;
}): void {
	const titleMap = useMemo(
		() => getTitleByPage(source, defaultTitle),
		[source, defaultTitle]
	);
	useDocumentTitle(objectHasKey(titleMap, page) ? titleMap[page] : undefined);
}
