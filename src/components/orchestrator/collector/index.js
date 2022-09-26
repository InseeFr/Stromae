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
import { useQuestionnaireState, VALIDATED } from 'utils/hooks/questionnaire';
import { simpleLog } from 'utils/events';
import '../custom-lunatic.scss';

export const OrchestratorContext = React.createContext();

const useStyles = makeStyles(theme => ({
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
    // marginBottom: '10px',
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

  const { stateData, data } = stromaeData;

  const [validated, setValidated] = useState(
    stateData?.state === 'VALIDATED' ||
      stateData?.state === 'EXTRACTED' ||
      stateData?.state === 'TOEXTRACT'
  );
  const [currentStateData, setCurrentStateData] = useState(stateData);

  const { lunaticFetcher: suggesterFetcher } = useLunaticFetcher();
  const logFunction = e => simpleLog({ ...e, page: currentPage });
  const {
    getComponents,
    waiting,
    pager: { page = '1' },
    goNextPage,
    goPreviousPage,
    isFirstPage,
    isLastPage,
    setPage = () => console.log('TODO lunatic'),
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

  //TODO Check compatibility deeper
  const [state, setState] = useQuestionnaireState(source, stateData?.state);

  const updateStateData = lastState => {
    const newStateData = {
      state: lastState || state,
      date: new Date().getTime(),
      currentPage: currentPage,
    };
    setCurrentStateData(newStateData);
    return newStateData;
  };

  const logoutAndClose = async () => {
    if (!validated) {
      const dataToSave = {
        stateData: updateStateData(),
        data: getData(),
      };
      await save(dataToSave);
    }
    quit();
  };

  const [currentPage, setCurrentPage] = useState(() => {
    if (!validated && stateData?.currentPage) {
      if (isLunaticPage(stateData?.currentPage)) {
        setPage(stateData?.currentPage);
      }
      return stateData?.currentPage;
    }
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
      stateData: updateStateData(VALIDATED),
      data: getData(),
    };
    save(dataToSave);
    setCurrentPage(END_PAGE);
  };
  const onNext = () => {
    if (currentPage === WELCOME_PAGE) setCurrentPage(page);
    else {
      const dataToSave = {
        stateData: updateStateData(),
        data: getData(),
      };
      if (!isLastPage) {
        const { componentType } = components;
        if (componentType === 'Sequence') save(dataToSave);
        goNextPage();
      } else {
        save(dataToSave);
        setCurrentPage(VALIDATION_PAGE);
      }
    }
    goToTop();
  };

  useEffect(() => {
    if (isLunaticPage(currentPage)) setCurrentPage(page);
  }, [currentPage, page]);

  const onPrevious = () => {
    if (currentPage === VALIDATION_PAGE) setCurrentPage(page);
    else {
      if (!isFirstPage) goPreviousPage();
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
    stateData: currentStateData,
    currentPage,
    readonly,
  };

  const components = getComponents();
  const modalErrors = getModalErrors();
  const currentErrors = getCurrentErrors();

  const lunaticDisplay = () =>
    components.map(component => {
      const { id, componentType, response, storeName, ...other } = component;
      const Component = lunatic[componentType];
      return (
        <Card
          className={`lunatic lunatic-component ${componentType} ${classes.component}`}
          key={`component-${id}`}
        >
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
              labelPosition="TOP" //For LunaticSuggester
              logFunction={logFunction}
              filterDescription={false}
              errors={currentErrors}
              {...other}
              {...component}
            />
          </div>
        </Card>
      );
    });

  return (
    <StyleWrapper metadata={metadata}>
      <OrchestratorContext.Provider value={context}>
        <BurgerMenu title={source?.label.value} />
        <AppBar title={source?.label.value} />
        <Container
          maxWidth="md"
          component="main"
          role="main"
          id="main"
          ref={topRef}
          className={classes.root}
        >
          {currentPage === WELCOME_PAGE && <WelcomePage />}
          {isLunaticPage(currentPage) && lunaticDisplay()}
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
        {modalForControls && (
          <lunatic.Modal
            title="Des points requièrent votre attention."
            errors={modalErrors}
            goNext={goNextPage}
          />
        )}
        <WelcomeBack
          open={!init && !validated && !!stateData?.currentPage}
          setOpen={o => setInit(!o)}
          goToFirstPage={() => {
            setCurrentPage(WELCOME_PAGE);
            setPage('1');
          }}
        />
        <SendingConfirmation
          open={validationConfirmation}
          setOpen={setValidationConfirmation}
        />
        {waiting && <LoaderSimple />}
      </OrchestratorContext.Provider>
    </StyleWrapper>
  );
};
