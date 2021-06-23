import {
  Accordion,
  AccordionDetails,
  AccordionSummary,
  Box,
  Container,
  makeStyles,
  Typography,
} from '@material-ui/core';
import { ExpandMore } from '@material-ui/icons';
import { Button } from 'components/designSystem';
import React from 'react';
import { defaultDictionary, errorDictionary, buttonDictionary } from 'i18n';
import { lunaticVersion, stromaeVersion } from 'utils/app';

const useStyles = makeStyles(theme => ({
  root: {
    position: 'relative',
    top: '3em',
    padding: '1em',
    textAlign: 'center',
  },
  error: {
    backgroundColor: 'white',
    textAlign: 'left',
  },
  resetButton: {
    marginTop: '1em',
  },
  title: {
    color: 'white',
    margin: '0.5em',
  },
  versions: {
    textAlign: 'left',
    display: 'block',
  },
}));

const ErrorFallback = ({ error, resetErrorBoundary }) => {
  const classes = useStyles();
  return (
    <Container maxWidth="md">
      <Box className={classes.root} bgcolor="error.main" role="alert">
        <Typography variant="h4" className={classes.title}>
          {errorDictionary.getUnknownError}
        </Typography>
        <Accordion>
          <AccordionSummary
            expandIcon={<ExpandMore />}
            aria-controls="panel1a-content"
            id="panel1a-header"
          >
            <Typography className={classes.heading}>
              {errorDictionary.detailsError}
            </Typography>
          </AccordionSummary>
          <AccordionDetails>
            <pre>{error.message}</pre>
          </AccordionDetails>
        </Accordion>
        <Accordion>
          <AccordionSummary
            expandIcon={<ExpandMore />}
            aria-controls="panel2a-content"
            id="panel2a-header"
          >
            <Typography className={classes.heading}>
              {defaultDictionary.appInfo}
            </Typography>
          </AccordionSummary>
          <AccordionDetails className={classes.versions}>
            <Typography>
              {`${defaultDictionary.appVersion} : `}
              <b>{stromaeVersion}</b>
            </Typography>
            <Typography>
              {`${defaultDictionary.lunaticVersion} : `}
              <b>{lunaticVersion}</b>
            </Typography>
          </AccordionDetails>
        </Accordion>
        <Button className={classes.resetButton} onClick={resetErrorBoundary}>
          {buttonDictionary.back}
        </Button>
      </Box>
    </Container>
  );
};
export default ErrorFallback;
