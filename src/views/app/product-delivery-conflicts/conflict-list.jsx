/* eslint-disable jsx-a11y/no-noninteractive-element-interactions */
import { Colxx } from 'components/common/CustomBootstrap';
import { removeUnderScore } from 'constants/constants';
import { useState } from 'react';
import 'react-datepicker/dist/react-datepicker.css';
import { injectIntl } from 'react-intl';
import { Card, CardBody, Collapse, Row } from 'reactstrap';

const ConflictList = (props) => {
  const {
    darktheme,
    setId,
    setModalDelete,
    setModalEdit,
    loading,
    items,
    setStatus,
    setItem,
  } = props;

  return loading ? (
    <div className="loading" />
  ) : (
    <div className="responsive w-100 overflow-y">
      <table
        className={`w-100 custom-table ${
          !darktheme ? 'lighttheme' : 'darktheme'
        }`}
      >
        <thead>
          <tr>
            <th>Auction House</th>
            <th>Title</th>
            <th>Product Name</th>
            <th>Type</th>
            <th>Description</th>
            <th>Reported By</th>
            <th>Contact Email</th>
            <th>Status</th>
            <th>Action</th>
          </tr>
        </thead>
        <tbody>
          {items.length ? (
            items?.map((conflict) => (
              <TableData
                conflict={conflict}
                key={conflict.id}
                setId={setId}
                setStatus={setStatus}
                setModalDelete={setModalDelete}
                setModalEdit={setModalEdit}
                setItem={setItem}
              />
            ))
          ) : (
            <tr>
              <td colSpan="12" className="nodatafound">
                No Data Found
              </td>
            </tr>
          )}
        </tbody>
      </table>
    </div>
  );
};

// Add reloadAuctions prop
const TableData = ({
  conflict,
  setId,
  setStatus,
  setModalDelete,
  setModalEdit,
  setItem,
}) => {
  const [collapse, setCollapse] = useState(false);

  return (
    <tr>
      <td colSpan="12">
        <Row>
          <Colxx xxs="12">
            <Card className="p-0">
              <CardBody className="p-0">
                <table
                  className="w-100 custom-table"
                  onClick={() => setCollapse(!collapse)}
                  onKeyDown={() => {}}
                >
                  <tr
                    style={{
                      cursor: 'pointer',
                    }}
                  >
                    <td>{conflict.auctionHouse.name}</td>
                    <td>{conflict.auction?.title}</td>
                    <td>{conflict.auction?.products?.title}</td>
                    <td>{removeUnderScore(conflict?.conflict_type)}</td>
                    <td>{conflict?.description?.slice(0, 10)}...</td>
                    <td>{conflict?.reportedBy?.first_name}</td>
                    <td>{conflict?.reportedBy?.email.slice(0, 10)}...</td>
                    <td>
                      <span
                        style={{
                          color:
                            conflict.status === 'resolved' ? 'green' : 'red',
                          fontWeight: 'bold',
                          textTransform: 'capitalize',
                        }}
                      >
                        {conflict?.status}
                      </span>
                    </td>
                    <td>
                      <div className="custom-control custom-checkbox pl-1 align-self-center d-flex justify-content-center align-items-center font-14 gap-13">
                        <i
                          className={`${
                            collapse ? 'arrow-rotate' : ''
                          } simple-icon-arrow-down arrow-transition `}
                          role="button"
                          tabIndex={0}
                          onClick={() => setCollapse(!collapse)}
                          onKeyDown={() => {}}
                        />
                      </div>
                    </td>
                  </tr>
                </table>
                <Collapse isOpen={collapse} className="collapse-table">
                  <div className="pl-5 pr-5 mt-3 d-flex justify-content-between h-auto">
                    <div className="w-100 pr- d-flex justify-content-between h-auto">
                      <p className="pr-5">
                        <span style={{ color: 'teal' }}>Description : </span>
                        <span
                          style={{
                            fontSize: '14px',
                          }}
                        >
                          {conflict?.description}
                        </span>
                      </p>
                      <p className="w-auto text-left">
                        <span style={{ color: 'teal' }}>Creator Email : </span>
                        <a
                          href={`mailto:${conflict?.creator?.email}`}
                          style={{
                            fontSize: '14px',
                            textDecoration: 'underline',
                          }}
                        >
                          {conflict?.creator?.email}
                        </a>
                        <br />
                        <span style={{ color: 'teal' }}>User Email : </span>
                        <a
                          href={`mailto:${conflict?.reportedBy?.email}`}
                          style={{
                            fontSize: '14px',
                            textDecoration: 'underline',
                          }}
                        >
                          {conflict?.reportedBy?.email}
                        </a>
                      </p>
                    </div>
                    <div className="d-flex justify-content-end align-items-start font-20 gap-3 pl-5">
                      <div
                        className={`${
                          conflict.status === 'pending'
                            ? 'simple-icon-like text-success'
                            : 'simple-icon-dislike text-danger'
                        } text-info cursor-pointer font-16-bolder`}
                        role="button"
                        title="Edit Conflict"
                        tabIndex={0}
                        onClick={() => {
                          setItem(conflict?.conflict_type);
                          setId(conflict.id);
                          setStatus(conflict.status);
                          setModalEdit(true);
                        }}
                        onKeyPress={() => {}}
                      />

                      <div
                        className="simple-icon-trash text-danger cursor-pointer font-16-bolder "
                        role="button"
                        tabIndex={0}
                        onClick={() => {
                          setItem(conflict?.title);
                          setId([conflict.id]);
                          setModalDelete(true);
                        }}
                        onKeyPress={(e) => console.log(e)}
                      />
                    </div>
                  </div>
                </Collapse>
              </CardBody>
            </Card>
          </Colxx>
        </Row>
      </td>
    </tr>
  );
};

export default injectIntl(ConflictList);
