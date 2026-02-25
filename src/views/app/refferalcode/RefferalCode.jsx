import * as Yup from 'yup';
import React, { useEffect, useState } from 'react';
import { Button, Card, CardBody, FormGroup, Label, Row } from 'reactstrap';
import { Colxx } from 'components/common/CustomBootstrap';
import { connect } from 'react-redux';
import { Field, Formik } from 'formik';
import { getReferral, patchReferral } from 'redux/referral/actions.referral';
import { NotificationManager } from 'components/common/react-notifications';

const ReferralSchema = Yup.object().shape({
  credit_plays: Yup.number().required('Please enter credit XPs'),
  reward_plays: Yup.number().required('Please enter Reward XPs'),
  // description: Yup.string().required('Please Enter Description'),
});
const initialValues = {
  credit_plays: 0,
  reward_plays: 0,
};

const RefferalCode = ({
  fetchReferral,
  updateReferral,
  successMessage,
  errorMessage,
}) => {
  const [formData, setFormData] = useState(initialValues);
  const [initialLoading, setInitialLoading] = useState(false);

  const onSubmitHandel = (value) => {
    updateReferral(value);
    setInitialLoading(true);
  };

  useEffect(() => {
    if (initialLoading) {
      if (successMessage) NotificationManager.success(null, successMessage);
      else if (errorMessage) NotificationManager.error(null, errorMessage);
    }
  }, [successMessage, errorMessage]);

  useEffect(() => {
    fetchReferral({
      cb: (res) => {
        if (res?.success) {
          setFormData({
            credit_plays: res?.data?.credit_plays,
            reward_plays: res?.data?.reward_plays,
          });
        }
      },
    });
  }, []);

  return (
    <Row className="mb-4">
      <Colxx xxs="12">
        <Card>
          <CardBody>
            <h6 className="mb-4">Referral Config</h6>
            <Formik
              initialValues={formData}
              validationSchema={ReferralSchema}
              onSubmit={onSubmitHandel}
              enableReinitialize
            >
              {({ handleSubmit, errors, touched, handleChange }) => (
                <form
                  className="av-tooltip tooltip-label-right"
                  onSubmit={handleSubmit}
                >
                  <div className="d-flex flex-wrap">
                    <div className="d-flex flex-wrap flex-sm-nowrap gap-40 w-100 mb-2">
                      <div className="w-100">
                        <FormGroup className="error-l-75">
                          <Label>
                            Credit Threshold{' '}
                            <span className="text-danger">*</span>
                          </Label>
                          <Field
                            className="form-control"
                            name="credit_plays"
                            type="number"
                            onKeyDown={(e) => {
                              if (
                                e.code === 'ArrowUp' ||
                                e.code === 'ArrowDown' ||
                                e.code === 'KeyE' ||
                                e.key === '-'
                              ) {
                                e.preventDefault();
                              } else {
                                handleChange(e);
                              }
                            }}
                            onWheel={(e) => e.target.blur()}
                          />
                          {errors.credit_plays && touched.credit_plays ? (
                            <div className="position-absolute field-error">
                              {errors.credit_plays}
                            </div>
                          ) : null}
                        </FormGroup>
                      </div>
                      <div className="w-100">
                        <FormGroup className="error-l-75">
                          <Label>
                            Reward XPs <span className="text-danger">*</span>
                          </Label>
                          <Field
                            className="form-control"
                            name="reward_plays"
                            type="number"
                            onKeyDown={(e) => {
                              if (
                                e.code === 'ArrowUp' ||
                                e.code === 'ArrowDown' ||
                                e.code === 'KeyE' ||
                                e.key === '.' ||
                                e.key === '-'
                              ) {
                                e.preventDefault();
                              } else {
                                handleChange(e);
                              }
                            }}
                            onWheel={(e) => e.target.blur()}
                          />
                          {errors.reward_plays && touched.reward_plays ? (
                            <div className="position-absolute field-error">
                              {errors.reward_plays}
                            </div>
                          ) : null}
                        </FormGroup>
                      </div>
                    </div>
                  </div>

                  <Button
                    className={`btn-multiple-state  ${
                      !'loading' ? 'show-spinner' : ''
                    }`}
                    // disabled={loading}
                    color="primary"
                    type="submit"
                  >
                    <span className="spinner d-inline-block">
                      <span className="bounce1" />
                      <span className="bounce2" />
                      <span className="bounce3" />
                    </span>

                    <span className="label"> Update</span>
                  </Button>
                </form>
              )}
            </Formik>
          </CardBody>
        </Card>
      </Colxx>
    </Row>
  );
};

const mapStateToProps = ({ refferal }) => {
  const { referralCode, loading, successMessage, errorMessage } = refferal;
  return { referralCode, loading, successMessage, errorMessage };
};

const mapActionsToProps = (dispatch) => {
  return {
    fetchReferral: (params) => {
      dispatch(getReferral({ ...params }));
    },
    updateReferral: (params) => {
      dispatch(patchReferral(params));
    },
  };
};

export default connect(mapStateToProps, mapActionsToProps)(RefferalCode);
