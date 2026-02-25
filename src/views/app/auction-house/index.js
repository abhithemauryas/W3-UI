import React, { Suspense } from 'react';
import { Redirect, Route, Switch } from 'react-router-dom';
import AuctionHouseList from './list/AuctionHouseList';
import AuctionHouseDetails from './detail/details';
import AuctionHouseConfig from './editConfig/editConfig';

const AuctionHouse = ({ match }) => {
  return (
    <Suspense fallback={<div className="loading" />}>
      <Switch>
        <Redirect exact from={`${match.url}/`} to={`${match.url}/list`} />
        <Route
          path={`${match.url}/list`}
          render={(props) => <AuctionHouseList {...props} />}
        />

        <Route
          path={`${match.url}/:auctionHouseId/config`}
          render={(props) => <AuctionHouseConfig {...props} />}
        />

        <Route
          path={`${match.url}/:auctionHouseId`}
          render={(props) => <AuctionHouseDetails {...props} />}
        />

        <Redirect to="/error" />
      </Switch>
    </Suspense>
  );
};

export default AuctionHouse;
