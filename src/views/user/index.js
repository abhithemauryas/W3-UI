import UserLayout from 'layout/UserLayout';
import React, { Suspense } from 'react';
import { Redirect, Route, Switch } from 'react-router-dom';
import Tasks from 'UiComponents/Tasks';
import AuthNavigator from './auth';

// const Tasks = React.lazy(() =>
//   import(/* webpackChunkName: "user-tasks" */ './tasks')
// );
const Login = React.lazy(() =>
  import(/* webpackChunkName: "user-login" */ './login')
);
const Register = React.lazy(() =>
  import(/* webpackChunkName: "user-register" */ './register')
);
const ForgotPassword = React.lazy(() =>
  import(/* webpackChunkName: "user-forgot-password" */ './forgot-password')
);
const ResetPassword = React.lazy(() =>
  import(/* webpackChunkName: "user-reset-password" */ './reset-password')
);

const User = ({ match }) => {
  return (
    <UserLayout>
      <Suspense fallback={<div className="loading" />}>
        <Switch>
          <Redirect exact from={`${match.url}/`} to={`${match.url}/login`} />
          <Route
            path={`${match.url}/auth`}
            render={(props) => <AuthNavigator {...props} />}
          />
          <Route
            path={`${match.url}/login`}
            render={(props) => <Login {...props} />}
          />
           ✅ {/* TASKS ROUTE */}
          <Route
            path={`${match.url}/tasks`}
            component={Tasks}
          />

          <Route
            path={`${match.url}/register`}
            render={(props) => <Register {...props} />}
          />
          <Route
            path={`${match.url}/forgot-password`}
            render={(props) => <ForgotPassword {...props} />}
          />
          <Route
            path={`${match.url}/reset-password`}
            render={(props) => <ResetPassword {...props} />}
          />
          <Redirect to="/error" />
        </Switch>
      </Suspense>
    </UserLayout>
  );
};

export default User;
