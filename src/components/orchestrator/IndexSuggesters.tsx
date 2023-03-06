import { PropsWithChildren, useState, useCallback } from 'react';
import { initStore } from '../../lib/indexedDb/initStore';
import { SuggesterType } from '../../typeLunatic/type-source';
import { createAppendTask } from '../../lib/indexedDb/createAppendTask';
import { AsyncRequest } from '../AsyncRequest/AsyncRequest';

type IndexSuggestersProps = {
	requiredNomenclatures?: Record<string, Array<any>>;
	load?: boolean;
	suggesters?: Array<SuggesterType>;
};

function getLabel(name: string) {
	return {
		pending: `Votre référentiel est en cours de chargement : ${name}.`,
		error: 'error',
		success: `Le chargement de votre référentiel est terminé : ${name}.`,
	};
}

function LoadOne({ store, data }: { store: SuggesterType; data: Array<any> }) {
	const [abort, setAbort] = useState<undefined | (() => void)>(undefined);
	const { name } = store;

	const request = useCallback(
		async function () {
			if (data) {
				const [append, ab] = createAppendTask(store, 1, () => null);
				setAbort(() => ab);
				await initStore(store);
				return await append(data);
			}
		},
		[data, store]
	);
	const onSuccess = useCallback(function () {}, []);

	return (
		<AsyncRequest<any>
			request={request}
			onSuccess={onSuccess}
			abort={abort}
			label={getLabel(name)}
		/>
	);
}

export function IndexSuggesters(
	props: PropsWithChildren<IndexSuggestersProps>
) {
	const { children, load = true, requiredNomenclatures, suggesters } = props;

	if (load && requiredNomenclatures && suggesters) {
		const loading = suggesters.map(function (store) {
			const { name } = store;
			const data = requiredNomenclatures[name];
			return <LoadOne key={name} store={store} data={data} />;
		});

		return (
			<>
				{children}
				{loading}
			</>
		);
	}

	return <>{children}</>;
}
