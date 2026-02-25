import metaSvg from 'assets/logos/metamask.svg';
import { NotificationManager } from 'components/common/react-notifications';
import { Field, Form, Formik } from 'formik';
import IntlMessages from 'helpers/IntlMessages';
import { useEffect } from 'react';
import { connect } from 'react-redux';
import { useHistory } from 'react-router-dom';
import { Button, Col, Container, FormGroup, Label, Row } from 'reactstrap';
// import { loginUser } from 'redux/actions';
import { adminRoot } from 'constants/defaultValues';
import { getCurrentUser } from 'helpers/Utils';
import { login } from 'redux/authentication/actions.authentication';
// import { setCurrentUser } from 'helpers/Utils';
// import drakLogo from 'assets/img/auctionx-dark.png';
import logo from 'assets/img/auctionx-light.png';
import logoImg from 'assets/img/login-img.png';
import { openWeb3Modal } from 'lib/web3Config';
import { useAccountEffect, useDisconnect, useSignMessage } from 'wagmi';

const validatePassword = (value) => {
  let error;
  if (!value) {
    error = 'Please enter your password';
  } else if (value.length < 4) {
    error = 'Value must be longer than 3 characters';
  }
  return error;
};

const validateEmail = (value) => {
  let error;
  if (!value) {
    error = 'Please enter your email address';
  } else if (!/^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,4}$/i.test(value)) {
    error = 'Invalid email address';
  }
  return error;
};

const Login = ({ loading, checkLogin, successMesage, errorMessage }) => {
  // const { status } = useAccount();
  const { signMessageAsync } = useSignMessage();
  const history = useHistory();
  // const [showLoginForm, setShowLoginForm] = useState(false);
  const { disconnect } = useDisconnect();

  const handleSignInReject = async () => {
    await disconnect();
  };

  useAccountEffect({
    async onConnect(data) {
      if (!data.isReconnected) {
        try {
          const signature = await signMessageAsync({
            message: 'Welcome to AuctionX Superadmin Panel.',
          });
          if (signature) {
            checkLogin({ signature }, (res) => {
              if (!res.success) {
                disconnect();
              }
              console.log('res', res);
            });
          }
        } catch (error) {
          console.error('Failed to sign message or login', error);
          handleSignInReject();
        }
      }
    },
    onDisconnect() {
      console.log('Disconnected!');
    },
  });

  useEffect(() => {
    if (successMesage) {
      const ls = getCurrentUser();
      if (ls?.userToken) {
        history.push(adminRoot);
        NotificationManager.success(null, successMesage);
      }
    } else if (errorMessage) {
      NotificationManager.error(null, errorMessage);
    }
  }, [successMesage, errorMessage]);

  const onUserLogin = (values) => {
    if (!loading) {
      if (values.email !== '' && values.password !== '') {
        checkLogin(values);
      }
    }
  };
  const initialValues = { email: '', password: '' };
  const handleWalletConnect = async () => {
    try {
      await disconnect();
      openWeb3Modal();
    } catch (error) {
      console.error('Failed to connect:', error);
    }
  };
  const loginPageNoScroll = `
  html, body, #root {
    height: 100% !important;
    overflow: hidden !important;
  }
`;
  useEffect(() => {
    const style = document.createElement('style');
    style.innerHTML = loginPageNoScroll;
    document.head.appendChild(style);
    return () => {
      document.head.removeChild(style);
    };
  }, []);

  return (
    <>
    <style>{loginPageNoScroll}</style>
    <Container fluid className="h-100 bg-white" style={{ maxHeight: '100%' }}>
      <Row className="h-100">
        <Col
          md="5"
          className="d-flex flex-column justify-content-center align-items-center h-100"
        >
          <div className="d-flex justify-content-center">
            <img
              alt="logo"
              src={logo}
              height={30}
              width={190}
              className="mb-4"
            />
          </div>
          <div
            className="d-flex justify-content-center"
            style={{ maxWidth: '380px' }}
          >
            <div className="form-side w-100">
              {/* <CardTitle
                className="mb-4 card-font text-dark"
                // onClick={() => setShowLoginForm(!showLoginForm)}
              >
                <IntlMessages id="user.login-title" />
              </CardTitle> */}

              {false && (
                <Formik initialValues={initialValues} onSubmit={onUserLogin}>
                  {({ errors, touched }) => (
                    <Form className="av-tooltip tooltip-label-bottom ">
                      <FormGroup className="form-group has-float-auth-label">
                        <Label className="text-dark">
                          <IntlMessages id="user.email" />
                        </Label>
                        <Field
                          className="form-control bg-white text-dark auth-input"
                          name="email"
                          validate={validateEmail}
                        />
                        {errors.email && touched.email && (
                          <div className="invalid-feedback d-block">
                            {errors.email}
                          </div>
                        )}
                      </FormGroup>
                      <FormGroup className="form-group has-float-auth-label">
                        <Label className="text-dark">
                          <IntlMessages id="user.password" />
                        </Label>
                        <Field
                          className="form-control bg-white text-dark auth-input"
                          type="password"
                          name="password"
                          validate={validatePassword}
                        />
                        {errors.password && touched.password && (
                          <div className="invalid-feedback d-block">
                            {errors.password}
                          </div>
                        )}
                      </FormGroup>

                      <div className="d-flex justify-content-between align-items-center">
                        <Button
                          type="submit"
                          className={`auth-btn-bg  text-white btn-shadow btn-multiple-state btn-parant-spinner-white ${
                            loading ? 'show-spinner' : ''
                          }`}
                          size="sm"
                        >
                          <span className="spinner d-inline-block">
                            <span className="bounce1" />
                            <span className="bounce2" />
                            <span className="bounce3" />
                          </span>
                          <span className="label">
                            <IntlMessages id="user.login-title" />
                          </span>
                        </Button>
                      </div>
                    </Form>
                  )}
                </Formik>
              )}
              <div className="d-flex justify-content-between align-items-center mt-2 p-6">
                <Button
                  onClick={handleWalletConnect}
                  className={`auth-btn-bg  text-white btn-shadow btn-multiple-state btn-parant-spinner-white ${
                    loading ? 'show-spinner' : ''
                  }`}
                  size="sm"
                >
                  {!loading && (
                    <img src={metaSvg} className="auth-btn-img" alt="" />
                  )}
                  <span className="spinner d-inline-block">
                    <span className="bounce1" />
                    <span className="bounce2" />
                    <span className="bounce3" />
                  </span>
                  <span className="label">
                    <IntlMessages id="user.login-wallet" />
                  </span>
                </Button>
              </div>
            </div>
          </div>
        </Col>
        <Col
          md="7"
          className="d-flex justify-content-center align-items-end position-relative"
        >
          <div
            className="bg-animation position-absolute w-100 h-100"
            style={{ top: 0, left: 0, zIndex: 1 }}
          />
          <div
            className="bg-image-login position-absolute w-100 h-100"
            style={{ top: 0, left: 0, zIndex: 2 }}
          />
          <img
            src={logoImg}
            alt="logo"
            className="img-fluid position-relative"
            style={{
              maxHeight: '90%',
              width: 'auto',
              alignSelf: 'flex-end',
              zIndex: 3,
            }}
          />
        </Col>
      </Row>
    </Container>
    </>
  );
};
const mapStateToProps = ({ authentication }) => {
  const { loading, successMesage, errorMessage } = authentication;
  return { loading, successMesage, errorMessage };
};
const mapActionsToProps = (dispatch) => {
  return {
    checkLogin: (params, cb) => dispatch(login({ ...params }, cb)),
  };
};

export default connect(mapStateToProps, mapActionsToProps)(Login);
