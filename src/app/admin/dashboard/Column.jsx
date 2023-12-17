import React from 'react';
import { Column } from '@ant-design/charts';

const ColumnChart = ({ data }) => {
  const config = {
    data,
    xField: 'date', // Date field on the x-axis
    yField: 'sales', // Sales field on the y-axis
    xAxis: {
      type: 'timeCat', // Specify that the x-axis represents time categories (dates)
    },
    yAxis: {
      title: {
        text: 'Sales',
      },
    },
    label: {
      style: {
        fill: '#FFFFFF',
        opacity: 0.6,
      },
    },
    meta: {
      date: {
        alias: 'Date', // Label for the x-axis
      },
      sales: {
        alias: 'Sales', // Label for the y-axis
      },
    },
  };

  return <Column {...config} />;
};

export default ColumnChart;
