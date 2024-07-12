import { ICognitoResponse } from '@/types/CognitoTypes';
import { ConfirmationType } from '../state/auth.state';
import { ActionType } from './action.type';

/** Payload type for auth/login action */
type AuthLoginPayloadType = ICognitoResponse;

/** Action type for auth/login */
type AuthLoginActionType = ActionType<'auth/login', AuthLoginPayloadType>;

/** Payload type for auth/confirm action */
type AuthConfirmPayloadType = ConfirmationType;

/** Action type for auth/confirm */
type AuthConfirmActionType = ActionType<'auth/confirm', AuthConfirmPayloadType>;

/** Action type for auth/logout */
type AuthLogoutActionType = ActionType<'auth/logout'>;

/** Union of all auth action types */
export type AuthActionType =
  | AuthLoginActionType
  | AuthConfirmActionType
  | AuthLogoutActionType;

/** Auth action creators */
const authActions = {
  /**
   * Sets user auth state
   * @param payload - Cognito response payload
   * @returns Auth login action
   */
  login: (payload: AuthLoginPayloadType): AuthLoginActionType => {
    return {
      type: 'auth/login',
      payload,
    };
  },

  /**
   * Sets up confirmation details used to control post
   * signup flow of unverified user
   * @param payload - Confirmation response payload
   * @returns Auth confirmation action
   */
  setConfirmation: (payload: AuthConfirmPayloadType): AuthConfirmActionType => {
    return {
      type: 'auth/confirm',
      payload,
    };
  },

  /**
   * Resets user state
   * @returns Auth logout action
   */
  logout: (): AuthLogoutActionType => {
    return {
      type: 'auth/logout',
    };
  },
};

export default authActions;
