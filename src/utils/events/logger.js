import { ORCHESTRATOR_CATEGORY } from 'utils/constants';

const getHardwareInfo = () => {
	return {
		userAgent: navigator.userAgent,
		battery: navigator.battery,
	};
};

class Logger {
	constructor(metadata) {
		this._metadata = metadata;
		this._events = [];
	}

	getEventsToSend() {
		return {
			idSU: this._metadata?.idSurveyUnit,
			events: this._events,
		};
	}
	addMetadata(metadata) {
		this._metadata = { ...this._metadata, ...metadata };
	}

	log(event) {
		this._events.push({
			timestamp: new Date().getTime(),
			...this._metadata,
			...event,
			idParadataObject:
				event?.typeParadataObject === ORCHESTRATOR_CATEGORY
					? `${event?.idParadataObject}-${this._metadata.idOrchestrator}`
					: event?.idParadataObject,
			...getHardwareInfo(),
		});
	}

	clear() {
		this._events = [];
	}
}

export class EventsManager {
	static _instance;

	static _createInstance(metadata) {
		const logger = new Logger(metadata);
		return logger;
	}

	static createEventLogger(metadata) {
		if (!this._instance) {
			this._instance = this._createInstance(metadata);
		}
		return this._instance;
	}

	static getLogger() {
		return this._instance;
	}
}
