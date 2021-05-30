import React from 'react';
import './loader.css';
import Backdrop from '@material-ui/core/Backdrop';
import logo from 'img/Logo-Insee.jpg';
import { makeStyles } from '@material-ui/core';

const Loader = ({ info }) => {
  const useStyles = makeStyles(theme => ({
    backdrop: {
      zIndex: theme.zIndex.drawer + 1,
    },
  }));

  return (
    <Backdrop open className={`${useStyles().backdrop} loading`}>
      <figure>
        <img src={logo} alt="Logo de l'Insee" />
        <figcaption>{`Chargement ... ${info || ''}`}</figcaption>
      </figure>
    </Backdrop>
  );
};

export default Loader;
