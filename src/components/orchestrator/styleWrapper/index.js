import { useContext, useEffect } from 'react';
import { StyleContext } from '../../style/style';

export const StyleWrapper = ({ children, metadata }) => {
  const { setTheme, setStyleSheets } = useContext(StyleContext);

  useEffect(() => {
    if (metadata?.style) {
      const {
        style: { theme, styleSheets },
      } = metadata;
      if (styleSheets) setStyleSheets(styleSheets);
      if (theme) setTheme(theme);
    }
  }, [metadata, setTheme, setStyleSheets]);

  return children;
};
