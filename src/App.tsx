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
import { ErrorRedirection } from './pages/error/Error';

const router = createBrowserRouter([
	{
		path: '/questionnaire/:survey',
		element: <Portail />,
		errorElement: <ErrorRedirection />,
	},
	{
		path: '/questionnaire/:survey/unite-enquetee/:unit/post-envoi',
		element: <PostSubmit />,
		errorElement: <ErrorRedirection />,
	},
	{
		path: '/questionnaire/:survey/unite-enquetee/:unit/accueil',
		element: <Welcome />,
		errorElement: <ErrorRedirection />,
	},
	{
		path: '/questionnaire/:survey/unite-enquetee/:unit/deconnexion',
		element: <Deconnexion />,
		errorElement: <ErrorRedirection />,
	},
	{
		path: '/questionnaire/:survey/unite-enquetee/:unit',
		element: <Questionnaire />,
		errorElement: <ErrorRedirection />,
	},
	{
		path: '/read-only/questionnaire/:survey/unite-enquetee/:unit',
		element: <QuestionnaireReadOnly />,
		errorElement: <ErrorRedirection />,
	},
	{
		path: '/questionnaire/:survey/301',
		element: <ErrorRedirection code={301} />,
		errorElement: <ErrorRedirection />,
	},
	{
		path: '/questionnaire/:survey/:optional',
		element: <Optional />,
		errorElement: <ErrorRedirection />,
	},
	{
		path: '/visualize',
		element: <Visualize />,
		errorElement: <ErrorRedirection />,
	},
	{
		path: '/404',
		element: <ErrorRedirection />,
		errorElement: <ErrorRedirection />,
	},
	{
		path: '/301',
		element: <ErrorRedirection code={301} />,
		errorElement: <ErrorRedirection />,
	},
	{
		path: '/',
		element: <RoutingPortail />,
		errorElement: <ErrorRedirection />,
	},
]);

export function App() {
	return (
		<AuthProvider>
			<RouterProvider router={router} />
		</AuthProvider>
	);
}
