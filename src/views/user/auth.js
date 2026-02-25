import { useState } from 'react';
import { Button, Card, Row } from 'reactstrap';

import { Colxx } from 'components/common/CustomBootstrap';
import { useHistory } from 'react-router-dom/cjs/react-router-dom.min';

const AuthNavigator = () => {
  const [showLoginForm, setShowLoginForm] = useState(null);
  const history = useHistory();

  const handleLoginClick = (formType) => {
    setShowLoginForm(formType);
  };

  const renderForm = () => {
    switch (showLoginForm) {
      case 0:
        return history.push('/user/login');
      // case 1:
      //   return history.push('/user/auth');
      case 2:
        return history.push('/user/register');
      default:
        return (
          <div
            style={{ display: 'flex', flexDirection: 'column', padding: 20 }}
          >
            <Button color="primary" onClick={() => handleLoginClick(0)}>
              Login with Email
            </Button>
            <Button
              color="primary"
              className="mt-4"
              onClick={() => handleLoginClick(1)}
            >
              Login with Metamask
            </Button>
            <Button
              color="primary"
              className="mt-4"
              onClick={() => handleLoginClick(2)}
            >
              Register
            </Button>
          </div>
        );
    }
  };

  return (
    <Row className="h-100">
      <Colxx xxs="12" md="10" className="mx-auto my-auto">
        <Card className="auth-card">
          <div className="position-relative image-side ">
            {/* <p className="text-white h2">WELCOME TO THE BIGDEAL ADMIN</p>
            <p className="white mb-0">
              Please use your credentials to login.
              <br />
            </p> */}
          </div>
          <div className="form-side">{renderForm()}</div>
        </Card>
      </Colxx>
    </Row>
  );
};

export default AuthNavigator;
