/** The minimum possible value from fetcher, used to indicate no value */
const NA_VAL = -9223372036854776000;
const NA_STRING = '-';
const NA_INT32 = -2147483648;
const A_INT = -9223372036854775808;
const NA_FLOAT = -9.223372036854776e18;
const NA_FLOAT32 = -9.223372036854776e18;
const INF_SYMBOL = 7777777.7777777;

/** If the given number is an invalid value */
const isInvalid = (number: number) =>
  [
    NA_VAL,
    NA_STRING,
    NA_INT32,
    A_INT,
    NA_FLOAT,
    NA_FLOAT32,
    undefined,
    null,
  ].includes(number);
/** If the given number is an infinity value */
const isInfinity = (number: number) => [INF_SYMBOL].includes(number);

/** If the given string is an invalid value */
const isInvalidString = (str: string) =>
  [NA_STRING, undefined, null, ''].includes(str);

/** Formats a number using Intl.NumberFormat method with USD params
 * @param number The number to format
 * @returns The given number formatted as USD currency
 *
 * @example
 * const num = 150000;
 * usdfy(num); // returns $150K (for US locale)
 */
export const usdfy = (number: number) => {
  if (isInvalid(number)) return 'N/A';
  if (isInfinity(number)) return '∞';
  return new Intl.NumberFormat('en-US', {
    style: 'currency',
    currency: 'USD',
    notation: 'compact',
    maximumFractionDigits: 2,
    minimumFractionDigits: 2,
  }).format(number);
};

type NotationType = 'standard' | 'scientific' | 'engineering' | 'compact';

/** Shrinks a number using Intl.NumberFormat method
 * @param number The number to format
 * @param notation The notation to format the number using
 * @param maximumFractionDigits The max decimal points
 * @param minimumFractionDigits The min decimal points
 * @returns The given number formatted using given parameters
 *
 * @example
 * const num = 150000;
 * formatNumber(num); // returns 150.00K (for US locale)
 */
export const formatNumber = (
  number: number,
  notation: NotationType = 'compact',
  maximumFractionDigits = 2,
  minimumFractionDigits = 2,
) =>
  new Intl.NumberFormat(navigator.language, {
    notation,
    maximumFractionDigits,
    minimumFractionDigits,
  }).format(number);

/** Shrinks a number using a customized version of Intl.NumberFormat method
 * @param number The number to convert
 * @param threshold The minimum number from which the formatting is applied. Any number below this and above or equal to 0 will not be formatted.
 * @returns The given number formatted into a scientific or locale string.
 *
 * @example
 * const num = 150000;
 * shrinkNumber(num); // returns 150.00K (for US locale)
 */
export const shrinkNumber = (number: number, threshold = 100000) => {
  if (!number) return number;
  if (isInvalid(number)) return 'N/A';
  if (isInfinity(number)) return '∞';
  const isNeg = number < 0;
  const num = Math.abs(number);
  let fmt: string | number = formatNumber(num);

  if (num === 0) fmt = '0';
  else if (num < 0.001) fmt = formatNumber(num, 'scientific');
  else if (num < 1) fmt = toFixedNumber(num, 3);
  else if (num < threshold) fmt = num.toLocaleString();
  else if (num >= 100000000000000) fmt = formatNumber(num, 'scientific');
  fmt = isNeg ? '-' + fmt : fmt;
  return fmt;
};

/** Shrinks a string to given length + 3 for default ellipsis suffix
 * @param str String to shrink
 * @param len The max number of characters to show. 15 by default.
 * @param suffix Appended to the string. "..." by default.
 * @returns The given string with suffix appended
 *
 * @example
 * const str = "Hello World";
 * const len = 7;
 * shrinkString(str, len); // returns "Hello W..."
 */
export const shrinkString = (str: string, len = 15, suffix = '...') =>
  `${str.substring(0, len)}${str.length >= len ? suffix : ''}`;

/** Shrinks a web3 address
 * @param str The string to shrink
 * @returns The string shrunk to show a few starting and ending characters
 *
 * @example
 * const addr = "0xb8CE9ab6943e0eCED004cDe8e3bBed6568B2Fa01";
 * shrinkAddress(addr); // returns "0xb8...2Fa01"
 */
export const shrinkAddress = (str: string) =>
  `${
    str.length > 3
      ? str.substring(0, 4) + '...' + str.substring(str.length - 5)
      : str
  }`;

/** Converts a factor type float to percentage
 * @param number The number to convert to percent
 * @returns The given number*100 as a percentage
 *
 * @example
 * const float = "0.4323";
 * percentify(float); // returns 43.23%
 */
export const percentify = (number: number) => {
  if (isInvalid(number)) return 'N/A';
  if (isInfinity(number)) return '∞';
  return `${(number * 100).toFixed(2)}%`;
};

/** Capitalizes the first letter of given string
 * @param str The string to capitalize first letter of
 * @returns The string with first letter capitalized
 *
 * @example
 * const str = "hello World";
 * capitalizeFirst(str); // returns "Hello World"
 */
export const capitalizeFirst = (str: string) =>
  isInvalidString(str) ? 'N/A' : str[0].toUpperCase() + str.slice(1);

/** Converts a number to limited decimal points using toFixed and reconverts it into a number */
export const toFixedNumber = (num: number, fractionDigits = 2) =>
  +num.toFixed(fractionDigits);

/** Add spaces between words in given string
 * @param str The string to add spaces between words
 * @returns The string with spaces between words
 *
 * @example
 * const str = "RadiantCapital";
 * addSpaces(str); // returns "Radiant Capital"
 */
export const addSpaces = (str: string) =>
  str.replace(/([a-z])([A-Z])/g, '$1 $2');

/**
 * Replace all spaces in a given string with underscores.
 *
 * @param str The string in which to replace spaces with underscores.
 * @returns The string with spaces replaced by underscores.
 *
 * @example
 * const str = "Hello World";
 * replaceSpacesWithUnderscores(str); // returns "Hello_World"
 */
export const replaceSpacesWithUnderscores = (str: string) =>
  str?.replaceAll(' ', '_');
