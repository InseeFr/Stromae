import React, { useContext, useState, useEffect } from 'react';
import { IconButton, Typography } from '@material-ui/core';
import MenuIcon from '@material-ui/icons/Menu';
import { Help, ExitToApp, Close } from '@material-ui/icons';
import { AssistanceConfirm } from 'components/modals/assistance';
import { useAuth } from 'utils/hooks';
import { HOUSEHOLD } from 'utils/constants';
import { OrchestratorContext } from 'components/orchestrator/collector';
import { SIMPLE_CLICK_EVENT, paradataHandler } from 'utils/events';
import './burgerMenu.css';
import { AppVersion } from 'components/designSystem/AppVersion';
import { burgerDictionary } from 'i18n';

const utilInfo = (type, page) => {
  return { ...SIMPLE_CLICK_EVENT, idParadataObject: `${type}-button`, page };
};

const BurgerMenu = ({ title }) => {
  const [isOpen, setIsOpen] = useState(false);
  const [assistance, setAssistance] = useState(false);
  const {
    metadata: { inseeContext },
    currentPage,
  } = useContext(OrchestratorContext);
  const { oidcUser, logout } = useAuth();
  const isAuthenticated = oidcUser?.profile;

  useEffect(() => {
    window.addEventListener('scroll', closeMenu);
    return () => {
      window.removeEventListener('scroll', closeMenu);
    };
  }, []);

  const toggleMenu = function () {
    setIsOpen(!isOpen);
  };

  const closeMenu = function () {
    setIsOpen(false);
  };

  return (
    <>
      <div id="burgerMenu" className={isOpen ? 'opened' : 'closed'}>
        <div id="burgerMenuSlideBar">
          <IconButton
            className="burgerMenuButton"
            aria-label="Assistance"
            color="inherit"
            onClick={() => setAssistance(true)}
          >
            <Help />
            &nbsp;
            <span className="slideBarButtonText">{burgerDictionary.help}</span>
          </IconButton>
          {isAuthenticated && inseeContext === HOUSEHOLD && (
            <IconButton
              className="burgerMenuButton"
              aria-label="Déconnexion"
              color="inherit"
              onClick={paradataHandler(logout)(utilInfo('logout', currentPage))}
            >
              <ExitToApp />
              &nbsp;
              <span className="slideBarButtonText">
                {burgerDictionary.exit}
              </span>
            </IconButton>
          )}
          <AppVersion className="appVersion" />
        </div>
        <div id="burgerMenuToggleTab">
          <Typography id="toggleSlidebarText">
            {burgerDictionary.menu}
          </Typography>
          <IconButton
            id="toggleSlidebarButton"
            edge="start"
            color="inherit"
            aria-label="menu"
            onClick={() => toggleMenu()}
          >
            {isOpen ? <Close /> : <MenuIcon />}
          </IconButton>
        </div>
      </div>
      <AssistanceConfirm open={assistance} setOpen={setAssistance} />
    </>
  );
};
export default BurgerMenu;
