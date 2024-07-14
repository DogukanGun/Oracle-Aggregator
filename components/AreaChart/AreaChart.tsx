import { Chart } from '@/components/Charts';
import { shrinkNumber } from '@/helpers';
import { useTheme } from '@/hooks/theme';
import { ChartContainerProps } from '@/types/Components/Chart';
import { Options, Point, SeriesEventsOptionsObject } from 'highcharts';
import moment from 'moment';
import React from 'react';
type SeriesP = {
  values: number[];
  name: string;
  color?: string;
  minPointLength?: number;
};

type P = {
  containerProps?: ChartContainerProps;
  chartOptions?: Options;
  type?: 'areaspline' | 'line';
  timestamps: number[] | string[];
  data: SeriesP[];
  xAxisHidden?: boolean;
  yAxisHidden?: boolean;
};

const AreaChart: React.FC<P> = ({
  containerProps,
  chartOptions,
  type = 'areaspline',
  timestamps,
  data,
  xAxisHidden = false,
  yAxisHidden = false,
}) => {
  const { palette } = useTheme();
  const textColor = palette?.typography?.DEFAULT;
  const hideGrid = {
    gridLineWidth: 0, // Hide grid lines
    visible: false,
  };
  const xHiddenProps = xAxisHidden ? hideGrid : {};
  const yHiddenProps = yAxisHidden ? hideGrid : {};
  const events: () => SeriesEventsOptionsObject = () => {
    return {
      mouseOver: function () {
        if (type === 'line') {
          const value = this;
          value.update({
            type: 'areaspline',
            fillOpacity: 0.5,
          });
        }
      },
      mouseOut: function () {
        if (type === 'line') {
          const value = this;
          value.update({
            type: 'areaspline',
            fillOpacity: 0,
          });
        }
      },
    };
  };
  const options: Options = {
    yAxis: {
      min: 0,
      title: { style: { display: 'none' } },
      gridLineColor: type === 'line' ? `${textColor}12` : textColor,
      labels: {
        style: { color: textColor },
        formatter: (e) => {
          const numericValue = Number(e?.value);
          return shrinkNumber(numericValue) as string;
        },
      },
      ...yHiddenProps,
    },
    legend: { enabled: false },
    xAxis: {
      categories:
        timestamps?.map((t) => moment(new Date(t)).format('D MMM')) ?? [],
      labels: { style: { color: textColor } },
      ...xHiddenProps,
    },
    plotOptions: {
      series: {
        pointPlacement: 'on',
        events: events(),
      },
      areaspline: {
        fillOpacity: 0.5,
      },
    },
    series:
      data?.map((d) => {
        const { name, values, ...rest } = d;
        return {
          type: 'areaspline',
          fillOpacity: type === 'line' ? 0 : 0.5,
          name: name,
          data: values ?? [],
          tooltip: {
            pointFormatter: function (this: Point) {
              const point = this;
              return `<b>${name}: ${shrinkNumber(point.y ?? 0, 2)}</b>`;
            },
          },
          marker: {
            enabled: false, // Disable markers
            states: {
              hover: {
                enabled: true, // Enable markers on hover
                radius: 3, // set marker dot size
              },
            },
          },
          ...rest,
        };
      }) ?? [],
    ...chartOptions,
  };
  return (
    <Chart
      options={options}
      containerProps={containerProps ?? { style: { height: '250px' } }}
    />
  );
};

export default AreaChart;
