import React, { useState } from 'react';
import {
  AppBar,
  IconButton,
  ListItemIcon,
  Menu,
  MenuItem,
  Toolbar,
  Typography,
} from '@material-ui/core';
import MenuIcon from '@material-ui/icons/Menu';
import { AccountCircle, Help, ExitToApp } from '@material-ui/icons';
import { AssistanceConfirm } from 'components/modals/assistance';
import { Skeleton } from '@material-ui/lab';

const AppBarMenu = ({ isAuthenticated, logout, title }) => {
  const [anchorEl, setAnchorEl] = useState(null);
  const [assistance, setAssistance] = useState(false);

  const isMenuOpen = Boolean(anchorEl);

  const handleProfileMenuOpen = event => {
    setAnchorEl(event.currentTarget);
  };

  const handleMenuClose = () => {
    setAnchorEl(null);
  };

  const renderMenu = isAuthenticated && (
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

  return (
    <>
      <AppBar position="sticky">
        <Toolbar>
          <IconButton edge="start" color="inherit" aria-label="menu">
            <MenuIcon />
          </IconButton>
          <Typography variant="h6" style={{ flexGrow: 1 }}>
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
      {renderMenu}
      <AssistanceConfirm open={assistance} setOpen={setAssistance} />
    </>
  );
};
export default AppBarMenu;
