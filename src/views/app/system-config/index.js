import ReactSelectComponent from 'components/common/ReactSelect';
import { NotificationManager } from 'components/common/react-notifications';
import { currencyType } from 'constants/constants';
import { ErrorMessage, Field, Form, Formik } from 'formik';
import { useEffect, useState } from 'react';
import { connect } from 'react-redux';
import { Button, Card, CardBody, FormGroup, Label, Row } from 'reactstrap';
import { getAuctionHouse } from 'redux/auctionHouse/actions.auctionHouse';
import {
  getAirdropConfig,
  getAllPlayers,
  getSystemConfig,
  playAirdrop,
  updateAirDropConfig,
  updateSystemConfig,
} from 'redux/user/actions';
import * as Yup from 'yup';
import SystemConfigForm from './systemConfigForm';

const initialValues = {
  plays: '',
  type: '', // Default value for the type dropdown
  walletAddress: [], // New field for wallet address
};

const SystemConfigKeys = Object.freeze({
  FIRST_DEPOSITE_BONUS: 'FIRST_DEPOSITE_BONUS',
  JOINING_BONUS: 'JOINING_BONUS',
  REFERRAL_BONUS: 'REFERRAL_BONUS',
  PLAYER_DELIVERY_DEADLINE: 'PLAYER_DELIVERY_DEADLINE',
  SKALE_BLOCKHAIN_URL: 'SKALE_BLOCKHAIN_URL',
  FIRST_DEPOSIT_BONUS_FROM_REFERRED_USER: 'FIRST_DEPOSIT_BONUS_FROM_REFERRED_USER',
  DAILY_REWARD: 'DAILY_REWARD',
  X_FOLLOW_BONUS:'X_FOLLOW_BONUS',
  INSTAGRAM_FOLLOW_BONUS:'INSTAGRAM_FOLLOW_BONUS',
  TELEGRAM_FOLLOW_BONUS:'TELEGRAM_FOLLOW_BONUS',
});

const validationSchema = Yup.object().shape({
  plays: Yup.string().required('XPs is required'),
  type: Yup.object().required('Type is required'),
  walletAddress: Yup.array()
    .of(
      Yup.object().shape({
        value: Yup.string().required('Wallet Address is required'),
      })
    )
    .min(1, 'Wallet Address is required'),
});

