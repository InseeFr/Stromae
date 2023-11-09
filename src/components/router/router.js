import { Redirect, Route, Switch } from 'react-router-dom';
import { environment } from 'utils/read-env-vars';
import { READ_ONLY } from '../../utils/constants';
import secure from '../auth/hoc/hoc';
import { OrchestratorManager } from '../orchestrator/manager';
import { Visualizer } from '../orchestrator/visualizer';
import { NotFound } from '../pages';

const { VIZUALIZE_ENABLED } = environment;

const Router = () => {
  return (
    <Switch>
      <Route
        path={`/:${READ_ONLY}?/questionnaire/:idQ/unite-enquetee/:idSU`}
        component={secure(OrchestratorManager)}
      />
      {VIZUALIZE_ENABLED && <Route path='/visualize' component={Visualizer} />}
      <Route path='/404' component={NotFound} />
      <Redirect to='/404' />
    </Switch>
  );
};

export default Router;
