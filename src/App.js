import { AuthProvider } from 'components/auth';
import { Router } from 'components/router';
import { ErrorFallback } from 'components/shared/error';
import { StyleProvider } from 'components/style';
import { ErrorBoundary } from 'react-error-boundary';
import { BrowserRouter } from 'react-router-dom';
import './App.css';

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
