import { Colxx } from 'components/common/CustomBootstrap';
import React from 'react';
import ReactPaginate from 'react-paginate';

const Pagination = ({
  handlePageClick,
  totalPage,
  currentPage,
  marginPagesDisplayed = 2,
  pageRangeDisplayed = 2,
}) => {
  return (
    <Colxx xxs="12" className="mt-3 mb-3">
      <div className="pagination justify-content-center">
        <ReactPaginate
          breakLabel=" "
          previousLabel=""
          marginPagesDisplayed={marginPagesDisplayed}
          pageRangeDisplayed={pageRangeDisplayed}
          nextLabel=""
          className="pagination"
          pageClassName="page-item nav-item"
          breakClassName="page-item nav-item"
          pageLinkClassName="page-link c-pointer nav-link"
          breakLinkClassName="page-link c-pointer nav-link simple-icon-options"
          onPageChange={handlePageClick}
          forcePage={currentPage}
          pageCount={totalPage}
          previousClassName="page-item c-pointer"
          nextClassName="page-item c-pointer"
          previousLinkClassName="page-link prev simple-icon-arrow-left"
          nextLinkClassName="page-link prev simple-icon-arrow-right"
          renderOnZeroPageCount={null}
        />
      </div>
    </Colxx>
  );
};

export default Pagination;
