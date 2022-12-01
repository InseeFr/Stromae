import React from 'react';
import Backdrop from '@material-ui/core/Backdrop';
import { makeStyles } from '@material-ui/core/styles';
import CircularProgress from '@material-ui/core/CircularProgress';

const Simple = () => {
  const useStyles = makeStyles((theme) => ({
    backdrop: {
      zIndex: theme.zIndex.drawer + 1,
    },
  }));

  return (
    <Backdrop open className={useStyles().backdrop}>
      <CircularProgress />
    </Backdrop>
  );
};

export default Simple;
