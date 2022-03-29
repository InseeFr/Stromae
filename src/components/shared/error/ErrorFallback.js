import React from 'react';
import { makeStyles } from '@material-ui/core/styles';
import Accordion from '@material-ui/core/Accordion';
import AccordionDetails from '@material-ui/core/AccordionDetails';
import AccordionSummary from '@material-ui/core/AccordionSummary';
import Box from '@material-ui/core/Box';
import Typography from '@material-ui/core/Typography';
import Container from '@material-ui/core/Container';
import ExpandMore from '@material-ui/icons/ExpandMore';
import { Button } from 'components/designSystem';
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
  alignBlock: {
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
          <AccordionDetails className={classes.alignBlock}>
            <pre>{error.message}</pre>
            <pre>{error.stack}</pre>
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
          <AccordionDetails className={classes.alignBlock}>
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
