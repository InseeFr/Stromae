import React, { useCallback, useState } from 'react';
import * as lunatic from '@inseefr/lunatic';
import { Container, makeStyles } from '@material-ui/core';
import { AppBar } from 'components/navigation/appBar';
import Pagination from '../pagination';
import '../custom-lunatic.scss';
import { LoaderSimple } from 'components/shared/loader';
import { WelcomeBack } from 'components/modals/welcomeBack';
import { addConstantPages } from 'utils/questionnaire/build';
import { ButtonsNavigation } from '../navigation';
import { SendingConfirmation } from 'components/modals/sendingConfirmation';

export const OrchestratorContext = React.createContext();

const useStyles = makeStyles(theme => ({
  root: {
    flex: '1 1 auto',
    backgroundColor: 'whitesmoke',
    padding: '1em',
    paddingBottom: '3em',
  },
}));

const Orchestrator = ({
  source,
  stromaeData,
  metadata,
  save,
  savingType,
  preferences,
  features,
}) => {
  const classes = useStyles();
  const [init, setInit] = useState(false);
  const [validationConfirmation, setValidationConfirmation] = useState(false);

  const { questionnaireState, data } = stromaeData;

  const [validated, setValidated] = useState(
    questionnaireState.state === 'VALIDATED'
  );

  const [currentIndex, setCurrentIndex] = useState(() => {
    if (questionnaireState.currentPage && !validated)
      return questionnaireState.currentPage;
    if (validated) return -1;
    return 0;
  });

  const [waiting /*, setWaiting*/] = useState(false);

  const {
    questionnaire,
    components,
    handleChange,
    bindings,
  } = lunatic.useLunatic(source, data, {
    savingType,
    preferences,
    features,
  });

  const validateQuestionnaire = () => {
    setValidated(true);
    const dataToSave = {
      ...stromaeData,
      context: {
        state: 'VALIDATED',
        date: new Date().getTime(),
        currentPage: currentIndex,
      },
      data: lunatic.getState(questionnaire),
    };
    save(dataToSave);
    setCurrentIndex(currentIndex + 1);
  };
  const onNext = useCallback(async () => {
    const dataToSave = {
      ...stromaeData,
      utils: { currentPage: currentIndex },
      questionnaire: {
        state: 'STARTED',
        date: new Date().getTime(),
      },
      data: lunatic.getState(questionnaire),
    };
    save(dataToSave);
    setCurrentIndex(currentIndex + 1);
  }, [questionnaire, currentIndex, save, stromaeData]);

  const onPrevious = () => {
    setCurrentIndex(currentIndex - 1);
  };

  const fullQuestionnaire = addConstantPages(components)(validated);

  const context = {
    metadata,
    validated,
    validateQuestionnaire,
    ...stromaeData,
    lunaticOptions: { preferences, features },
  };

  return (
    <OrchestratorContext.Provider value={context}>
      <AppBar title={questionnaire?.label} />
      <Container
        maxWidth="md"
        component="main"
        id="main"
        className={classes.root}
      >
        <Pagination
          components={fullQuestionnaire}
          handleChange={handleChange}
          bindings={bindings}
          currentPage={currentIndex}
          setCurrentPage={setCurrentIndex}
          validateQuestionnaire={() => setValidationConfirmation(true)}
        />
      </Container>
      {!validated && (
        <ButtonsNavigation
          onNext={onNext}
          onPrevious={onPrevious}
          currentIndex={currentIndex}
          maxPage={fullQuestionnaire.length}
          validateQuestionnaire={() => setValidationConfirmation(true)}
        />
      )}

      <WelcomeBack
        open={!init && !validated && !!questionnaireState.currentPage}
        setOpen={o => setInit(!o)}
        goToFirstPage={() => setCurrentIndex(0)}
      />
      <SendingConfirmation
        open={validationConfirmation}
        setOpen={setValidationConfirmation}
      />
      {waiting && <LoaderSimple />}
    </OrchestratorContext.Provider>
  );
};
export default Orchestrator;
