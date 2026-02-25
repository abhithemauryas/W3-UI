/* eslint-disable react/no-array-index-key, react/no-danger */
import { adminRoot } from 'constants/defaultValues';
import { getCurrentUser } from 'helpers/Utils';
import { Redirect } from 'react-router-dom';

const Home = () => {
  // logged in user check
  // will check user is already logged or not
  const currentUser = getCurrentUser();
  // if  not logged in then Redirect to login page
  if (currentUser === null) {
    return (
      <Redirect
        to={{
          pathname: '/user/login',
        }}
      />
    );
  }
  // if logged in then React to dashboard
  return (
    <Redirect
      to={{
        pathname: adminRoot,
      }}
    />
  );
};

export default Home;
