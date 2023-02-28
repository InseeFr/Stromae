import { SuggesterType } from '../../typeLunatic/type-source';

export const createWorker = (workerUrl: string) => {
	return new Worker(`${workerUrl}`);
};

const workerPath =
	process.env.LUNATIC_LOADER_WORKER_PATH ||
	process.env.REACT_APP_LUNATIC_LOADER_WORKER_PATH ||
	'workers/lunatic-loader-worker-0.1.0.js';

function consoleLogging(...args: Array<any>) {
	args.forEach(function (any) {
		console.log(`suggester: ${JSON.stringify(any)}`);
	});
}

/**
 * Only with Worker
 */
function createAppendTask<T>(
	info: SuggesterType,
	version: number,
	log = consoleLogging
): [(args: Array<any>) => void, () => void] {
	const { name, fields, stopWords } = info;
	const worker = createWorker(workerPath);
	let start = false;
	let stop = false;

	function launch(entities: Array<T>, post = () => null) {
		return new Promise(function (resolve) {
			start = true;
			worker.addEventListener('message', function (e) {
				const { data } = e;
				if (data === 'success') {
					if (!stop) {
						post();
					}
					resolve(data);
				} else {
					log(data);
				}
			});
			worker.postMessage({ name, version, fields, stopWords, entities });
		});
	}

	function terminate() {
		if (start) {
			stop = true;
			worker.terminate();
		}
	}

	return [launch, terminate];
}

export default createAppendTask;
