import { AuthProvider } from 'components/auth';
import { Router } from 'components/router';
import { ErrorFallback } from 'components/shared/error';
import { StyleProvider } from 'components/style';
import React, { useEffect, useState } from 'react';
import { ErrorBoundary } from 'react-error-boundary';
import { BrowserRouter } from 'react-router-dom';
import { getConfiguration } from 'utils/configuration';
import './App.css';

export const AppContext = React.createContext();

const App = () => {
  const [configuration, setConfiguration] = useState(null);

  useEffect(() => {
    if (!configuration) {
      getConfiguration().then((conf) => {
        setConfiguration(conf);
      });
    }
  }, [configuration]);

  return (
    <StyleProvider>
      <ErrorBoundary
        FallbackComponent={ErrorFallback}
        onReset={() => setConfiguration(null)}
        resetKeys={[configuration]}
      >
        {configuration && (
          <AppContext.Provider value={configuration}>
            <AuthProvider>
              <BrowserRouter>
                <Router />
              </BrowserRouter>
            </AuthProvider>
          </AppContext.Provider>
        )}
      </ErrorBoundary>
    </StyleProvider>
  );
};

export default App;
