import React, { useEffect, useState } from 'react';
import { Row, Card, CardBody, CardTitle, Button } from 'reactstrap';
import { Colxx } from 'components/common/CustomBootstrap';
import IntlMessages from 'helpers/IntlMessages';

import 'react-quill/dist/quill.snow.css';
import 'react-quill/dist/quill.bubble.css';
import Editor from 'components/editor/Editor';
import { connect } from 'react-redux';
import {
  createTermsAndCondition,
  getTermsAndCondition,
  updateTermsAndCondition,
} from 'redux/termsAndCondition/actions.termsAndCondition';
import { NotificationManager } from 'components/common/react-notifications';

const EditorForTerms = ({
  // match,
  CreateTermCon,
  UpdateTermCon,
  id,
  GerTermCon,
  loading,
  successMesage,
  errorMessage,
}) => {
  const [textQuillStandard, setTextQuillStandard] = useState('');
  const [initialLoading, setInitialLoading] = useState(false);
  useEffect(() => {
    setInitialLoading(true);
    GerTermCon({
      cb: (res) => {
        if (res?.success) {
          setTextQuillStandard(res?.data?.content);
        }
      },
    });
  }, []);
  const termsConSubmitHandler = (termsId) => {
    if (textQuillStandard.replace(/<(.|\n)*?>/g, '').trim().length === 0) {
      NotificationManager.error(null, 'Term and condition is required');
    } else if (termsId) {
      setInitialLoading(true);
      UpdateTermCon(textQuillStandard, termsId);
    } else CreateTermCon(textQuillStandard);
  };
  useEffect(() => {
    if (initialLoading) {
      if (successMesage) NotificationManager.success(null, successMesage);
      else if (errorMessage) NotificationManager.error(null, errorMessage);
    }
  }, [successMesage, errorMessage]);
  return (
    <>
      <Row className="mb-4">
        <Colxx xxs="12">
          <Card>
            <CardBody>
              <CardTitle>
                <IntlMessages id="menu.t-and-c" />(GLOBAL)
              </CardTitle>
              <Editor
                textQuillStandard={textQuillStandard}
                setTextQuillStandard={setTextQuillStandard}
              />
              <Button
                className={`btn-multiple-state mt-2  ${
                  loading ? 'show-spinner' : ''
                }`}
                disabled={loading}
                color="primary"
                onClick={() => termsConSubmitHandler(id)}
              >
                <span className="spinner d-inline-block">
                  <span className="bounce1" />
                  <span className="bounce2" />
                  <span className="bounce3" />
                </span>

                <span className="label">Save</span>
              </Button>
            </CardBody>
          </Card>
        </Colxx>
      </Row>
    </>
  );
};
const mapStateToProps = ({ termsAndCondition }) => {
  const {
    count,
    currentUser,
    error,
    successMesage,
    errorMessage,
    loading,
    metadata,
    id,
  } = termsAndCondition;
  return {
    count,
    currentUser,
    error,
    successMesage,
    errorMessage,
    loading,
    metadata,
    id,
  };
};

const mapActionsToProps = (dispatch) => {
  return {
    CreateTermCon: (createContent) =>
      dispatch(createTermsAndCondition(createContent)),
    GerTermCon: (params) => dispatch(getTermsAndCondition(params)),
    UpdateTermCon: (updateContent, id) =>
      dispatch(updateTermsAndCondition(updateContent, id)),
  };
};
export default connect(mapStateToProps, mapActionsToProps)(EditorForTerms);
