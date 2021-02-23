import React, { useContext } from 'react';
import * as lunatic from '@inseefr/lunatic';
import { Card, makeStyles } from '@material-ui/core';
import { EndPage, ValidationPage, WelcomePage } from 'components/genericPages';
import { OrchestratorContext } from '../collector';

const useStyles = makeStyles(theme => ({
  root: { padding: '10px', overflow: 'visible', marginBottom: '10px' },
  sequenceContainer: { paddingLeft: '1em', paddingRight: '1em' },
}));

const Pagination = ({
  components,
  handleChange,
  bindings,
  currentPage,
  validateQuestionnaire,
}) => {
  const classes = useStyles();
  const currentIndex = currentPage >= 0 ? currentPage : components.length - 1;

  const { lunaticOptions } = useContext(OrchestratorContext);

  const currentCompoent = () => {
    const { stromaeType, ...others } = components[currentIndex];
    if (stromaeType === 'Lunatic') {
      const { id, componentType } = others;
      const Component = lunatic[componentType];
      const comp = (
        <Card
          className={`lunatic lunatic-component ${classes.root}`}
          key={`component-${id}`}
          style={{ padding: '10px', overflow: 'visible' }}
        >
          <Component
            {...others}
            handleChange={handleChange}
            labelPosition="TOP"
            preferences={lunaticOptions.preferences}
            features={lunaticOptions.features}
            bindings={bindings}
            writable
            focused={componentType !== 'Loop'}
            zIndex={1}
          />
        </Card>
      );
      return comp;
    } else {
      if (stromaeType === 'welcomePage') return <WelcomePage key={'welcome'} />;
      if (stromaeType === 'validationPage')
        return (
          <ValidationPage key={'validation'} validate={validateQuestionnaire} />
        );
      if (stromaeType === 'endPage') return <EndPage key={'endPage'} />;
    }
  };

  return currentCompoent();
};

export default Pagination;
