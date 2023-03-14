import { createBrowserRouter, RouterProvider } from 'react-router-dom';
import { Questionnaire } from './pages/questionnaire';
import { Deconnexion } from './pages/deconnexion';
import { Error } from './pages/error';
import { Visualize } from './pages/visualize/Visualize';
import { AuthProvider } from './components/auth';

const router = createBrowserRouter([
	{
		path: '/questionnaire/:survey/unite-enquetee/:unit/deconnexion',
		element: <Deconnexion />,
		errorElement: <Error />,
	},
	{
		path: '/questionnaire/:survey/unite-enquetee/:unit',
		element: <Questionnaire />,
		errorElement: <Error />,
	},
	{
		path: '/visualize',
		element: <Visualize />,
		errorElement: <Error />,
	},
	{
		path: '/',
		element: <Error />,
		errorElement: <Error />,
	},
]);

export function App() {
	return (
		<AuthProvider>
			<RouterProvider router={router} />
		</AuthProvider>
	);
}
