import { makeStyles, Typography } from '@material-ui/core';
import React from 'react';
import { version, dependencies } from '../../../package.json';

const useStyles = makeStyles({
  root: {
    textAlign: 'center',
    padding: '2px 0 2px 0',
  },
});

const lunaticVersion = dependencies['@inseefr/lunatic'].replace('^', '');

export const AppVersion = ({ className }) => {
  const classes = useStyles();
  return (
    <Typography className={`${className} ${classes.root}`}>
      {`Stromae : ${version} | Lunatic : ${lunaticVersion}`}
    </Typography>
  );
};
