import React, { useContext, useState, useEffect } from 'react';
import IconButton from '@material-ui/core/IconButton';
import Typography from '@material-ui/core/Typography';
import MenuIcon from '@material-ui/icons/Menu';
import Help from '@material-ui/icons/Help';
import ExitToApp from '@material-ui/icons/ExitToApp';
import Close from '@material-ui/icons/Close';
import { AssistanceConfirm } from 'components/modals/assistance';
import { HOUSEHOLD } from 'utils/constants';
import { OrchestratorContext } from 'components/orchestrator/collector';
import { SIMPLE_CLICK_EVENT, paradataHandler } from 'utils/events';
import './burgerMenu.css';
import { AppVersion } from 'components/designSystem/AppVersion';
import { burgerDictionary } from 'i18n';
import { AuthContext } from 'components/auth/provider/component';

const utilInfo = (type, page) => {
	return { ...SIMPLE_CLICK_EVENT, idParadataObject: `${type}-button`, page };
};

const BurgerMenu = ({ title }) => {
	const [isOpen, setIsOpen] = useState(false);
	const [assistance, setAssistance] = useState(false);
	const {
		metadata: { inseeContext },
		currentPage,
		logoutAndClose,
	} = useContext(OrchestratorContext);

	const { isUserLoggedIn } = useContext(AuthContext);

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
			<div id='burgerMenu' className={isOpen ? 'opened' : 'closed'}>
				<div id='burgerMenuSlideBar'>
					<IconButton
						className='burgerMenuButton'
						aria-label='Assistance'
						color='inherit'
						onClick={() => setAssistance(true)}
					>
						<Help />
						&nbsp;
						<span className='slideBarButtonText'>{burgerDictionary.help}</span>
					</IconButton>
					{isUserLoggedIn && inseeContext === HOUSEHOLD && (
						<IconButton
							className='burgerMenuButton'
							aria-label='Déconnexion'
							color='inherit'
							onClick={paradataHandler(logoutAndClose)(
								utilInfo('logout', currentPage)
							)}
						>
							<ExitToApp />
							&nbsp;
							<span className='slideBarButtonText'>
								{burgerDictionary.exit}
							</span>
						</IconButton>
					)}
					<AppVersion className='appVersion' />
				</div>
				<div id='burgerMenuToggleTab'>
					<Typography id='toggleSlidebarText'>
						{burgerDictionary.menu}
					</Typography>
					<IconButton
						id='toggleSlidebarButton'
						edge='start'
						color='inherit'
						aria-label='menu'
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
