import React, { useContext, useState, useEffect } from 'react';
import { IconButton } from '@material-ui/core';
import MenuIcon from '@material-ui/icons/Menu';
import { Help, ExitToApp, Close } from '@material-ui/icons';
import { AssistanceConfirm } from 'components/modals/assistance';
import { useAuth } from 'utils/hooks';
import { HOUSEHOLD } from 'utils/constants';
import { OrchestratorContext } from 'components/orchestrator/collector';
import { SIMPLE_CLICK_EVENT, paradataHandler } from 'utils/events';
import './burgerMenu.css';

const utilInfo = (type, page) => {
  return { ...SIMPLE_CLICK_EVENT, id: `${type}-button`, page };
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
            <span className="slideBarButtonText">Contacter l'assistance</span>
          </IconButton>
          {!isAuthenticated || inseeContext !== HOUSEHOLD || (
            <IconButton
              className="burgerMenuButton"
              aria-label="Déconnexion"
              color="inherit"
              onClick={paradataHandler(logout)(utilInfo('logout', currentPage))}
            >
              <ExitToApp />
              &nbsp;
              <span className="slideBarButtonText">Déconnexion</span>
            </IconButton>
          )}
        </div>
        <div id="burgerMenuToggleTab">
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
