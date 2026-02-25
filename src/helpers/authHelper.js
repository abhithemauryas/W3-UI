import { isAuthGuardActive } from 'constants/defaultValues';
import { connect } from 'react-redux';
import { Redirect, Route } from 'react-router-dom';
import { getCurrentUser } from './Utils';

// TODO: Some uncommented code in auth because it may need in access control or to optimse
const ProtectedRoute = ({
  component: Component,
  permission,
  // roles = undefined,
  ...rest
}) => {
  const setComponent = (props) => {
    if (isAuthGuardActive) {
      const currentUser = getCurrentUser();
      if (currentUser) {
        // if (permission.length) {
        //   if (roles.includes(1)) {
        // return <Component {...props} permission={permission} />;
        //   }
        //   return (
        //     <Redirect
        //       to={{
        //         pathname: '/unauthorized',
        //         state: { from: props.location },
        //       }}
        //     />
        //   );
        // }
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
};

const mapStateToProps = ({ authentication }) => {
  const { loading, errorMessage, permission } = authentication;
  return {
    loading,
    errorMessage,
    permission,
  };
};
export default connect(mapStateToProps, {})(ProtectedRoute);
