import React, { useCallback, useState } from 'react';
import * as lunatic from '@inseefr/lunatic';
import { Container, makeStyles } from '@material-ui/core';
import { AppBar } from 'components/navigation/appBar';
import Pagination from '../pagination';
//import '../custom-lunatic.scss';
import { LoaderSimple } from 'components/shared/loader';
import { WelcomeBack } from 'components/modals/welcomeBack';
import { addConstantPages } from 'utils/questionnaire/build';
import { ButtonsNavigation } from '../navigation';
import { SendingConfirmation } from 'components/modals/sendingConfirmation';
import { getListOfPages } from 'utils/pagination';

export const OrchestratorContext = React.createContext();

const useStyles = makeStyles(theme => ({
  root: {
    flex: '1 1 auto',
    backgroundColor: 'whitesmoke',
    padding: '0',
    paddingTop: '1em',
    paddingBottom: '3em',
  },
}));

export const Orchestrator = ({
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

  const { stateData, data } = stromaeData;

  const [validated, setValidated] = useState(stateData?.state === 'VALIDATED');

  const [currentIndex, setCurrentIndex] = useState(() => {
    if (stateData?.currentPage && !validated) return stateData?.currentPage;
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

  const goToTop = () => {
    // const a = document.createElement('a');
    // a.href = '#main';
    // a.click();
    // a.remove();
  };
  const validateQuestionnaire = () => {
    setValidated(true);
    const dataToSave = {
      stateData: {
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
      stateData: {
        state: 'STARTED',
        date: new Date().getTime(),
        currentPage: currentIndex,
      },
      data: lunatic.getState(questionnaire),
    };
    save(dataToSave);
    setCurrentIndex(currentIndex + 1);
    goToTop();
  }, [questionnaire, currentIndex, save]);

  const onPrevious = () => {
    setCurrentIndex(currentIndex - 1);
  };

  const listOfSequence = getListOfPages('sequence')(components);
  const allPages = addConstantPages(listOfSequence)(validated);

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
        role="main"
        id="main"
        className={classes.root}
      >
        <Pagination
          components={components}
          allPages={allPages}
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
          maxPage={allPages.length}
          validateQuestionnaire={() => setValidationConfirmation(true)}
        />
      )}

      <WelcomeBack
        open={!init && !validated && !!stateData?.currentPage}
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
