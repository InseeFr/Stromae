import React from 'react';
import { default as MuiButton } from '@material-ui/core/Button';
import { makeStyles } from '@material-ui/core/styles';

const useStyles = makeStyles((theme) => ({
  root: {
    backgroundColor: theme.palette.secondary.main,
    color: theme.palette.primary.main,
    textTransform: 'none',
    '&:hover,&:focus': {
      backgroundColor: theme.palette.primary.main,
      color: theme.palette.secondary.main,
    },
  },
}));

export const Button = ({
  className,
  color,
  children,
  disabled,
  onClick,
  startIcon,
  endIcon,
  ...other
}) => {
  const classes = useStyles();

  return (
    <MuiButton
      className={`${classes.root} ${className}`}
      disabled={disabled}
      onClick={onClick}
      startIcon={startIcon}
      endIcon={endIcon}
      {...other}
    >
      {children}
    </MuiButton>
  );
};
