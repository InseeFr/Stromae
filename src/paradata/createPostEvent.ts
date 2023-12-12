export type eventType = {
	type: string;
	element: string;
	timestamp: number;
	value?: string | undefined;
};

export function createPostEvent() {
	let stack: eventType[] = [];
	const sendLimit = 5;

	async function postIt(changePage = false, args?: eventType) {
		if (args) stack.push(args);
		if (stack.length >= sendLimit || changePage) {
			const tempStack = stack;
			stack = [];
			if (tempStack.length)
				// appel mock
				console.log('appel mock', tempStack);
		}
		console.log(stack);
	}

	return postIt;
}
