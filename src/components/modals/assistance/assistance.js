import Dialog from '@material-ui/core/Dialog';
import DialogActions from '@material-ui/core/DialogActions';
import DialogContent from '@material-ui/core/DialogContent';
import DialogContentText from '@material-ui/core/DialogContentText';
import DialogTitle from '@material-ui/core/DialogTitle';
import { useParams } from 'react-router-dom';
import { buttonDictionary, defaultDictionary } from '../../../i18n';
import { HOUSEHOLD } from '../../../utils/constants';
import { SIMPLE_CLICK_EVENT, paradataHandler } from '../../../utils/events';
import { environment } from '../../../utils/read-env-vars';
import { Button } from '../../designSystem';

const utilInfo = (type, currentPage) => {
  return {
    ...SIMPLE_CLICK_EVENT,
    idParadataObject: `${type}-assistance-modal-button`,
    page: currentPage,
  };
};

const { PORTAIL_URL: portail } = environment;

const Assistance = ({
  open,
  setOpen,
  metadata: { inseeContext },
  currentPage,
}) => {
  const { idQ, idSU } = useParams();

  const disagree = () => {
    setOpen(false);
  };
  const agree = () => {
    setOpen(false);
    if (inseeContext === HOUSEHOLD && idQ) {
      window.open(
        `${portail}/${idQ
          .substr(0, idQ.indexOf('2'))
          .toLowerCase()}/contacter-assistance/auth?idue=${idSU}`,
        '_blank'
      );
    }
  };

  return (
    <Dialog
      open={open}
      onClose={paradataHandler(disagree)(utilInfo('close', currentPage))}
      disableEscapeKeyDown
      aria-labelledby='alert-dialog-slide-title'
      aria-describedby='alert-dialog-slide-description'
    >
      <DialogTitle id='alert-dialog-slide-title'>
        {defaultDictionary.assistanceTitle}
      </DialogTitle>
      <DialogContent>
        <DialogContentText id='alert-dialog-slide-description'>
          {defaultDictionary.assistanceBody}
        </DialogContentText>
      </DialogContent>
      <DialogActions>
        <Button
          onClick={paradataHandler(disagree)(utilInfo('disagree', currentPage))}
        >
          {buttonDictionary.no}
        </Button>
        <Button
          onClick={paradataHandler(agree)(utilInfo('agree', currentPage))}
        >
          {buttonDictionary.yes}
        </Button>
      </DialogActions>
    </Dialog>
  );
};

export default Assistance;
