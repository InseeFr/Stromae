import {
	PropsWithChildren,
	useEffect,
	useRef,
	useState,
	useCallback,
} from 'react';
import { Notice } from '@codegouvfr/react-dsfr/Notice';
import initStore from '../../lib/indexedDb/initStore';
import { SuggesterType } from '../../typeLunatic/type-source';
import createAppendTask from '../../lib/indexedDb/createAppendTask';

type IndexSuggestersProps = {
	requiredNomenclatures?: Record<string, Array<any>>;
	load?: boolean;
	suggesters?: Array<SuggesterType>;
};

function noRefCheck() {}

const STATUS = {
	waiting: 'waiting',
	working: 'working',
	terminated: 'terminated',
};

function LoadOne({ store, data }: { store: SuggesterType; data: Array<any> }) {
	const done = useRef(false);
	const { name } = store;
	const [status, setStatus] = useState(STATUS.waiting);
	const [append, setAppend] = useState<
		undefined | ((entities: Array<any>) => void)
	>(undefined);
	const [abort, setAbort] = useState<undefined | (() => void)>(undefined);

	const track = useCallback(function (s: any = {}) {
		const { message } = s;

		if (message && message.type === 'fill-store/done') {
			setStatus(STATUS.terminated);
		}
	}, []);

	useEffect(
		function () {
			if (!done.current) {
				done.current = true;
				const [ap, ab] = createAppendTask(store, 1, track);
				setAppend(() => ap);
				setAbort(() => ab);

				(async function () {
					await initStore(store);
				})();
			}
		},
		[store, done, track]
	);

	useEffect(
		function () {
			if (status === STATUS.waiting && append && data) {
				setStatus(STATUS.working);
				(async function () {
					await append(data);
				})();
			}
			return () => {
				if (abort && status === STATUS.working) {
					abort();
					setStatus(STATUS.terminated);
				}
			};
		},
		[abort, append, status, data]
	);

	switch (status) {
		case STATUS.waiting:
		case STATUS.working:
			return (
				<Notice
					isClosable
					onClose={noRefCheck}
					title={`Votre référentiel est en cours de chargement : ${name}`}
				/>
			);
		case STATUS.terminated:
			return (
				<Notice
					isClosable
					onClose={noRefCheck}
					title={`Votre référentiel est disponible : ${name}`}
				/>
			);
		default:
			return null;
	}
}

function IndexSuggesters(props: PropsWithChildren<IndexSuggestersProps>) {
	const { children, load = true, requiredNomenclatures, suggesters } = props;

	if (load && requiredNomenclatures && suggesters) {
		const loading = suggesters.map(function (store) {
			const { name } = store;
			const data = requiredNomenclatures[name];
			return <LoadOne key={name} store={store} data={data} />;
		});

		return (
			<>
				{loading}
				{children}
			</>
		);
	}

	// useEffect(
	// 	function () {
	// 		if (requiredNomenclatures && suggesters && load && !done.current) {
	// 			done.current = true;
	// 			Object.entries<Array<any>>(requiredNomenclatures).forEach(function ([
	// 				name,
	// 				data,
	// 			]) {
	// 				const store = getSuggester(suggesters, name);

	// 				if (store) {
	// 					(async () => {
	// 						await initStore(store);
	// 						const [append] = await createAppendTask(store, 1);
	// 						await append(requiredNomenclatures[name]);
	// 					})();
	// 				}
	// 			});
	// 		}
	// 	},
	// 	[load, requiredNomenclatures, done, suggesters]
	// );

	return <>{children}</>;
}

export default IndexSuggesters;
