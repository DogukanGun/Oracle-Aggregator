import { Chart as HighchartsChart, Options } from 'highcharts';
import HighchartsMore from 'highcharts/highcharts-more';
import React, { useEffect, useId, useMemo, useRef } from 'react';
import { ChartProps } from '@/types/Components/Chart';
import { AppTheme } from '@/theme';
import { useTheme } from '@/hooks/theme';
import {
  generateAxisOptions,
  generatePlotOptions,
  generateLegend,
  generateTooltip,
  generateSeries,
} from './helpers';
import { getServerSafeDocument } from '@/helpers/ssr';

/** Basic chart component implemented over highchart
 * @param props configuration for the chart
 */
export function Chart({
  options: inOptions,
  useMore,
  callback,
  containerProps,
}: Readonly<ChartProps>) {
  const { palette } = useTheme();
  const id = useId();
  const chartRef = useRef<HighchartsChart>();
  const document = getServerSafeDocument();

  // Generate default options and adjust for user input
  const options = useMemo(() => {
    const renderTo = id;
    const opts = inOptions ?? ({} as Options);

    const axisOptions = generateAxisOptions(palette, opts);
    const plotOptions = generatePlotOptions(palette, opts);
    const legend = generateLegend(palette, opts);
    const tooltip = generateTooltip(palette, opts);
    const series = generateSeries(palette, opts);

    const finalOptions = {
      ...opts,
      plotOptions,
      legend,
      tooltip,
      series,
      credits: {
        enabled: false,
      },
      chart: {
        backgroundColor: '#0000',
        plotBorderColor: palette.typography.muted,
        ...opts.chart,
        renderTo,
      },
      colors: opts.colors ?? [palette.accent.DEFAULT],
      title: {
        ...opts.title,
        style: {
          display: 'none',
          color: palette.accent.DEFAULT,
          fontFamily: AppTheme.fontFamily.sans[0],
          ...opts.title?.style,
        },
      },
      xAxis: axisOptions[0],
      yAxis: axisOptions[1],
      zAxis: opts.zAxis ? axisOptions[2] : undefined,
    };
    return finalOptions;
  }, [inOptions, palette, id]);

  // Render chart when options are ready
  useEffect(() => {
    if (!options || !document) return;
    // Dynamically load highcharts package
    (async () => {
      const Highcharts = await import('highcharts');
      // Attach highcharts/highcharts-more if specified
      if (useMore) HighchartsMore(Highcharts);
      // Render chart
      chartRef.current = Highcharts.chart(options, callback);
    })();
    return () => {
      // Attempt to destroy chart
      try {
        chartRef.current?.destroy();
      } catch (e) {
        console.error(e)
      }
    };
  }, [options, useMore, callback, document]);

  return <div {...containerProps} id={id} />;
}
