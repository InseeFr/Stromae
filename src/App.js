import React, { useEffect, useState } from 'react';
import { BrowserRouter } from 'react-router-dom';
import { AuthProvider } from 'components/auth';
import { Router } from 'components/router';
import { StyleProvider } from 'components/style';
import './App.css';

export const AppContext = React.createContext();

const App = () => {
  const [configuration, setConfiguration] = useState(null);

  useEffect(() => {
    fetch(`${window.location.origin}/configuration.json`)
      .then(r => r.json())
      .then(r => {
        setConfiguration(r);
      });
  }, []);

  return (
    <>
      {configuration && (
        <AppContext.Provider value={configuration}>
          <StyleProvider>
            <AuthProvider authType={configuration.authenticationType}>
              <BrowserRouter>
                <Router />
              </BrowserRouter>
            </AuthProvider>
          </StyleProvider>
        </AppContext.Provider>
      )}
    </>
  );
};

export default App;
