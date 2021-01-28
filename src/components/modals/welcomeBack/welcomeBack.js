import React from 'react';
import Button from '@material-ui/core/Button';
import Dialog from '@material-ui/core/Dialog';
import DialogActions from '@material-ui/core/DialogActions';
import DialogContent from '@material-ui/core/DialogContent';
import DialogContentText from '@material-ui/core/DialogContentText';
import DialogTitle from '@material-ui/core/DialogTitle';

const WelcomeBack = ({ open, setOpen, goToFirstPage }) => {
  const goToCurrentPage = () => {
    setOpen(false);
  };

  const goToFirst = () => {
    goToFirstPage();
    setOpen(false);
  };

  return (
    <Dialog
      open={open}
      disableBackdropClick
      disableEscapeKeyDown
      onClose={goToCurrentPage}
      aria-labelledby="alert-dialog-slide-title"
      aria-describedby="alert-dialog-slide-description"
    >
      <DialogTitle id="alert-dialog-slide-title">{`Bienvenue`}</DialogTitle>
      <DialogContent>
        <DialogContentText id="alert-dialog-slide-description">
          Vous avez déjà commencé à renseigner le questionnaire. <br />
          Pour poursuivre votre saisie dans le questionnaire, que souhaitez-vous
          faire ?
        </DialogContentText>
      </DialogContent>
      <DialogActions>
        <Button onClick={goToCurrentPage} color="primary">
          Revenir à la dernière page accédée
        </Button>
        <Button
          /* eslint-disable-next-line jsx-a11y/no-autofocus */
          autoFocus
          onClick={goToFirst}
          target="_blank"
          color="primary"
        >
          Aller à la première page
        </Button>
      </DialogActions>
    </Dialog>
  );
};

export default WelcomeBack;
