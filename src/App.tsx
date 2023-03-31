import { createBrowserRouter, RouterProvider } from 'react-router-dom';
import { Questionnaire } from './pages/questionnaire';
import { Deconnexion } from './pages/deconnexion';
import { Welcome } from './pages/welcome';
import { Error } from './pages/error';
import { Visualize } from './pages/visualize/Visualize';
import { AuthProvider } from './components/auth';
import { RoutingPortail } from './pages/portail';
import { Portail } from './pages/portail';

const router = createBrowserRouter([
	{
		path: '/questionnaire/:survey',
		element: <Portail />,
		errorElement: <Error />,
	},
	{
		path: '/questionnaire/:survey/unite-enquetee/:unit/accueil',
		element: <Welcome />,
		errorElement: <Error />,
	},
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
		path: '/404',
		element: <Error />,
		errorElement: <Error />,
	},
	{
		path: '/',
		element: <RoutingPortail />,
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
