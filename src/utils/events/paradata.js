import { EventsManager } from './logger';

export const paradataHandler = f => info => e => {
  f(e);
  EventsManager.getLogger()?.log(info);
};

export const SIMPLE_CLICK_EVENT = {
  category: 'orchestrator',
  type: 'click',
};

export const INIT_ORCHESTRATOR_EVENT = {
  id: 'orchestrator',
  category: 'orchestrator',
  type: 'create',
};

export const CLOSE_ORCGRESTRATOR_EVENT = {};
