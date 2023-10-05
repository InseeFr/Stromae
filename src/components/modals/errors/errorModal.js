import { List, ListItem, makeStyles } from '@material-ui/core';
import Dialog from '@material-ui/core/Dialog';
import DialogActions from '@material-ui/core/DialogActions';
import DialogContent from '@material-ui/core/DialogContent';
import DialogContentText from '@material-ui/core/DialogContentText';
import DialogTitle from '@material-ui/core/DialogTitle';
import { useCallback } from 'react';
import { buttonDictionary, errorDictionary } from '../../../i18n';
import { SIMPLE_CLICK_EVENT, paradataHandler } from '../../../utils/events';
import { Button } from '../../designSystem';

const useStyles = makeStyles((theme) => ({
  error: {
    color: '#a71616',
  },
}));

function ErrorItem({ errorMessage }) {
  const classes = useStyles();
  return (
    <ListItem className={classes.error}>
      <div>{errorMessage}</div>
    </ListItem>
  );
}

function ComponentErrors({ errors }) {
  const content = errors.map(function (error, index) {
    return <ErrorItem {...error} key={index} />;
  }, []);
  return <List>{content}</List>;
}

const ErrorsModal = ({
  onClose,
  goNext,
  currentPage,
  errors: orignalErrors = {},
}) => {
  const utilInfo = useCallback(
    (type) => {
      return {
        ...SIMPLE_CLICK_EVENT,
        idParadataObject: `${type}-error-modal-button`,
        page: currentPage,
      };
    },
    [currentPage]
  );

  const { currentErrors, isCritical } = orignalErrors;

  const ignoreErrors = useCallback(
    (event) => {
      // pass skipValidation to "true" to skip validation and change page
      goNext(event, true);
    },
    [goNext]
  );

  const correctErrors = useCallback(() => {
    onClose();
  }, [onClose]);

  const content = (
    <ComponentErrors
      errors={Object.entries(currentErrors).reduce(function (acc, [, errors]) {
        return [...acc, ...errors];
      }, [])}
    />
  );

  return (
    <Dialog
      open
      onClose={paradataHandler(onClose)(utilInfo('close'))}
      disableEscapeKeyDown
      aria-labelledby='alert-dialog-slide-title'
      aria-describedby='alert-dialog-slide-description'
    >
      <DialogTitle id='alert-dialog-slide-title'>
        {errorDictionary.errorModalTitle}
      </DialogTitle>
      <DialogContent>
        <DialogContentText id='alert-dialog-slide-description' component='div'>
          {content}
        </DialogContentText>
      </DialogContent>
      <DialogActions>
        <Button onClick={paradataHandler(correctErrors)(utilInfo('correct'))}>
          {buttonDictionary.MODAL_CORRECT}
        </Button>
        {!isCritical && (
          <Button onClick={paradataHandler(ignoreErrors)(utilInfo('ignore'))}>
            {buttonDictionary.MODAL_IGNORE}
          </Button>
        )}
      </DialogActions>
    </Dialog>
  );
};

export default ErrorsModal;
