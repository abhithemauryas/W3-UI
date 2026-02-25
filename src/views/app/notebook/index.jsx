import React, { useEffect, useState } from 'react';
import { Card, CardBody, CardTitle, Button, Row } from 'reactstrap';
import { Colxx } from 'components/common/CustomBootstrap';

import 'react-quill/dist/quill.snow.css';
import 'react-quill/dist/quill.bubble.css';
import Editor from 'components/editor/Editor';
import { connect } from 'react-redux';
import { getNotebook, updateNotebook } from 'redux/notebook/actions.notebook';
import { NotificationManager } from 'components/common/react-notifications';

const Notebook = ({
  GetNotebook,
  UpdateNotebook,
  loading,
  successMesage,
  errorMessage,
  // notebookContent,
}) => {
  const [textQuillStandard, setTextQuillStandard] = useState('');
  const [initialLoading, setInitialLoading] = useState(false);

  useEffect(() => {
    setInitialLoading(true);
    GetNotebook({
      cb: (res) => {
        if (res?.success) {
          let content = res?.data?.content || '';
          // Convert relative image paths to full URLs if needed
          if (content) {
            const baseUrl = process.env.REACT_APP_NODE_SERVER_API_BASE_URL;
            // Replace relative image paths with full URLs
            content = content.replace(
              /<img\s+src="(?!https?:\/\/)([^"]+)"/g,
              `<img src="${baseUrl}/$1"`
            );
          }
          setTextQuillStandard(content);
        }
        setInitialLoading(false);
      },
    });
  }, [GetNotebook]);

  const notebookSubmitHandler = () => {
    if (textQuillStandard.replace(/<(.|\n)*?>/g, '').trim().length === 0) {
      NotificationManager.error(null, 'Notebook content cannot be empty');
      return;
    }

    setInitialLoading(true);
    UpdateNotebook(textQuillStandard);
  };

  useEffect(() => {
    if (initialLoading) {
      if (successMesage) {
        NotificationManager.success(null, successMesage);
        setInitialLoading(false);
      } else if (errorMessage) {
        NotificationManager.error(null, errorMessage);
        setInitialLoading(false);
      }
    }
  }, [successMesage, errorMessage, initialLoading]);

  return (
    <Row
      className="mb-4"
      style={{ height: 'calc(100vh - 200px)', display: 'flex' }}
    >
      <Colxx
        xxs="12"
        style={{ height: '100%', display: 'flex', flexDirection: 'column' }}
      >
        <Card
          style={{
            height: '80vh',
            display: 'flex',
            flexDirection: 'column',
          }}
        >
          <CardBody
            style={{
              display: 'flex',
              flexDirection: 'column',
              flex: 1,
              overflow: 'hidden',
              height: '80vh',
            }}
          >
            <CardTitle tag="h5">Notebook</CardTitle>
            <div
              style={{
                flex: 1,
                display: 'flex',
                flexDirection: 'column',
                minHeight: 0,
                overflow: 'hidden',
              }}
            >
              <Editor
                textQuillStandard={textQuillStandard}
                onChange={(val) => {
                  setTextQuillStandard(val);
                }}
                enableImageUpload
                maxImageWidth={1920}
                maxImageHeight={1080}
                imageQuality={0.8}
              />
            </div>
            <div>
              <Button
                className={`btn-multiple-state mt-4 ${
                  loading ? 'show-spinner' : ''
                }`}
                disabled={loading}
                color="primary"
                onClick={() => notebookSubmitHandler()}
              >
                <span className="spinner d-inline-block">
                  <span className="bounce1" />
                  <span className="bounce2" />
                  <span className="bounce3" />
                </span>
                <span className="label">Save</span>
              </Button>
            </div>
          </CardBody>
        </Card>
      </Colxx>
    </Row>
  );
};

const mapStateToProps = ({ notebook }) => {
  const {
    error,
    successMesage,
    errorMessage,
    loading,
    metadata,
    notebook: notebookContent,
  } = notebook;
  return {
    error,
    successMesage,
    errorMessage,
    loading,
    metadata,
    notebookContent,
  };
};

const mapActionsToProps = (dispatch) => {
  return {
    GetNotebook: (params) => dispatch(getNotebook(params)),
    UpdateNotebook: (updateContent) => dispatch(updateNotebook(updateContent)),
  };
};

export default connect(mapStateToProps, mapActionsToProps)(Notebook);
