import { ORCHESTRATOR_CATEGORY } from 'utils/constants';

const getHardwareInfo = () => {
  return {
    userAgent: navigator.userAgent,
    battery: navigator.battery,
  };
};

class Logger {
  constructor(idQuestionnaire, idSurveyUnit, idOrchestrator) {
    this._idQuestionnaire = idQuestionnaire;
    this._idSurveyUnit = idSurveyUnit;
    this._idOrchestrator = idOrchestrator;
    this._events = [];
  }

  getEventsToSend() {
    return {
      idSu: this._idSurveyUnit,
      events: this._events,
    };
  }

  log(event) {
    this._events.push({
      timestamp: new Date().getTime(),
      idQuestionnaire: this._idQuestionnaire,
      idSurveyUnit: this._idSurveyUnit,
      ...event,
      idParadataObject:
        event?.typeParadataObject === ORCHESTRATOR_CATEGORY
          ? `${event?.idParadataObject}-${this._idOrchestrator}`
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

  static _createInstance(idQuestionnaire, idSurveyUnit, idOrchestrator) {
    const logger = new Logger(idQuestionnaire, idSurveyUnit, idOrchestrator);
    return logger;
  }

  static createEventLogger(idQuestionnaire, idSurveyUnit, idOrchestrator) {
    if (!this._instance) {
      this._instance = this._createInstance(
        idQuestionnaire,
        idSurveyUnit,
        idOrchestrator
      );
    }
    this._instance.clear();
    return this._instance;
  }

  static getLogger() {
    return this._instance;
  }
}
