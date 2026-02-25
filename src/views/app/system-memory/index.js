import React, { useState, useEffect } from 'react';
import { Row, Col, Card, CardBody } from 'reactstrap';
import { LineChart, DoughnutChart } from 'components/charts';
import axios from 'helpers/axiosInstance';

const SystemMemory = () => {
  const [redisStats, setRedisStats] = useState(null);
  const [serverStats, setServerStats] = useState(null);
  const [redisHistory, setRedisHistory] = useState({
    labels: [],
    memoryData: [],
    opsData: [],
  });
  const [serverHistory, setServerHistory] = useState({
    labels: [],
    cpuData: [],
    memoryData: [],
  });

  const updateServerHistory = (data) => {
    const timestamp = new Date().toLocaleTimeString();
    setServerHistory((prev) => {
      const newLabels = [...prev.labels, timestamp].slice(-10);
      // cpu may include a percent sign like "1.27%" — strip non-numeric chars
      const cpuValue =
        parseFloat(String(data.cpu).replace(/[^0-9.]/g, '')) || 0;
      const newCpuData = [...prev.cpuData, cpuValue].slice(-10);
      // memory.used may be like "28.76 GB" — strip non-numeric chars
      const memoryValue =
        parseFloat(String(data.memory?.used || '').replace(/[^0-9.]/g, '')) ||
        0;
      const newMemoryData = [...prev.memoryData, memoryValue].slice(-10);

      return {
        labels: newLabels,
        cpuData: newCpuData,
        memoryData: newMemoryData,
      };
    });
  };

  const updateRedisHistory = (data) => {
    const timestamp = new Date().toLocaleTimeString();
    setRedisHistory((prev) => {
      const newLabels = [...prev.labels, timestamp].slice(-10);
      // used_memory_human may be like "3.94M" or "360.10M" — strip non-numeric chars
      const memoryValue =
        parseFloat(String(data.used_memory_human).replace(/[^0-9.]/g, '')) || 0;
      const newMemoryData = [...prev.memoryData, memoryValue].slice(-10);
      // instantaneous_ops_per_sec may be a string — parse as number
      const opsValue =
        Number(
          String(data.instantaneous_ops_per_sec).replace(/[^0-9.]/g, '')
        ) || 0;
      const newOpsData = [...prev.opsData, opsValue].slice(-10);

      return {
        labels: newLabels,
        memoryData: newMemoryData,
        opsData: newOpsData,
      };
    });
  };

  const fetchStats = async () => {
    try {
      const API_BASE = process.env.REACT_APP_NODE_SERVER_API_BASE_URL;
      const [redisResponse, serverResponse] = await Promise.all([
        axios.get(`${API_BASE}/v1/system-monitor/redis-stats`),
        axios.get(`${API_BASE}/v1/system-monitor/server-stats`),
      ]);

      // API responses follow { code, success, message, data }
      if (redisResponse?.success) {
        setRedisStats(redisResponse.data);
        updateRedisHistory(redisResponse.data);
      }

      if (serverResponse?.success) {
        setServerStats(serverResponse.data);
        updateServerHistory(serverResponse.data);
      }
    } catch (error) {
      console.error('Error fetching system stats:', error);
    }
  };

  useEffect(() => {
    fetchStats();
    const interval = setInterval(fetchStats, 5000); // Fetch every 5 seconds
    return () => clearInterval(interval);
  }, []);

  // animation options to apply to charts
  const chartAnimation = {
    animation: {
      duration: 800,
      easing: 'easeOutQuart',
    },
    hover: {
      animationDuration: 200,
    },
  };

  const redisMemoryChartData = {
    labels: redisHistory.labels,
    datasets: [
      {
        label: 'Memory Usage (MB)',
        data: redisHistory.memoryData,
        borderColor: '#00365a',
        backgroundColor: 'rgba(0, 54, 90, 0.1)',
        fill: true,
      },
    ],
  };

  // custom options for small-value charts (show ticks 1..10)
  const computeYAxisOptions = (dataArray) => {
    // If no data, fallback to 1..10 range
    if (!dataArray || dataArray.length === 0) {
      return {
        scales: {
          yAxes: [
            {
              ticks: {
                beginAtZero: false,
                min: 1,
                max: 8,
                stepSize: 1,
                padding: 10,
              },
              gridLines: {
                display: true,
                lineWidth: 1,
                color: 'rgba(0,0,0,0.05)',
                drawBorder: false,
              },
            },
          ],
        },
      };
    }

    const maxVal = Math.max(...dataArray.map((v) => Number(v) || 0));
    const minVal = Math.min(...dataArray.map((v) => Number(v) || 0));

    // For very small values prefer a 1..10 fixed range for readability
    if (maxVal <= 10) {
      return {
        ...chartAnimation,
        scales: {
          yAxes: [
            {
              ticks: {
                beginAtZero: false,
                min: 1,
                max: 8,
                stepSize: 1,
                padding: 10,
              },
              gridLines: {
                display: true,
                lineWidth: 1,
                color: 'rgba(0,0,0,0.05)',
                drawBorder: false,
              },
            },
          ],
        },
      };
    }

    // For larger values compute a sensible max and step size
    const max = Math.ceil(maxVal);
    const min = Math.floor(Math.min(minVal, 0));
    // choose around 5 ticks
    const stepSize = Math.ceil((max - min) / 5) || 1;

    return {
      ...chartAnimation,
      scales: {
        yAxes: [
          {
            ticks: { beginAtZero: false, min, max, stepSize, padding: 10 },
            gridLines: {
              display: true,
              lineWidth: 1,
              color: 'rgba(0,0,0,0.05)',
              drawBorder: false,
            },
          },
        ],
      },
    };
  };

  const redisOpsChartData = {
    labels: redisHistory.labels,
    datasets: [
      {
        label: 'Operations / sec',
        data: redisHistory.opsData,
        borderColor: '#6f42c1',
        backgroundColor: 'rgba(111, 66, 193, 0.1)',
        fill: true,
      },
    ],
  };

  const redisKeyspaceData = redisStats
    ? {
        labels: ['Expiring Keys', 'Non-Expiring Keys'],
        datasets: [
          {
            data: [
              redisStats.keyspace.expiringKeys,
              redisStats.keyspace.nonExpiringKeys,
            ],
            backgroundColor: ['#00365a', '#6f42c1'],
            borderColor: ['#00365a', '#6f42c1'],
          },
        ],
      }
    : null;

  const serverCpuChartData = {
    labels: serverHistory.labels,
    datasets: [
      {
        label: 'CPU Usage (%)',
        data: serverHistory.cpuData,
        borderColor: '#dc3545',
        backgroundColor: 'rgba(220, 53, 69, 0.1)',
        fill: true,
      },
    ],
  };

  const serverMemoryChartData = {
    labels: serverHistory.labels,
    datasets: [
      {
        label: 'Memory Usage (GB)',
        data: serverHistory.memoryData,
        borderColor: '#28a745',
        backgroundColor: 'rgba(40, 167, 69, 0.1)',
        fill: true,
      },
    ],
  };

  return (
    <>
      <Row className="dashboard-header mb-4">
        <Col lg="12">
          <div className="header-grid mt-3">
            <div className="header-title">
              <h2>System Analytics</h2>
              <p className="muted">Real-time Redis & Server monitoring</p>
            </div>
            <div className="header-cards">
              <div className="summary-card">
                <div>Redis Memory</div>
                <div>{redisStats?.used_memory_human || '—'}</div>
              </div>
              <div className="summary-card">
                <div>Ops / sec</div>
                <div>{redisStats?.instantaneous_ops_per_sec || '—'}</div>
              </div>
              <div className="summary-card">
                <div>Connected Clients</div>
                <div>{redisStats?.connected_clients || '—'}</div>
              </div>
              <div className="summary-card">
                <div>CPU</div>
                <div>{serverStats?.cpu || '—'}</div>
              </div>
              <div className="summary-card">
                <div>Server Memory</div>
                <div>{serverStats?.memory?.used || '—'}</div>
              </div>
            </div>
          </div>
        </Col>
      </Row>

      {/* Redis Statistics */}
      <Row>
        <Col lg="12">
          <Card className="mb-4">
            <CardBody>
              <h4>Redis Statistics</h4>
              <Row>
                <Col lg="3" md="6" className="mb-4">
                  <div className="metric-card">
                    <h6>Connected Clients</h6>
                    <h3>{redisStats?.connected_clients || 0}</h3>
                  </div>
                </Col>
                <Col lg="3" md="6" className="mb-4">
                  <div className="metric-card">
                    <h6>Operations / sec</h6>
                    <h3>{redisStats?.instantaneous_ops_per_sec || 0}</h3>
                  </div>
                </Col>
                <Col lg="3" md="6" className="mb-4">
                  <div className="metric-card">
                    <h6>Memory Usage</h6>
                    <h3>{redisStats?.used_memory_human || '0'}</h3>
                  </div>
                </Col>
                <Col lg="3" md="6" className="mb-4">
                  <div className="metric-card">
                    <h6>Uptime</h6>
                    <h3>{redisStats?.uptime_in_days || 0} days</h3>
                  </div>
                </Col>
              </Row>
              <Row>
                <Col lg="8">
                  <div className="chart-container">
                    <h5>Memory Usage Trend</h5>
                    <LineChart
                      data={redisMemoryChartData}
                      options={computeYAxisOptions(redisHistory.memoryData)}
                    />
                  </div>
                  <div className="chart-container mt-5">
                    <h5>Operations</h5>
                    <LineChart
                      data={redisOpsChartData}
                      options={computeYAxisOptions(redisHistory.opsData)}
                    />
                  </div>
                </Col>
                <Col lg="4">
                  <div className="chart-container">
                    <h5>Keyspace Distribution</h5>
                    {redisKeyspaceData && (
                      <DoughnutChart data={redisKeyspaceData} />
                    )}
                  </div>
                </Col>
              </Row>
            </CardBody>
          </Card>
        </Col>
      </Row>

      {/* Server Statistics */}
      <Row>
        <Col lg="12">
          <Card className="mb-4">
            <CardBody>
              <h4>Server Statistics</h4>
              <Row>
                <Col lg="3" md="6" className="mb-4">
                  <div className="metric-card">
                    <h6>CPU Usage</h6>
                    <h3>{serverStats?.cpu || '0%'}</h3>
                  </div>
                </Col>
                <Col lg="3" md="6" className="mb-4">
                  <div className="metric-card">
                    <h6>Memory Used / Total Memory</h6>
                    <h3>
                      {serverStats?.memory?.used || '0 GB'} /{' '}
                      {serverStats?.memory?.total || '0 GB'}
                    </h3>
                  </div>
                </Col>
                <Col lg="3" md="6" className="mb-4">
                  <div className="metric-card">
                    <h6>Network (RX/TX)</h6>
                    <h3>
                      {serverStats?.network?.[0]?.rx_sec || '0'} /{' '}
                      {serverStats?.network?.[0]?.tx_sec || '0'}
                    </h3>
                  </div>
                </Col>
                <Col lg="3" md="6" className="mb-4">
                  <div className="metric-card">
                    <h6>Uptime</h6>
                    <h3>{serverStats?.uptime}</h3>
                  </div>
                </Col>
              </Row>
              <Row>
                <Col lg="6">
                  <div className="chart-container">
                    <h5>CPU Usage Trend</h5>
                    <LineChart
                      data={serverCpuChartData}
                      options={computeYAxisOptions(serverHistory.cpuData)}
                    />
                  </div>
                </Col>
                <Col lg="6">
                  <div className="chart-container">
                    <h5>Memory Usage Trend (GB)</h5>
                    <LineChart
                      data={serverMemoryChartData}
                      options={computeYAxisOptions(serverHistory.memoryData)}
                    />
                  </div>
                </Col>
              </Row>
              <Row className="mt-5">
                <Col lg="12">
                  <h5>Process Status</h5>
                  <div className="process-status">
                    <div className="status-item">
                      <span className="label">Total:</span>
                      <span className="value">
                        {serverStats?.processes?.all || 0}
                      </span>
                    </div>
                    <div className="status-item">
                      <span className="label">Running:</span>
                      <span className="value">
                        {serverStats?.processes?.running || 0}
                      </span>
                    </div>
                    <div className="status-item">
                      <span className="label">Sleeping:</span>
                      <span className="value">
                        {serverStats?.processes?.sleeping || 0}
                      </span>
                    </div>
                    <div className="status-item">
                      <span className="label">Blocked:</span>
                      <span className="value">
                        {serverStats?.processes?.blocked || 0}
                      </span>
                    </div>
                  </div>
                </Col>
              </Row>
            </CardBody>
          </Card>
        </Col>
      </Row>

      <style>{`
        .metric-card {
          padding: 1rem;
          background: #f8f9fa;
          border-radius: 8px;
          text-align: center;
        }
        .metric-card h6 {
          color: #6c757d;
          margin-bottom: 0.5rem;
        }
        .metric-card h3 {
          margin: 0;
          color: #212529;
        }
        .chart-container {
          margin-bottom: 1rem;
        }
        .process-status {
          display: flex;
          gap: 2rem;
          background: #f8f9fa;
          padding: 1rem;
          border-radius: 8px;
        }
        /* Dashboard header styles */
        .dashboard-header .header-grid {
          display: flex;
          justify-content: space-between;
          align-items: center;
          gap: 1rem;
          flex-wrap: wrap;
        }
        .header-title h2 {
          margin: 0 0 0.2rem 0;
          font-weight: 700;
        }
        .header-title .muted {
          margin: 0;
          color: #6c757d;
        }
        .header-cards {
          display: flex;
          gap: 0.75rem;
          align-items: center;
        }
        .summary-card {
          min-width: 110px;
          padding: 0.6rem 0.9rem;
          border-radius: 10px;
          background: linear-gradient(135deg, rgba(255,255,255,0.02), rgba(0,123,255,0.06));
          box-shadow: 0 6px 18px rgba(15, 23, 42, 0.06);
          text-align: center;
        }
        .summary-card .s-label {
          font-size: 12px;
          color: #6c757d;
        }
        .summary-card .s-value {
          font-size: 16px;
          font-weight: 700;
          margin-top: 4px;
          color: #212529;
          transition: transform 0.35s ease, opacity 0.35s ease;
        }
        .status-item {
          display: flex;
          align-items: center;
          gap: 0.5rem;
        }
        .status-item .label {
          color: #6c757d;
        }
        .status-item .value {
          font-weight: bold;
          color: #212529;
        }
      `}</style>
    </>
  );
};

export default SystemMemory;
