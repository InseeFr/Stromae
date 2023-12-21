import { environment } from '../utils/read-env-vars';
import { uriParadata } from '../lib/domainUri';
import { publicPostRequest } from '../lib/commons/axios-utils';

export type eventType = {
	type: string;
	element: string;
	timestamp: number;
	value?: string | undefined;
};

export function createPostEvent({ unit }: { unit?: string }) {
	let stack: eventType[] = [];
	const sendLimit = 5;

	async function postIt(changePage = false, args?: eventType) {
		if (args) stack.push(args);
		if (stack.length >= sendLimit || changePage) {
			const tempStack = stack;

			if (tempStack.length && unit) {
				publicPostRequest(
					`${environment.PARADATA_DOMAIN}${uriParadata(unit)}`,
					stack
				).catch(() => {
					console.warn(
						'paradata fail',
						`${environment.PARADATA_DOMAIN}${uriParadata(unit)}`,
						stack
					);
				});
			}
			stack = [];
		}
	}

	return postIt;
}
