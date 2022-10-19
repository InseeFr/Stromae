import React from 'react';
import { Redirect, Route, Switch } from 'react-router-dom';
import { OrchestratorManager } from 'components/orchestrator/manager';
import { secure } from 'components/auth';
import { READ_ONLY } from 'utils/constants';
import { Visualizer } from 'components/orchestrator/visualizer';
import { NotFound } from 'components/pages';

const Router = () => {
	return (
		<Switch>
			<Route
				path={`/:${READ_ONLY}?/questionnaire/:idQ/unite-enquetee/:idSU`}
				component={secure(OrchestratorManager)}
			/>
			<Route path='/visualize' component={Visualizer} />
			<Route path='/404' component={NotFound} />
			<Redirect to='/404' />
		</Switch>
	);
};

export default Router;
