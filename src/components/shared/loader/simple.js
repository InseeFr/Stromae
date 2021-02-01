import React from 'react';
import Backdrop from '@material-ui/core/Backdrop';
import { CircularProgress, makeStyles } from '@material-ui/core';

const Simple = () => {
  const useStyles = makeStyles(theme => ({
    backdrop: {
      zIndex: theme.zIndex.drawer + 1,
    },
  }));

  return (
    <Backdrop open={true} className={useStyles().backdrop}>
      <CircularProgress />
    </Backdrop>
  );
};

export default Simple;
