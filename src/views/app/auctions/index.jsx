import React, { Suspense } from 'react';
import { Redirect, Route, Switch } from 'react-router-dom';

const AuctionList = React.lazy(() =>
  import(/* webpackChunkName: "ui-forms" */ './list/auctionlist')
);
const AuctionAdd = React.lazy(() =>
  import(/* webpackChunkName: "ui-components" */ './add/addauction')
);
const AuctionDetail = React.lazy(() =>
  import(/* webpackChunkName: "ui-components" */ './details/details')
);

const Auction = ({ match }) => (
  <Suspense fallback={<div className="loading" />}>
    <Switch>
      <Redirect exact from={`${match.url}/`} to={`${match.url}/list`} />
      <Route
        path={`${match.url}/list`}
        render={(props) => <AuctionList {...props} />}
      />
      <Route
        path={`${match.url}/add`}
        render={(props) => <AuctionAdd {...props} />}
      />
      <Route
        path={`${match.url}/:auctionId/edit`}
        render={(props) => <AuctionAdd {...props} />}
      />
      <Route
        path={`${match.url}/:auctionId`}
        render={(props) => <AuctionDetail {...props} />}
      />
      <Redirect to="/error" />
    </Switch>
  </Suspense>
);
export default Auction;
