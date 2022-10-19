import React, { useContext } from 'react';
import { AppContext } from 'App';
import { Button } from 'components/designSystem/Button';
import { defaultDictionary, buttonDictionary } from 'i18n';
import Dialog from '@material-ui/core/Dialog';
import DialogActions from '@material-ui/core/DialogActions';
import DialogContent from '@material-ui/core/DialogContent';
import DialogContentText from '@material-ui/core/DialogContentText';
import DialogTitle from '@material-ui/core/DialogTitle';
import { useParams } from 'react-router-dom';
import { HOUSEHOLD } from 'utils/constants';
import { OrchestratorContext } from 'components/orchestrator/collector';
import { SIMPLE_CLICK_EVENT, paradataHandler } from 'utils/events';

const utilInfo = (type, currentPage) => {
	return {
		...SIMPLE_CLICK_EVENT,
		idParadataObject: `${type}-assistance-modal-button`,
		page: currentPage,
	};
};

const Assistance = ({ open, setOpen }) => {
	const { idQ, idSU } = useParams();
	const { portail } = useContext(AppContext);
	const {
		metadata: { inseeContext },
		currentPage,
	} = useContext(OrchestratorContext);

	const disagree = () => {
		setOpen(false);
	};
	const agree = () => {
		setOpen(false);
		if (inseeContext === HOUSEHOLD && idQ) {
			window.open(
				`${portail}/${idQ
					.substr(0, idQ.indexOf('2'))
					.toLowerCase()}/contacter-assistance/auth?idue=${idSU}`,
				'_blank'
			);
		}
	};

	return (
		<Dialog
			open={open}
			onClose={paradataHandler(disagree)(utilInfo('close', currentPage))}
			disableBackdropClick
			disableEscapeKeyDown
			aria-labelledby='alert-dialog-slide-title'
			aria-describedby='alert-dialog-slide-description'
		>
			<DialogTitle id='alert-dialog-slide-title'>
				{defaultDictionary.assistanceTitle}
			</DialogTitle>
			<DialogContent>
				<DialogContentText id='alert-dialog-slide-description'>
					{defaultDictionary.assistanceBody}
				</DialogContentText>
			</DialogContent>
			<DialogActions>
				<Button
					onClick={paradataHandler(disagree)(utilInfo('disagree', currentPage))}
				>
					{buttonDictionary.no}
				</Button>
				<Button
					onClick={paradataHandler(agree)(utilInfo('agree', currentPage))}
				>
					{buttonDictionary.yes}
				</Button>
			</DialogActions>
		</Dialog>
	);
};

export default Assistance;
