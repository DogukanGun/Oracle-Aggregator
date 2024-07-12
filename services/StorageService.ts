const KEY_BASE = 'ALTERSCOPE';

/** Service that provides a basis for local storage */
abstract class StorageService {
  /** Gets key with ALTERSCOPE prefix
   * @param key The key to add prefix to
   * @returns The input key with ALTERSCOPE prepended
   */
  protected getKey(key: string) {
    return [KEY_BASE, key].join('_');
  }

  /** Saves given data to local storage
   * @param key The key to save data to
   * @param data The data to save
   */
  saveData(key: string, data: string) {
    if (typeof window !== 'undefined') {
      localStorage.setItem(this.getKey(key), data);
    }
  }

  /** Gets data from local storage under given key
   * @param key The key to get data from
   * @returns The data if found, otherwise null
   */
  getData(key: string) {
    if (typeof window !== 'undefined') {
      const data = localStorage.getItem(this.getKey(key));
      return data;
    }
    return null;
  }

  /** Clears data from local storage under given key
   * @param key The key of the data to clear
   */
  clear(key: string) {
    if (typeof window !== 'undefined') {
      localStorage.removeItem(this.getKey(key));
    }
  }
}

export default StorageService;
