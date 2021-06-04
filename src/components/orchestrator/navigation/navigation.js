import { Button } from 'components/designSystem';
import React from 'react';
import { buttonDictionary } from 'i18n';
import { makeStyles } from '@material-ui/core';
import { VALIDATION_PAGE, WELCOME_PAGE } from 'utils/pagination';
import { paradataHandler, SIMPLE_CLICK_EVENT } from 'utils/events';

const useStyles = makeStyles(theme => ({
  root: {
    backgroundColor: 'whitesmoke',
    bottom: 0,
    left: 0,
    top: 'auto',
    width: '100%',
    position: 'fixed',
    display: 'flex',
    justifyContent: 'flex-end',
    alignItems: 'center',
    flex: '0 0 auto',
    borderTop: '1px solid grey',
    paddingTop: '3px',
    paddingBottom: '2px',
  },
  navButton: {
    '&:last-child': {
      marginRight: '5px',
      marginLeft: '5px',
    },
  },
}));

const ButtonsNavigation = ({
  currentPage,
  onPrevious,
  onNext,
  validateQuestionnaire,
}) => {
  const classes = useStyles();
  const nextLabel = () => {
    if (currentPage === WELCOME_PAGE) return buttonDictionary.start;
    if (currentPage === VALIDATION_PAGE) return buttonDictionary.send;
    return buttonDictionary.saveAndNext;
  };
  const nextFunction =
    currentPage === VALIDATION_PAGE ? validateQuestionnaire : onNext;

  const utilInfo = type => {
    return { ...SIMPLE_CLICK_EVENT, id: `${type}-button`, page: currentPage };
  };

  return (
    <footer role="navigation" className={classes.root}>
      {currentPage !== WELCOME_PAGE && (
        <Button
          className={classes.navButton}
          onClick={paradataHandler(onPrevious)(utilInfo('previous'))}
        >
          {buttonDictionary.back}
        </Button>
      )}

      <Button
        className={classes.navButton}
        onClick={paradataHandler(nextFunction)(utilInfo('next'))}
        id={'next-button'}
      >
        {nextLabel()}
      </Button>
    </footer>
  );
};

export default ButtonsNavigation;
