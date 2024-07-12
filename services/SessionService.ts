import store from '@/store';
import AuthService from './AuthService';
import StorageService from './StorageService';

const KEY_BASE = 'COGNITO_SESSION';
const KEY_RT = [KEY_BASE, 'RT'].join('_');

/** Service that manages auth session */
class SessionService extends StorageService {
  /** Saves the current session data to local storage */
  save() {
    const session = store.getState().auth.session;
    if (!session) throw Error('Cannot save token without logging in!');
    this.saveData(KEY_RT, session.refreshToken);
  }

  /** Loads the session data from local storage and performs user login */
  async load() {
    const rt = this.getData(KEY_RT);
    try {
      if (!rt) {
        throw Error('No local session data stored!');
      }
      await AuthService.loginWithToken(rt);
      this.save();
    } catch (e) {
      this.clear();
      throw e;
    }
  }

  /** Clears the session data from local storage */
  clear() {
    super.clear(KEY_RT);
  }
}

export default new SessionService();
