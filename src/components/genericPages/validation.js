import React, { useContext } from 'react';
import {
  Button,
  Card,
  CardContent,
  CardHeader,
  Divider,
  makeStyles,
} from '@material-ui/core';

import { validationPageDictionary, buttonDictionary } from 'i18n';
import { Send } from '@material-ui/icons';
import { OrchestratorContext } from 'components/orchestrator/collector';
import { MarkdownTypo } from 'components/designSystem';

const useStyles = makeStyles(theme => ({
  root: {
    display: 'flex',
    flexDirection: 'column',
  },
  send: {
    marginTop: theme.spacing(2),
    margin: 'auto',
  },
}));

const ValidationPage = ({ validate }) => {
  const classes = useStyles();
  const {
    metadata: { inseeContext },
  } = useContext(OrchestratorContext);
  const { title, body } = validationPageDictionary(inseeContext);
  return (
    <Card>
      <CardHeader title={title} />
      <Divider />
      <CardContent className={classes.root}>
        {body.map((line, i) => (
          <React.Fragment key={`line-${i}`}>
            <MarkdownTypo>{line}</MarkdownTypo>
            {i !== body.length - 1 && <br />}
          </React.Fragment>
        ))}
        <Button
          className={classes.send}
          variant="contained"
          color="primary"
          endIcon={<Send />}
          onClick={validate}
        >
          {buttonDictionary.send}
        </Button>
        <br />
      </CardContent>
    </Card>
  );
};
export default ValidationPage;
