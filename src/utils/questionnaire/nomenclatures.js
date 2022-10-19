const buildSuggesterUrl = (apiUrl) => (id) => ({
	url: `${apiUrl}/api/nomenclature/${id}`,
});

export const buildSuggesterFromNomenclatures =
	(apiUrl) =>
	(nomenclatures = []) => {
		if (Array.isArray(nomenclatures)) {
			return nomenclatures.reduce((suggesters, nomenclature) => {
				return {
					...suggesters,
					[nomenclature]: buildSuggesterUrl(apiUrl)(nomenclature),
				};
			}, {});
		}
		return {};
	};
