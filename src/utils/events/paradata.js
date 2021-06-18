import {
  EVENT_TYPE_CLICK,
  EVENT_TYPE_CREATE,
  ORCHESTRATOR_CATEGORY,
} from 'utils/constants';
import { EventsManager } from './logger';

export const paradataHandler = f => info => e => {
  f(e);
  EventsManager.getLogger()?.log(info);
};

export const simpleLog = info => EventsManager.getLogger()?.log(info);

export const SIMPLE_CLICK_EVENT = {
  category: ORCHESTRATOR_CATEGORY,
  type: EVENT_TYPE_CLICK,
};

export const INIT_ORCHESTRATOR_EVENT = {
  id: 'orchestrator',
  category: ORCHESTRATOR_CATEGORY,
  type: EVENT_TYPE_CREATE,
};

export const CLOSE_ORCGRESTRATOR_EVENT = {};
