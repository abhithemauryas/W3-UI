import React, { useState, useEffect, useRef } from 'react';
import { Row, Card, CardBody, Button } from 'reactstrap';
import axios from 'helpers/axiosInstance';
import { Colxx } from 'components/common/CustomBootstrap';

const ServerLogs = () => {
  const [logs, setLogs] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [clearing, setClearing] = useState(false);
  const logContainerRef = useRef(null);

  const fetchLogs = async () => {
    try {
      setLoading(true);
      setError(null);
      // axiosInstance already has /v1 in baseURL, so we use just the endpoint
      const response = await axios.get('/pod-logs');

      if (response?.success && response?.data?.logs) {
        setLogs(response.data.logs);
      } else {
        setError(
          response?.message || 'Failed to fetch logs or logs data is missing'
        );
        setLogs([]);
      }
    } catch (err) {
      console.error('Error fetching logs:', err);
      setError(err?.message || 'Failed to fetch server logs');
      setLogs([]);
    } finally {
      setLoading(false);
    }
  };

  const clearLogs = async () => {
    try {
      setClearing(true);
      // axiosInstance already has /v1 in baseURL, so we use just the endpoint
      const response = await axios.post('/clear-logs');

      if (response?.success) {
        // Refresh logs after clearing
        await fetchLogs();
      } else {
        setError(response?.message || 'Failed to clear logs');
      }
    } catch (err) {
      console.error('Error clearing logs:', err);
      setError(err?.message || 'Failed to clear server logs');
    } finally {
      setClearing(false);
    }
  };

  useEffect(() => {
    fetchLogs();
    // Optionally refresh logs periodically (every 10 seconds)
    const interval = setInterval(fetchLogs, 10000);
    return () => clearInterval(interval);
  }, []);

  // Auto-scroll to bottom when new logs arrive
  useEffect(() => {
    if (logContainerRef.current) {
      logContainerRef.current.scrollTop = logContainerRef.current.scrollHeight;
    }
  }, [logs]);

  const getLogLevel = (logLine) => {
    if (!logLine) return 'info';
    const upperLine = logLine.toUpperCase();
    if (upperLine.includes('ERROR') || upperLine.includes('ERR'))
      return 'error';
    if (upperLine.includes('WARN') || upperLine.includes('WARNING'))
      return 'warn';
    if (upperLine.includes('DEBUG')) return 'debug';
    if (upperLine.includes('INFO')) return 'info';
    return 'info';
  };

  const getBorderColor = (level) => {
    if (level === 'error') return '#dc3545';
    if (level === 'warn') return '#ffc107';
    if (level === 'debug') return '#6c757d';
    return '#17a2b8';
  };

  const getBackgroundColor = (level) => {
    if (level === 'error') return 'rgba(220, 53, 69, 0.05)';
    if (level === 'warn') return 'rgba(255, 193, 7, 0.05)';
    return 'transparent';
  };

  const formatLogLine = (logLine, index) => {
    const level = getLogLevel(logLine);
    return (
      <div
        key={index}
        className={`log-line log-${level}`}
        style={{
          padding: '4px 12px',
          fontFamily: 'monospace',
          fontSize: '13px',
          lineHeight: '1.6',
          borderLeft: `3px solid ${getBorderColor(level)}`,
          backgroundColor: getBackgroundColor(level),
        }}
      >
        {logLine}
      </div>
    );
  };

  const renderLogContent = () => {
    if (loading && logs.length === 0) {
      return (
        <div
          style={{
            padding: '40px',
            textAlign: 'center',
            color: '#888',
          }}
        >
          Loading logs...
        </div>
      );
    }
    if (logs.length === 0) {
      return (
        <div
          style={{
            padding: '40px',
            textAlign: 'center',
            color: '#888',
          }}
        >
          No logs available
        </div>
      );
    }
    return logs.map((logLine, index) => formatLogLine(logLine, index));
  };

  return (
    <>
      <Row>
        <Colxx xxs="12">
          <div className="mb-4">
            <h2>Server Logs</h2>
            <p className="text-muted">
              Real-time server log monitoring and management
            </p>
          </div>
        </Colxx>
      </Row>

      <Row>
        <Colxx xxs="12">
          <Card>
            <CardBody>
              <div className="d-flex justify-content-between align-items-center mb-3">
                <div>
                  <h4 className="mb-0">Log Viewer</h4>
                </div>
                <div>
                  <Button
                    color="primary"
                    className="mr-2"
                    onClick={fetchLogs}
                    disabled={loading}
                  >
                    {loading ? 'Refreshing...' : 'Refresh'}
                  </Button>
                  <Button
                    color="danger"
                    onClick={clearLogs}
                    disabled={clearing || loading}
                  >
                    {clearing ? 'Clearing...' : 'Clear Log'}
                  </Button>
                </div>
              </div>

              {error && (
                <div className="alert alert-danger mb-3" role="alert">
                  <strong>Error:</strong> {error}
                </div>
              )}

              <div
                ref={logContainerRef}
                className="log-container"
                style={{
                  backgroundColor: '#1e1e1e',
                  color: '#d4d4d4',
                  borderRadius: '8px',
                  padding: '0',
                  maxHeight: '70vh',
                  overflowY: 'auto',
                  overflowX: 'auto',
                  fontFamily: 'monospace',
                  fontSize: '13px',
                  lineHeight: '1.6',
                  border: '1px solid #333',
                }}
              >
                {renderLogContent()}
              </div>

              <div className="mt-3">
                <small className="text-muted">
                  <strong>Legend:</strong>{' '}
                  <span style={{ color: '#17a2b8' }}>●</span> Info{' '}
                  <span style={{ color: '#ffc107' }}>●</span> Warning{' '}
                  <span style={{ color: '#dc3545' }}>●</span> Error{' '}
                  <span style={{ color: '#6c757d' }}>●</span> Debug
                </small>
              </div>
            </CardBody>
          </Card>
        </Colxx>
      </Row>

      <style>{`
        .log-container {
          scrollbar-width: thin;
          scrollbar-color: #555 #1e1e1e;
        }
        
        .log-container::-webkit-scrollbar {
          width: 8px;
          height: 8px;
        }
        
        .log-container::-webkit-scrollbar-track {
          background: #1e1e1e;
        }
        
        .log-container::-webkit-scrollbar-thumb {
          background: #555;
          border-radius: 4px;
        }
        
        .log-container::-webkit-scrollbar-thumb:hover {
          background: #777;
        }
        
        .log-line {
          white-space: pre-wrap;
          word-break: break-word;
          transition: background-color 0.2s ease;
        }
        
        .log-line:hover {
          background-color: rgba(255, 255, 255, 0.05) !important;
        }
        
        .log-error {
          color: #f48771;
        }
        
        .log-warn {
          color: #dcdcaa;
        }
        
        .log-debug {
          color: #9cdcfe;
        }
        
        .log-info {
          color: #4ec9b0;
        }
      `}</style>
    </>
  );
};

export default ServerLogs;
