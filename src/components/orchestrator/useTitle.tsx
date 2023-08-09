import { useEffect, useState } from 'react';
import { LunaticSource } from '../../typeLunatic/type-source';

function getPageFromPageTag(pageTag: string) {
	const pattern = /(?<page>\d+)\.?/g;
	const match = [...(pageTag?.matchAll(pattern) as any)] as
		| [
				{
					groups: {
						page: string;
					};
				}
		  ]
		| [];
	if (match.length === 0) {
		return null;
	}
	const [
		{
			groups: { page },
		},
	] = match;
	return page;
}

function createTitleMap(source: LunaticSource, defaultTitle: string) {
	let title = defaultTitle;
	return source.components.reduce((acc, component) => {
		const { page, componentType, label } = component;
		if (componentType === 'Sequence') {
			title = label.value;
		}
		return { ...acc, [page]: title };
	}, {});
}

export function useTitle({
	source,
	pageTag,
	currentPage,
	defaultTitle = 'Enquête Insee',
}: {
	source?: LunaticSource;
	pageTag?: string;
	currentPage?: string;
	defaultTitle?: string;
}) {
	const [titleMap, setTitleMap] = useState<Record<string, string>>({});
	const [title, setTitle] = useState(defaultTitle);

	useEffect(() => {
		if (source) {
			setTitleMap(createTitleMap(source, defaultTitle));
		}
	}, [source, defaultTitle]);

	useEffect(() => {
		const current = pageTag ?? currentPage;
		if (current) {
			const page = getPageFromPageTag(current);
			if (page && page in titleMap) {
				setTitle(titleMap[page]);
			}
		}
	}, [pageTag, currentPage, titleMap]);

	return title;
}
