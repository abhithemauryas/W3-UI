/* eslint-disable no-unused-vars */
/* eslint-disable prefer-rest-params */
import { Chart } from 'chart.js';
import { ThemeColors } from 'helpers/ThemeColors';
import { useEffect, useRef, useState } from 'react';

const chartTooltip = {
  backgroundColor: ThemeColors().foregroundColor,
  titleFontColor: ThemeColors().primaryColor,
  borderColor: ThemeColors().separatorColor,
  borderWidth: 0.5,
  bodyFontColor: ThemeColors().primaryColor,
  bodySpacing: 10,
  xPadding: 15,
  yPadding: 15,
  cornerRadius: 0.15,
};

const doughnutChartOptions = {
  legend: {
    position: 'right',
    labels: {
      padding: 20,
      usePointStyle: true,
      fontSize: 12,
    },
    onClick: () => {},
  },
  responsive: true,
  maintainAspectRatio: false,

  cutoutPercentage: 85,
  layout: {
    padding: {
      bottom: 20,
    },
  },
  tooltips: chartTooltip,
  onClick: (e) => {
    return false;
  },
};

const centerTextPlugin = {
  afterDatasetsUpdate() {},
  beforeDraw(chart) {
    const width = chart.chartArea.right;
    const height = chart.chartArea.bottom + 20;
    const { ctx } = chart.chart;
    ctx.restore();

    let activeLabel = chart.data.labels[0];
    let activeValue = chart.data.datasets[0].data[0];

    if (chart.pointAvailable) {
      activeLabel = chart.data.labels[chart.pointIndex];
      activeValue =
        chart.data.datasets[chart.pointDataIndex].data[chart.pointIndex];
    }

    ctx.font = '36px Nunito, sans-serif';
    ctx.fillStyle = ThemeColors().primaryColor;
    ctx.textBaseline = 'middle';

    const text = `${activeValue}`;
    const textX = Math.round((width - ctx.measureText(text).width) / 2);
    const textY = height / 2;
    ctx.fillText(text, textX, textY);

    ctx.font = '14px Nunito, sans-serif';
    ctx.textBaseline = 'middle';

    const text2 = activeLabel;
    const textX2 = Math.round((width - ctx.measureText(text2).width) / 2);
    const textY2 = height / 2 - 30;
    ctx.fillText(text2, textX2, textY2);

    ctx.save();
  },
  // eslint-disable-next-line no-unused-vars
  beforeEvent(chart, event, options) {
    const firstPoint = chart.getElementAtEvent(event)[0];

    if (firstPoint) {
      // eslint-disable-next-line no-underscore-dangle,no-param-reassign
      chart.pointIndex = firstPoint._index;
      // eslint-disable-next-line no-underscore-dangle,no-param-reassign
      chart.pointDataIndex = firstPoint._datasetIndex;
      // eslint-disable-next-line no-param-reassign
      chart.pointAvailable = true;
    }
  },
};

const Doughnut = ({ data, shadow = false }) => {
  const chartContainer = useRef(null);
  const [, setChartInstance] = useState(null);

  useEffect(() => {
    if (chartContainer && chartContainer.current) {
      if (shadow) {
        Chart.defaults.doughnutWithShadow = Chart.defaults.doughnut;
        Chart.controllers.doughnutWithShadow =
          Chart.controllers.doughnut.extend({
            draw(ease) {
              Chart.controllers.doughnut.prototype.draw.call(this, ease);
              const {
                chart: { ctx },
              } = this;
              ctx.save();
              ctx.shadowColor = 'rgba(0,0,0,0.15)';
              ctx.shadowBlur = 10;
              ctx.shadowOffsetX = 0;
              ctx.shadowOffsetY = 10;
              ctx.responsive = true;

              Chart.controllers.doughnut.prototype.draw.apply(this, arguments);
              ctx.restore();
            },
          });
      }
      const context = chartContainer.current.getContext('2d');
      const newChartInstance = new Chart(context, {
        type: shadow ? 'doughnutWithShadow' : 'doughnut',
        options: doughnutChartOptions,
        plugins: [centerTextPlugin],
        data,
      });

      setChartInstance(newChartInstance);
    }
  }, []);

  return <canvas ref={chartContainer} />;
};

export default Doughnut;
