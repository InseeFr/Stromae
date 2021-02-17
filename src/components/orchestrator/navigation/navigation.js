import { Button } from 'components/designSystem';
import React from 'react';
import { buttonDictionary } from 'i18n';
import { makeStyles } from '@material-ui/core';

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

const ButtonsNavigation = ({ currentIndex, maxPage, onPrevious, onNext }) => {
  const classes = useStyles();
  const nextLabel =
    currentIndex === 0 ? buttonDictionary.start : buttonDictionary.saveAndNext;
  return (
    <footer role="navigation" className={classes.root}>
      {currentIndex !== 0 && (
        <Button className={classes.navButton} onClick={onPrevious}>
          {buttonDictionary.back}
        </Button>
      )}
      {currentIndex !== maxPage - 1 && (
        <Button className={classes.navButton} onClick={onNext}>
          {nextLabel}
        </Button>
      )}
    </footer>
  );
};

export default ButtonsNavigation;
