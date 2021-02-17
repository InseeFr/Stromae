import React, { useContext, useState } from 'react';
import {
  AppBar,
  IconButton,
  ListItemIcon,
  makeStyles,
  Menu,
  MenuItem,
  Toolbar,
  Typography,
} from '@material-ui/core';
import MenuIcon from '@material-ui/icons/Menu';
import { AccountCircle, Help, ExitToApp } from '@material-ui/icons';
import { AssistanceConfirm } from 'components/modals/assistance';
import { Skeleton } from '@material-ui/lab';
import { useAuth } from 'utils/hooks';
import { HOUSEHOLD } from 'utils/constants';
import { NotYetImpl } from 'components/modals/notYetImpl';
import { OrchestratorContext } from 'components/orchestrator/collector';

const useStyles = makeStyles(theme => ({
  title: { flexGrow: 1 },
}));

const AppBarMenu = ({ title }) => {
  const {
    metadata: { inseeContext },
  } = useContext(OrchestratorContext);
  const { oidcUser, logout } = useAuth();
  const isAuthenticated = oidcUser?.profile;
  const [anchorEl, setAnchorEl] = useState(null);
  const [assistance, setAssistance] = useState(false);
  const [nyi, setNyi] = useState(false);

  const isMenuOpen = Boolean(anchorEl);

  const handleProfileMenuOpen = event => {
    setAnchorEl(event.currentTarget);
  };

  const handleMenuClose = () => {
    setAnchorEl(null);
  };

  const renderMenu = () => {
    if (isAuthenticated && inseeContext === HOUSEHOLD) {
      return (
        <Menu
          anchorEl={anchorEl}
          anchorOrigin={{ vertical: 'top', horizontal: 'right' }}
          id={'menuId'}
          keepMounted
          transformOrigin={{ vertical: 'top', horizontal: 'right' }}
          open={isMenuOpen}
          onClose={handleMenuClose}
        >
          <MenuItem onClick={logout}>
            <ListItemIcon>
              <ExitToApp />
            </ListItemIcon>
            <Typography variant="inherit">Déconnexion</Typography>
          </MenuItem>

          {false && <MenuItem onClick={handleMenuClose}>My account</MenuItem>}
        </Menu>
      );
    }
  };

  const classes = useStyles();

  return (
    <>
      <AppBar position="static">
        <Toolbar>
          <IconButton
            edge="start"
            color="inherit"
            aria-label="menu"
            onClick={() => setNyi(true)}
          >
            <MenuIcon />
          </IconButton>
          <Typography variant="h6" className={classes.title}>
            {title ? title : <Skeleton variant="text" />}
          </Typography>
          <IconButton
            aria-label="Assistance"
            color="inherit"
            onClick={() => setAssistance(true)}
          >
            <Help />
          </IconButton>
          {isAuthenticated && (
            <IconButton
              edge="end"
              aria-label="Compte de l'utilisateur"
              aria-controls={'menuId'}
              aria-haspopup="true"
              onClick={handleProfileMenuOpen}
              color="inherit"
            >
              <AccountCircle />
            </IconButton>
          )}
        </Toolbar>
      </AppBar>
      {renderMenu()}
      <NotYetImpl open={nyi} setOpen={setNyi} />
      <AssistanceConfirm open={assistance} setOpen={setAssistance} />
    </>
  );
};
export default AppBarMenu;
