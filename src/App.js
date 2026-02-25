import { Suspense, useEffect } from 'react';
import { IntlProvider } from 'react-intl';
import { connect } from 'react-redux';
import {
  Redirect,
  Route,
  BrowserRouter as Router,
  Switch,
} from 'react-router-dom';
import { loginUser } from 'redux/user/actions';
import { NotificationContainer } from './components/common/react-notifications';
import { adminRoot, UserRole } from './constants/defaultValues';
import './helpers/Firebase';
import { getDirection } from './helpers/Utils';
import ProtectedRoute from './helpers/authHelper';
import AppLocale from './lang';
import ViewApp from './views/app';
import ViewError from './views/error';
import ViewHome from './views/home';
import ViewUnauthorized from './views/unauthorized';
import ViewUser from './views/user';
import './App.css';

const App = ({ locale }) => {
  const direction = getDirection();
  const currentAppLocale = AppLocale[locale];

  useEffect(() => {
    if (direction.isRtl) {
      document.body.classList.add('rtl');
      document.body.classList.remove('ltr');
    } else {
      document.body.classList.add('ltr');
      document.body.classList.remove('rtl');
    }
  }, [direction]);

  return (
    <div className="h-100">
      <IntlProvider
        locale={currentAppLocale.locale}
        messages={currentAppLocale.messages}
      >
        <>
          <NotificationContainer />
          <Suspense fallback={<div className="loading" />}>
            <Router>
              <Switch>
                <ProtectedRoute
                  path={adminRoot}
                  component={ViewApp}
                  roles={[UserRole.Admin, UserRole.Editor]}
                />
                <Route
                  path="/user"
                  render={(props) => <ViewUser {...props} />}
                />
               
                <Route
                  path="/error"
                  exact
                  render={(props) => <ViewError {...props} />}
                />
                <Route
                  path="/unauthorized"
                  exact
                  render={(props) => <ViewUnauthorized {...props} />}
                />
                <Route
                  path="/"
                  exact
                  render={(props) => <ViewHome {...props} />}
                />
                <Redirect to="/error" />
              </Switch>
            </Router>
          </Suspense>
        </>
      </IntlProvider>
    </div>
  );
};

const mapStateToProps = ({ authUser, settings, user }) => {
  const { currentUser } = authUser;
  const { locale } = settings;
  return { currentUser, locale, user };
};

const mapActionsToProps = (dispatch) => ({
  loginUserDispatch: (user) => dispatch(loginUser({ ...user })),
});

export default connect(mapStateToProps, mapActionsToProps)(App);
