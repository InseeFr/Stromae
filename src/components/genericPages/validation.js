import React from 'react';
import { makeStyles } from '@material-ui/core/styles';
import Button from '@material-ui/core/Button';
import Card from '@material-ui/core/Card';
import CardContent from '@material-ui/core/CardContent';
import CardHeader from '@material-ui/core/CardHeader';
import Divider from '@material-ui/core/Divider';
import Send from '@material-ui/icons/Send';
import { validationPageDictionary, buttonDictionary } from 'i18n';
import { MarkdownTypo } from 'components/designSystem';
import { paradataHandler, SIMPLE_CLICK_EVENT } from 'utils/events';
import { VALIDATION_PAGE } from '../../utils/pagination';

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
}) => {
  const classes = useStyles();
  const { title, body } =
    genericPages?.validation || validationPageDictionary(inseeContext);
  const utilInfo = {
    ...SIMPLE_CLICK_EVENT,
    idParadataObject: 'validate-button',
    page: VALIDATION_PAGE,
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
