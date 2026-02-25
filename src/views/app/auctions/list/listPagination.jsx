import { Colxx } from 'components/common/CustomBootstrap';
import React from 'react';
import { Nav, NavItem, NavLink, Row } from 'reactstrap';

const ListPagination = ({
  totalPage,
  points,
  currentPage,
  setCurrentPage,
  nextPageButtonClassName,
  lastIsActive,
  lastPageButtonClassName,
  firstIsActive,
  firstPageButtonClassName,
  prevPageButtonClassName,
  loading,
}) => {
  return loading ? null : (
    <>
      <Row>
        {totalPage > 1 ? (
          <Colxx xxs="12" className="mt-3 mb-3">
            <Nav className="pagination justify-content-center">
              {firstIsActive && (
                <NavItem className={`page-item ${firstPageButtonClassName}`}>
                  <NavLink
                    className="page-link first c-pointer"
                    onClick={() => setCurrentPage(1)}
                  >
                    <i className="simple-icon-control-start" />
                  </NavLink>
                </NavItem>
              )}

              <NavItem className={`page-item ${prevPageButtonClassName}`}>
                <NavLink
                  className="page-link prev c-pointer"
                  onClick={() => setCurrentPage(currentPage - 1)}
                >
                  <i className="simple-icon-arrow-left" />
                </NavLink>
              </NavItem>
              {points.map((i) => {
                return (
                  <NavItem
                    key={i}
                    className={`page-item ${currentPage === i && 'active'}`}
                  >
                    <NavLink
                      className="page-link c-pointer"
                      onClick={() => setCurrentPage(i)}
                    >
                      {i}
                    </NavLink>
                  </NavItem>
                );
              })}
              <NavItem className={`page-item ${nextPageButtonClassName}`}>
                <NavLink
                  className="page-link next c-pointer"
                  onClick={() => setCurrentPage(currentPage + 1)}
                >
                  <i className="simple-icon-arrow-right" />
                </NavLink>
              </NavItem>
              {lastIsActive && (
                <NavItem className={`page-item ${lastPageButtonClassName}`}>
                  <NavLink
                    className="page-link last c-pointer"
                    onClick={() => setCurrentPage(totalPage)}
                  >
                    <i className="simple-icon-control-end" />
                  </NavLink>
                </NavItem>
              )}
            </Nav>
          </Colxx>
        ) : (
          <Colxx xxs="12" className="mt-2" />
        )}

        {/* End Pagination */}
      </Row>
    </>
  );
};

export default ListPagination;
