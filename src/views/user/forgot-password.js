import React, { useState, useEffect } from 'react';
import { Row, Card, CardTitle, Label, FormGroup, Button } from 'reactstrap';
import { NavLink, useHistory } from 'react-router-dom';
import { Formik, Form, Field } from 'formik';
import { connect } from 'react-redux';
import { Colxx } from 'components/common/CustomBootstrap';
import IntlMessages from 'helpers/IntlMessages';
import { getCurrentColor } from 'helpers/Utils';
import logo from 'assets/img/logo-light-small.png';
import drakLogo from 'assets/img/thebigdeal-logo.png';
import {
  forgetpassword,
  updatePassword,
} from 'redux/authentication/actions.authentication';
// import { NotificationManager } from 'components/common/react-notifications';
import * as Yup from 'yup';
import OtpInput from 'components/otpInput/OtpInput';

const ForgotSchema = Yup.object().shape({
  email: Yup.string().email().required('Please enter email'),
  password: Yup.string().when('otpStatus', {
    is: true,
    then: Yup.string().required('Please Enter Password'),
  }),
});

const validateEmail = (value) => {
  let error;
  if (!value) {
    error = 'Please enter your email address';
  } else if (!/^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,4}$/i.test(value)) {
    error = 'Invalid email address';
  }
  return error;
};

const ForgotPassword = ({
  loading,
  // errorMessage,
  // successMesage,
  forgotPasswordAction,
  updatePasswordAction,
}) => {
  const [colorDark, setColorDark] = useState(false);
  const [otpVisible, setOtpVisible] = useState(false);
  const [otpValue, setOtpValue] = useState('');
  const [otpError, setOtpError] = useState(false);
  const history = useHistory();

  const onForgotPassword = (values, methods) => {
    let flagError = false;

    if (values.email === '') {
      setOtpVisible(false);
      flagError = true;
    }

    if (otpVisible) {
      if (otpValue === '') {
        setOtpError(true);
        flagError = true;
      } else if (otpValue.length !== 4) {
        setOtpError(true);
        flagError = true;
      } else {
        setOtpError(false);
      }
      if (values.password.length === 0) {
        flagError = true;
        methods.setFieldValue('otpStatus', otpVisible);
      }
    }

    if (!flagError && !otpVisible) {
      if (values.email !== '') {
        forgotPasswordAction(values.email, () => {
          setOtpVisible(true);
        });
      }
    } else if (!flagError && otpVisible) {
      updatePasswordAction({
        email: values.email,
        newPassword: values.password,
        otp: otpValue,
        cb: () => {
          history.push('/user/login');
        },
      });
    }
  };

  // useEffect(() => {
  //   if (successMesage) {
  //     NotificationManager.success(null, successMesage);
  //   } else if (errorMessage) {
  //     NotificationManager.error(null, errorMessage);
  //   }
  // }, [successMesage, errorMessage]);

  useEffect(() => {
    const color = getCurrentColor();
    if (color.includes('dark')) setColorDark(true);
    else setColorDark(false);
  }, []);

  const initialValues = { email: '', password: '' };

  return (
    <Row className="h-100">
      <Colxx xxs="12" md="10" className="mx-auto my-auto">
        <Card className="auth-card">
          <div className="position-relative image-side ">
            <p className="text-white h2">WELCOME TO THE BIGDEAL ADMIN</p>
            <p className="white mb-0">
              Please use your e-mail to reset your password. <br />
              {/* If you are not a member, please{' '}
              <NavLink to="/user/register" className="white">
                register
              </NavLink>
              . */}
            </p>
          </div>
          <div className="form-side">
            <NavLink to="/" className="white">
              <img
                src={colorDark ? logo : drakLogo}
                alt="TBD"
                width="90px"
                className="mb-5"
              />
            </NavLink>
            <CardTitle className="mb-4">
              <IntlMessages id="user.forgot-password" />
            </CardTitle>

            <Formik
              initialValues={initialValues}
              onSubmit={(values, methods) => onForgotPassword(values, methods)}
              validationSchema={ForgotSchema}
            >
              {({ errors, touched }) => (
                <Form
                  className="av-tooltip tooltip-label-bottom"
                  onChange={(e) => {
                    if (e.target.name === 'email') {
                      setOtpVisible(false);
                    }
                  }}
                >
                  <FormGroup className="form-group has-float-label">
                    <Label>
                      <IntlMessages id="user.email" />
                    </Label>
                    <Field
                      className="form-control"
                      name="email"
                      validate={validateEmail}
                    />
                    {errors.email && touched.email && (
                      <div className="invalid-feedback d-block">
                        {errors.email}
                      </div>
                    )}
                  </FormGroup>
                  {otpVisible && (
                    <FormGroup className="form-group has-float-label">
                      <div className="groupLogin ">
                        <Label>
                          <IntlMessages id="user.otp" />
                        </Label>
                        <OtpInput
                          length={4}
                          onChange={(e) => setOtpValue(e)}
                          error={otpError}
                          helperText="please enter Otp "
                        />
                      </div>
                    </FormGroup>
                  )}
                  {otpVisible && (
                    <FormGroup className="form-group has-float-label">
                      <Label>
                        <IntlMessages id="user.password" />
                      </Label>
                      <Field className="form-control" name="password" />
                      {errors.password && touched.password && (
                        <div className="invalid-feedback d-block">
                          {errors.password}
                        </div>
                      )}
                    </FormGroup>
                  )}

                  <div className="d-flex justify-content-between align-items-center">
                    <NavLink to="/user/login">
                      <IntlMessages id="user.login-title" />?
                    </NavLink>
                    <Button
                      color="primary"
                      className={`btn-shadow btn-multiple-state ${
                        loading ? 'show-spinner' : ''
                      }`}
                      size="lg"
                    >
                      <span className="spinner d-inline-block">
                        <span className="bounce1" />
                        <span className="bounce2" />
                        <span className="bounce3" />
                      </span>
                      <span className="label">
                        <IntlMessages
                          id={
                            otpVisible
                              ? 'user.reset-password-button'
                              : 'user.get-otp'
                          }
                        />
                      </span>
                    </Button>
                  </div>
                </Form>
              )}
            </Formik>
          </div>
        </Card>
      </Colxx>
    </Row>
  );
};

const mapStateToProps = ({ authentication }) => {
  const { loading, errorMessage, successMesage } = authentication;
  return { loading, errorMessage, successMesage };
};
const mapActionsToProps = (dispatch) => {
  return {
    forgotPasswordAction: (email, cb) =>
      dispatch(forgetpassword({ email, cb })),
    updatePasswordAction: (params) => dispatch(updatePassword(params)),
  };
};

export default connect(mapStateToProps, mapActionsToProps)(ForgotPassword);
