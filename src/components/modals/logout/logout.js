import Dialog from '@material-ui/core/Dialog';
import DialogActions from '@material-ui/core/DialogActions';
import DialogContent from '@material-ui/core/DialogContent';
import DialogContentText from '@material-ui/core/DialogContentText';
import DialogTitle from '@material-ui/core/DialogTitle';
import { buttonDictionary, errorDictionary } from 'i18n';
import { useOidc } from 'utils/oidc';
import { Button } from '../../designSystem';

const LogoutModal = () => {
  const { isUserLoggedIn, login: oidcLogin } = useOidc();

  const login = () => oidcLogin({ doesCurrentHrefRequiresAuth: true });

  return (
    <Dialog
      open={!isUserLoggedIn}
      disableEscapeKeyDown
      aria-labelledby='alert-dialog-slide-title'
      aria-describedby='alert-dialog-slide-description'
    >
      <DialogTitle id='alert-dialog-slide-title'>
        {errorDictionary.getErrorLogOffTitle}
      </DialogTitle>
      <DialogContent id='alert-dialog-slide-description'>
        <DialogContentText>
          {errorDictionary.getErrorLogOffDetails1}
        </DialogContentText>
        <DialogContentText>
          {errorDictionary.getErrorLogOffDetails2}
        </DialogContentText>
      </DialogContent>
      <DialogActions>
        <Button onClick={login}>{buttonDictionary.reconnect}</Button>
      </DialogActions>
    </Dialog>
  );
};

export default LogoutModal;
