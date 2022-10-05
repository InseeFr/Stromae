import { Box, Typography } from '@material-ui/core';
import React from 'react';
import './component.css';

export const NotFound = () => {
  return (
    <div className="notFound">
      <div className="face">
        <div className="band">
          <div className="red"></div>
          <div className="white"></div>
          <div className="blue"></div>
        </div>
        <div className="eyes"></div>
        <div className="dimples"></div>
        <div className="mouth"></div>
      </div>

      <Typography component="div">
        <Box textAlign="center" fontSize="h3.fontSize" m={1}>
          Oups! Page non trouvée !
        </Box>
      </Typography>
    </div>
  );
};
