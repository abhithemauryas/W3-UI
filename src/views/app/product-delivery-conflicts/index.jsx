import { Colxx } from 'components/common/CustomBootstrap';
import { NotificationManager } from 'components/common/react-notifications';
import DeleteModal from 'components/modals/DeleteModal';
import ListHeading from 'components/table/ListHeading';
import { getCurrentColor } from 'helpers/Utils';
import { useEffect, useState } from 'react';
import { connect } from 'react-redux';
import { Row } from 'reactstrap';
import { getProductConflicts } from 'redux/auction/actions.auction';

import Pagination from 'components/table/Pagination';
import { pageSizes } from 'constants/constants';
import EditModal from 'components/modals/EditModal';
import ConflictList from './conflict-list';

const orderOptions = [
  { column: 'asc', label: 'Ascending' },
  { column: 'desc', label: 'Descending' },
];

const ProductConflicts = ({
  fetchProductConflicts,
  successMesage,
  errorMessage,
  loading,
  metadata,
  productConflicts,
  match,
}) => {
  const [displayMode, setDisplayMode] = useState('thumblist');
  const [currentPage, setCurrentPage] = useState(0);
  const [selectedPageSize, setSelectedPageSize] = useState(pageSizes[0]);
  const [selectedOrderOption, setSelectedOrderOption] = useState(
    orderOptions[0]
  );
  const [displayOptionsIsOpen, setDisplayOptionsIsOpen] = useState(false);

  const [search, setSearch] = useState('');
  const [item, setItem] = useState('');
  const [darktheme, setDarkTheme] = useState(false);
  const [modalDelete, setModalDelete] = useState(false);
  const [modalEdit, setModalEdit] = useState(false);
  const [id, setId] = useState('');
  const [status, setStatus] = useState('');
  const [initalloading, setIndtialLoading] = useState(false);

  const handlePageClick = ({ selected }) => setCurrentPage(selected);

  useEffect(() => {
    setIndtialLoading(true);
  }, []);

  // Fetch Data over here
  useEffect(() => {
    const color = getCurrentColor();
    if (color.includes('dark')) setDarkTheme(true);
    else setDarkTheme(false);
    let timeout;
    if (search) {
      timeout = setTimeout(() => {
        fetchProductConflicts({
          limit: selectedPageSize,
          page: currentPage,
          _order: selectedOrderOption.column,
          search: search.trim(),
        });
      }, 500);
    } else {
      fetchProductConflicts({
        limit: selectedPageSize,
        page: currentPage,
        _order: selectedOrderOption.column,
      });
    }
    return () => clearTimeout(timeout);
  }, [selectedPageSize, currentPage, selectedOrderOption, search]);

  useEffect(() => {
    if (initalloading) {
      if (successMesage) NotificationManager.success(null, successMesage);
      else if (errorMessage) NotificationManager.error(null, errorMessage);
    }
  }, [successMesage, errorMessage]);

  const onSearchKey = (e) => {
    setSearch(e.target.value.toLowerCase());
  };

  const changeOrderBy = (column) => {
    setSelectedOrderOption(orderOptions.find((x) => x.column === column));
  };

  return (
    <>
      {modalDelete && (
        <DeleteModal
          id={id}
          item={item}
          setItem={setItem}
          setModalDelete={setModalDelete}
          modalDelete={modalDelete}
          setCurrentPage={setCurrentPage}
          selectedPageSize={selectedPageSize}
          currentPage={currentPage}
        />
      )}
      {modalEdit && (
        <EditModal
          id={id}
          item={item}
          setModalEdit={setModalEdit}
          status={status}
          modalEdit={modalEdit}
          setCurrentPage={setCurrentPage}
          selectedPageSize={selectedPageSize}
          currentPage={currentPage}
        />
      )}
      <div className="disable-text-selection">
        {/* ListHeading Starts */}
        <ListHeading
          from="product-delivery-conflicts"
          match={match}
          setDisplayOptionsIsOpen={setDisplayOptionsIsOpen}
          displayOptionsIsOpen={displayOptionsIsOpen}
          displayMode={displayMode}
          setDisplayMode={setDisplayMode}
          selectedOrderOption={selectedOrderOption}
          orderOptions={orderOptions}
          changeOrderBy={changeOrderBy}
          startIndex={currentPage}
          totalItemCount={metadata?.totalRecord}
          selectedPageSize={selectedPageSize}
          pageSizes={pageSizes}
          onSearchKey={onSearchKey}
          setSelectedPageSize={setSelectedPageSize}
          setCurrentPage={setCurrentPage}
          endPoint={metadata?.totalPages}
        />
        {/* List heading Ends */}

        <Colxx>
          <ConflictList
            setModalEdit={setModalEdit}
            darktheme={darktheme}
            items={productConflicts}
            setId={setId}
            setStatus={setStatus}
            setModalDelete={setModalDelete}
            loading={loading}
            setItem={setItem}
          />
        </Colxx>

        <Row>
          {/* Pagination starts here */}
          {!loading && metadata?.totalPages > 1 ? (
            <Pagination
              totalPage={metadata?.totalPages}
              currentPage={currentPage}
              handlePageClick={handlePageClick}
            />
          ) : (
            <Colxx xxs="12" className="mt-2" />
          )}
        </Row>

        {/* List view ends */}
      </div>
    </>
  );
};

const mapStateToProps = ({ auction }) => {
  const {
    productConflicts,
    metadata,
    message,
    successMesage,
    errorMessage,
    loading,
  } = auction;

  return {
    productConflicts,
    metadata,
    message,
    successMesage,
    errorMessage,
    loading,
  };
};

const mapActionsToProps = (dispatch) => {
  return {
    fetchProductConflicts: (params) =>
      dispatch(getProductConflicts({ ...params })),
  };
};

export default connect(mapStateToProps, mapActionsToProps)(ProductConflicts);
