import React, { useEffect, useState, useRef } from 'react';
import * as lunatic from '@inseefr/lunatic';
import { makeStyles } from '@material-ui/core/styles';
import Card from '@material-ui/core/Card';
import Container from '@material-ui/core/Container';
import { AppBar } from 'components/navigation/appBar';
import { BurgerMenu } from 'components/navigation/burgerMenu';
import { LoaderSimple } from 'components/shared/loader';
import { WelcomeBack } from 'components/modals/welcomeBack';
import { StyleWrapper } from '../styleWrapper';
import { ButtonsNavigation } from '../navigation';
import { useLunaticFetcher } from 'utils/hooks';
import { SendingConfirmation } from 'components/modals/sendingConfirmation';
import {
  WELCOME_PAGE,
  END_PAGE,
  isLunaticPage,
  VALIDATION_PAGE,
} from 'utils/pagination';
import { EndPage, ValidationPage, WelcomePage } from 'components/genericPages';
import { INIT, VALIDATED } from 'utils/questionnaire/stateData';
import { simpleLog } from 'utils/events';
import '../custom-lunatic.scss';
import { isNewSequence } from 'utils/questionnaire';

export const Orchestrator = ({
  source,
  logoutAndClose: quit,
  stromaeData,
  metadata,
  save,
  savingType,
  preferences,
  features,
  activeControls,
  modalForControls,
  readonly,
  suggesters,
  autoSuggesterLoading,
}) => {
  const classes = useStyles();
  const topRef = useRef();
  const [init, setInit] = useState(false);
  const [validationConfirmation, setValidationConfirmation] = useState(false);

  const { stateData, data, personalization } = stromaeData;
  const [currentStateData, setCurrentStateData] = useState(stateData);

  const [validated, setValidated] = useState(
    stateData &&
      (stateData.state === 'VALIDATED' ||
        stateData.state === 'EXTRACTED' ||
        stateData.state === 'TOEXTRACT')
  );

  const { lunaticFetcher: suggesterFetcher } = useLunaticFetcher();
  const logFunction = (e) => simpleLog({ ...e, page: currentPage });
  const {
    getComponents,
    waiting,
    pager: { page },
    goNextPage,
    goPreviousPage,
    isFirstPage,
    isLastPage,
    getModalErrors,
    getCurrentErrors,
    getData,
  } = lunatic.useLunatic(source, data, {
    savingType,
    preferences,
    features,
    activeControls,
    suggesters,
    autoSuggesterLoading,
    suggesterFetcher,
    logFunction,
  });

  const updateStateData = (newState) => {
    const newStateData = {
      state: newState ?? INIT,
      date: new Date().getTime(),
      currentPage: currentPage,
    };
    setCurrentStateData(newStateData);
    return newStateData;
  };

  const logoutAndClose = async () => {
    if (!validated) {
      const logoutAndCloseUpdateState = updateStateData();
      const dataToSave = {
        stateData: logoutAndCloseUpdateState,
        data: getData(),
      };
      await save(dataToSave);
    }
    quit();
  };

  const [currentPage, setCurrentPage] = useState(() => {
    if (validated) return END_PAGE;
    if (stateData?.currentPage) {
      return page;
    }
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
    const validateUpdateState = updateStateData(VALIDATED);
    const dataToSave = {
      stateData: validateUpdateState,
      data: getData(),
    };
    save(dataToSave);
    setCurrentPage(END_PAGE);
  };

  const onNext = () => {
    if (currentPage === WELCOME_PAGE) setCurrentPage(page);
    else {
      const onNextUpdateState = updateStateData();
      const dataToSave = {
        stateData: onNextUpdateState,
        data: getData(),
      };
      if (!isLastPage) {
        if (isNewSequence(components)) {
          save(dataToSave);
        }
        goNextPage();
      } else {
        save(dataToSave);
        setCurrentPage(VALIDATION_PAGE);
      }
    }
    goToTop();
  };

  const onPrevious = () => {
    if (currentPage === VALIDATION_PAGE) setCurrentPage(page);
    else {
      if (!isFirstPage) goPreviousPage();
      else setCurrentPage(WELCOME_PAGE);
    }
  };

  useEffect(() => {
    if (isLunaticPage(currentPage)) {
      setCurrentPage(page);
    }
  }, [currentPage, page]);

  const components = getComponents();
  const modalErrors = getModalErrors();
  const currentErrors = getCurrentErrors();

  const lunaticDisplay = () => (
    <Card
      className={`lunatic lunatic-component ${classes.component}`}
      key={`component`}
    >
      {components.map((component) => {
        const { id, componentType, response, storeName, ...other } = component;
        const Component = lunatic[componentType];
        return (
          <div
            className={`lunatic-component outerContainer-${componentType}`}
            key={`component-${id}`}
          >
            <Component
              id={id}
              response={response}
              savingType={savingType}
              preferences={preferences}
              readOnly={readonly}
              disabled={readonly}
              labelPosition='TOP' //For LunaticSuggester
              logFunction={logFunction}
              filterDescription={false}
              errors={currentErrors}
              {...other}
              {...component}
            />
          </div>
        );
      })}
    </Card>
  );

  return (
    <StyleWrapper metadata={metadata}>
      <BurgerMenu
        title={source?.label.value}
        metadata={metadata}
        currentPage={currentPage}
        logoutAndClose={logoutAndClose}
      />
      <AppBar title={source?.label.value} metadata={metadata} />
      <Container
        maxWidth='md'
        component='main'
        role='main'
        id='main'
        ref={topRef}
        className={classes.root}
      >
        {currentPage === WELCOME_PAGE && (
          <WelcomePage metadata={metadata} personalization={personalization} />
        )}
        {isLunaticPage(currentPage) && lunaticDisplay()}
        {currentPage === VALIDATION_PAGE && (
          <ValidationPage
            metadata={metadata}
            setValidationConfirmation={setValidationConfirmation}
            currentPage={currentPage}
          />
        )}
        {currentPage === END_PAGE && (
          <EndPage
            logoutAndClose={logoutAndClose}
            metadata={metadata}
            stateData={currentStateData}
            currentPage={currentPage}
            personalization={personalization}
          />
        )}
      </Container>
      {!validated && (
        <ButtonsNavigation
          onNext={onNext}
          onPrevious={onPrevious}
          currentPage={currentPage}
          validateQuestionnaire={() => setValidationConfirmation(true)}
        />
      )}
      {modalForControls && (
        <lunatic.Modal
          title='Des points requièrent votre attention.'
          errors={modalErrors}
          goNext={goNextPage}
        />
      )}
      <WelcomeBack
        open={!init && !validated && !!stateData?.currentPage}
        setOpen={(o) => setInit(!o)}
        goToFirstPage={() => {
          setCurrentPage(WELCOME_PAGE);
        }}
      />
      <SendingConfirmation
        open={validationConfirmation}
        setOpen={setValidationConfirmation}
        metadata={metadata}
        validateQuestionnaire={validateQuestionnaire}
        currentPage={currentPage}
      />
      {waiting && <LoaderSimple />}
    </StyleWrapper>
  );
};

const useStyles = makeStyles((theme) => ({
  root: {
    flex: '1 1 auto',
    backgroundColor: 'whitesmoke',
    padding: '0',
    paddingTop: '1em',
    paddingBottom: '3em',
    marginBottom: '30px',
  },
  component: {
    padding: '10px',
    overflow: 'visible',
    '& *': { fontFamily: '"Roboto", "Helvetica", "Arial", sans-serif' },
  },
}));
