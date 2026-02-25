import { useEffect } from 'react';
import { useHistory } from 'react-router-dom';
import { Row } from 'reactstrap';

import { connect } from 'react-redux';

import { NotificationManager } from 'components/common/react-notifications';

import { getAnalyticsByAuctionHouse } from 'redux/auction/actions.auction';
import { Colxx } from 'components/common/CustomBootstrap';
import SmallCard from 'components/cards/SmallCard';

const AuctionHouseDetails = ({
  auctionHouseAnalytics,
  fetchAnalytics,
  match,
  analyticsLoading,
}) => {
  const history = useHistory();

  useEffect(() => {
    if (match?.params?.auctionHouseId) {
      fetchAnalytics({
        auctionId: match?.params?.auctionHouseId,

        cb: (res) => {
          console.log(res);
          if (!res.success) NotificationManager.error(null, res?.message);
        },
      });
    }
  }, [match?.params?.auctionHouseId]);

  if (analyticsLoading) return <div className="loading" />;

  return (
    <Row className="mb-4">
      <Colxx xxs="12">
        <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
          <h1>{auctionHouseAnalytics?.name}</h1>
          <button
            type="button"
            className="btn btn-primary"
            style={{ minWidth: 100 }}
            onClick={() => {
              history.push('/app/auction-house/list');
            }}
          >
            Back
          </button>
        </div>
        <h4 className="main-heading text-center">Analytics</h4>
        <Row>
          <Colxx xl="4" lg="6" className="mb-4">
            <SmallCard
              title="Total auctions done till date"
              value={auctionHouseAnalytics?.total_auctions_done}
            />
          </Colxx>
          <Colxx xl="4" lg="6" className="mb-4">
            <SmallCard
              title="Total number of bids done"
              value={auctionHouseAnalytics?.total_bids_done}
            />
          </Colxx>
          <Colxx xl="4" lg="6" className="mb-4">
            <SmallCard
              title="Total number of XPs consumed"
              value={auctionHouseAnalytics?.total_plays_consumed}
            />
          </Colxx>
          <Colxx xl="4" lg="6" className="mb-4">
            <SmallCard
              title="Average number of bidders"
              value={auctionHouseAnalytics?.avg_bidders_per_auction}
            />
          </Colxx>
          <Colxx xl="4" lg="6" className="mb-4">
            <SmallCard
              title="Average number of bidders"
              value={auctionHouseAnalytics?.avg_bidders_per_auction}
            />
          </Colxx>
          <Colxx xl="4" lg="6" className="mb-4">
            <SmallCard
              title="Total gross revenue generated"
              value={auctionHouseAnalytics?.total_gross_revenue}
            />
          </Colxx>
          <Colxx xl="4" lg="6" className="mb-4">
            <SmallCard
              title="Total gas fees to AuctionX"
              value={auctionHouseAnalytics?.total_gas_fees_to_auctionx}
            />
          </Colxx>
          <Colxx xl="4" lg="6" className="mb-4">
            <SmallCard
              title="Net revenue to CLAN"
              value={auctionHouseAnalytics?.net_revenue_to_auction_house || '-'}
            />
          </Colxx>
          <Colxx xl="4" lg="6" className="mb-4">
            <SmallCard
              title="Average time of an auction"
              value={auctionHouseAnalytics?.avg_auction_duration_in_minutes}
            />
          </Colxx>
        </Row>
      </Colxx>
    </Row>
  );
};

const mapStateToProps = ({ auction }) => {
  const { analyticsLoading, auctionHouseAnalytics } = auction;
  return { analyticsLoading, auctionHouseAnalytics };
};

const mapActionsToProps = (dispatch) => ({
  fetchAnalytics: (params) =>
    dispatch(getAnalyticsByAuctionHouse({ ...params })),
});

export default connect(mapStateToProps, mapActionsToProps)(AuctionHouseDetails);
