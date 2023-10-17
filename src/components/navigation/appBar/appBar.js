import AppBar from '@material-ui/core/AppBar';
import Toolbar from '@material-ui/core/Toolbar';
import Typography from '@material-ui/core/Typography';
import { makeStyles } from '@material-ui/core/styles';
import { Skeleton } from '@material-ui/lab';
import { useEffect } from 'react';
import logo from '../../../img/insee.png';
import './appBar.css';

const useStyles = makeStyles((theme) => ({
  title: { flexGrow: 1 },
}));

const AppBarMenu = ({ title, metadata: { mainLogo } }) => {
  const classes = useStyles();

  useEffect(() => {
    if (mainLogo) {
      document.head.querySelectorAll("link[rel*='icon']").forEach((link) => {
        link.href = `${mainLogo}`;
      });
    }
  }, [mainLogo]);

  return (
    <>
      <AppBar position='static'>
        <Toolbar id='generalToolbar'>
          <img
            id='inseeLogoGeneralToolbar'
            src={mainLogo || logo}
            alt="Logo de l'Insee"
          />
          <Typography id='appBarTitle' variant='h6' className={classes.title}>
            {title ? title : <Skeleton variant='text' />}
          </Typography>
        </Toolbar>
      </AppBar>
    </>
  );
};
export default AppBarMenu;
