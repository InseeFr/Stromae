import React from 'react';
import { AppBar, makeStyles, Toolbar, Typography } from '@material-ui/core';
import { Skeleton } from '@material-ui/lab';
import logo from 'img/insee.png';
import './appBar.css';

const useStyles = makeStyles(theme => ({
  title: { flexGrow: 1 },
}));

const AppBarMenu = ({ title }) => {
  const classes = useStyles();

  return (
    <>
      <AppBar position="static">
        <Toolbar id="generalToolbar">
          <img id="inseeLogoGeneralToolbar" src={logo} alt="Logo de l'Insee" />
          <Typography id="appBarTitle" variant="h6" className={classes.title}>
            {title ? title : <Skeleton variant="text" />}
          </Typography>
        </Toolbar>
      </AppBar>
    </>
  );
};
export default AppBarMenu;
