import React, { useContext } from 'react';
import * as lunatic from '@inseefr/lunatic';
import { Card, makeStyles } from '@material-ui/core';
import { EndPage, ValidationPage, WelcomePage } from 'components/genericPages';
import { OrchestratorContext } from '../collector';
import { getComponentsOfSequence } from 'utils/pagination';

const useStyles = makeStyles(theme => ({
  root: { padding: '10px', overflow: 'visible', marginBottom: '10px' },
  sequenceContainer: { paddingLeft: '1em', paddingRight: '1em' },
}));

const OneComponent = ({
  component,
  lunaticOptions,
  handleChange,
  bindings,
}) => {
  const classes = useStyles();
  const { id, componentType } = component;
  const Component = lunatic[componentType];
  return (
    <Card
      className={`lunatic lunatic-component ${componentType} ${classes.root}`}
      key={`component-${id}`}
    >
      <Component
        {...component}
        handleChange={handleChange}
        labelPosition="TOP"
        preferences={lunaticOptions?.preferences}
        features={lunaticOptions?.features}
        bindings={bindings}
        writable
        zIndex={1}
      />
    </Card>
  );
};

const Pagination = ({
  allPages,
  components,
  handleChange,
  bindings,
  currentPage,
  validateQuestionnaire,
}) => {
  const classes = useStyles();
  const currentIndex = currentPage >= 0 ? currentPage : allPages.length - 1;

  const { lunaticOptions } = useContext(OrchestratorContext);

  const { stromaeType, ...others } = allPages[currentIndex];
  if (stromaeType === 'Lunatic') {
    const { idSequence } = others;
    const currentComponents = getComponentsOfSequence(components)(idSequence);
    const [sequenceComp, ...childrenComp] = currentComponents;

    return (
      <>
        <OneComponent
          component={sequenceComp}
          bindings={bindings}
          handleChange={handleChange}
          lunaticOptions={lunaticOptions}
        />
        <div className={classes.sequenceContainer}>
          {childrenComp.map(q => (
            <OneComponent
              component={q}
              bindings={bindings}
              handleChange={handleChange}
              lunaticOptions={lunaticOptions}
              key={q.id}
            />
          ))}
        </div>
      </>
    );
  } else {
    if (stromaeType === 'welcomePage') return <WelcomePage key={'welcome'} />;
    if (stromaeType === 'validationPage')
      return (
        <ValidationPage key={'validation'} validate={validateQuestionnaire} />
      );
    if (stromaeType === 'endPage') return <EndPage key={'endPage'} />;
  }
};

export default Pagination;
