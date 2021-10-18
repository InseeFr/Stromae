import React, { useMemo } from 'react';
import useMediaQuery from '@material-ui/core/useMediaQuery';
import { createMuiTheme, ThemeProvider } from '@material-ui/core/styles';

const StyleProvider = ({ children }) => {
  const prefersDarkMode = useMediaQuery('(prefers-color-scheme: dark)');
  // prefersDarkMode ? 'dark' : 'light'
  const theme = useMemo(
    () =>
      createMuiTheme({
        palette: {
          type: 'light',
          primary: {
            main: '#0f417a',
          },
          secondary: {
            main: '#ffc400',
          },
          background: {},
        },
      }),
    []
  );

  return <ThemeProvider theme={theme}>{children}</ThemeProvider>;
};

export default StyleProvider;
