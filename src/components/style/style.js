import React, { useMemo } from 'react';
import useMediaQuery from '@material-ui/core/useMediaQuery';
import { createMuiTheme, ThemeProvider } from '@material-ui/core/styles';

const StyleProvider = ({ children }) => {
  const prefersDarkMode = useMediaQuery('(prefers-color-scheme: dark)');

  const theme = useMemo(
    () =>
      createMuiTheme({
        palette: {
          type: prefersDarkMode ? 'dark' : 'light',
          primary: {
            main: '#0f417a',
          },
          secondary: {
            main: '#ffc400',
          },
          background: {},
        },
      }),
    [prefersDarkMode]
  );

  return <ThemeProvider theme={theme}>{children}</ThemeProvider>;
};

export default StyleProvider;
