export const listenActivity = () => {
	const activityEvents = [
		'mousedown',
		'mousemove',
		'keydown',
		'scroll',
		'touchstart',
	];
	return new Promise((resolve) => {
		const listener = () => {
			resolve();
		};
		activityEvents.forEach(function (eventName) {
			window.addEventListener(eventName, listener, { once: true });
		});
	});
};
