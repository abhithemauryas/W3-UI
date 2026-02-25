/* eslint-disable */
import { isAuthGuardActive } from 'constants/defaultValues';
import { connect } from 'react-redux';
import { Redirect, Route } from 'react-router-dom';
import { userPermission } from 'redux/authentication/actions.authentication';
import { getCurrentUser, getPermission } from './Utils';

function AccessControlled({
  component: Component,
  roles = undefined,
  ...rest
}) {
  const setComponent = (props) => {
    if (isAuthGuardActive) {
      const currentUser = getCurrentUser();
      const permission = getPermission();
      if (currentUser) {
        if (permission?.length) {
          if (roles.includes(currentUser.userInfo.Role.name)) {
            return <Component {...props} permission={permission} />;
          }
          return (
            <Redirect
              to={{
                pathname: '/unauthorized',
                state: { from: props.location },
              }}
            />
          );
        }
        return <Component {...props} />;
      }
      return (
        <Redirect
          to={{
            pathname: '/user/login',
            state: { from: props.location },
          }}
        />
      );
    }
    return <Component {...props} />;
  };

  return <Route {...rest} render={setComponent} />;

  //   Do LOGOUT clear localstorage and send him to login again
}

const mapStateToProps = ({ authentication }) => {
  const { loading, errorMessage, permission } = authentication;
  return {
    loading,
    errorMessage,
    permission,
  };
};

const mapActionsToProps = (dispatch) => {
  return {
    fetchUserPermission: () => dispatch(userPermission()),
  };
};

export default connect(mapStateToProps, mapActionsToProps)(AccessControlled);
