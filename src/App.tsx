import { createBrowserRouter, RouterProvider } from 'react-router-dom';
import Questionnaire from './pages/questionnaire';
import Portail from './pages/deconnexion';
import ErrorPage from './pages/error';
import Visualize from './pages/visualize/Visualize';
import { AuthProvider } from './components/auth';

const router = createBrowserRouter([
	{
		path: '/questionnaire/:survey/unite-enquetee/:unit/deconnexion',
		element: <Portail />,
		errorElement: <ErrorPage />,
	},
	{
		path: '/questionnaire/:survey/unite-enquetee/:unit',
		element: <Questionnaire />,
		errorElement: <ErrorPage />,
	},
	{
		path: '/visualize',
		element: <Visualize />,
		errorElement: <ErrorPage />,
	},
	{
		path: '/',
		element: <ErrorPage />,
		errorElement: <ErrorPage />,
	},
]);

function App() {
	return (
		<AuthProvider>
			<RouterProvider router={router} />
		</AuthProvider>
	);
}

export default App;
