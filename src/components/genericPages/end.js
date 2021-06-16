import React, { useContext } from 'react';
import {
  Button,
  Card,
  CardActions,
  CardContent,
  CardHeader,
  Divider,
  makeStyles,
  Typography,
} from '@material-ui/core';
import { Button as InseeButton } from 'components/designSystem/Button';
import { GetApp } from '@material-ui/icons';
import { useAPI } from 'utils/hooks';
import { useLocation, useParams } from 'react-router-dom';
import { formatDistance, format } from 'date-fns';
import { buttonDictionary, endPageDictionary } from 'i18n';
import { OrchestratorContext } from 'components/orchestrator/collector';
import {
  buildBuidings,
  dateFnsLocal,
  formatLocal,
} from 'utils/personalization';
import { interpret } from '@inseefr/lunatic';
import { MarkdownTypo } from 'components/designSystem';
import { paradataHandler, SIMPLE_CLICK_EVENT } from 'utils/events';
import { END_PAGE } from 'utils/pagination';

const utilInfo = type => {
  return { ...SIMPLE_CLICK_EVENT, id: `${type}-button`, page: END_PAGE };
};

const useStyles = makeStyles(theme => ({
  card: { marginLeft: '1em', marginRight: '1em' },
  root: {
    display: 'flex',
    flexDirection: 'column',
  },
  download: {
    marginTop: theme.spacing(2),
    margin: 'auto',
  },
  actions: {
    display: 'flex',
    justifyContent: 'flex-end',
  },
}));

const EndPage = () => {
  const classes = useStyles();
  const {
    logoutAndClose,
    metadata: { inseeContext, variables },
    personalization,
    stateData: { date },
  } = useContext(OrchestratorContext);

  const finalDate = date || 0;

  const { pathname } = useLocation();

  const { idQ, idSU } = useParams();
  const { getPDF } = useAPI(idSU, idQ);

  const { title, body, pdfMessage, youCanQuit } = endPageDictionary(
    inseeContext
  );

  const download = async () => {
    const { error, status } = await getPDF();
    console.log(`${status} : ${error}`);
  };

  const validatedDate = `${formatDistance(finalDate, new Date(), {
    addSuffix: true,
    locale: dateFnsLocal,
  })} (${format(finalDate, formatLocal)})`;

  const getBodyWithVariables = myBody =>
    interpret(['VTL'])({
      validatedDate,
      ...buildBuidings(variables),
      ...buildBuidings(personalization),
    })(myBody);

  return (
    <Card className={classes.card}>
      <CardHeader title={title} />
      <Divider />
      <CardContent className={classes.root}>
        {body.map((line, i) => (
          <React.Fragment key={`line-${i}`}>
            <MarkdownTypo>{getBodyWithVariables(line)}</MarkdownTypo>
            {i !== body.length - 1 && <br />}
          </React.Fragment>
        ))}
        {!pathname.includes('visualize') && (
          <>
            <br />
            <Typography>{pdfMessage}</Typography>
            <Button
              className={classes.download}
              variant="contained"
              color="primary"
              endIcon={<GetApp />}
              onClick={paradataHandler(download)(utilInfo('download'))}
            >
              {buttonDictionary.download}
            </Button>
          </>
        )}
        <br />
        <Typography>{youCanQuit}</Typography>
      </CardContent>
      <CardActions className={classes.actions}>
        <InseeButton
          onClick={paradataHandler(logoutAndClose)(utilInfo('logout-close'))}
        >
          {buttonDictionary.logoutAndClose}
        </InseeButton>
      </CardActions>
    </Card>
  );
};
export default EndPage;
