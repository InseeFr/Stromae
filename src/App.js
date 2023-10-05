import { ErrorBoundary } from 'react-error-boundary';
import { BrowserRouter } from 'react-router-dom';
import './App.css';
import { AuthProvider } from './components/auth/provider';
import { Router } from './components/router';
import { ErrorFallback } from './components/shared/error';
import { StyleProvider } from './components/style';

const App = () => {
  return (
    <StyleProvider>
      <ErrorBoundary FallbackComponent={ErrorFallback}>
        <AuthProvider>
          <BrowserRouter>
            <Router />
          </BrowserRouter>
        </AuthProvider>
      </ErrorBoundary>
    </StyleProvider>
  );
};

export default App;
