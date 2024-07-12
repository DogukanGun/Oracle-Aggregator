import { HTMLProps, useMemo } from 'react';
import { PaginationPropsType } from '@/types/Components/Pagination';
import Icon from '../Icon';
import {
  faChevronRight,
  faChevronsRight,
  faChevronLeft,
  faChevronsLeft,
  IconDefinition,
} from '@fortawesome/pro-regular-svg-icons';
import lodash from 'lodash';
import Surface from '../Surface';
import Stack from '../Stack';

/** Renders a pagination component */
export default function Pagination({
  page,
  total,
  perPage,
  onPageChange,
  loading,
}: Readonly<PaginationPropsType>) {
  /** Max allowed page */
  const maxPage = useMemo(() => {
    return Math.floor(total / perPage + 1);
  }, [perPage, total]);

  /** If current page is first page or last page */
  const [isFirstPage, isLastPage] = useMemo(() => {
    let [f, l] = [false, false];
    if (page === 1) f = true;
    if (page === maxPage - 1) l = true;
    return [f, l];
  }, [page, maxPage]);

  /** The starting and ending values of pagination, along with booleans
    specifying if pages are skipped at start/end */
  const [countStart, countEnd, startSkip, endSkip] = useMemo(() => {
    // Start and end values, start with lower and higher limits
    let [s, e] = [1, maxPage];
    /** Pages allowed after the current page */
    let maxBefore = 2;
    /** Pages available before current page */
    const avlBefore = page - 1;
    /** Pages allowed before the current page */
    let maxAfter = 9;
    /** Pages available after current page */
    const avlAfter = maxPage - page;

    // If pages are available before current, cut maxAfter
    if (avlBefore > 0) {
      maxAfter -= avlBefore > 2 ? 2 : avlBefore;
    }

    // If pages avl after are less than max, add remaining room to maxBefore
    if (avlAfter < maxAfter) {
      maxBefore += maxAfter - avlAfter;
    }

    // If max page is too far, use maxAfter as end
    if (maxPage > page + maxAfter) {
      e = page + maxAfter;
    }

    // If pages are available before current page, start from the first page
    if (page > maxBefore) {
      s = page - maxBefore;
    }

    return [s, e, s !== 1, e !== maxPage];
  }, [page, maxPage]);

  /** Goes to previous page */
  const prevPage = () => {
    if (page > 1) onPageChange(page - 1);
  };
  /** Goes to first page */
  const firstPage = () => onPageChange(1);
  /** Goes to next page */
  const nextPage = () => {
    if (page < maxPage - 1) onPageChange(page + 1);
  };
  /** Goes to last page */
  const lastPage = () => onPageChange(maxPage - 1);

  return (
    <div className="flex">
      <Surface className={`${loading ? 'animate-pulse' : ''}`}>
        <Stack isRow spacing={2} className="items-center">
          <IconItem
            onClick={firstPage}
            icon={faChevronsLeft}
            disabled={isFirstPage || loading}
          />
          <IconItem
            onClick={prevPage}
            icon={faChevronLeft}
            disabled={isFirstPage || loading}
          />
          <Stack isRow spacing={0.5}>
            {startSkip && <Item text="..." />}
            {lodash.range(countStart, countEnd).map((i) => (
              <Item
                key={i}
                onClick={!loading ? () => onPageChange(i) : undefined}
                text={i.toString()}
                active={i === page}
              />
            ))}
            {endSkip && <Item text="..." />}
          </Stack>
          <IconItem
            onClick={nextPage}
            icon={faChevronRight}
            disabled={isLastPage || loading}
          />
          <IconItem
            onClick={lastPage}
            icon={faChevronsRight}
            disabled={isLastPage || loading}
          />
        </Stack>
      </Surface>
    </div>
  );
}

/** Pagination Item component */
const Item = ({
  onClick,
  text,
  active,
}: HTMLProps<HTMLButtonElement> & {
  /** Text for item */
  text: string;
  /** If the item is active */
  active?: boolean;
}) => {
  const activeClickableClasses = onClick
    ? 'hover:bg-surface-muted dark:hover:bg-surfaceDark-muted'
    : '';
  const clickableClasses = onClick
    ? 'cursor-pointer hover:text-typography dark:hover:text-typographyDark hover:bg-surface dark:hover:bg-surfaceDark'
    : 'cursor-default';
  return (
    <button
      className={`flex items-center justify-center w-10 h-10 rounded-xxl ${clickableClasses} ${
        active
          ? '!bg-surface-dark dark:!bg-surfaceDark text-typography dark:text-typographyDark font-bold'
          : `text-surface-muted dark:text-primary-muted ${activeClickableClasses}`
      }`}
      onClick={onClick}
    >
      {text}
    </button>
  );
};

/** Pagination Icons component */
const IconItem = ({
  onClick,
  icon,
  disabled,
}: HTMLProps<HTMLButtonElement> & {
  /** Icon for item */
  icon: IconDefinition;
  /** If the item is disabled */
  disabled?: boolean;
}) => (
  <button
    className={`rounded-xxl ${
      !disabled
        ? 'cursor-pointer text-primary dark:text-primaryDark'
        : 'cursor-default text-surface-dark dark:text-surfaceDark-muted'
    }`}
    onClick={disabled ? undefined : onClick}
  >
    <Icon icon={icon} size={'md'} />
  </button>
);
