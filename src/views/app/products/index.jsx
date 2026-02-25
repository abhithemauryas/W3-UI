import AccessControlled from 'helpers/AccessControlled';
// import { getPermission } from 'helpers/Utils';
import React, { Suspense } from 'react';
import { connect } from 'react-redux';
import { Redirect, Route, Switch } from 'react-router-dom';

const List = React.lazy(() =>
  // eslint-disable-next-line import/no-cycle
  import(/* webpackChunkName: "ui-forms" */ './list/productlist')
);
const ProductAdd = React.lazy(() =>
  // eslint-disable-next-line import/no-cycle
  import(/* webpackChunkName: "ui-components" */ './add/addproduct')
);
const ProductDetail = React.lazy(() => import('./details/details'));

const Product = ({ match }) => {
  return (
    <Suspense fallback={<div className="loading" />}>
      <Switch>
        <AccessControlled
          path={`${match.url}/list`}
          component={List}
          roles={['Admin', 'Vendor']}
        />
        <AccessControlled
          path={`${match.url}/add`}
          component={ProductAdd}
          roles={['Admin', 'Vendor']}
        />
        <AccessControlled
          path={`${match.url}/:productId/edit`}
          component={ProductAdd}
          roles={['Admin', 'Vendor']}
        />
        <AccessControlled
          path={`${match.url}/:productId`}
          component={ProductDetail}
          roles={['Admin', 'Vendor']}
        />
        <Redirect exact from={`${match.url}/`} to={`${match.url}/list`} />
        <Route
          path={`${match.url}/list`}
          render={(props) => <List {...props} />}
        />
        <Route
          path={`${match.url}/add`}
          render={(props) => <ProductAdd {...props} />}
        />
        <Route
          path={`${match.url}/:productId/edit`}
          render={(props) => <ProductAdd {...props} />}
        />
        <Route
          path={`${match.url}/:productId`}
          render={(props) => <ProductDetail {...props} />}
        />
        <Redirect to="/error" />
      </Switch>
    </Suspense>
  );
};

const mapStateToProps = ({ authentication }) => {
  const { loading, errorMessage, permission } = authentication;
  return {
    loading,
    errorMessage,
    permission,
  };
};

export default connect(mapStateToProps, {})(Product);
