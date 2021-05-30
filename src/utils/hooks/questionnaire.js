import { useEffect, useState } from 'react';
import { getNotNullCollectedState } from 'utils/questionnaire';

export const NOT_STARTED = null;
export const INIT = 'INIT';
export const COMPLETED = 'COMPLETED';
export const VALIDATED = 'VALIDATED';

export const useQuestionnaireState = (questionnaire, initialState) => {
  const [state, setState] = useState(initialState);

  // Analyse collected variables to update state (only to STARTED state)
  useEffect(() => {
    if (questionnaire && (state === NOT_STARTED || state === VALIDATED)) {
      const dataCollected = getNotNullCollectedState(questionnaire);
      // TODO : make a better copy without mutate questionnaire object (spread doesn't work)
      const dataWithoutNullArray = Object.entries(
        JSON.parse(JSON.stringify(dataCollected))
      ).filter(([, value]) => {
        if (Array.isArray(value)) {
          if ((value.length = 1 && value[0] === null)) return false;
        }
        return true;
      });
      if (dataWithoutNullArray.length > 0) setState(INIT);
    }
  }, [questionnaire, state]);

  return [state, setState];
};
