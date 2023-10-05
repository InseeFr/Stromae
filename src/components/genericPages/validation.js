import Button from '@material-ui/core/Button';
import Card from '@material-ui/core/Card';
import CardContent from '@material-ui/core/CardContent';
import CardHeader from '@material-ui/core/CardHeader';
import Divider from '@material-ui/core/Divider';
import { makeStyles } from '@material-ui/core/styles';
import Send from '@material-ui/icons/Send';
import React from 'react';
import { buttonDictionary, validationPageDictionary } from '../../i18n';
import { SIMPLE_CLICK_EVENT, paradataHandler } from '../../utils/events';
import { MarkdownTypo } from '../designSystem';

const useStyles = makeStyles((theme) => ({
  card: { marginLeft: '1em', marginRight: '1em' },
  root: {
    display: 'flex',
    flexDirection: 'column',
  },
  send: {
    marginTop: theme.spacing(2),
    margin: 'auto',
  },
}));

const ValidationPage = ({
  metadata: { inseeContext, genericPages },
  setValidationConfirmation,
  currentPage,
}) => {
  const classes = useStyles();
  const { title, body } =
    genericPages?.validation || validationPageDictionary(inseeContext);
  const utilInfo = {
    ...SIMPLE_CLICK_EVENT,
    idParadataObject: 'validate-button',
    page: currentPage,
  };
  return (
    <Card className={classes.card}>
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
          variant='contained'
          color='primary'
          endIcon={<Send />}
          onClick={paradataHandler(() => setValidationConfirmation(true))(
            utilInfo
          )}
        >
          {buttonDictionary.send}
        </Button>
        <br />
      </CardContent>
    </Card>
  );
};
export default ValidationPage;
