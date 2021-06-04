const getHardwareInfo = () => {
  return {
    userAgent: navigator.userAgent,
    battery: navigator.battery,
  };
};

class Logger {
  constructor(idQuestionnaire, idSurveyUnit) {
    this._idQuestionnaire = idQuestionnaire;
    this._idSurveyUnit = idSurveyUnit;
    this._events = [];
  }

  getEventsToSend() {
    return {
      idSu: this._idSurveyUnit,
      events: this._events,
    };
  }

  log(event) {
    this._events = [
      ...this._events,
      {
        timestamp: new Date().getTime(),
        idQuestionnaire: this._idQuestionnaire,
        idSurveyUnit: this._idSurveyUnit,
        ...event,
        ...getHardwareInfo(),
      },
    ];
  }

  clear() {
    this._events = [];
  }
}

export class EventsManager {
  static _instance;

  static _createInstance(idQuestionnaire, idSurveyUnit) {
    const logger = new Logger(idQuestionnaire, idSurveyUnit);
    return logger;
  }

  static createEventLogger(idQuestionnaire, idSurveyUnit) {
    if (!this._instance) {
      this._instance = this._createInstance(idQuestionnaire, idSurveyUnit);
    }
    return this._instance;
  }

  static getLogger() {
    return this._instance;
  }
}
