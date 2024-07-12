/** Extracts value from the given data using given graph params
 * @param param Graph param string e.g. "scores.overall"
 * @param data Data to extract value from
 */
export function extractGraphParamValue<T extends Record<string, T> = any>(
  param: string,
  data: Record<string, T>,
): T {
  const dot = param.indexOf('.');
  if (dot === -1 || dot === param.length - 1) {
    return data[param];
  }
  const [key, rem] = [param.slice(0, dot), param.slice(dot + 1)];
  return extractGraphParamValue(rem, data[key]);
}
