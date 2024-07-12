import { Options } from 'highcharts';
import React, { useMemo } from 'react';
import { ChartProps } from '@/types/Components/Chart';
import { Chart } from './Chart';

/** Implementation over Chart with xAxis set to datetime type */
export function TimeChart(props: Readonly<ChartProps>) {
  // Force set xAxis type to datetime in given options
  const options = useMemo(() => {
    const options: Options = {
      ...props.options,
      xAxis: {
        ...props.options?.xAxis,
        type: 'datetime',
      },
    };
    return options;
  }, [props]);
  return <Chart {...props} options={options} />;
}
