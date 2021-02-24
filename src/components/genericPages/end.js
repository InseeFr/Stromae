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
import { useAPI, useAuth } from 'utils/hooks';
import { useHistory, useLocation, useParams } from 'react-router-dom';
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
    metadata: { inseeContext, variables },
    personalization,
  } = useContext(OrchestratorContext);
  const { logout: logoutAuth } = useAuth();
  const { pathname } = useLocation();
  const history = useHistory();

  const { idQ, idSU } = useParams();
  const { getPDF } = useAPI(idSU, idQ);

  const { title, body, pdfMessage, youCanQuit } = endPageDictionary(
    inseeContext
  );

  const download = async () => {
    const { error, status } = await getPDF();
    console.log(`${status} : ${error}`);
  };

  const fakeLogout = () => {
    history.push('/');
  };

  const logout = pathname.includes('visualize') ? fakeLogout : logoutAuth;

  const validatedDate = `${formatDistance(new Date(), new Date(), {
    addSuffix: true,
    locale: dateFnsLocal,
  })} (${format(new Date(), formatLocal)})`;

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
              onClick={download}
            >
              {buttonDictionary.download}
            </Button>
          </>
        )}
        <br />
        <Typography>{youCanQuit}</Typography>
      </CardContent>
      <CardActions className={classes.actions}>
        <InseeButton onClick={logout}>
          {buttonDictionary.logoutAndClose}
        </InseeButton>
      </CardActions>
    </Card>
  );
};
export default EndPage;
