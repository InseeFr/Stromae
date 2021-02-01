import { WelcomePage, EndPage, ValidationPage } from '../genericPages';
import React, { useCallback, useEffect, useState } from 'react';
import * as lunatic from '@inseefr/lunatic';
import { Button, Card, Typography } from '@material-ui/core';
import Pagination from '../pagination';
import '../custom-lunatic.scss';
import { LoaderSimple } from 'components/shared/loader';
import { WelcomeBack } from 'components/modals/welcomeBack';
import { Skeleton } from '@material-ui/lab';

const Orchestrator = ({
  source,
  stromaeData,
  save,
  savingType,
  preferences,
  features,
}) => {
  const [init, setInit] = useState(false);

  const { validated, currentPage, data } = stromaeData;

  const [currentIndex, setCurrentIndex] = useState(() => {
    if (currentPage && !validated) return currentPage;
    if (validated) return -1;
    return 0;
  });
  const [lastIndex, setLastIndex] = useState(null);

  const [validatedQuestionnaire, setValidated] = useState(validated);
  const [waiting, setWaiting] = useState(false);

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
    console.log('validate');
    setValidated(true);
    setCurrentIndex(currentIndex + 1);
  };

  const onNext = useCallback(() => {
    const stateToSave = lunatic.getState(questionnaire);

    const dataToSave = {
      currentPage: currentIndex,
      validated: validatedQuestionnaire,
      data: stateToSave,
    };
    save(dataToSave);
  }, [questionnaire, currentIndex, validatedQuestionnaire, save]);

  const componentFilterd = components.filter(({ page }) => page);

  const componentsToDisplay = componentFilterd.map(q => {
    const { id, componentType } = q;
    const Component = lunatic[componentType];
    const comp = (
      <Card
        className="lunatic lunatic-component"
        key={`component-${id}`}
        style={{ padding: '10px', overflow: 'visible' }}
      >
        <Component
          {...q}
          handleChange={handleChange}
          labelPosition="TOP"
          preferences={preferences}
          features={features}
          bindings={bindings}
          writable
          zIndex={1}
        />
      </Card>
    );
    return comp;
  });

  const constantPage = [
    <WelcomePage key={'welcome'} />,
    ...componentsToDisplay,
    <ValidationPage key={'validation'} validate={validateQuestionnaire} />,
  ];

  const componentsPages = validatedQuestionnaire
    ? [...constantPage, <EndPage key={'end'} setWaiting={setWaiting} />]
    : constantPage;

  const { sequence, subsequence } = componentFilterd[currentIndex - 1] || {};
  return (
    <>
      {sequence && (
        <Card
          style={{
            marginRight: '10px',
            marginLeft: '10px',
            marginBottom: '10px',
            padding: '10px',
          }}
        >
          <Typography variant="h4">
            {lunatic.interpret(features)(bindings)(sequence.label)}
          </Typography>

          {subsequence && (
            <Typography variant="h6">
              {lunatic.interpret(features)(bindings)(subsequence.label)}
            </Typography>
          )}
        </Card>
      )}

      <Pagination
        componentsPages={componentsPages}
        currentPage={currentIndex}
        setCurrentPage={setCurrentIndex}
        validated={validatedQuestionnaire}
        onNext={onNext}
      />

      {!validatedQuestionnaire && (
        <div className="navigation-buttons">
          <Button
            onClick={() => {
              setCurrentIndex(currentIndex - 1);
              onNext();
            }}
            disabled={currentIndex === 0}
          >
            Previous
          </Button>
          <Button
            onClick={() => {
              setCurrentIndex(currentIndex + 1);
              onNext();
            }}
            disabled={currentIndex === componentsPages.length - 1}
          >
            Next
          </Button>
        </div>
      )}
      <WelcomeBack
        open={!init && !validated && currentPage}
        setOpen={o => setInit(!o)}
        goToFirstPage={() => setCurrentIndex(0)}
      />
      {waiting && <LoaderSimple />}
    </>
  );
};
export default Orchestrator;
