import { useEffect, useState } from 'react';
import * as Yup from 'yup';

import {
  Button,
  Card,
  CardBody,
  CardImg,
  CardSubtitle,
  // CardText,
  FormGroup,
  Label,
  Modal,
  ModalBody,
  ModalHeader,
  Row,
} from 'reactstrap';

import { Colxx } from 'components/common/CustomBootstrap';
import { NotificationManager } from 'components/common/react-notifications';

import WalletAddressTooltip from 'components/WalletAddressTooltip';
import { Field, Form, Formik } from 'formik';
import IntlMessages from 'helpers/IntlMessages';
import { getCurrentUser } from 'helpers/Utils';
import { connect } from 'react-redux';
import { resetPassword } from 'redux/actions';

const initialValues = {
  fullName: '',
  email: 'admin929@yopmail.com',
  password: '',
};

const profilePageSchema = Yup.object().shape({
  fullName: Yup.string()
    .min(2, 'Name is too short!')
    .max(20, 'Name is too long!')
    .matches(
      /^(?! )[A-Za-z0-9 ]*(?<! )$/,
      'No leading or trailing spaces allowed'
    )
    .required('Name is required'),
  email: Yup.string().email('Invalid email').required('Email is required'),
  password: Yup.string()
    .min(8, 'password atleast 8 character long')
    .required('Password is required'),
});
const passwordSchema = Yup.object({
  oldPassword: Yup.string().required('Required'),
  newPassword: Yup.string()
    .min(6, 'Password must be at least 6 characters')
    .required('Required'),
  confirmPassword: Yup.string()
    .oneOf([Yup.ref('newPassword'), null], 'Passwords must match')
    .required('Required'),
});

