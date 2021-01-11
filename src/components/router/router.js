import React from 'react';
import { Redirect, Route, Switch, useLocation } from 'react-router-dom';
import { OrchestratorManager } from 'components/orchestrator/manager';
import { secure } from 'components/auth';
import { READ_ONLY } from 'utils/constants';

const Router = () => {
  const { pathname } = useLocation();

  return (
    <Switch>
      <Route
        path={`/:${READ_ONLY}?/questionnaire/:idQ/survey-unit/:idSU`}
        component={secure(OrchestratorManager)}
      />
      <Route path="/visualize" component={secure(OrchestratorManager)} />
      {!pathname.startsWith('/authentication') && <Redirect to="/" />}
    </Switch>
  );
};

export default Router;
