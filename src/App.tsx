import { createBrowserRouter, RouterProvider } from 'react-router-dom';

import { Questionnaire } from './pages/questionnaire';
import { QuestionnaireReadOnly } from './pages/questionnaireReadOnly';
import { Deconnexion } from './pages/deconnexion';
import { Welcome } from './pages/welcome';
import { PostSubmit } from './pages/postSubmit';

import { Error } from './pages/error';
import { Visualize } from './pages/visualize/Visualize';
import { VisualizeWelcome } from './pages/welcome/visualizeWelcome';
import { AuthProvider } from './components/auth';
import { RoutingPortail, Portail } from './pages/portail';

const router = createBrowserRouter([
	{
		path: '/questionnaire/:survey',
		element: <Portail />,
		errorElement: <Error />,
	},
	{
		path: '/questionnaire/:survey/unite-enquetee/:unit/post-envoi',
		element: <PostSubmit />,
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
		path: '/read-only/questionnaire/:survey/unite-enquetee/:unit',
		element: <QuestionnaireReadOnly />,
		errorElement: <Error />,
	},
	{
		path: '/visualize',
		element: <Visualize />,
		errorElement: <Error />,
	},
  {
		path: '/visualize/accueil',
		element: <VisualizeWelcome />,
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
