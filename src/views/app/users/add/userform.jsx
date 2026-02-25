import React from 'react';
import { Formik, Form, Field } from 'formik';
import * as Yup from 'yup';
import { Row, Card, CardBody, FormGroup, Label, Button } from 'reactstrap';
import { Colxx } from 'components/common/CustomBootstrap';
import Select from 'react-select';
import { useParams } from 'react-router-dom';

const phoneRegExp =
  /^((\\+[1-9]{1,4}[ \\-]*)|(\\([0-9]{2,3}\\)[ \\-]*)|([0-9]{2,4})[ \\-]*)*?[0-9]{3,4}?[ \\-]*[0-9]{3,4}?$/;

const UserSchema = Yup.object().shape({
  firstname: Yup.string()
    .min(2, 'First name is too short!')
    .max(20, 'First name is too long!')
    .required('Please enter First name'),
  lastname: Yup.string()
    .min(2, 'Last name is too short!')
    .max(20, 'Last name is too long!')
    .required('Please enter Last name'),
  email: Yup.string().email('Invalid email').required('Please enter email'),
  zip: Yup.number().positive('Must be positive').required('Please enter zip'),
  country: Yup.string().required('Please enter country'),
  gender: Yup.object().required('Please enter gender'),
  age: Yup.object().required('Please enter age'),
  mobile: Yup.string()
    .matches(phoneRegExp, 'Phone number is not valid')
    .required('Please enter mobile number')
    .max(15, 'to long'),
  profession: Yup.string().required('Please enter Profession'),
});

function UserAddForm(props) {
  const { onSubmit, loading, formData } = props;

  const Age = [
    { label: '18-28', value: '18-28' },
    { label: '28-39', value: '28-39' },
    { label: '40 and above', value: '40 and above' },
  ];

  const Gender = [
    { label: 'Male', value: 'male' },
    { label: 'Female', value: 'female' },
    { label: 'not prefer to specify', value: 'not prefer to specify' },
  ];

  const params = useParams();

  return (
    <Row className="mb-4">
      <Colxx xxs="12">
        <Card>
          <CardBody>
            <h6 className="mb-4">
              {params?.userId ? <>Update Vendor</> : <>Add Vendor</>}
            </h6>

            <Formik
              initialValues={formData}
              validationSchema={UserSchema}
              onSubmit={onSubmit}
              enableReinitialize
            >
              {({ handleSubmit, setFieldValue, values, errors, touched }) => (
                <Form
                  className="av-tooltip tooltip-label-right"
                  onSubmit={handleSubmit}
                >
                  <div className="d-flex flex-wrap">
                    <div className="d-flex flex-wrap flex-sm-nowrap gap-40 w-100 mb-2">
                      <div className="w-100">
                        <FormGroup className="error-l-75">
                          <Label>Firstname *</Label>
                          <Field className="form-control" name="firstname" />
                          {errors.firstname && touched.firstname ? (
                            <div className="position-absolute field-error">
                              {errors.firstname}
                            </div>
                          ) : null}
                        </FormGroup>
                      </div>
                      <div className="w-100">
                        <FormGroup className="error-l-75">
                          <Label>Lastname *</Label>
                          <Field className="form-control" name="lastname" />
                          {errors.lastname && touched.lastname ? (
                            <div className="position-absolute field-error">
                              {errors.lastname}
                            </div>
                          ) : null}
                        </FormGroup>
                      </div>
                    </div>

                    <div className="d-flex flex-wrap flex-sm-nowrap gap-40 w-100 mb-2">
                      <div className="w-100">
                        <FormGroup>
                          <Label>Email *</Label>
                          <Field className="form-control" name="email" />
                          {errors.email && touched.email ? (
                            <div className="position-absolute field-error">
                              {errors.email}
                            </div>
                          ) : null}
                        </FormGroup>
                      </div>
                      <div className="w-100">
                        <FormGroup>
                          <Label>Zip *</Label>
                          <Field className="form-control" name="zip" />
                          {errors.zip && touched.zip ? (
                            <div className="position-absolute field-error">
                              {errors.zip}
                            </div>
                          ) : null}
                        </FormGroup>
                      </div>
                      <div className="w-100">
                        <FormGroup>
                          <Label>Country *</Label>
                          <Field className="form-control" name="country" />
                          {errors.country && touched.country ? (
                            <div className="position-absolute field-error">
                              {errors.country}
                            </div>
                          ) : null}
                        </FormGroup>
                      </div>
                      <div className="w-100">
                        <FormGroup>
                          <Label>Profession *</Label>
                          <Field className="form-control" name="profession" />
                          {errors.profession && touched.profession ? (
                            <div className="position-absolute field-error">
                              {errors.profession}
                            </div>
                          ) : null}
                        </FormGroup>
                      </div>
                    </div>

                    <div className="d-flex flex-wrap flex-md-nowrap gap-40 w-100 mb-2">
                      <div className="d-flex flex-wrap flex-sm-nowrap gap-40 w-100">
                        <div className="w-100">
                          <FormGroup>
                            <Label>Gender *</Label>
                            <Select
                              className="react-select"
                              classNamePrefix="react-select"
                              name="gender"
                              value={values.gender}
                              onChange={(e) => {
                                setFieldValue('gender', e);
                              }}
                              options={
                                Gender.length
                                  ? Gender
                                  : [
                                      {
                                        label: 'No data available',
                                        value: null,
                                      },
                                    ]
                              }
                            />
                            {errors.gender && touched.gender ? (
                              <div className="position-absolute field-error">
                                {errors.gender}
                              </div>
                            ) : null}
                          </FormGroup>
                        </div>
                        <div className="w-100">
                          <FormGroup>
                            <Label>Age *</Label>
                            <Select
                              className="react-select"
                              classNamePrefix="react-select"
                              name="age"
                              value={values.age}
                              onChange={(e) => {
                                setFieldValue('age', e);
                              }}
                              options={
                                Age.length
                                  ? Age
                                  : [
                                      {
                                        label: 'No data available',
                                        value: null,
                                      },
                                    ]
                              }
                            />
                            {errors.age && touched.age ? (
                              <div className="position-absolute field-error">
                                {errors.age}
                              </div>
                            ) : null}
                          </FormGroup>
                        </div>
                        <div className="w-100">
                          {errors ? console.log(errors) : false}
                          <FormGroup>
                            <Label>Mobile No. *</Label>
                            <Field className="form-control" name="mobile" />
                            {errors.mobile && touched.mobile ? (
                              <div className="position-absolute field-error">
                                {errors.mobile}
                              </div>
                            ) : null}
                          </FormGroup>
                        </div>
                      </div>
                    </div>
                    <div className="d-flex flex-wrap flex-md-nowrap gap-40 w-100 mb-2">
                      <div className="w-100">{null}</div>
                    </div>
                  </div>

                  <Button
                    className={`btn-multiple-state  ${
                      loading ? 'show-spinner' : ''
                    }`}
                    disabled={loading}
                    color="primary"
                    type="submit"
                  >
                    <span className="spinner d-inline-block">
                      <span className="bounce1" />
                      <span className="bounce2" />
                      <span className="bounce3" />
                    </span>
                    {params?.userId ? (
                      <span className="label"> Update Vendor</span>
                    ) : (
                      <span className="label">+ Add Vendor</span>
                    )}
                  </Button>
                </Form>
              )}
            </Formik>
          </CardBody>
        </Card>
      </Colxx>
    </Row>
  );
}

export default UserAddForm;
