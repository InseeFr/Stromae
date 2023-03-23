import Dialog from '@material-ui/core/Dialog';
import DialogActions from '@material-ui/core/DialogActions';
import DialogContent from '@material-ui/core/DialogContent';
import DialogContentText from '@material-ui/core/DialogContentText';
import DialogTitle from '@material-ui/core/DialogTitle';
import { Button } from 'components/designSystem/Button';
import { buttonDictionary, errorDictionary } from 'i18n';
import { paradataHandler, SIMPLE_CLICK_EVENT } from 'utils/events';

function Error({ errorMessage }) {
  return <li>{errorMessage}</li>;
}

function ComponentErrors({ errors }) {
  const content = errors.map(function (error, index) {
    return <Error {...error} key={index} />;
  }, []);
  return <ul>{content}</ul>;
}

const ErrorsModal = ({
  open,
  onClose,
  goNext,
  currentPage,
  errors: orignalErrors,
}) => {
  const utilInfo = (type) => {
    return {
      ...SIMPLE_CLICK_EVENT,
      idParadataObject: `${type}-error-modal-button`,
      page: currentPage,
    };
  };

  const { currentErrors, isCritical } = orignalErrors;

  const ignoreErrors = () => {
    goNext();
  };

  const correctErrors = () => {
    onClose();
  };

  const content = Object.entries(currentErrors).map(function ([id, errors]) {
    return <ComponentErrors errors={errors} key={id} />;
  }, []);

  return (
    <Dialog
      open={open}
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
          {buttonDictionary.MODAl_CORRECT}
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
