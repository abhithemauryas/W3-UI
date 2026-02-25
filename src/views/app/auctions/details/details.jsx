import React from 'react';
import { useEffect } from 'react';
import { Card, CardBody, Row } from 'reactstrap';
import { connect } from 'react-redux';
import { NotificationManager } from 'components/common/react-notifications';

import {
  getAnalyticsByAuction,
  getAuction,
} from 'redux/auction/actions.auction';
import { Colxx } from 'components/common/CustomBootstrap';
const IPFS_URL = 'https://bronze-agreed-prawn-146.mypinata.cloud/ipfs/';

const AuctionDetails = ({
  auctionsAnalytics,
  fetchAnalytics,
  match,
  loading,
  fetchAuction,
  auctionData,
  analyticsLoading,
}) => {
  useEffect(() => {
    if (match?.params?.auctionId) {
      fetchAnalytics({
        auctionId: match?.params?.auctionId,

        cb: (res) => {
          if (!res.success) NotificationManager.error(null, res?.message);
        },
      });

      fetchAuction(match?.params?.auctionId, (res) => {
        if (!res.success) NotificationManager.error(null, res?.message);
      });
    }
  }, [match?.params?.auctionId]);

  if (loading || analyticsLoading) return <div className="loading" />;

  return (
    <Row className="mb-4">
      <Colxx xxs="12">
        <h1>{auctionsAnalytics?.auction_name}</h1>
        <p className="text-muted text-small">
          CLAN:{' '}
          <span className="text-one ">
            {auctionsAnalytics?.auction_house_name}
          </span>
        </p>

        <Row>
          <div className="col-md-6">
            <Card>
              <CardBody>
                <h4 className="main-heading text-center">Details</h4>
                <div>
                  <table className="w-100 r-table table">
                    <tbody>
                      <tr>
                        <td className="text-muted w-50">Auction Type</td>
                        <td>{auctionData?.auctionCategory?.title}</td>
                      </tr>
                      <tr>
                        <td className="text-muted w-50">Product</td>
                        <td>{auctionsAnalytics?.product_name}</td>
                      </tr>
                      <tr>
                        <td className="text-muted w-50">Product Price</td>
                        <td>
                          {auctionsAnalytics?.currency_code}
                          {auctionsAnalytics?.product_price}
                        </td>
                      </tr>
                      <tr>
                        <td className="text-muted w-50">XPs/Bid</td>
                        <td>{auctionData?.plays_consumed_on_bid}</td>
                      </tr>
                      <tr>
                        <td className="text-muted w-50">Decimal Count </td>
                        <td>{auctionData?.decimal_count}</td>
                      </tr>
                      <tr>
                        <td className="text-muted w-50">Min Bid Value</td>
                        <td>{auctionData?.min_bid_price || '-'}</td>
                      </tr>
                      <tr>
                        <td className="text-muted w-50">Max Bid Value</td>
                        <td>{auctionData?.max_bid_price || '-'}</td>
                      </tr>
                      <tr>
                        <td className="text-muted w-50">Auction State</td>
                        <td>{auctionData?.state}</td>
                      </tr>
                    </tbody>
                  </table>
                </div>
              </CardBody>
            </Card>
          </div>
          <div className="col-md-6">
            <Card>
              <CardBody>
                <h4 className="main-heading text-center">Analytics</h4>

                <table className="w-100 r-table table">
                  <tbody>
                    <tr>
                      <td className="text-muted w-50">Total Bids</td>
                      <td>{auctionsAnalytics?.total_bids_placed}</td>
                    </tr>
                    <tr>
                      <td className="text-muted w-50">Total XPs consumed</td>
                      <td>{auctionsAnalytics?.total_plays_consumed}</td>
                    </tr>
                    <tr>
                      <td className="text-muted w-50">Gross Revenue</td>
                      <td>{auctionsAnalytics?.revenue}</td>
                    </tr>
                    <tr>
                      <td className="text-muted w-50">Gas fees</td>
                      <td>{auctionsAnalytics?.gas_fees_to_auctionx}</td>
                    </tr>
                    <tr>
                      <td className="text-muted w-50">Auction Duration</td>
                      <td>{auctionsAnalytics?.auction_duration_in_minutes}</td>
                    </tr>
                    <tr>
                      <td className="text-muted w-50">All Bids</td>
                      <td>
                        {auctionsAnalytics?.all_bids ? (
                          <a
                            href={`${IPFS_URL}${auctionsAnalytics?.all_bids}`}
                            target="_blank"
                            rel="noreferrer"
                          >
                            Click here
                          </a>
                        ) : (
                          '-'
                        )}
                      </td>
                    </tr>
                  </tbody>
                </table>
              </CardBody>
            </Card>
          </div>
        </Row>
      </Colxx>
    </Row>
  );
};

const mapStateToProps = ({ auction }) => {
  const { loading, auctionsAnalytics, auctionData, analyticsLoading } = auction;
  return { loading, auctionsAnalytics, auctionData, analyticsLoading };
};

const mapActionsToProps = (dispatch) => ({
  fetchAnalytics: (params) => dispatch(getAnalyticsByAuction({ ...params })),
  fetchAuction: (auctionId, cb) => dispatch(getAuction(auctionId, cb)),
});

export default connect(mapStateToProps, mapActionsToProps)(AuctionDetails);
