/* eslint-disable react/no-array-index-key */
import React from 'react';
import { Breadcrumb, BreadcrumbItem } from 'reactstrap';
import { NavLink, useParams } from 'react-router-dom';
import IntlMessages from 'helpers/IntlMessages';
import { adminRoot } from 'constants/defaultValues';

const getMenuTitle = (sub, params) => {
  if (`/${sub}` === adminRoot) return <IntlMessages id="menu.home" />;
  if (sub.includes(':')) return params[sub.substring(1)];
  return <IntlMessages id={`menu.${sub}`} />;
};

const getUrl = (path, sub, params) => {
  const newSub = sub.includes(':') ? params[sub.substring(1)] : sub;
  return path.split(sub)[0] + newSub;
};

const BreadcrumbContainer = ({ heading, match }) => {
  return (
    <>
      {heading && (
        <h1>
          <IntlMessages id={heading} />
        </h1>
      )}
      {match && <BreadcrumbItems match={match} />}
    </>
  );
};

const BreadcrumbItems = ({ match }) => {
  const params = useParams();
  const path = match.path.substr(1);
  let paths = path.split('/');
  if (paths[paths.length - 1].indexOf(':') > -1) {
    paths = paths.filter((x) => x.indexOf(':') === -1);
  }
  return (
    <>
      <Breadcrumb className="pt-0 breadcrumb-container d-none d-sm-block d-lg-inline-block">
        {paths.map((sub, index) => {
          return (
            <BreadcrumbItem key={index} active={paths.length === index + 1}>
              {paths.length !== index + 1 ? (
                <NavLink to={`/${getUrl(path, sub, params)}`}>
                  {getMenuTitle(sub, params)}
                </NavLink>
              ) : (
                getMenuTitle(sub)
              )}
            </BreadcrumbItem>
          );
        })}
      </Breadcrumb>
    </>
  );
};

export default BreadcrumbContainer;
