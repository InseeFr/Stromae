import React from 'react';
import { Redirect, Route, Switch, useLocation } from 'react-router-dom';
import { OrchestratorManager } from 'components/orchestrator/manager';
import { secure } from 'components/auth';
import { READ_ONLY } from 'utils/constants';
import { Visualizer } from 'components/orchestrator/visualizer';

const Router = () => {
  const { pathname } = useLocation();

  return (
    <Switch>
      <Route
        path={`/:${READ_ONLY}?/questionnaire/:idQ/unite-enquetee/:idSU`}
        component={secure(OrchestratorManager)}
      />
      <Route path="/visualize" component={Visualizer} />
      {/* {!pathname.startsWith('/authentication') && <Redirect to="/visualize" />} */}
    </Switch>
  );
};

export default Router;
