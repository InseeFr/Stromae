import React, { useContext } from 'react';
import { makeStyles } from '@material-ui/core/styles';
import Button from '@material-ui/core/Button';
import Card from '@material-ui/core/Card';
import CardActions from '@material-ui/core/CardActions';
import CardContent from '@material-ui/core/CardContent';
import CardHeader from '@material-ui/core/CardHeader';
import Divider from '@material-ui/core/Divider';
import Typography from '@material-ui/core/Typography';

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
import { interpret } from '@inseefr/trevas';
import { MarkdownTypo } from 'components/designSystem';
import { paradataHandler, SIMPLE_CLICK_EVENT } from 'utils/events';

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
    metadata: { inseeContext, variables, genericPages },
    personalization,
    stateData: { date },
    currentPage,
  } = useContext(OrchestratorContext);

  const utilInfo = type => {
    return {
      ...SIMPLE_CLICK_EVENT,
      idParadataObject: `${type}-button`,
      page: currentPage,
    };
  };
  const finalDate = date || 0;

  const { pathname } = useLocation();

  const { idQ, idSU } = useParams();
  const { getPDF } = useAPI(idSU, idQ);

  const { title, body, pdfMessage, youCanQuit } =
    genericPages?.end || endPageDictionary(inseeContext);

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
