import React, { useEffect, useState, useRef } from 'react';
import * as lunatic from '@inseefr/lunatic';
import { Card, Container, makeStyles } from '@material-ui/core';
import { AppBar } from 'components/navigation/appBar';
import { BurgerMenu } from 'components/navigation/burgerMenu';
import { LoaderSimple } from 'components/shared/loader';
import { WelcomeBack } from 'components/modals/welcomeBack';
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
  readonly,
  suggesters,
  autoSuggesterLoading,
}) => {
  const classes = useStyles();
  const topRef = useRef();
  const [init, setInit] = useState(false);
  const [validationConfirmation, setValidationConfirmation] = useState(false);

  const { stateData, data } = stromaeData;

  const [validated, setValidated] = useState(stateData?.state === 'VALIDATED');
  const [currentStateData, setCurrentStateData] = useState(stateData);

  const [waiting /*, setWaiting*/] = useState(false);
  const { lunaticFetcher: suggesterFetcher } = useLunaticFetcher();
  const logFunction = e => simpleLog({ ...e, page: currentPage });
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
    suggesters,
    autoSuggesterLoading,
    suggesterFetcher,
    logFunction,
  });

  const [state, setState] = useQuestionnaireState(
    questionnaire,
    stateData?.state
  );

  const updateStateData = lastState => {
    const newStateData = {
      state: lastState || state,
      date: new Date().getTime(),
      currentPage: currentPage,
    };
    setCurrentStateData(newStateData);
    return newStateData;
  };

  const logoutAndClose = () => {
    quit({
      ...stromaeData,
      stateData: updateStateData(),
      data: lunatic.getState(questionnaire),
    });
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
      ...stromaeData,
      stateData: updateStateData(VALIDATED),
      data: lunatic.getState(questionnaire),
    };
    save(dataToSave);
    setCurrentPage(END_PAGE);
  };
  const onNext = () => {
    const dataToSave = {
      ...stromaeData,
      stateData: updateStateData(),
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
    stateData: currentStateData,
    currentPage,
    readonly,
    lunaticOptions: { preferences, features, pagination },
  };

  const displayComponents = function () {
    const structure = components.reduce((acc, curr) => {
      if (curr.componentType === 'Sequence') {
        acc[curr.id] = [];
        return acc;
      }
      if (curr.componentType === 'Subsequence') {
        acc[curr.id] = [];
        if (
          curr.hierarchy &&
          curr.hierarchy.sequence &&
          !!acc[curr.hierarchy.sequence.id]
        ) {
          acc[curr.hierarchy.sequence.id].push(curr);
        }
        return acc;
      }
      if (
        curr.hierarchy &&
        curr.hierarchy.subSequence &&
        !!acc[curr.hierarchy.sequence.id]
      ) {
        acc[curr.hierarchy.subSequence.id].push(curr);
      } else if (
        curr.hierarchy &&
        curr.hierarchy.sequence &&
        acc[curr.hierarchy.sequence.id]
      ) {
        acc[curr.hierarchy.sequence.id].push(curr);
      }
      return acc;
    }, {});
    return components.map(comp => {
      if (shouldBeDisplayed(structure, comp)) {
        return displayComponent(structure, comp);
      }
      return null;
    });
  };

  const shouldBeDisplayed = function (structure, comp) {
    const { hierarchy } = comp;
    if (!hierarchy) {
      return true;
    }
    if (!hierarchy.sequence) {
      if (
        !hierarchy.subSequence ||
        !structure[hierarchy.subSequence.id] ||
        hierarchy.subSequence.id === comp.id
      ) {
        return true;
      }
      return false;
    }
    if (
      !structure[hierarchy.sequence.id] ||
      hierarchy.sequence.id === comp.id
    ) {
      return true;
    }
    return false;
  };

  const displayComponent = function (componentsStructure, comp) {
    const { id, componentType } = comp;
    const Component = lunatic[componentType];
    if (componentType !== 'FilterDescription') {
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
              {...comp}
              handleChange={handleChange}
              labelPosition="TOP"
              preferences={preferences}
              features={features}
              bindings={bindings}
              writable
              readOnly={readonly}
              disabled={readonly}
              unitPosition="AFTER"
              currentPage={page}
              setPage={setPage}
              flow={flow}
              pagination={pagination}
              logFunction={logFunction}
            />
            {displaySubComponents(componentsStructure, componentType, id)}
          </div>
        </Card>
      );
    } else {
      return null;
    }
  };

  const displaySubComponents = function (
    componentsStructure,
    componentType,
    compId
  ) {
    const subComponents = componentsStructure[compId];
    if (subComponents && subComponents.length) {
      return (
        <div className={`subElementsInnerContainer-${componentType}`}>
          {subComponents.map(q => displayComponent(componentsStructure, q))}
        </div>
      );
    }
    return null;
  };

  return (
    <OrchestratorContext.Provider value={context}>
      <BurgerMenu title={questionnaire?.label} />
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
        {isLunaticPage(currentPage) && displayComponents()}
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
  );
};
