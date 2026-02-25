import React, { Suspense } from 'react';
import { connect } from 'react-redux';
import { Redirect, Route, Switch, withRouter } from 'react-router-dom';

import AppLayout from 'layout/AppLayout';
import SystemConfigForm from './system-config';
import AuctionPlays from './plays-auctions/list/AuctionPlays';
import RefferalCode from './refferalcode/RefferalCode';
import RevenueList from './revenue/list/RevenueList';
import Terms from './terms&conditions/Terms';

// import Settings from './settings';
// import { ProtectedRoute, UserRole } from 'helpers/authHelper';

const Dashboards = React.lazy(() =>
  import(/* webpackChunkName: "dashboards" */ './dashboards/default')
);
const SystemMemory = React.lazy(() =>
  import(/* webpackChunkName: "system-memory" */ './system-memory')
);
const NoteBook = React.lazy(() =>
  import(/* webpackChunkName: "notebook" */ './notebook/index')
);
const VerifyFollowedUser = React.lazy(() =>
  import(/* webpackChunkName: "verify-followed-user" */ './verify-followed-user/index')
);
const ServerLogs = React.lazy(() =>
  import(/* webpackChunkName: "server-logs" */ './serverLogs/index')
);
const Pages = React.lazy(() =>
  import(/* webpackChunkName: "pages" */ './pages')
);
const Applications = React.lazy(() =>
  import(/* webpackChunkName: "applications" */ './applications')
);
const Ui = React.lazy(() => import(/* webpackChunkName: "ui" */ './ui'));
const Menu = React.lazy(() => import(/* webpackChunkName: "menu" */ './menu'));
const BlankPage = React.lazy(() =>
  import(/* webpackChunkName: "blank-page" */ './blank-page')
);
const Auction = React.lazy(() => import('./auctions'));
const Product = React.lazy(() => import('./products'));
const Vendor = React.lazy(() => import('./users'));
const AuctionHouse = React.lazy(() => import('./auction-house'));
// const Setting = React.lazy(() => import('./settings/auctionconfig'));
const ProfilePage = React.lazy(() => import('./profilePage'));
const BidsLog = React.lazy(() => import('./bidslog/list'));
const WinnerLog = React.lazy(() => import('./winnerlog/list'));
const PlayAc = React.lazy(() => import('./playaccount/list'));
const PrizeDistribution = React.lazy(() => import('./prizedistribution/list'));
const Currency = React.lazy(() => import('./currency'));
const Aanalytics = React.lazy(() => import('./analytics'));
const PlayerList = React.lazy(() => import('./player/list/PlayerList'));
const Plans = React.lazy(() => import('./plans/plans'));
const PaymentGateway = React.lazy(() => import('./paymentGateway/paymentGateway'));
const SupportedChain = React.lazy(() => import('./supportedChain/supportedChain'));
const RequestReceived = React.lazy(() => import('./requestReceived'));
const ProductConflicts = React.lazy(() => import('./product-delivery-conflicts'));

const App = ({ match }) => {
  return (
    <AppLayout>
      <div className="dashboard-wrapper pl-4">
        <Suspense fallback={<div className="loading" />}>
          <Switch>
            <Redirect
              exact
              from={`${match.url}/`}
              to={`${match.url}/dashboards`}
            />
            <Route
              path={`${match.url}/dashboards`}
              render={(props) => <Dashboards {...props} />}
            />
            <Route
              path={`${match.url}/system-memory`}
              render={(props) => <SystemMemory {...props} />}
            />
            <Route
            path={`${match.url}/notebook`}
            render={(props) => <NoteBook {...props} />}
          />
            <Route
              path={`${match.url}/analytics`}
              render={(props) => <Aanalytics {...props} />}
            />
            <Route
              path={`${match.url}/server-logs`}
              render={(props) => <ServerLogs {...props} />}
            />
            <Route
              path={`${match.url}/auction-house`}
              render={(props) => <AuctionHouse {...props} />}
            />
            <Route
              path={`${match.url}/auctions-plays`}
              render={(props) => <AuctionPlays {...props} />}
            />
            <Route
              path={`${match.url}/payment-gateway`}
              render={(props) => <PaymentGateway {...props} />}
            />
            <Route
              path={`${match.url}/verify-followed-user`}
              render={(props) => <VerifyFollowedUser {...props} />}
            />
            <Route
            path={`${match.url}/product-delivery-conflicts`}
            render={(props) => <ProductConflicts {...props} />}
          />
            <Route
              path={`${match.url}/plans`}
              render={(props) => <Plans {...props} />}
            />
             <Route
              path={`${match.url}/supported-chain`}
              render={(props) => <SupportedChain {...props} />}
            />
            <Route
              path={`${match.url}/request-received`}
              render={(props) => <RequestReceived {...props} />}
            />
            <Route
              path={`${match.url}/revenue`}
              render={(props) => <RevenueList {...props} />}
            />
            {/* <Route
              path={`${match.url}/settings`}
              render={() => <Settings />}
            /> */}
            <Route
              path={`${match.url}/product`}
              render={(props) => <Product {...props} />}
            />
            <Route
              path={`${match.url}/auctions`}
              render={(props) => <Auction {...props} />}
            />
            <Route
              path={`${match.url}/vendor`}
              render={(props) => <Vendor {...props} />}
            />
            {/* <Route
              path={`${match.url}/setting`}
              render={(props) => <Setting {...props} />}
            /> */}
            <Route
              path={`${match.url}/applications`}
              render={(props) => <Applications {...props} />}
            />
            {/* <ProtectedRoute
                    path={`${match.url}/applications`}
                    component={Applications}
                    roles={[UserRole.Admin]}
            /> */}
            <Route
              path={`${match.url}/pages`}
              render={(props) => <Pages {...props} />}
            />
            <Route
              path={`${match.url}/ui`}
              render={(props) => <Ui {...props} />}
            />
            <Route
              path={`${match.url}/menu`}
              render={(props) => <Menu {...props} />}
            />
            <Route
              path={`${match.url}/blank-page`}
              render={(props) => <BlankPage {...props} />}
            />
            <Route
              path={`${match.url}/players`}
              render={(props) => <PlayerList {...props} />}
            />
            <Route
              path={`${match.url}/currency`}
              render={(props) => <Currency {...props} />}
            />
            <Route
              path={`${match.url}/system-config`}
              render={(props) => <SystemConfigForm {...props} />}
            />
            <Route
              path={`${match.url}/referral-code`}
              render={(props) => <RefferalCode {...props} />}
            />
            <Route
              path={`${match.url}/t&c`}
              render={(props) => <Terms {...props} />}
            />
            <Route
              path={`${match.url}/profile-page`}
              render={(props) => <ProfilePage {...props} />}
            />
            <Route
              path={`${match.url}/bids-log`}
              render={(props) => <BidsLog {...props} />}
            />
            <Route
              path={`${match.url}/winner-log`}
              render={(props) => <WinnerLog {...props} />}
            />
            <Route
              path={`${match.url}/play-account`}
              render={(props) => <PlayAc {...props} />}
            />
            <Route
              path={`${match.url}/prize-distribution`}
              render={(props) => <PrizeDistribution {...props} />}
            />
            <Redirect to="/error" />
          </Switch>
        </Suspense>
      </div>
    </AppLayout>
  );
};

const mapStateToProps = ({ menu }) => {
  const { containerClassnames } = menu;
  return { containerClassnames };
};

export default withRouter(connect(mapStateToProps, {})(App));
