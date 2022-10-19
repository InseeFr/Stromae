import React from 'react';
import { Button } from 'components/designSystem/Button';
import { defaultDictionary, buttonDictionary } from 'i18n';
import Dialog from '@material-ui/core/Dialog';
import DialogActions from '@material-ui/core/DialogActions';
import DialogContent from '@material-ui/core/DialogContent';
import DialogContentText from '@material-ui/core/DialogContentText';
import DialogTitle from '@material-ui/core/DialogTitle';
import { MarkdownTypo } from 'components/designSystem';
import { SIMPLE_CLICK_EVENT, paradataHandler } from 'utils/events';

const utilInfo = (type) => {
	return {
		...SIMPLE_CLICK_EVENT,
		idParadataObject: `${type}-welcomeBack-modal-button`,
	};
};

const WelcomeBack = ({ open, setOpen, goToFirstPage }) => {
	const goToCurrentPage = () => {
		setOpen(false);
	};

	const goToFirst = () => {
		goToFirstPage();
		setOpen(false);
	};

	return (
		<Dialog
			open={open}
			disableBackdropClick
			disableEscapeKeyDown
			onClose={paradataHandler(goToCurrentPage)(utilInfo('close'))}
			aria-labelledby='alert-dialog-slide-title'
			aria-describedby='alert-dialog-slide-description'
		>
			<DialogTitle id='alert-dialog-slide-title'>
				{defaultDictionary.welcomeBackTitle}
			</DialogTitle>
			<DialogContent>
				<DialogContentText id='alert-dialog-slide-description' component='div'>
					<MarkdownTypo>{defaultDictionary.welcomeBackBody}</MarkdownTypo>
				</DialogContentText>
			</DialogContent>
			<DialogActions>
				<Button
					onClick={paradataHandler(goToCurrentPage)(
						utilInfo('goToCurrentPage')
					)}
				>
					{buttonDictionary.goBackToCurrentPage}
				</Button>
				<Button onClick={paradataHandler(goToFirst)(utilInfo('goToFirstPage'))}>
					{buttonDictionary.goToFirstPage}
				</Button>
			</DialogActions>
		</Dialog>
	);
};

export default WelcomeBack;
