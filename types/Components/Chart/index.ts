import { ChartCallbackFunction, ChartOptions, Options } from 'highcharts';
import { HTMLProps } from 'react';

/** Props for the chart container */
export type ChartContainerProps = HTMLProps<HTMLDivElement>;

/** Props for Chart component */
export type ChartProps = {
  /** Highchart Options for modification*/
  options?: Options & { chart?: Omit<ChartOptions, 'renderTo'> };
  /** Props to pass to Box container the chart is rendered in */
  containerProps?: ChartContainerProps;
  /** Adds support for more types of charts using HighchartsMore */
  useMore?: boolean;
  /** Callback for chart constructors.
   * @param chart — Created chart.
   */
  callback?: ChartCallbackFunction;
};

/** Param type for Chart component */
export type GraphApiChartParam<T = any> = {
  /** Name of the parameter to show in chart*/
  name?: string;
  /** Key used to access parameter's value e.g. ["scores", "dev", "pUid"] */
  key: keyof T;
};

/** Props for GraphApiChart component */
export type GraphApiChartProps<T = any> = ChartProps & {
  /** The graph endpoint to fetch data from */
  endpoint: string;
  /** List of parameters in response */
  params: GraphApiChartParam<T>[];
};
