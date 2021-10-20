import React, { useEffect, useState } from 'react';
import { BrowserRouter } from 'react-router-dom';
import { ErrorBoundary } from 'react-error-boundary';
import { AuthProvider } from 'components/auth';
import { Router } from 'components/router';
import { StyleProvider } from 'components/style';
import { ErrorFallback } from 'components/shared/error';
import './App.css';

export const AppContext = React.createContext();

const App = () => {
  const [configuration, setConfiguration] = useState(null);

  useEffect(() => {
    if (!configuration) {
      fetch(`${window.location.origin}/configuration.json`)
        .then(r => r.json())
        .then(r => {
          setConfiguration(r);
        });
      fetch(`${window.location.origin}/build-configuration.json`)
        .then(r => r.json())
        .then(r => {
          setConfiguration(r);
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
            <AuthProvider authType={configuration.authenticationType}>
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
