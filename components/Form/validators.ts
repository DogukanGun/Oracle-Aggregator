import moment, { Moment } from 'moment';

/**
 * Validates a password to ensure it contains lowercase, uppercase, numbers, and special characters, and is at least 6 characters long.
 * @param {string} password - The password to be validated.
 * @returns {string|false} - Error message if validation fails, false otherwise.
 */
export const passwordValidator = (password: string) => {
  const symbols = [
    '^',
    `$`,
    `*`,
    `.`,
    `[`,
    `]`,
    `{`,
    `}`,
    `(`,
    `)`,
    `?`,
    `"`,
    `!`,
    `@`,
    `#`,
    `%`,
    `&`,
    `/`,
    `\\`,
    `,`,
    `>`,
    `<`,
    `'`,
    `:`,
    `;`,
    `|`,
    `_`,
    `~`,
    '`',
    `=`,
    `+`,
    `-`,
    ' ',
  ];
  const hasLower = /[a-z]+/.test(password);
  const hasUpper = /[A-Z]+/.test(password);
  const hasNum = /\d+/.test(password);
  const hasSymbol = symbols.some((s) => password.includes(s));
  if (password.length < 6) return 'Password must be at least 6 characters';
  if (!hasLower) return 'Password must contain at least 1 lower case alphabet.';
  if (!hasUpper) return 'Password must contain at least 1 upper case alphabet.';
  if (!hasNum) return 'Password must contain at least 1 number.';
  if (!hasSymbol) return 'Password must contain at least 1 special character.';
  return false;
};

/**
 * Validates an email address according to a common pattern.
 * @param {string} email - The email address to be validated.
 * @returns {string|false} - Error message if validation fails, false otherwise.
 */
export const emailValidator = (email: string) => {
  const emailRegex = /^\w+([.-]?\w+)*@\w+([.-]?\w+)*(.\w{2,3})+$/;
  const test = emailRegex.test(email);
  return test ? false : 'Email is not valid';
};

/**
 * Validates a URL according to a common pattern.
 * @param {string} url - The URL to be validated.
 * @returns {string|false} - Error message if validation fails, false otherwise.
 */
export const urlValidator = (url: string) => {
  const regex = /^(https?:\/\/)?([\da-z.-]+)\.([a-z.]{2,6})([/\w .-]*)*\/?$/;
  const test = regex.test(url);
  return test ? false : 'URL is not valid';
};

/**
 * Validates the length of a string within a specified range.
 * @param {string} value - The string to be validated.
 * @param {number} min - Minimum length.
 * @param {number} max - Maximum length.
 * @param {string} [name] - Optional name for the value being validated.
 * @returns {string|false} - Error message if validation fails, false otherwise.
 */
export const lengthValidator = (
  value: string,
  min: number,
  max: number,
  name?: string,
) => {
  return value.length < min || value.length > max
    ? `${name ?? 'Value'} must be ${min} to ${max} characters.`
    : false;
};

/**
 * Validates a numerical value within a specified range.
 * @param {string} value - The numerical value to be validated.
 * @param {number} min - Minimum value.
 * @param {number} max - Maximum value.
 * @param {string} [name] - Optional name for the value being validated.
 * @returns {string|false} - Error message if validation fails, false otherwise.
 */
export const rangeValidator = (
  value: string,
  min: number,
  max: number,
  name?: string,
) => {
  return !value || +value < min || +value > max
    ? `${name ?? 'Value'} must be from ${min} to ${max}.`
    : false;
};

/**
 * Validates that a string can be parsed into a valid number.
 * @param {string} value - The string to validate
 * @param {string} [name] - Optional name for the value being validated
 * @returns {string|false} - Error message if validation fails, false otherwise
 */
export const numberValidator = (value: string, name?: string) => {
  if (!Number(value)) {
    return `${name ?? 'Value'} must be a valid number.`;
  }
  return false;
};

/**
 * Validates a date within a specified range.
 * @param {Date|Moment} value - The date to be validated.
 * @param {Date} min - Minimum date.
 * @param {Date} max - Maximum date.
 * @param {string} [name] - Optional name for the value being validated.
 * @returns {string|false} - Error message if validation fails, false otherwise.
 */
export const dateValidator = (
  value: Date | Moment,
  min?: Date,
  max?: Date,
  name?: string,
) => {
  const m = moment(value);

  if (!m.isValid()) return `${name ?? 'Date'} is invalid`;
  if ((min && m.isBefore(min)) || (max && m.isAfter(max)))
    return `${name ?? 'Date'} must be between ${
      min?.toLocaleDateString() ?? 'any time'
    } to ${max?.toLocaleDateString() ?? 'any time'}.`;
  return false;
};

/**
 * Validates that a value is not null, undefined, or an empty string.
 * @param {any} value - The value to be validated.
 * @param {string} [name] - Optional name for the value being validated.
 * @returns {string|false} - Error message if validation fails, false otherwise.
 */
export const emptyOrNullValidator = (value: any, name?: string) => {
  return value == null || value === '' || value === undefined
    ? `${name ?? 'Value'} should not be empty.`
    : false;
};

/**
 * Validates that a string is one of the specified values in a list.
 * @param {string} value - The string to be validated.
 * @param {string[]} list - List of valid strings.
 * @param {string} [name] - Optional name for the value being validated.
 * @returns {string|false} - Error message if validation fails, false otherwise.
 */
export const stringInListValidator = (
  value: string,
  list: string[],
  name?: string,
) => {
  return list.includes(value)
    ? false
    : `${name ?? 'Value'} must be one of [${list.join(', ')}].`;
};

/**
 * Validates a discord webhook URL
 * @param {string} value - The value to validate
 * @returns {string|false} - Error message if validation fails, false otherwise.
 */
export const discordWebhookValidator = (value: string) => {
  const regex =
    /^https:\/\/discord\.com\/api\/webhooks\/\d+\/[A-Za-z0-9\-._~]+$/;
  const test = regex.test(value);
  return test ? false : 'Webhook is not valid';
};

export const isAddress = (value: any, name?: string) => {
  if (value == null || value === '' || value === undefined)
    return `${name ?? 'Value'} should not be empty.`;
  if (value.length === 42 && value.startsWith('0x')) return false;
  return `${name ?? 'Value'} should not be empty.`;
};
