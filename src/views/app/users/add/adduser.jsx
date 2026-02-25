import { Colxx, Separator } from 'components/common/CustomBootstrap';
import { NotificationManager } from 'components/common/react-notifications';
import React from 'react';
import { useEffect } from 'react';
import { useState } from 'react';
import { connect } from 'react-redux';
import { useHistory, useParams } from 'react-router-dom';
import { Row } from 'reactstrap';
import { addUser, getUser, updateUser } from 'redux/user/actions';
import Breadcrumb from '../../../../containers/navs/Breadcrumb';
import UserAddForm from './userform';

const PAGE_HEADING = {
  ADD_USER: 'user.add',
  EDIT_USER: 'user.edit',
};

const initialValues = {
  firstname: '',
  lastname: '',
  email: '',
  zip: '',
  country: '',
  gender: { label: 'Male', value: 'male' },
  age: { label: '18-28', value: '18-28' },
  mobile: '',
  profession: '',
  role: 'Vendor',
};

const UserAdd = ({
  match,
  errorMessage,
  dispatchGetUser,
  dispatchUpdateUser,
  dispatchAddUser,
}) => {
  const params = useParams();
  const history = useHistory();
  /* eslint-disable no-unused-vars */
  const [heading, setHeading] = useState(PAGE_HEADING.ADD_PRODUCT);
  /* eslint-disable no-unused-vars */
  const [formData, setFormData] = useState(initialValues);

  useEffect(() => {
    if (params.userId) {
      setHeading(PAGE_HEADING.EDIT_USER);
    } else {
      setHeading(PAGE_HEADING.ADD_USER);
      setFormData(initialValues);
    }
  }, [params.userId]);

  useEffect(() => {
    if (errorMessage) NotificationManager.error(null, errorMessage);
  }, [errorMessage]);

  const updateFormData = (res) => {
    try {
      const {
        firstname,
        lastname,
        email,
        role,
        zip,
        country,
        gender,
        age,
        mobile,
        profession,
      } = res.data.userInfo[0];
      setFormData({
        firstname,
        lastname,
        email,
        // role,
        zip,
        country,
        gender: { label: gender, value: gender },
        age: { label: '18-28', value: '18-28' },
        mobile,
        profession,
      });
    } catch (error) {
      console.log(
        '==== src/view/app/users/add/adduser.jsx ==== Catch error ====',
        error
      );
    }
  };

  useEffect(() => {
    if (params?.userId) {
      dispatchGetUser(params.userId, updateFormData);
    }
  }, []);

  const onSubmit = (values) => {
    const data = {
      firstname: values.firstname,
      lastname: values.lastname,
      email: values.email,
      Role: 'Vendor',
      zip: values.zip,
      country: values.country,
      gender: values.gender.value,
      age: 20,
      mobile: values.mobile,
      profession: values.profession,
    };
    if (params?.userId)
      dispatchUpdateUser(params?.userId, data, () => {
        // window.location.href = `${window.location.origin}/app/product/list`;
        history.push('/app/vendor/list');
      });
    else
      dispatchAddUser(data, () => {
        history.push('list');
      });
  };

  return (
    <>
      <Row>
        <Colxx xxs="12">
          <Breadcrumb heading={heading} match={match} />
          <Separator className="mb-5" />
        </Colxx>
      </Row>
      <UserAddForm onSubmit={onSubmit} formData={formData} loading={false} />
    </>
  );
};
const mapStateToProps = ({ user }) => {
  const { loading, errorMessage } = user;
  return {
    loading,
    errorMessage,
  };
};
const mapActionsToProps = (dispatch) => {
  return {
    dispatchAddUser: (data, cb) => dispatch(addUser({ ...data }, cb)),
    dispatchUpdateUser: (pathParam, data, cb) =>
      dispatch(updateUser(pathParam, { ...data }, cb)),
    dispatchGetUser: (pathParam, cb) => dispatch(getUser(pathParam, cb)),
  };
};
export default connect(mapStateToProps, mapActionsToProps)(UserAdd);
