import React, { useEffect, useState, useRef } from 'react';
import * as lunatic from '@inseefr/lunatic';
import { Card, Container, makeStyles } from '@material-ui/core';
import { AppBar } from 'components/navigation/appBar';
import { LoaderSimple } from 'components/shared/loader';
import { WelcomeBack } from 'components/modals/welcomeBack';
import { ButtonsNavigation } from '../navigation';
import { SendingConfirmation } from 'components/modals/sendingConfirmation';
import {
  WELCOME_PAGE,
  END_PAGE,
  isLunaticPage,
  VALIDATION_PAGE,
} from 'utils/pagination';
import { EndPage, ValidationPage, WelcomePage } from 'components/genericPages';
import { useQuestionnaireState, VALIDATED } from 'utils/hooks/questionnaire';

export const OrchestratorContext = React.createContext();

const useStyles = makeStyles(theme => ({
  root: {
    flex: '1 1 auto',
    backgroundColor: 'whitesmoke',
    padding: '0',
    paddingTop: '1em',
    paddingBottom: '3em',
  },
  component: {
    padding: '10px',
    overflow: 'visible',
    marginBottom: '10px',
    '& *': { fontFamily: '"Roboto", "Helvetica", "Arial", sans-serif' },
  },
}));

export const Orchestrator = ({
  source,
  logoutAndClose: quit,
  stromaeData,
  metadata,
  save,
  savingType,
  preferences,
  features,
  pagination,
}) => {
  const classes = useStyles();
  const topRef = useRef();
  const [init, setInit] = useState(false);
  const [validationConfirmation, setValidationConfirmation] = useState(false);

  const { stateData, data } = stromaeData;

  const [validated, setValidated] = useState(stateData?.state === 'VALIDATED');

  const [waiting /*, setWaiting*/] = useState(false);
  const {
    questionnaire,
    components,
    handleChange,
    bindings,
    pagination: {
      goNext,
      goPrevious,
      page,
      setPage,
      isFirstPage,
      isLastPage,
      flow,
    },
  } = lunatic.useLunatic(source, data, {
    savingType,
    preferences,
    features,
    pagination,
  });

  const [state, setState] = useQuestionnaireState(
    questionnaire,
    stateData?.state
  );

  const logoutAndClose = () => {
    quit({
      ...stromaeData,
      stateData: {
        state: state,
        date: new Date().getTime(),
        currentPage: currentPage,
      },
      data: lunatic.getState(questionnaire),
    });
  };

  const [currentPage, setCurrentPage] = useState(() => {
    if (!validated && stateData?.currentPage) return stateData?.currentPage;
    if (validated) return END_PAGE;
    return WELCOME_PAGE;
  });

  const goToTop = () => {
    if (topRef && topRef.current) {
      topRef.current.tabIndex = -1;
      topRef.current.focus();
      topRef.current.blur();
      window.scrollTo({ top: 0 });
      topRef.current.removeAttribute('tabindex');
    }
  };
  const validateQuestionnaire = () => {
    setValidated(true);
    setState(VALIDATED);
    const dataToSave = {
      ...stromaeData,
      stateData: {
        state: VALIDATED,
        date: new Date().getTime(),
        currentPage: currentPage,
      },
      data: lunatic.getState(questionnaire),
    };
    save(dataToSave);
    setCurrentPage(END_PAGE);
  };
  const onNext = () => {
    const dataToSave = {
      ...stromaeData,
      stateData: {
        state: 'INIT',
        date: new Date().getTime(),
        currentPage: currentPage,
      },
      data: lunatic.getState(questionnaire),
    };
    save(dataToSave);
    if (currentPage === WELCOME_PAGE) setCurrentPage(page);
    else {
      if (!isLastPage) goNext();
      else setCurrentPage(VALIDATION_PAGE);
    }
    goToTop();
  };

  useEffect(() => {
    if (isLunaticPage(currentPage)) setCurrentPage(page);
  }, [currentPage, page]);

  const onPrevious = () => {
    if (currentPage === VALIDATION_PAGE) setCurrentPage(page);
    else {
      if (!isFirstPage) goPrevious();
      else setCurrentPage(WELCOME_PAGE);
    }
  };

  const context = {
    metadata,
    validated,
    validateQuestionnaire,
    setValidationConfirmation,
    logoutAndClose,
    ...stromaeData,
    lunaticOptions: { preferences, features, pagination },
  };

  return (
    <OrchestratorContext.Provider value={context}>
      <AppBar title={questionnaire?.label} />
      <Container
        maxWidth="md"
        component="main"
        role="main"
        id="main"
        ref={topRef}
        className={classes.root}
      >
        {currentPage === WELCOME_PAGE && <WelcomePage />}
        {isLunaticPage(currentPage) &&
          components.map(q => {
            const { id, componentType } = q;
            const Component = lunatic[componentType];
            if (componentType !== 'FilterDescription')
              return (
                <Card
                  className={`lunatic lunatic-component ${componentType} ${classes.component}`}
                  key={`component-${id}`}
                >
                  <div className="lunatic-component" key={`component-${id}`}>
                    <Component
                      {...q}
                      handleChange={handleChange}
                      labelPosition="TOP"
                      preferences={preferences}
                      features={features}
                      bindings={bindings}
                      writable
                      unitPosition="AFTER"
                      currentPage={page}
                      setPage={setPage}
                      flow={flow}
                      pagination={pagination}
                    />
                  </div>
                </Card>
              );
            return null;
          })}
        {currentPage === VALIDATION_PAGE && <ValidationPage />}
        {currentPage === END_PAGE && <EndPage />}
      </Container>
      {!validated && (
        <ButtonsNavigation
          onNext={onNext}
          onPrevious={onPrevious}
          currentPage={currentPage}
          validateQuestionnaire={() => setValidationConfirmation(true)}
        />
      )}

      <WelcomeBack
        open={!init && !validated && !!stateData?.currentPage}
        setOpen={o => setInit(!o)}
        goToFirstPage={() => setCurrentPage(0)}
      />
      <SendingConfirmation
        open={validationConfirmation}
        setOpen={setValidationConfirmation}
      />
      {waiting && <LoaderSimple />}
    </OrchestratorContext.Provider>
  );
};
