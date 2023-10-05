import Dialog from '@material-ui/core/Dialog';
import DialogActions from '@material-ui/core/DialogActions';
import DialogContent from '@material-ui/core/DialogContent';
import DialogContentText from '@material-ui/core/DialogContentText';
import DialogTitle from '@material-ui/core/DialogTitle';
import React from 'react';
import { buttonDictionary, confirmationDictionary } from '../../../i18n';
import { SIMPLE_CLICK_EVENT, paradataHandler } from '../../../utils/events';
import { Button, MarkdownTypo } from '../../designSystem';

const SendingConfirmation = ({
  open,
  setOpen,
  metadata: { inseeContext },
  validateQuestionnaire,
  currentPage,
}) => {
  const { title, body } = confirmationDictionary(inseeContext);

  const utilInfo = (type) => {
    return {
      ...SIMPLE_CLICK_EVENT,
      idParadataObject: `${type}-sending-modal-button`,
      page: currentPage,
    };
  };

  const close = () => setOpen(false);

  const agree = () => {
    setOpen(false);
    validateQuestionnaire();
  };

  return (
    <Dialog
      open={open}
      onClose={paradataHandler(close)(utilInfo('close'))}
      disableEscapeKeyDown
      aria-labelledby='alert-dialog-slide-title'
      aria-describedby='alert-dialog-slide-description'
    >
      <DialogTitle id='alert-dialog-slide-title'>{title}</DialogTitle>
      <DialogContent>
        <DialogContentText id='alert-dialog-slide-description' component='div'>
          {body.map((line, i) => (
            <React.Fragment key={`line-${i}`}>
              <MarkdownTypo>{line}</MarkdownTypo>
              {i !== body.length - 1 && <br />}
            </React.Fragment>
          ))}
        </DialogContentText>
      </DialogContent>
      <DialogActions>
        <Button onClick={paradataHandler(close)(utilInfo('disagree'))}>
          {buttonDictionary.no}
        </Button>
        <Button onClick={paradataHandler(agree)(utilInfo('agree'))}>
          {buttonDictionary.yes}
        </Button>
      </DialogActions>
    </Dialog>
  );
};

export default SendingConfirmation;
