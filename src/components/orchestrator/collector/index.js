import * as lunatic from '@inseefr/lunatic';
import Card from '@material-ui/core/Card';
import Container from '@material-ui/core/Container';
import { makeStyles } from '@material-ui/core/styles';
import { EndPage, ValidationPage, WelcomePage } from 'components/genericPages';
import { ErrorsModal } from 'components/modals/errors';
import { SendingConfirmation } from 'components/modals/sendingConfirmation';
import { WelcomeBack } from 'components/modals/welcomeBack';
import { AppBar } from 'components/navigation/appBar';
import { BurgerMenu } from 'components/navigation/burgerMenu';
import { LoaderSimple } from 'components/shared/loader';
import { useCallback, useEffect, useRef, useState } from 'react';
import { simpleLog } from 'utils/events';
import { useLunaticFetcher } from 'utils/hooks';
import {
  END_PAGE,
  isLunaticPage,
  VALIDATION_PAGE,
  WELCOME_PAGE,
} from 'utils/pagination';
import { isNewSequence } from 'utils/questionnaire';
import { INIT, VALIDATED } from 'utils/questionnaire/stateData';
import '../custom-lunatic.scss';
import { ButtonsNavigation } from '../navigation';
import { StyleWrapper } from '../styleWrapper';

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
    pageTag,
    pager: { page },
    goNextPage,
    goPreviousPage,
    isFirstPage,
    isLastPage,
    compileControls,
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

  const components = getComponents();

  const [currentPage, setCurrentPage] = useState(() => {
    if (validated) return END_PAGE;
    if (stateData?.currentPage) {
      return page;
    }
    return WELCOME_PAGE;
  });

  const updateStateData = useCallback(
    (newState) => {
      const newStateData = {
        state: newState ?? INIT,
        date: new Date().getTime(),
        currentPage: currentPage,
      };
      setCurrentStateData(newStateData);
      return newStateData;
    },
    [currentPage]
  );

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

  const [errorActive, setErrorActive] = useState({});
  const [errorsForModal, setErrorsForModal] = useState(null);
  const closeErrorsModal = useCallback(() => setErrorsForModal(undefined), []);

  const handleGoNext = useCallback(
    (skipValidation, nextFunction) => {
      if (skipValidation) nextFunction();
      else {
        const { currentErrors, isCritical } = compileControls();
        setErrorActive({ ...errorActive, [pageTag]: currentErrors || {} });
        if (currentErrors && Object.keys(currentErrors).length > 0) {
          setErrorsForModal({ currentErrors, isCritical });
        } else nextFunction();
      }
    },
    [compileControls, errorActive, pageTag]
  );

  const onNext = useCallback(
    (event, skipValidation = false) => {
      closeErrorsModal();
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
          handleGoNext(skipValidation, goNextPage);
        } else {
          save(dataToSave);
          handleGoNext(skipValidation, () => setCurrentPage(VALIDATION_PAGE));
        }
      }
      goToTop();
    },
    [
      closeErrorsModal,
      components,
      currentPage,
      getData,
      handleGoNext,
      isLastPage,
      page,
      save,
      updateStateData,
    ]
  );

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
              errors={errorActive[pageTag]}
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
      {errorsForModal && (
        <ErrorsModal
          currentPage={currentPage}
          errors={errorsForModal}
          goNext={onNext}
          onClose={closeErrorsModal}
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
