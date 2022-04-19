import React from 'react';
import * as lunatic from '@inseefr/lunatic';
import { makeStyles } from '@material-ui/core/styles';
import Card from '@material-ui/core/Card';

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

export default OneComponent;
