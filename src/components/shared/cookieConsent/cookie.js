import Dialog from '@material-ui/core/Dialog';
import DialogActions from '@material-ui/core/DialogActions';
import DialogContent from '@material-ui/core/DialogContent';
import DialogContentText from '@material-ui/core/DialogContentText';
import DialogTitle from '@material-ui/core/DialogTitle';
import { useState } from 'react';
import { buttonDictionary, defaultDictionary } from '../../../i18n';
import { COOKIE_CONSENT } from '../../../utils/constants';
import { Button, MarkdownTypo } from '../../designSystem';

const CookieConsent = () => {
  const [open, setOpen] = useState(
    () => !window.localStorage.getItem(COOKIE_CONSENT)
  );

  const understand = () => {
    window.localStorage.setItem(COOKIE_CONSENT, true);
    setOpen(false);
  };

  return (
    <Dialog
      open={open}
      keepMounted
      disableBackdropClick
      disableEscapeKeyDown
      onClose={understand}
      aria-labelledby='alert-dialog-slide-title'
      aria-describedby='alert-dialog-slide-description'
    >
      <DialogTitle id='alert-dialog-slide-title'>
        {defaultDictionary.cookieTitle}
      </DialogTitle>
      <DialogContent>
        <DialogContentText id='alert-dialog-slide-description' component='div'>
          <MarkdownTypo>{defaultDictionary.cookieConsent}</MarkdownTypo>
        </DialogContentText>
      </DialogContent>
      <DialogActions>
        <Button onClick={understand}>{buttonDictionary.understand}</Button>
      </DialogActions>
    </Dialog>
  );
};

export default CookieConsent;
