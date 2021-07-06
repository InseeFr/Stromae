import { useEffect, useState } from 'react';
import { getNotNullCollectedState, secureCopy } from 'utils/questionnaire';

export const NOT_STARTED = null;
export const INIT = 'INIT';
export const COMPLETED = 'COMPLETED';
export const VALIDATED = 'VALIDATED';

export const useQuestionnaireState = (questionnaire, initialState) => {
  const [state, setState] = useState(initialState);

  const [initialResponse] = useState(() =>
    JSON.stringify(getNotNullCollectedState(questionnaire))
  );

  // Analyse collected variables to update state (only to STARTED state)
  useEffect(() => {
    if (questionnaire && (state === NOT_STARTED || state === VALIDATED)) {
      const dataCollected = getNotNullCollectedState(questionnaire);
      // TODO : make a better copy without mutate questionnaire object (spread doesn't work)
      const dataWithoutNullArray = Object.entries(
        secureCopy(dataCollected)
      ).filter(([, value]) => {
        if (Array.isArray(value)) {
          if ((value.length = 1 && value[0] === null)) return false;
        }
        return true;
      });
      if (
        (state === VALIDATED &&
          dataWithoutNullArray.length > 0 &&
          JSON.stringify(dataCollected) !== initialResponse) ||
        (state === NOT_STARTED && dataWithoutNullArray.length > 0)
      ) {
        setState(INIT);
      }
    }

    // Assume we want to update only this when questionnaire is updated
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [questionnaire]);

  return [state, setState];
};
