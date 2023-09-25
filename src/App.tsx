import { createBrowserRouter, RouterProvider } from 'react-router-dom';

import { Questionnaire } from './pages/questionnaire';
import { QuestionnaireReadOnly } from './pages/questionnaireReadOnly';
import { Deconnexion } from './pages/deconnexion';
import { Welcome } from './pages/welcome';
import { PostSubmit } from './pages/postSubmit';
import { Visualize } from './pages/visualize/Visualize';
import { AuthProvider } from './components/auth';
import { RoutingPortail, Portail } from './pages/portail';
import { Optional } from './pages/optional';
import { RouteError } from './pages/error/Error';

const router = createBrowserRouter([
	{
		path: '/questionnaire/:survey',
		element: <Portail />,
		errorElement: <RouteError />,
	},
	{
		path: '/questionnaire/:survey/unite-enquetee/:unit/post-envoi',
		element: <PostSubmit />,
		errorElement: <RouteError />,
	},
	{
		path: '/questionnaire/:survey/unite-enquetee/:unit/accueil',
		element: <Welcome />,
		errorElement: <RouteError />,
	},
	{
		path: '/questionnaire/:survey/unite-enquetee/:unit/deconnexion',
		element: <Deconnexion />,
		errorElement: <RouteError />,
	},
	{
		path: '/questionnaire/:survey/unite-enquetee/:unit',
		element: <Questionnaire />,
		errorElement: <RouteError />,
	},
	{
		path: '/read-only/questionnaire/:survey/unite-enquetee/:unit',
		element: <QuestionnaireReadOnly />,
		errorElement: <RouteError />,
	},
	{
		path: '/questionnaire/:survey/301/:errorType',
		element: <RouteError code={301} />,
		errorElement: <RouteError />,
	},
	{
		path: '/questionnaire/:survey/:optional',
		element: <Optional />,
		errorElement: <RouteError />,
	},
	{
		path: '/visualize',
		element: <Visualize />,
		errorElement: <RouteError />,
	},
	{
		path: '/404',
		element: <RouteError />,
		errorElement: <RouteError />,
	},
	{
		path: '/301',
		element: <RouteError code={301} />,
		errorElement: <RouteError />,
	},
	{
		path: '/',
		element: <RoutingPortail />,
		errorElement: <RouteError />,
	},
]);

export function App() {
	return (
		<AuthProvider>
			<RouterProvider router={router} />
		</AuthProvider>
	);
}
