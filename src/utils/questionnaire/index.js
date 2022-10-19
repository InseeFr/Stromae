export * from './dataDownload';

// TODO
export const getNotNullCollectedState = () => {};

export const secureCopy = (objectToCopy) =>
	objectToCopy ? JSON.parse(JSON.stringify(objectToCopy)) : {};

const getPageWithoutAnyIteration = (currentPage) =>
	currentPage
		.split('.')
		.map((e) => e.split('#')[0])
		.join('.');

const filterPageLoop =
	(currentPage) =>
	({ page, componentType }) => {
		const currentPageWithoutIteration = getPageWithoutAnyIteration(currentPage);
		return (
			currentPageWithoutIteration.startsWith(page) && componentType === 'Loop'
		);
	};

export const isNewSequence = (components) =>
	components.some((e) => e.componentType === 'Sequence');

export const getCurrentComponent = (components) => (currentPage) => {
	const currentPageWithoutIteration = getPageWithoutAnyIteration(currentPage);
	const filterComponentsLoop = components.filter((c) =>
		filterPageLoop(currentPage)(c)
	);
	if (filterComponentsLoop.length > 0) {
		const { maxPage, components: componentsOfLoop } = filterComponentsLoop[0];
		if (maxPage) return getCurrentComponent(componentsOfLoop)(currentPage);
	}
	const comp = components
		.filter(
			({ page, componentType }) =>
				page === currentPageWithoutIteration &&
				componentType !== 'FilterDescription'
		)
		.pop();
	return comp || {};
};
