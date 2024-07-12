/** Type for Alterscope Graph API responses */
export type GraphResponseType<T> = {
  /** Timestamp in milliseconds */
  t: number;
  /** Data containing the params requested */
  v: Partial<T>;
}[];
