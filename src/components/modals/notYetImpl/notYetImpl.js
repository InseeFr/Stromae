import Dialog from '@material-ui/core/Dialog';
import DialogActions from '@material-ui/core/DialogActions';
import DialogContent from '@material-ui/core/DialogContent';
import DialogContentText from '@material-ui/core/DialogContentText';
import DialogTitle from '@material-ui/core/DialogTitle';
import { buttonDictionary } from '../../../i18n';
import { Button } from '../../designSystem';

const NotYetImpl = ({ open, setOpen }) => {
  const close = () => setOpen(false);
  return (
    <Dialog
      open={open}
      disableEscapeKeyDown
      onClose={close}
      aria-labelledby='alert-dialog-slide-title'
      aria-describedby='alert-dialog-slide-description'
    >
      <DialogTitle id='alert-dialog-slide-title'>{`👷 Nice try 👷`}</DialogTitle>
      <DialogContent>
        <DialogContentText id='alert-dialog-slide-description'>
          {`🚧 Cette fonctionnalité est en cours de développement ...🚧`}
        </DialogContentText>
      </DialogContent>
      <DialogActions>
        <Button onClick={close}>{buttonDictionary.understand}</Button>
      </DialogActions>
    </Dialog>
  );
};

export default NotYetImpl;
