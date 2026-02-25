/* eslint-disable prefer-rest-params */
import React, { useEffect, useRef, useState } from 'react';
import { Chart } from 'chart.js';

import { lineChartOptions } from './config';

const Line = ({ data, shadow = false, options }) => {
  const chartContainer = useRef(null);
  const [, setChartInstance] = useState(null);

  useEffect(() => {
    if (chartContainer && chartContainer.current) {
      if (shadow) {
        Chart.controllers.lineWithShadow = Chart.controllers.line;
        Chart.controllers.lineWithShadow = Chart.controllers.line.extend({
          draw(ease) {
            Chart.controllers.line.prototype.draw.call(this, ease);
            const {
              chart: { ctx },
            } = this;
            ctx.save();
            ctx.shadowColor = 'rgba(0,0,0,0.15)';
            ctx.shadowBlur = 10;
            ctx.shadowOffsetX = 0;
            ctx.shadowOffsetY = 10;
            ctx.responsive = true;
            ctx.stroke();
            Chart.controllers.line.prototype.draw.apply(this, arguments);
            ctx.restore();
          },
        });
      }
      const context = chartContainer.current.getContext('2d');
      // merge provided options with defaults (shallow for top-level, merge scales)
      const chartOptions = options
        ? {
            ...lineChartOptions,
            ...options,
            scales: {
              ...lineChartOptions.scales,
              ...(options.scales || {}),
            },
          }
        : lineChartOptions;

      const newChartInstance = new Chart(context, {
        type: shadow ? 'lineWithShadow' : 'line',
        options: chartOptions,
        data,
      });
      setChartInstance(newChartInstance);
    }
  }, [chartContainer, data, shadow]);

  return <canvas ref={chartContainer} />;
};

export default Line;