const Airdrop = ({
  loading,
  fetchUsers,
  playsAirDropAction,
  fetchSystemConfig,
  updateSystemConfiguration,
}) => {
  let timeout;
  const [users, setUsers] = useState([]);
  const [userLoading, setUserLoading] = useState(false);
  const [userPage, setUserPage] = useState(0);
  const [userHasMore, setUserHasMore] = useState(true);
  const [userSearch, setUserSearch] = useState('');
  const [userTotalPages, setUserTotalPages] = useState(1);
  const [deadlineLoading, setDeadlineLoading] = useState(false);
  const [chainURL, setChainURL] = useState(false);
  const [deadlineHour, setDeadlineHour] = useState();
  const [systemConfigData, setSystemConfigData] = useState({});
  const [skaleUrl, setSkaleUrl] = useState('');
  const [skaleUrlError, setSkaleUrlError] = useState('');
  const [systemConfigLoading, setSystemConfigLoading] = useState({
    [SystemConfigKeys.FIRST_DEPOSITE_BONUS]: false,
    [SystemConfigKeys.JOINING_BONUS]: false,
    [SystemConfigKeys.REFERRAL_BONUS]: false,
    [SystemConfigKeys.PLAYER_DELIVERY_DEADLINE]: false,
    [SystemConfigKeys.SKALE_BLOCKHAIN_URL]: false,
    [SystemConfigKeys.FIRST_DEPOSIT_BONUS_FROM_REFERRED_USER]: false,
    [SystemConfigKeys.DAILY_REWARD]: false,
    [SystemConfigKeys.X_FOLLOW_BONUS]: false,
    [SystemConfigKeys.INSTAGRAM_FOLLOW_BONUS]: false,
    [SystemConfigKeys.TELEGRAM_FOLLOW_BONUS]: false,
  });

  const updateSystemConfigHandler = ({ id, system_name }, data, cb) => {
    setSystemConfigLoading((prev) => ({ ...prev, [system_name]: true }));
    updateSystemConfiguration(id, data, (res) => {
      cb();
      setSystemConfigLoading((prev) => ({ ...prev, [system_name]: false }));
      if (res?.success) NotificationManager.success(null, res?.message);
      else NotificationManager.error(null, res?.message);
    });
  };

  const handleSubmit = (values, { setSubmitting, resetForm }) => {
    setSubmitting(false);

    const data = {
      plays: Number(values.plays),
      type: values.type.value,
      ids: values.walletAddress?.map((option) => option.value),
    };
    playsAirDropAction({
      data,
      cb: (res) => {
        if (res.success) {
          resetForm();
          NotificationManager.success(null, res?.message);
        } else {
          NotificationManager.error(null, res?.message);
        }
        setSubmitting(false);
      },
    });
  };


  const getUsersHandler = (res, append = false) => {
    if (res.success) {
      const mapped = res?.data.map((option) => {
        function showInfo() {
          if (option?.wallet_address) return option?.wallet_address;
          if (option?.email) return option?.email;
          if (option?.mobile_no) return option?.mobile_no;
          if (option?.telegram_id) return option?.telegram_id;
          return '';
        }
        return {
          value: option?.id,
          label: option.first_name
            ? `${option?.first_name} ${option?.last_name} - ${showInfo()}`
            : option?.id,
        };
      });
      setUsers((prev) => (append ? [...prev, ...mapped] : mapped));
      // Set total pages from metadata if available
      if (res?.metadata?.totalPages) {
        setUserTotalPages(res.metadata.totalPages);
        setUserHasMore(userPage + 1 < res.metadata.totalPages);
      } else {
        setUserHasMore(res?.data?.length === 30);
      }
    } else {
      NotificationManager.error(null, res?.message);
    }
    setUserLoading(false);
  };

  const getUsersAction = (search = '', page = 0, append = false) => {
    setUserLoading(true);
    fetchUsers(
      {
        limit: 30,
        page,
        search: search.length ? search : null,
      },
      (res) => getUsersHandler(res, append)
    );
  };

  useEffect(() => {
    setSystemConfigLoading({
      [SystemConfigKeys.FIRST_DEPOSITE_BONUS]: true,
      [SystemConfigKeys.JOINING_BONUS]: true,
      [SystemConfigKeys.REFERRAL_BONUS]: true,
      [SystemConfigKeys.PLAYER_DELIVERY_DEADLINE]: true,
      [SystemConfigKeys.SKALE_BLOCKHAIN_URL]: true,
      [SystemConfigKeys.FIRST_DEPOSIT_BONUS_FROM_REFERRED_USER]: true,
      [SystemConfigKeys.DAILY_REWARD]: true,
      [SystemConfigKeys.X_FOLLOW_BONUS]: true,
      [SystemConfigKeys.INSTAGRAM_FOLLOW_BONUS]: true,
      [SystemConfigKeys.TELEGRAM_FOLLOW_BONUS]: true,
    });
  setUserPage(0);
  setUserHasMore(true);
  setUserSearch('');
  setUserTotalPages(1);
  getUsersAction('', 0, false);
    fetchSystemConfig((res) => {
      if (res?.success) {
        if (res?.data?.length) {
          const configObj = res?.data?.reduce?.(
            (accumulator, currentValue) => ({
              ...accumulator,
              [currentValue?.system_name]: currentValue,
            }),
            {}
          );
          setSystemConfigData(configObj);
          if (
            configObj.PLAYER_DELIVERY_DEADLINE &&
            configObj.PLAYER_DELIVERY_DEADLINE.value
          ) {
            setDeadlineHour(Number(configObj.PLAYER_DELIVERY_DEADLINE.value));
          } else {
            setDeadlineHour(24); // fallback if not found
          }
          const skaleConfig = configObj[SystemConfigKeys.SKALE_BLOCKHAIN_URL];
          if (skaleConfig?.json_value?.url) {
            setSkaleUrl(skaleConfig.json_value.url);
          } else if (skaleConfig?.value) {
            setSkaleUrl(skaleConfig.value);
          }
        }
        setSystemConfigLoading({
          [SystemConfigKeys.FIRST_DEPOSITE_BONUS]: false,
          [SystemConfigKeys.JOINING_BONUS]: false,
          [SystemConfigKeys.REFERRAL_BONUS]: false,
          [SystemConfigKeys.PLAYER_DELIVERY_DEADLINE]: false,
          [SystemConfigKeys.SKALE_BLOCKHAIN_URL]: false,
          [SystemConfigKeys.FIRST_DEPOSIT_BONUS_FROM_REFERRED_USER]: false,
          [SystemConfigKeys.DAILY_REWARD]: false,
          [SystemConfigKeys.X_FOLLOW_BONUS]: false,
          [SystemConfigKeys.INSTAGRAM_FOLLOW_BONUS]: false,
          [SystemConfigKeys.TELEGRAM_FOLLOW_BONUS]: false,
        });
      } else NotificationManager.error(null, res?.message);
    });
  }, []);

  return (
    <div>
      <h4 className="text-center text-large">System Configurations</h4>

      <Row>
        <div className="col-md-6 mt-4">
          <Card className="h-100">
            <CardBody>
              <h6 className="main-heading mb-4 text-center">Airdrop</h6>
              <Formik
                initialValues={initialValues}
                validationSchema={validationSchema}
                onSubmit={handleSubmit}
              >
                {({ isSubmitting, setFieldValue, values }) => (
                  <Form>
                    <FormGroup>
                      <Label for="walletAddress">Wallet Address</Label>
                      <Field
                        name="walletAddress"
                        value={values.walletAddress}
                        component={ReactSelectComponent}
                        placeholder="Select a Wallet"
                        onChange={(selectedOption) =>
                          setFieldValue('walletAddress', selectedOption)
                        }
                        options={users}
                        isSearchable // Enable the search option
                        className="custom-select-container"
                        classNamePrefix="custom-select"
                        isMulti
                        isClearable
                        isLoading={userLoading}
                        onInputChange={(e, { action }) => {
                          if (action === 'input-change') {
                            if (timeout) clearTimeout(timeout);
                            timeout = setTimeout(() => {
                              setUserPage(0);
                              setUserHasMore(true);
                              setUserSearch(e);
                              if (e.length) getUsersAction(e, 0, false);
                              else getUsersAction('', 0, false);
                            }, 500);
                          }
                        }}
                        onMenuScrollToBottom={() => {
                          if (!userLoading && userHasMore && userPage + 1 < userTotalPages) {
                            setUserPage((prevPage) => {
                              const nextPage = prevPage + 1;
                              getUsersAction(userSearch, nextPage, true);
                              return nextPage;
                            });
                          }
                        }}
                      />
                      <ErrorMessage
                        name="walletAddress"
                        component="div"
                        className="field-error"
                      />
                    </FormGroup>
                    <FormGroup>
                      <Label for="plays">XPs</Label>
                      <Field
                        type="text"
                        id="plays"
                        name="plays"
                        className="form-control"
                      />
                      <ErrorMessage
                        name="plays"
                        component="div"
                        className="field-error"
                      />
                    </FormGroup>

                    <FormGroup>
                      <Label for="type">Type</Label>
                      <Field
                        name="type"
                        value={values.type}
                        component={ReactSelectComponent}
                        placeholder="Select a Type"
                        onChange={(selectedOption) =>
                          setFieldValue('type', selectedOption)
                        }
                        options={currencyType}
                        isSearchable // Enable the search option
                        className="custom-select-container"
                        classNamePrefix="custom-select"
                      />
                      <ErrorMessage
                        name="type"
                        component="div"
                        className="field-error"
                      />
                    </FormGroup>
                    <Button
                      className={`btn-multiple-state ${
                        loading || isSubmitting ? 'show-spinner' : ''
                      }`}
                      disabled={loading || isSubmitting}
                      color="primary"
                      type="submit"
                    >
                      <span className="spinner d-inline-block">
                        <span className="bounce1" />
                        <span className="bounce2" />
                        <span className="bounce3" />
                      </span>
                      <span className="label">Submit</span>
                    </Button>
                  </Form>
                )}
              </Formik>
            </CardBody>
          </Card>
        </div>
        <div className="col-md-6 mt-4">
          <Card className="h-100">
            <CardBody>
              <h6 className="mb-4 main-heading text-center">
                Daily Reward Config
              </h6>
              <SystemConfigForm
                airdropConfig={
                  systemConfigData?.[SystemConfigKeys.DAILY_REWARD]
                }
                updateSystemConfigHandler={updateSystemConfigHandler}
                systemConfigLoading={systemConfigLoading?.DAILY_REWARD}
                disableType
              />
            </CardBody>
          </Card>
        </div>
      </Row>
        
      <Row>
        <div className="col-md-6 mt-4">
          <Card className="h-100">
            <CardBody>
              <h6 className="mb-4 main-heading text-center">
                Auto Airdrop Config
              </h6>
              <SystemConfigForm
                airdropConfig={
                  systemConfigData?.[SystemConfigKeys.JOINING_BONUS]
                }
                updateSystemConfigHandler={updateSystemConfigHandler}
                systemConfigLoading={systemConfigLoading?.JOINING_BONUS}
                disableType
              />
            </CardBody>
          </Card>
        </div>
        <div className="col-md-6 mt-4">
          <Card className="h-100">
            <CardBody>
              <h6 className="mb-4 main-heading text-center">
                First Deposit Config
              </h6>
              <SystemConfigForm
                airdropConfig={
                  systemConfigData?.[SystemConfigKeys.FIRST_DEPOSITE_BONUS]
                }
                updateSystemConfigHandler={updateSystemConfigHandler}
                systemConfigLoading={systemConfigLoading?.FIRST_DEPOSITE_BONUS}
              />
            </CardBody>
          </Card>
        </div>
      </Row>

      <Row>
        <div className="col-md-6 mt-4">
          <Card className="h-100">
            <CardBody>
              <h6 className="mb-4 main-heading text-center">
                Referral Bonus Config
              </h6>
              <SystemConfigForm
                airdropConfig={
                  systemConfigData?.[SystemConfigKeys.REFERRAL_BONUS]
                }
                updateSystemConfigHandler={updateSystemConfigHandler}
                systemConfigLoading={systemConfigLoading?.REFERRAL_BONUS}
                disableType
              />
            </CardBody>
          </Card>
        </div>
        <div className="col-md-6 mt-4">
          <Card className="h-100">
            <CardBody>
              <h6 className="mb-4 main-heading text-center">
                First Deposit From Referred User Config
              </h6>
              <SystemConfigForm
                airdropConfig={
                  systemConfigData?.[SystemConfigKeys.FIRST_DEPOSIT_BONUS_FROM_REFERRED_USER]
                }
                updateSystemConfigHandler={updateSystemConfigHandler}
                systemConfigLoading={systemConfigLoading?.FIRST_DEPOSIT_BONUS_FROM_REFERRED_USER}
              />
            </CardBody>
          </Card>
        </div>
      </Row>


      
      <Row>
      <div className="col-md-6 mt-4">
          <Card className="h-100">
            <CardBody>
              <h6 className="mb-4 main-heading text-center">
                X Follow Bonus Config
              </h6>
              <SystemConfigForm
                airdropConfig={
                  systemConfigData?.[SystemConfigKeys.X_FOLLOW_BONUS]
                }
                updateSystemConfigHandler={updateSystemConfigHandler}
                systemConfigLoading={systemConfigLoading?.X_FOLLOW_BONUS}
                disableType
              />
            </CardBody>
          </Card>
        </div>
        <div className="col-md-6 mt-4">
          <Card className="h-100">
            <CardBody>
              <h6 className="mb-4 main-heading text-center">
                Telegram Join Bonus Config
              </h6>
              <SystemConfigForm
                airdropConfig={
                  systemConfigData?.[SystemConfigKeys.TELEGRAM_FOLLOW_BONUS]
                }
                updateSystemConfigHandler={updateSystemConfigHandler}
                systemConfigLoading={systemConfigLoading?.TELEGRAM_FOLLOW_BONUS}
                disableType
              />
            </CardBody>
          </Card>
        </div>
      </Row>
      <Row>     
        <div className="col-md-6 mt-4">
          <Card className="h-100">
            <CardBody>
              <h6 className="mb-4 main-heading text-center">
                Instagram Follow Bonus Config
              </h6>
              <SystemConfigForm
                airdropConfig={
                  systemConfigData?.[SystemConfigKeys.INSTAGRAM_FOLLOW_BONUS]
                }
                updateSystemConfigHandler={updateSystemConfigHandler}
                systemConfigLoading={systemConfigLoading?.INSTAGRAM_FOLLOW_BONUS}
                disableType
              />
            </CardBody>
          </Card>
        </div>
      </Row>

      <Row>
        <div className="col-md-6 mt-4">
          <Card className="h-100">
            <CardBody>
              <h6 className="mb-4 main-heading text-center">
                Manage Deadline Alert : Product confirming
              </h6>
              <form
                onSubmit={async (e) => {
                  e.preventDefault();
                  setDeadlineLoading(true);
                  try {
                    const id =
                      systemConfigData?.[
                        SystemConfigKeys.PLAYER_DELIVERY_DEADLINE
                      ]?.id || '';
                    const payload = { unit: 'HOURS', value: deadlineHour };
                    await new Promise((resolve, reject) => {
                      updateSystemConfiguration(id, payload, (res) => {
                        if (res?.success) {
                          NotificationManager.success(
                            null,
                            res?.message || 'Deadline hour updated successfully'
                          );
                          resolve();
                        } else {
                          NotificationManager.error(
                            null,
                            res?.message || 'Failed to update deadline hour'
                          );
                          reject();
                        }
                      });
                    });
                  } catch (err) {
                    NotificationManager.error(
                      null,
                      'Failed to update deadline hour'
                    );
                  }
                  setDeadlineLoading(false);
                }}
              >
                <FormGroup className="mb-3">
                  <Label for="deadline-hour-select">
                    Select Hour send the deadline alert mail
                  </Label>
                  <select
                    id="deadline-hour-select"
                    className="form-control w-100"
                    value={deadlineHour || ''}
                    onChange={(e) => setDeadlineHour(Number(e.target.value))}
                    disabled={deadlineHour === undefined}
                  >
                    <option value={12}>12</option>
                    <option value={24}>24</option>
                    <option value={36}>36</option>
                    <option value={48}>48</option>
                  </select>
                </FormGroup>
                <button
                  type="submit"
                  className="btn btn-primary"
                  disabled={deadlineLoading}
                >
                  {deadlineLoading ? 'Saving...' : 'Save'}
                </button>
              </form>
            </CardBody>
          </Card>
        </div>
        <div className="col-md-6 mt-4">
          <Card className="h-100">
            <CardBody>
              <h6 className="mb-4 main-heading text-center">
                Blockchain Skale URL
              </h6>
              <form
                onSubmit={async (e) => {
                  e.preventDefault();
                  if (!skaleUrl || skaleUrl.trim() === '') {
                    setSkaleUrlError('Skale URL is required');
                    return;
                  }
                  setChainURL(true);
                  try {
                    const id =
                      systemConfigData?.[SystemConfigKeys.SKALE_BLOCKHAIN_URL]
                        ?.id || '';
                    const payload = { json_value: {url: skaleUrl} };
                    await new Promise((resolve, reject) => {
                      updateSystemConfiguration(id, payload, (res) => {
                        if (res?.success) {
                          NotificationManager.success(
                            null,
                            res?.message || 'Skale URL updated successfully'
                          );
                          resolve();
                        } else {
                          NotificationManager.error(
                            null,
                            res?.message || 'Failed to update Skale URL'
                          );
                          reject();
                        }
                      });
                    });
                  } catch (err) {
                    NotificationManager.error(
                      null,
                      'Failed to update Skale URL'
                    );
                  }
                  setChainURL(false);
                }}
              >
                <FormGroup className="mb-3">
                  <Label for="skale_url">Skale URL</Label>
                  <input
                    type="text"
                    id="skale_url"
                    name="skale_url"
                    className={`form-control${skaleUrlError ? ' is-invalid' : ''}`}
                    value={skaleUrl || ''}
                    onChange={(e) => {
                      setSkaleUrl(e.target.value);
                      if (skaleUrlError) setSkaleUrlError('');
                    }}
                    required
                  />
                  {skaleUrlError && <div className="invalid-feedback">{skaleUrlError}</div>}
                </FormGroup>
                <button
                  type="submit"
                  className="btn btn-primary"
                  disabled={chainURL}
                >
                  {chainURL ? 'Saving...' : 'Save'}
                </button>
              </form>
            </CardBody>
          </Card>
        </div>
      </Row>
      
    </div>
  );
};

const mapStateToProps = ({ auction, auctionHouses }) => {
  const { auctions, metadata, message, successMesage, errorMessage, loading } =
    auction;
  const { auctionHouseData } = auctionHouses;
  return {
    auctions,
    metadata,
    message,
    successMesage,
    errorMessage,
    loading,
    auctionHouseData,
  };
};

const mapActionsToProps = (dispatch) => {
  return {
    fetchAuctionHouses: (params) => dispatch(getAuctionHouse({ ...params })),
    fetchUsers: (params, cb) => dispatch(getAllPlayers({ params, cb })),
    playsAirDropAction: (params) => dispatch(playAirdrop(params)),
    fetchAirdropConfig: (payload) => dispatch(getAirdropConfig(payload)),
    updateAirDropConfigAction: (payload) =>
      dispatch(updateAirDropConfig(payload)),
    fetchSystemConfig: (cb) => dispatch(getSystemConfig({ cb })),
    updateSystemConfiguration: (id, data, cb) =>
      dispatch(updateSystemConfig({ id, data, cb })),
  };
};

export default connect(mapStateToProps, mapActionsToProps)(Airdrop);
