import React, { useContext } from 'react';
import { AppContext } from 'App';
import Button from '@material-ui/core/Button';
import Dialog from '@material-ui/core/Dialog';
import DialogActions from '@material-ui/core/DialogActions';
import DialogContent from '@material-ui/core/DialogContent';
import DialogContentText from '@material-ui/core/DialogContentText';
import DialogTitle from '@material-ui/core/DialogTitle';
import { useParams } from 'react-router-dom';
import { Link } from '@material-ui/core';
import './assistance.scss';

const Assistance = ({ open, setOpen }) => {
  const { idQ } = useParams();
  const { portail } = useContext(AppContext);

  const disagree = () => {
    setOpen(false);
  };
  const agree = () => {
    setOpen(false);
    window.open(
      `${portail}/${idQ.split('-')[0]}/contacter-assistance`,
      '_blank'
    );
  };

  return (
    <Dialog
      open={open}
      onClose={disagree}
      disableBackdropClick
      disableEscapeKeyDown
      aria-labelledby="alert-dialog-slide-title"
      aria-describedby="alert-dialog-slide-description"
    >
      <DialogTitle id="alert-dialog-slide-title">
        {`Contacter l'assistance`}
      </DialogTitle>
      <DialogContent>
        <DialogContentText id="alert-dialog-slide-description">
          Vous êtes sur le point de contacter l'assistance, êtes-vous sûr ?
        </DialogContentText>
      </DialogContent>
      <DialogActions>
        <Button onClick={disagree} color="primary">
          Non
        </Button>
        <Button
          /* eslint-disable-next-line jsx-a11y/no-autofocus */
          autoFocus
          onClick={agree}
          target="_blank"
          color="primary"
        >
          Oui
        </Button>
      </DialogActions>
    </Dialog>
  );
};

export default Assistance;
