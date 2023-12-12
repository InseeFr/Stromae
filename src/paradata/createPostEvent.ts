// const tampon = useRef<Array<tamponType>>([]);
// const [sendLimit, setSendLimit] = useState<number>(0);

export function createPostEvent() {
	// TODO

	// const Stack = [];

	async function postIt(
		args: {
			type: string;
			element: string;
			timestamp: number;
			value?: unknown;
		},
		clean = false
	) {
		console.log(args);
	}

	return postIt;
}
