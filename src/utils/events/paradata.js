import {
  EVENT_TYPE_CLICK,
  EVENT_TYPE_ORCHESTRATOR_CREATE,
  EVENT_TYPE_SESSION_STARTED,
  ORCHESTRATOR_CATEGORY,
  SESSION_CATEGORY,
} from 'utils/constants';
import { EventsManager } from './logger';

export const simpleLog = info => EventsManager.getLogger()?.log(info);

export const paradataHandler = f => info => e => {
  simpleLog(info);
  f(e);
};

export const SIMPLE_CLICK_EVENT = {
  typeParadataObject: ORCHESTRATOR_CATEGORY,
  type: EVENT_TYPE_CLICK,
};

export const INIT_ORCHESTRATOR_EVENT = {
  idParadataObject: 'init',
  typeParadataObject: ORCHESTRATOR_CATEGORY,
  type: EVENT_TYPE_ORCHESTRATOR_CREATE,
};

export const INIT_SESSION_EVENT = {
  idParadataObject: 'init',
  typeParadataObject: SESSION_CATEGORY,
  type: EVENT_TYPE_SESSION_STARTED,
};

export const CLOSE_ORCGRESTRATOR_EVENT = {};
