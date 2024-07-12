import { shrinkNumber } from '@/helpers';
import { AppThemeColorsType } from '@/theme';
import {
  LegendOptions,
  Options,
  PlotOptions,
  SeriesOptionsType,
  TooltipOptions,
} from 'highcharts';

type UsedChartsType = 'bar' | 'column' | 'line' | 'pie' | 'area' | 'bubble';

type XAxisType = Highcharts.XAxisOptions | Highcharts.XAxisOptions[];
type YAxisType = Highcharts.YAxisOptions | Highcharts.YAxisOptions[];
type ZAxisType =
  | Highcharts.ZAxisOptions
  | Highcharts.ZAxisOptions[]
  | undefined;
type AxisType =
  | Highcharts.XAxisOptions
  | Highcharts.YAxisOptions
  | Highcharts.ZAxisOptions;
type AxisOptionsType = [XAxisType, YAxisType, ZAxisType];

type GeneratorType<T> = (palette: AppThemeColorsType, options: Options) => T;

/** Generates plot options for Chart component */
export const generatePlotOptions: GeneratorType<PlotOptions> = (
  palette,
  options,
) => {
  // Plot options
  let plotOptions: PlotOptions = options.plotOptions ?? {};
  // Create set of types used in charts
  const types: Set<UsedChartsType> = new Set(
    [options.chart?.type, ...(options.series?.map((s) => s.type) ?? [])].filter(
      (e) => e,
    ) as UsedChartsType[],
  );
  // Adjust plot options for each type
  types.forEach((t) => {
    plotOptions[t] = plotOptions?.[t] ? plotOptions[t] : ({} as any);
    plotOptions[t]!.borderColor = palette.surface.light;
    // Adjust Pie label color
    if (t === 'pie') {
      //TODO Please check this line, not working
      /*plotOptions.pie = plotOptions.pie ?? ({} as any);
      plotOptions.pie!.dataLabels = plotOptions?.pie?.dataLabels ?? ({} as any);
      plotOptions.pie!.dataLabels!.style =
        plotOptions?.pie?.dataLabels?.style ??  ({} as any) ;
      plotOptions.pie!.dataLabels!.style!.textOutline = 'none';
      plotOptions.pie!.dataLabels!.style!.color = palette.typography.DEFAULT;*/
    }
  });
  return plotOptions;
};

/** Generates plot options for Chart component */
export const generateLegend: GeneratorType<LegendOptions> = (
  palette,
  options,
) => {
  const legend: LegendOptions = options.legend ?? {};
  legend.itemStyle = { color: palette.typography.DEFAULT, ...legend.itemStyle };
  legend.itemHoverStyle = {
    color: palette.primary.DEFAULT,
    ...legend.itemHoverStyle,
  };
  return legend;
};

/** Generates plot options for Chart component */
export const generateSeries: GeneratorType<SeriesOptionsType[]> = (
  palette,
  options,
) => {
  // Series options
  let series: SeriesOptionsType[] = options.series ?? [];
  // Set dataLabel color defaults
  //TODO Please check this line, not working
  /*series = series.map((s) => {
    const dataLabels =
      'dataLabels' in s
        ? {
            color: palette.accent.DEFAULT,
            ...s.dataLabels,
          }
        : undefined;
    return dataLabels
      ? {
          ...s,
          dataLabels,
        }
      : s;
  });*/

  return series;
};

/** Generates plot options for Chart component */
export const generateTooltip: GeneratorType<TooltipOptions> = (
  palette,
  options,
) => {
  const tooltip: TooltipOptions = options.tooltip ?? {};
  tooltip.backgroundColor = palette.surface.light;
  tooltip.style = {
    color: palette.primary.DEFAULT,
    borderRadius: 12,
  };
  return tooltip;
};

/** Generates plot options for Chart component */
export const generateAxisOptions: GeneratorType<AxisOptionsType> = (
  palette,
  options,
) => {
  // Axis Options configuration
  const axisOptions: AxisOptionsType = [
    options.xAxis ?? {},
    options.yAxis ?? {},
    options.zAxis ?? undefined,
  ];

  // Loop over all valid axis options
  axisOptions
    .filter((o) => o)
    .forEach((o, i) => {
      // Helper to set axis values
      const set = (o: AxisType) => {
        if ('lineColor' in o) o.lineColor = palette.typography.muted;
        o.gridLineColor = o.gridLineColor ?? palette.typography.muted;
        if (i === 1) {
          // Y Axis: Format labels and hide title
          o.labels = {
            formatter:
              o.type && ['linear', 'logarithmic'].includes(o.type)
                ? (v) => shrinkNumber(+v.value).toString()
                : (v) => v.value.toString(),
            ...o.labels,
          };
          o.title = {
            ...o.title,
            style: {
              display: 'none',
              ...o.title?.style,
            },
          };
        }
      };
      if (!o) return;
      // If multiple options are present for an axis, loop over them and set values
      if ('length' in o) o.forEach(set);
      else set(o);
    });

  return axisOptions;
};
