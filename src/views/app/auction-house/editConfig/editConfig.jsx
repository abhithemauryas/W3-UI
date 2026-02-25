import { NotificationManager } from 'components/common/react-notifications';
import { adminRoot } from 'constants/defaultValues';
import IntlMessages from 'helpers/IntlMessages';
import { useEffect, useState } from 'react';
import { connect } from 'react-redux';
import { Button, Card, CardBody, CustomInput } from 'reactstrap';
import {
  getAuctionCategoryList,
  getAuctionCategoryPermission,
  updateAuctionCategoryCurrency,
  updateAuctionCategoryPermission,
} from 'redux/auctionHouse/actions.auctionHouse';

const EditConfig = (props) => {
  const {
    match,
    fetchAuctionCategoryList,
    fetchAuctionCategory,
    updateAuctionCategory,
    auctionCategoryList,
    history,
  } = props;

  const [auctionCategoryPermission, setAuctionCategoryPermission] = useState(
    {}
  );

  const [auctionCategoryLoading, setAuctionCategoryLoading] = useState(false);

  //   auction_house_id, auctionCategoryIds
  const submitHandler = () => {
    setAuctionCategoryLoading(true);
    updateAuctionCategory({
      params: {
        auction_house_id: match?.params?.auctionHouseId,
        auctionCategoryIds: auctionCategoryPermission?.categoryId,
      },

      cb: (res) => {
        if (res?.success) {
          NotificationManager.success(null, res?.message);
        } else NotificationManager.error(null, res?.message);
        setAuctionCategoryLoading(false);
      },
    });
  };

  useEffect(() => {
    if (match?.params?.auctionHouseId) {
      setAuctionCategoryLoading(true);
      fetchAuctionCategory({
        params: match?.params?.auctionHouseId,
        cb: (res) => {
          if (res?.success) {
            setAuctionCategoryPermission(res?.data);
          } else NotificationManager.error(null, res?.message);
          setAuctionCategoryLoading(false);
        },
      });
    }
  }, [match?.params?.auctionHouseId]);

  useEffect(() => {
    fetchAuctionCategoryList({
      cb: (res) => {
        if (!res?.success) NotificationManager.error(null, res?.message);
      },
    });
  }, []);

  return (
    <div className="row">
      <div className="col-12 mb-3">
        <Button
          type="submit"
          color="primary"
          className="btn-multiple-state"
          onClick={() => history.push(`${adminRoot}/auction-house`)}
        >
          BACK
        </Button>
      </div>
      <div className="w-100 mt-1">
        <Card>
          <CardBody>
            <h6 className="mb-4">Auction Category Config</h6>

            <div className="row mx-1">
              {auctionCategoryList?.length ? (
                auctionCategoryList
                  .filter((category) => category?.title !== 'English Auction')
                  .map((category) => (
                    <div className="col-6" key={category?.id}>
                      <CustomInput
                        type="checkbox"
                        id={category?.id}
                        label={category?.title}
                        onClick={(e) => {
                          if (!e.target?.checked) {
                            setAuctionCategoryPermission((prev) => ({
                              ...prev,
                              categoryId: [...prev?.categoryId, category?.id],
                            }));
                          } else
                            setAuctionCategoryPermission((prev) => ({
                              ...prev,
                              categoryId: prev.categoryId?.filter(
                                (ids) => ids !== category?.id
                              ),
                            }));
                        }}
                        htmlFor={category?.id}
                        value={auctionCategoryPermission?.categoryId?.includes?.(
                          category?.id
                        )}
                        checked={auctionCategoryPermission?.categoryId?.includes?.(
                          category?.id
                        )}
                      />
                    </div>
                  ))
              ) : (
                <div className="col-12 d-flex justify-content-center align-items-center">
                  Data Not Found
                </div>
              )}
            </div>

            <div className="row mt-3">
              <div className="col-10 mx-1 ">
                <Button
                  type="submit"
                  color="primary"
                  disabled={auctionCategoryLoading}
                  className={`btn-multiple-state   ${
                    auctionCategoryLoading ? 'show-spinner' : ''
                  }`}
                  onClick={submitHandler}
                >
                  <span className="spinner d-inline-block ">
                    <span className="bounce1" />
                    <span className="bounce2 " />
                    <span className="bounce3" />
                  </span>
                  <span className="label">
                    <IntlMessages id="modal.save" />
                  </span>
                </Button>
              </div>
            </div>
          </CardBody>
        </Card>
      </div>
    </div>
  );
};

const mapStateToProps = ({ auctionHouses }) => {
  const { auctionCategoryList } = auctionHouses;

  return {
    auctionCategoryList,
  };
};

const mapActionsToProps = (dispatch) => {
  return {
    fetchAuctionCategoryList: (params) =>
      dispatch(getAuctionCategoryList(params)),
    fetchAuctionCategory: (params) =>
      dispatch(getAuctionCategoryPermission(params)),
    updateAuctionCategory: (params) =>
      dispatch(updateAuctionCategoryPermission(params)),
    houseCurrency: (params) => dispatch(updateAuctionCategoryCurrency(params)),
  };
};

export default connect(mapStateToProps, mapActionsToProps)(EditConfig);