const passwordInitialValues = {
  oldPassword: '',
  newPassword: '',
  confirmPassword: '',
};
const ProfilePage = ({
  // match,
  resetPasswordApiCalls,

  successMesage,
  errorMessage,
}) => {
  const [isPasswordVisible, setIsPasswordVisible] = useState({
    oldPassword: false,
    newPassword: false,
    confirmPassword: false,
    password: false,
  });
  const [modalBasic, setModalBasic] = useState(false);
  const [isFormValid, setIsFormValid] = useState(false);

  useEffect(() => {
    if (isFormValid) {
      if (successMesage) {
        NotificationManager.success(null, successMesage);
        setModalBasic(false);
      } else if (errorMessage.a !== null && errorMessage) {
        NotificationManager.error(null, errorMessage);
      }
    }
  }, [successMesage, errorMessage]);

  const handleSubmit = (e, value, valid) => {
    setIsFormValid(valid);

    e.preventDefault();
    if (valid && valid !== undefined) {
      delete value['confirmPassword'];

      resetPasswordApiCalls(value);
    }

    resetPasswordApiCalls(value);
  };
  return (
    <>
      <Modal isOpen={modalBasic} toggle={() => setModalBasic(!modalBasic)}>
        <ModalHeader>
          <IntlMessages id="user.reset-password" />
        </ModalHeader>
        <ModalBody>
          <Formik
            validationSchema={passwordSchema}
            initialValues={passwordInitialValues}
          >
            {({ errors, touched, values, isValid }) => (
              <Form
                className="w-100 d-flex justify-content-center align-items-center flex-column"
                onSubmit={(e) => handleSubmit(e, values, isValid)}
              >
                <FormGroup className="w-75 position-relative">
                  <Label className="d-flex justify-content-start mb-1">
                    Current Password <span className="text-danger">*</span>
                  </Label>
                  <Field
                    className="form-control"
                    name="oldPassword"
                    type={isPasswordVisible.oldPassword ? 'text' : 'password'}
                    placeholder="Enter Current Password"
                  />
                  <i
                    className="simple-icon-eye position-absolute eye-icon cursor-pointer"
                    onClick={() =>
                      setIsPasswordVisible({
                        ...isPasswordVisible,
                        oldPassword: !isPasswordVisible.oldPassword,
                      })
                    }
                    aria-hidden="true"
                  />
                  {errors.oldPassword && touched.oldPassword ? (
                    <div className="position-absolute field-error">
                      {errors.oldPassword}
                    </div>
                  ) : null}
                </FormGroup>
                <FormGroup className="w-75 position-relative">
                  <Label className="d-flex justify-content-start mb-1">
                    New Password <span className="text-danger">*</span>
                  </Label>
                  <Field
                    className="form-control"
                    name="newPassword"
                    type={isPasswordVisible.newPassword ? 'text' : 'password'}
                    placeholder="Enter New Password"
                  />
                  {errors.newPassword && touched.newPassword ? (
                    <div className="position-absolute field-error">
                      {errors.newPassword}
                    </div>
                  ) : null}
                  <i
                    className="simple-icon-eye position-absolute eye-icon cursor-pointer"
                    onClick={() =>
                      setIsPasswordVisible({
                        ...isPasswordVisible,
                        newPassword: !isPasswordVisible.newPassword,
                      })
                    }
                    aria-hidden="true"
                  />
                </FormGroup>
                <FormGroup className="w-75 position-relative">
                  <Label className="d-flex justify-content-start mb-1">
                    Confirm New Password <span className="text-danger">*</span>
                  </Label>
                  <Field
                    className="form-control"
                    name="confirmPassword"
                    type={
                      isPasswordVisible.confirmPassword ? 'text' : 'password'
                    }
                    placeholder="Enter Confirm Password"
                  />
                  {errors.confirmPassword && touched.confirmPassword ? (
                    <div className="position-absolute field-error">
                      {errors.confirmPassword}
                    </div>
                  ) : null}
                  <i
                    className="simple-icon-eye position-absolute eye-icon cursor-pointer"
                    onClick={() =>
                      setIsPasswordVisible({
                        ...isPasswordVisible,
                        confirmPassword: !isPasswordVisible.confirmPassword,
                      })
                    }
                    aria-hidden="true"
                  />
                </FormGroup>
                <div className="mt-2">
                  <Button className="mr-3" type="submit">
                    submit
                  </Button>
                  <Button
                    className="bg-danger ml-3"
                    onClick={() => setModalBasic(false)}
                  >
                    Cancel
                  </Button>
                </div>
              </Form>
            )}
          </Formik>
        </ModalBody>
      </Modal>

      <Row className="d-flex align-items-center justify-content-center">
        <Colxx md="8" sm="8" lg="8" xxs="24" xl="8">
          <Card>
            <CardBody>
              <div className="text-center">
                <CardImg
                  top
                  src="/assets/img/profiles/l-1.jpg"
                  alt="Card image cap"
                  className="img-thumbnail border-0 rounded-circle mb-2 list-thumbnail"
                />

                <CardSubtitle className="mb-4">Super Admin</CardSubtitle>

                <Formik
                  initialValues={initialValues}
                  validationSchema={profilePageSchema}
                >
                  {() => (
                    <Form
                      className="w-100 d-flex justify-content-center align-items-center flex-column"
                      onSubmit={handleSubmit}
                    >
                      {/* <FormGroup className="w-50">
                        <Label className="d-flex justify-content-start mb-1">
                          Name*
                        </Label>
                        <Field
                          className="form-control"
                          name="fullName"
                          type="text"
                          placeholder="Enter Name"
                          disabled
                        />
                        {errors.fullName && touched.fullName ? (
                          <div className="position-absolute field-error">
                            {errors.fullName}
                          </div>
                        ) : null}
                      </FormGroup> */}
                      {/* <FormGroup className="w-50">
                        <Label className="d-flex justify-content-start mb-1">
                          Wallet Address
                        </Label>
                        <Field
                          className="form-control"
                          name="email"
                          type="email"
                          placeholder="Enter Email"
                          disabled
                        />
                        {errors.email && touched.email ? (
                          <div className="position-absolute field-error">
                            {errors.email}
                          </div>
                        ) : null}
                      </FormGroup> */}
                      <FormGroup className="w-100">
                        <Label className="mb-2 font-weight-bold">
                          Wallet Address
                        </Label>
                        <br />
                        <>
                          {WalletAddressTooltip(
                            getCurrentUser()?.userInfo.wallet_address,
                            false
                          )}
                        </>
                      </FormGroup>

                      {/* <FormGroup className="w-50 position-relative">
                        <Label className="d-flex justify-content-start mb-1">
                          Password*
                        </Label>
                        <Field
                          className="form-control"
                          name="password"
                          type={
                            isPasswordVisible.password ? 'text' : 'password'
                          }
                          placeholder="Enter Password"
                          disabled
                        />
                        {errors.password && touched.password ? (
                          <div className="position-absolute field-error">
                            {errors.password}
                          </div>
                        ) : null}
                        <i
                          className="simple-icon-eye position-absolute eye-icon cursor-pointer"
                          onClick={() =>
                            setIsPasswordVisible({
                              ...isPasswordVisible,
                              password: !isPasswordVisible.password,
                            })
                          }
                          aria-hidden="true"
                        />
                      </FormGroup> */}
                      {/* <CardText className=" w-50 d-flex justify-content-end fw-bold mb-1 cursor-pointer text-primary">
                        <span
                          onClick={() => setModalBasic(!modalBasic)}
                          aria-hidden="true"
                        >
                          Reset Password?
                        </span>
                      </CardText> */}
                      {/* <Button>submit</Button> */}
                    </Form>
                  )}
                </Formik>
              </div>
            </CardBody>
          </Card>
        </Colxx>
      </Row>
    </>
  );
};

const mapStateToProps = ({ authentication }) => {
  const { loading, successMesage, errorMessage } = authentication;
  return { loading, successMesage, errorMessage };
};
const mapActionsToProps = (dispatch) => {
  return {
    resetPasswordApiCalls: (params) => dispatch(resetPassword({ ...params })),
  };
};

export default connect(mapStateToProps, mapActionsToProps)(ProfilePage);
