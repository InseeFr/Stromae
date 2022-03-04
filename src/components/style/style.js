import React, { useState, useEffect, useMemo } from 'react';
import { addStyleSheet } from 'utils/style';
import { createMuiTheme, ThemeProvider } from '@material-ui/core/styles';

export const StyleContext = React.createContext();

const StyleProvider = ({ children }) => {
  const [theme, setTheme] = useState({
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
  });
  const [styleSheets, setStyleSheets] = useState([]);

  const finalTheme = useMemo(() => createMuiTheme(theme), [theme]);

  useEffect(() => {
    if (Array.isArray(styleSheets) && styleSheets.length > 0) {
      styleSheets.forEach(styleSheetUrl => {
        if (styleSheetUrl.endsWith('.css')) {
          addStyleSheet(styleSheetUrl);
        }
      });
    }
  }, [styleSheets]);

  const context = { setTheme, setStyleSheets };

  return (
    <StyleContext.Provider value={context}>
      <ThemeProvider theme={finalTheme}>{children}</ThemeProvider>
    </StyleContext.Provider>
  );
};

export default StyleProvider;
