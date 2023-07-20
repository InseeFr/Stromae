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
import { useCallback, useEffect, useMemo, useRef, useState } from 'react';
import { simpleLog } from 'utils/events';
import {
  END_PAGE,
  FORM_PAGE,
  isLunaticPage,
  VALIDATION_PAGE,
  WELCOME_PAGE,
} from 'utils/pagination';
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
  getReferentiel,
  readonly,
  autoSuggesterLoading,
}) => {
  const classes = useStyles();
  const topRef = useRef();
  const [init, setInit] = useState(false);
  const [validationConfirmation, setValidationConfirmation] = useState(false);

  const { stateData, data, personalization } = stromaeData;

  const [validated, setValidated] = useState(
    stateData &&
      (stateData.state === 'VALIDATED' ||
        stateData.state === 'EXTRACTED' ||
        stateData.state === 'TOEXTRACT')
  );
  const {
    getComponents,
    waiting,
    pageTag,
    pager: { page },
    goToPage,
    goNextPage,
    goPreviousPage,
    isFirstPage,
    isLastPage,
    compileControls,
    getData,
  } = lunatic.useLunatic(source, data, {
    features,
    preferences,
    autoSuggesterLoading,
    getReferentiel,
    activeControls,
  });

  const logFunction = (e) => simpleLog({ ...e, page: currentPage });

  // Control whether to display the modal to go back to the previous state
  const showBackModal = !init && !validated && !!stateData?.currentPage;

  // Indicate in which state the orchestrator is, with stromae we need a welcome page before the form and an end page after
  const [orchestratorState, setOrchestratorState] = useState(() => {
    if (validated) {
      return END_PAGE;
    }
    if (showBackModal) {
      return WELCOME_PAGE;
    }
    if (stateData?.currentPage) {
      return FORM_PAGE;
    }
    return WELCOME_PAGE;
  });

  const currentStateData = useMemo(
    () => ({
      state: orchestratorState === END_PAGE ? VALIDATED : INIT,
      date: new Date().getTime(),
      currentPage:
        orchestratorState === FORM_PAGE ? pageTag : orchestratorState,
    }),
    [pageTag, orchestratorState]
  );
  const currentPage =
    orchestratorState === FORM_PAGE ? pageTag : orchestratorState;

  // Persist state data on every change so the user can come back to where he was
  useEffect(() => {
    // Do not save before the user start the questionnaire
    if (showBackModal) {
      return;
    }
    save(currentStateData);
  }, [currentStateData, save, showBackModal]);

  const components = getComponents();

  const logoutAndClose = async () => {
    let dataToSave = { stateData: currentStateData, data: getData() };
    if (!validated) {
      await save(dataToSave);
    }
    quit(dataToSave);
  };

  // Scroll at the top of the form
  const goToTop = () => {
    if (topRef.current) {
      topRef.current.tabIndex = -1;
      topRef.current.focus();
      topRef.current.blur();
      window.scrollTo({ top: 0 });
      topRef.current.removeAttribute('tabindex');
    }
  };
  const validateQuestionnaire = () => {
    setValidated(true);
    setOrchestratorState(END_PAGE);
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
      if (orchestratorState === WELCOME_PAGE) {
        setOrchestratorState(FORM_PAGE);
      } else {
        if (!isLastPage) {
          handleGoNext(skipValidation, goNextPage);
        } else {
          handleGoNext(skipValidation, () =>
            setOrchestratorState(VALIDATION_PAGE)
          );
        }
      }
      goToTop();
    },
    [
      closeErrorsModal,
      components,
      orchestratorState,
      getData,
      goNextPage,
      handleGoNext,
      isLastPage,
      page,
    ]
  );

  const onPrevious = () => {
    if (orchestratorState === VALIDATION_PAGE) setOrchestratorState(FORM_PAGE);
    else {
      if (!isFirstPage) goPreviousPage();
      else setOrchestratorState(WELCOME_PAGE);
    }
  };

  const restoreSavedPage = () => {
    // stateData currentPage can be "welcomePage" instead of a normal page number
    if (isLunaticPage(stateData?.currentPage)) {
      goToPage({ page: stateData?.currentPage });
      setOrchestratorState(FORM_PAGE);
    } else {
      setOrchestratorState(stateData?.currentPage);
    }
  };

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
        {orchestratorState === WELCOME_PAGE && (
          <WelcomePage metadata={metadata} personalization={personalization} />
        )}
        {orchestratorState === FORM_PAGE && lunaticDisplay()}
        {
          <div>
            <b>
              PageTag : {pageTag} - CurrentPage : {currentPage}
            </b>
          </div>
        }
        {orchestratorState === VALIDATION_PAGE && (
          <ValidationPage
            metadata={metadata}
            setValidationConfirmation={setValidationConfirmation}
          />
        )}
        {orchestratorState === END_PAGE && (
          <EndPage
            logoutAndClose={logoutAndClose}
            metadata={metadata}
            stateData={currentStateData}
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
        open={showBackModal}
        setOpen={(o) => setInit(!o)}
        goBackToSavedPage={restoreSavedPage}
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
