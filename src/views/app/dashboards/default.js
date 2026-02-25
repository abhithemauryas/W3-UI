import React from 'react';
import { Row } from 'reactstrap';
import { Colxx, Separator } from 'components/common/CustomBootstrap';
import Breadcrumb from 'containers/navs/Breadcrumb';
import IconCardsCarousel from 'containers/dashboards/IconCardsCarousel';
import RecentOrders from 'containers/dashboards/RecentOrders';
import Logs from 'containers/dashboards/Logs';
import Tickets from 'containers/dashboards/Tickets';
import Calendar from 'containers/dashboards/Calendar';
import BestSellers from 'containers/dashboards/BestSellers';
// import SortableStaticticsRow from 'containers/dashboards/SortableStaticticsRow';
import SalesChartCard from 'containers/dashboards/SalesChartCard';
import ProductCategoriesPolarArea from 'containers/dashboards/ProductCategoriesPolarArea';
import WebsiteVisitsChartCard from 'containers/dashboards/WebsiteVisitsChartCard';
import ConversionRatesChartCard from 'containers/dashboards/ConversionRatesChartCard';
import XpRecordsShow from 'containers/dashboards/xpRecords';
import { useEffect } from 'react';
import { getXpRecords } from 'redux/auctionHouse/actions.auctionHouse';
import { connect } from 'react-redux';

const DefaultDashboard = ({ xpData,  dispatchGetXpRecords }) => {
  // const { messages } = intl;

  useEffect(() => {
    dispatchGetXpRecords();
  }, []);
  return (
    <>
      <Row>
        <Colxx xxs="12">
          <Breadcrumb heading="menu.analytics" />
          <Separator className="mb-5" />
        </Colxx>
      </Row>
      <Row className="h-15">
        <Colxx lg="12" xl="6" className="mb-4">
          <IconCardsCarousel />
          <Row>
            <Colxx md="12" className="mb-4">
              <SalesChartCard />
            </Colxx>
          </Row>
        </Colxx>
        <Colxx lg="12" xl="6" className="mb-4">
          <XpRecordsShow xpData={xpData} />
          <Row>
            <Colxx md="12" className="mb-4 h-5">
              <RecentOrders />
            </Colxx>
          </Row>
        </Colxx>
      </Row>
      <Row>
        <Colxx lg="4" md="12" className="mb-4">
          <ProductCategoriesPolarArea chartClass="dashboard-donut-chart" />
        </Colxx>
        <Colxx lg="4" md="6" className="mb-4">
          <Logs />
        </Colxx>
        <Colxx lg="4" md="6" className="mb-4">
          <Tickets />
        </Colxx>
      </Row>
      <Row>
        <Colxx xl="6" lg="12" className="mb-4">
          <Calendar />
        </Colxx>
        <Colxx xl="6" lg="12" className="mb-4">
          <BestSellers />
        </Colxx>
      </Row>

      {/* <SortableStaticticsRow messages={messages} /> */}
      <Row>
        <Colxx sm="12" md="6" className="mb-4">
          <WebsiteVisitsChartCard />
        </Colxx>
        <Colxx sm="12" md="6" className="mb-4">
          <ConversionRatesChartCard />
        </Colxx>
      </Row>
    </>
  );
};

const mapStateToProps = (state) => {
  return {
    xpData: state.auctionHouses?.xpRecords || null,
  };
};
const mapDispatchToProps = (dispatch) => {
  return {
    dispatchGetXpRecords: () => dispatch(getXpRecords()),
  };
};

  

export default connect(mapStateToProps, mapDispatchToProps)(DefaultDashboard);
