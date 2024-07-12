import axios, { AxiosError } from 'axios';
import store from '@/store';
import { authActions } from '@/store/actions';
import SessionService from './SessionService';
import { UserType } from '@/store/state/auth.state';

type SignUpFormData = Omit<UserType, 'id'> & { password: string };

/** Client side AuthService used to access the built-in Auth API */
class AuthService {
  /**
   * Sends a request to the auth api
   * @param ep endpoint to send request to
   * @param body data to send
   * @returns the api response
   */
  private request = async (ep: string, body: any) => {
    const baseEndpoint = `/api/auth`;
    try {
      const res = await axios.post([baseEndpoint, ep].join('/'), body);
      return res;
    } catch (e) {
      const err = e as AxiosError<{ code: string; message: string }>;
      throw Error(err.response!.data.code);
    }
  };

  /**
   * Attempts to login the user and triggers store action if successful
   * @param username Username to login with
   * @param password Password to login with
   */
  login = async (username: string, password: string) => {
    const res = await this.request('login', { username, password });
    store.dispatch(authActions.login(res.data));
    SessionService.save();
  };

  /**
   * Attempts to register the user via metamask wallet
   * @param walletAddresss Wallet Address of user
   */
  registerViaMetamask = async (walletAddresss: string,signedHash: string) => {
    await this.request('signup/metamask', { walletAddress: walletAddresss, password: signedHash });
  };

  /**
   * Attempts to login the user via metamask wallet
   * @param walletAddresss Wallet Address of user
   */
  loginViaMetamask = async (walletAddresss: string,signedHash: string) => {
    const res = await this.request('login/metamask', { walletAddress: walletAddresss, password: signedHash  });
    store.dispatch(authActions.login(res.data));
    SessionService.save();
  };


  /**
   * Attempts to login through token and triggers store action if successful
   * @param token Access token for login
   */
  loginWithToken = async (token: string) => {
    const {
      data: { attributes, username, signInUserSession },
    } = await this.request('login', { token });
    store.dispatch(
      authActions.login({
        attributes,
        username,
        signInUserSession,
      } as any),
    );
  };

  /**
   * Attempts to register through username, email, password and triggers store action if successful
   * @param username Username to register with
   * @param email Email to register with
   * @param password Password to register with
   */
  register = async (username: string, email: string, password: string) => {
    await this.request('signup', { username, email, password });
  };
  /**
   * Attempts to confirm register through confirmation code and triggers store action if successful
   * @param username Username to register with
   * @param confirmationCode Email to register with
   */
  confirm = async (username: string, confirmationCode: string) => {
    await this.request('signup/confirm', { username, confirmationCode });
  };
  /**
   * Attempts to revoke the token associated with the current user and triggers logout action regardless of response
   */
  logout = async () => {
    const auth = store.getState().auth;
    if (!auth.session) return;
    const token = auth.session.refreshToken;
    this.request('logout', { token });
    store.dispatch(authActions.logout());
    SessionService.clear();
  };

  /**
   * Attempts to signup the user with given data
   * @param data body of the signup form
   */
  signup = async (data: SignUpFormData) => {
    await this.request('signup', data);
  };

  /**
   * Initiates a forgot password attempt
   * @param username name of the user
   * @returns the api response
   */
  forgot = async (username: string) => {
    return this.request('forgot', { username });
  };

  /**
   * Attempts to confirm forgot password attempt
   * @param code confirmation code
   * @param password new password
   * @returns the api response
   */
  confirmForgot = async (username: string, code: string, password: string) => {
    if (!username) throw Error('Need Username for password change!');
    return this.request('forgot/confirm', { username, code, password });
  };
  /**
   * Attempts to change password
   * @param oldPassword old password
   * @param newPassword new password
   * @returns the api response
   */
  changePassword = async (oldPassword: string, newPassword: string) => {
    const auth = store.getState().auth;
    if (!auth.session) return;
    const accessToken = auth.session.accessToken;
    return this.request('password/change', { oldPassword, newPassword, accessToken });
  };
}

export default new AuthService();
