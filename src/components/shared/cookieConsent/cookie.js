import React, { forwardRef, useState } from 'react';
import Button from '@material-ui/core/Button';
import Dialog from '@material-ui/core/Dialog';
import DialogActions from '@material-ui/core/DialogActions';
import DialogContent from '@material-ui/core/DialogContent';
import DialogContentText from '@material-ui/core/DialogContentText';
import DialogTitle from '@material-ui/core/DialogTitle';
import Slide from '@material-ui/core/Slide';
import { COOKIE_CONSENT } from 'utils/constants';

const Transition = forwardRef(function Transition(props, ref) {
  return <Slide direction="up" ref={ref} {...props} />;
});

const CookieConsent = () => {
  const [open, setOpen] = useState(
    () => !!!window.localStorage.getItem(COOKIE_CONSENT)
  );

  const understand = () => {
    window.localStorage.setItem(COOKIE_CONSENT, true);
    setOpen(false);
  };

  return (
    <Dialog
      open={open}
      TransitionComponent={Transition}
      keepMounted
      disableBackdropClick
      disableEscapeKeyDown
      onClose={understand}
      aria-labelledby="alert-dialog-slide-title"
      aria-describedby="alert-dialog-slide-description"
    >
      <DialogTitle id="alert-dialog-slide-title">
        {'Utilisation des cookies'}
      </DialogTitle>
      <DialogContent>
        <DialogContentText id="alert-dialog-slide-description">
          Pour son bon fonctionnement, le site utilise des cookies, en
          remplissant le questionnaire, vous acceptez l'installation et
          l'utilisation de cookies sur votre poste.
        </DialogContentText>
      </DialogContent>
      <DialogActions>
        {/* eslint-disable-next-line jsx-a11y/no-autofocus */}
        <Button onClick={understand} color="primary" autoFocus>
          Je comprends
        </Button>
      </DialogActions>
    </Dialog>
  );
};

export default CookieConsent;
