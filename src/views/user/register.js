import { useEffect, useState } from 'react';
import { connect } from 'react-redux';
import { NavLink } from 'react-router-dom';
import {
  Button,
  Card,
  CardTitle,
  Col,
  Form,
  FormGroup,
  Input,
  Label,
  Row,
} from 'reactstrap';
import { registerUser } from 'redux/actions';

import { Colxx } from 'components/common/CustomBootstrap';
import { adminRoot } from 'constants/defaultValues';
import IntlMessages from 'helpers/IntlMessages';
import { getCurrentColor } from 'helpers/Utils';

import drakLogo from 'assets/img/auctionx-dark.png';
import logo from 'assets/img/auctionx-light.png';

const Register = ({ history, registerUserAction }) => {
  const [formData, setFormData] = useState({
    fullName: 'Admin',
    email: 'demo@gogo.com',
    password: 'gogo123',
    auctionHouseName: '',
    auctionUrl: '',
  });

  const [colorDark, setColorDark] = useState(false);

  useEffect(() => {
    const color = getCurrentColor();
    if (color.includes('dark')) setColorDark(true);
    else setColorDark(false);
  }, []);

  const { fullName, email, password, auctionHouseName, auctionUrl } = formData;

  const onChange = (e) =>
    setFormData({ ...formData, [e.target.name]: e.target.value });

  const onUserRegister = () => {
    const newUser = {
      fullName,
      email,
      password,
      auctionHouseName,
      auctionUrl,
      logo,
    };

    // Call registerUser action with newUser data
    registerUserAction(newUser);

    if (email !== '' && password !== '') {
      history.push(adminRoot);
    }
  };

  const handleGoBackClick = () => {
    history.push('/user/auth');
  };

  return (
    <Row className="h-100">
      <Colxx xxs="12" md="10" className="mx-auto my-auto">
        <Card className="auth-card">
          <div className="position-relative image-side ">
            {/* Image Side Content */}
          </div>
          <div className="form-side">
            <Button
              className="calendar-prev-btn  d-flex align-items-center"
              onClick={handleGoBackClick}
              style={{
                padding: '6px 12px', // Adjust padding as needed
              }}
            >
              <i
                className="simple-icon-arrow-left-circle"
                style={{
                  fontSize: '1rem',
                  marginRight: '4px',
                  color: colorDark ? 'white' : '',
                }}
              />
              <span
                style={{ fontSize: '1rem', color: colorDark ? 'white' : '' }}
              >
                Back
              </span>
            </Button>
            <NavLink to="/" className="white ">
              <div className="mb-5  d-flex justify-content-center">
                <img
                  src={colorDark ? drakLogo : logo}
                  alt="TBD"
                  width="150px"
                />
              </div>
            </NavLink>
            <CardTitle className="mb-4">
              <IntlMessages id="user.register" />
            </CardTitle>
            <Form>
              <FormGroup className="form-group has-float-label mb-4">
                <Label>
                  <IntlMessages id="user.fullname" />
                </Label>
                <Input
                  type="text"
                  name="fullName"
                  value={fullName}
                  onChange={onChange}
                />
              </FormGroup>

              <FormGroup className="form-group has-float-label mb-4">
                <Label>
                  <IntlMessages id="user.email" />
                </Label>
                <Input
                  type="email"
                  name="email"
                  value={email}
                  onChange={onChange}
                />
              </FormGroup>

              <FormGroup className="form-group has-float-label mb-4">
                <Label>
                  <IntlMessages id="user.password" />
                </Label>
                <Input
                  type="password"
                  name="password"
                  value={password}
                  onChange={onChange}
                />
              </FormGroup>

              <FormGroup className="form-group has-float-label mb-4">
                <Label>CLAN Name</Label>
                <Input
                  type="text"
                  name="auctionHouseName"
                  value={auctionHouseName}
                  onChange={onChange}
                />
              </FormGroup>

              {/* <FormGroup className="form-group has-float-label mb-4">
                <Label>Auction URL</Label>
                <Input
                  type="text"
                  name="auctionUrl"
                  value={auctionUrl}
                  onChange={onChange}
                />
                <Input
                  type="text"
                  name="auctionUrl"
                  value="@auctionXlive.com"
                />
              </FormGroup> */}

              <FormGroup className="form-group has-float-label mb-4">
                <Label for="auctionUrl" className="mb-2 d-block">
                  Auction URL
                </Label>
                <Row className="align-items-center">
                  <Col>
                    <Input type="text" name="auctionUrl" onChange={onChange} />
                  </Col>
                  <Col xs="auto">
                    <Input
                      type="text"
                      name="auctionUrl"
                      value={
                        formData?.auctionUrl.length > 6
                          ? `@auctionXlive.com    ✔️`
                          : '@auctionXlive.com'
                      }
                      disabled
                    />
                  </Col>
                </Row>
              </FormGroup>

              {/* Logo Upload Feature */}
              <FormGroup className="form-group has-float-label mb-4">
                <Label>Upload Logo</Label>
                <Input
                  type="file"
                  accept="image/*"
                  onChange={(e) =>
                    setFormData({ ...formData, logo: e.target.files[0] })
                  }
                />
              </FormGroup>

              <div className="d-flex justify-content-end align-items-center">
                <Button
                  color="primary"
                  className="btn-shadow"
                  size="lg"
                  onClick={() => onUserRegister()}
                >
                  <IntlMessages id="user.register-button" />
                </Button>
              </div>
            </Form>
          </div>
        </Card>
      </Colxx>
    </Row>
  );
};

const mapStateToProps = () => {};

export default connect(mapStateToProps, { registerUserAction: registerUser })(
  Register
);
