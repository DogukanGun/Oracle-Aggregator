import { useTheme } from '@/hooks/theme';
import {
  DataTableColumnType,
  DataTablePropsType,
  DataTableRowBaseType,
  RowDataPropsType,
} from '@/types/Components/DataTable';
import React, { useContext, useEffect, useMemo, useState } from 'react';
import { useWindowSize } from 'usehooks-ts';
import DataTable from '../DataTable';
import Stack from '../Stack';
import Card, { CardPropsType } from '../Card';
import Typography from '../Typography';
import Divider from '../Divider';
import Icon from '../Icon';
import { faChevronDown } from '@fortawesome/pro-regular-svg-icons';
import { cloneDeep, once } from 'lodash';

/** Classes for selected row */
const selectedRowClasses =
  'bg-surface-dark dark:bg-surfaceDark-dark text-typography dark:text-typographyDark rounded-sm';

type ContextType<T extends DataTableRowBaseType> = Pick<
  DataTableDetailFlowPropsType<T>,
  'rowChildContainerCardProps' | 'rowChild'
> & {
  /** Index of the row currently selected */
  selectedRow: string | null;
};

const createPropsContext = once(<T extends DataTableRowBaseType>() =>
  React.createContext({} as ContextType<T>),
);

export const usePropsContext = <T extends DataTableRowBaseType>() =>
  useContext(createPropsContext<T>());

export type DataTableDetailFlowPropsType<T extends DataTableRowBaseType> =
  DataTablePropsType<T> &
    Required<Pick<DataTablePropsType<T>, 'rowChild'>> & {
      /** Forces accordion based layout on large devices */
      forceAccordion?: boolean;
      /** Props for the rowChild container Card */
      rowChildContainerCardProps?: CardPropsType;
    };

/** Shows a table with selectable elements to load detail */
export default function DataTableDetailFlow<T extends DataTableRowBaseType>({
  rowChild,
  onRowClick,
  rowStyle,
  data: inData,
  cols,
  forceAccordion,
  rowChildContainerCardProps: containerProps,
  ...props
}: DataTableDetailFlowPropsType<T>) {
  const { screens } = useTheme();
  const screen = useWindowSize();
  const [selectedRow, setSelectedRow] = useState<string | null>(null);
  /** If the screen width is small or accordion layout is forced */
  const [isSmall, setIsSmall] = useState(!!forceAccordion);

  const PropsContext = createPropsContext<T>();

  /** Input data updated with IDs */
  const data = useMemo(() => {
    return inData?.map((d, i) => ({ ...d, id: d.id ?? i.toString() }));
  }, [inData]);

  /** Update isSmall if screen size changes */
  useEffect(() => {
    const small = screen.width < screens.lg;
    setIsSmall((isSmall) => {
      if (forceAccordion) return true;
      if (!isSmall && small) return true;
      else if (isSmall && !small) return false;
      return isSmall;
    });
  }, [screen.width, screens.lg, forceAccordion]);

  // Reset selected row whenever data updates
  useEffect(() => {
    setSelectedRow(null);
  }, [data]);

  /** Cols adjusted to add accordion icon for small layouts */
  const adjustedCols = useMemo(() => {
    /** Transformed columns */
    let outCols: DataTableColumnType<T>[] = cloneDeep(cols);
    if (isSmall) {
      /** Column for Accordion icon */
      const iconCol: DataTableColumnType<T> = {
        title: '',
        cell: Cell,
        cellStyle: () => 'w-4',
      };
      /** Transformed columns */
      outCols = [iconCol, ...cols];
    } else {
      // Adjust text style for large layout
      outCols[0].cellStyle = (r, i) => {
        const classes = [];
        if (cols[0].cellStyle) classes.push(cols[0].cellStyle(r, i));
        if (r.id === selectedRow) classes.push('font-medium');
        return classes.join(' ');
      };
    }
    return outCols;
  }, [cols, selectedRow, isSmall]);

  const contextValue = useMemo(
    () => ({
      selectedRow,
      rowChild,
      rowChildContainerCardProps: containerProps,
    }),
    [selectedRow, rowChild, containerProps],
  );

  return (
    <PropsContext.Provider value={contextValue}>
      <Stack isRow spacing={2}>
        <div className={isSmall ? 'w-full' : 'w-1/2'}>
          <DataTable
            {...props}
            data={data}
            cols={adjustedCols}
            onRowClick={(r, i) => {
              if (selectedRow === r.id) setSelectedRow(null);
              else setSelectedRow(r.id!);
              onRowClick?.(r, i);
            }}
            rowStyle={(r, i) => {
              const classes = [];
              if (rowStyle) classes.push(rowStyle(r, i));
              const isSelected = r.id === selectedRow && !isSmall;
              if (isSelected) classes.push(selectedRowClasses);
              return classes.join(' ');
            }}
            rowChild={isSmall && selectedRow !== null ? RowChild : undefined}
          />
        </div>
        {isSmall ? (
          <></>
        ) : (
          <RowChildCard
            {...{
              rowChild,
              rowChildContainerCardProps: {
                ...containerProps,
                className: ['p-0 w-1/2', containerProps?.className ?? ''].join(
                  ' ',
                ),
              },
              selectedRow,
              data,
            }}
          />
        )}
      </Stack>
    </PropsContext.Provider>
  );
}

/** Handles rendering cell as accordion */
const Cell = <T extends DataTableRowBaseType>({
  row,
  index,
}: RowDataPropsType<T>) => {
  return <SmallCellAccordion row={row} index={index} />;
};

/** Handles rowChild prop */
const RowChild = <T extends DataTableRowBaseType>({
  row,
  index,
}: RowDataPropsType<T>) => {
  const {
    selectedRow,
    rowChildContainerCardProps: containerProps,
    rowChild,
  } = usePropsContext();

  return row.id === selectedRow ? (
    <SmallRowChildCard
      children={rowChild({ row, index })}
      props={containerProps}
    />
  ) : undefined;
};

const SmallCellAccordion = <T extends DataTableRowBaseType>({
  row,
}: RowDataPropsType<T>) => {
  const { selectedRow } = usePropsContext();

  return (
    <Icon
      icon={faChevronDown}
      className={row.id === selectedRow ? 'rotate-180' : 'rotate-0'}
    />
  );
};

type SmallRowChildCardPropsType = {
  children: React.ReactNode;
  props?: CardPropsType;
};

const SmallRowChildCard = ({ children, props }: SmallRowChildCardPropsType) => (
  <Card elevation={1} {...props}>
    {children}
  </Card>
);

type RowChildCardPropsType<T extends DataTableRowBaseType> = Pick<
  DataTableDetailFlowPropsType<T>,
  'data' | 'rowChild' | 'rowChildContainerCardProps'
> & { selectedRow: string | null };

const RowChildCard = <T extends DataTableRowBaseType>({
  rowChild,
  data,
  selectedRow,
  rowChildContainerCardProps: props,
}: RowChildCardPropsType<T>) => {
  const selectedIndex = data ? data.findIndex((d) => d.id === selectedRow) : -1;
  return (
    <Card elevation={1} {...props}>
      <Stack>
        <div className="my-2 mx-4">
          <Typography variant="subtitle2" text="Description" />
        </div>
        <div className="w-full">
          <Divider />
        </div>
        <div className="m-6 mt-4">
          {selectedIndex > -1 && data ? (
            rowChild({ row: data[selectedIndex], index: selectedIndex })
          ) : (
            <Typography text="Select a row to view detail." />
          )}
        </div>
      </Stack>
    </Card>
  );
};
