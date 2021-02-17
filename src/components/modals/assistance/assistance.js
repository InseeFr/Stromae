import React, { useContext } from 'react';
import { AppContext } from 'App';
import { Button } from 'components/designSystem/Button';
import Dictionary from 'i18n';
import Dialog from '@material-ui/core/Dialog';
import DialogActions from '@material-ui/core/DialogActions';
import DialogContent from '@material-ui/core/DialogContent';
import DialogContentText from '@material-ui/core/DialogContentText';
import DialogTitle from '@material-ui/core/DialogTitle';
import { useParams } from 'react-router-dom';
import { HOUSEHOLD } from 'utils/constants';
import { OrchestratorContext } from 'components/orchestrator/collector';

const Assistance = ({ open, setOpen }) => {
  const { idQ } = useParams();
  const { portail } = useContext(AppContext);
  const {
    metadata: { inseeContext },
  } = useContext(OrchestratorContext);

  const disagree = () => {
    setOpen(false);
  };
  const agree = () => {
    setOpen(false);
    if (inseeContext === HOUSEHOLD && idQ) {
      window.open(
        `${portail}/${idQ.split('-')[0]}/contacter-assistance`,
        '_blank'
      );
    }
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
        {Dictionary.assistanceTitle}
      </DialogTitle>
      <DialogContent>
        <DialogContentText id="alert-dialog-slide-description">
          {Dictionary.assistanceBody}
        </DialogContentText>
      </DialogContent>
      <DialogActions>
        <Button onClick={disagree}>{Dictionary.no}</Button>
        <Button onClick={agree}>{Dictionary.yes}</Button>
      </DialogActions>
    </Dialog>
  );
};

export default Assistance;
