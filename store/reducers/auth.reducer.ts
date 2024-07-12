import { IAuthState } from '@/store/state/auth.state';
import { ActionType } from '../actions/action.type';
import { AuthActionType } from '../actions/auth.actions';
import { IAttributes, ICognitoUserSession } from '@/types/CognitoTypes';

/** Initial auth state */
const initialState = {} as IAuthState;

/**
 * Auth reducer function
 * @param state - Current auth state
 * @param action - Dispatched action
 * @returns Updated auth state
 */
export default function AuthReducer(
  state = initialState,
  action: AuthActionType | ActionType<'', undefined>,
) {
  let attributes: IAttributes;
  let signInUserSession: ICognitoUserSession;
  let username: string;
  switch (action.type) {
    case 'auth/login':
      attributes = action.payload!.attributes;
      signInUserSession = action.payload!.signInUserSession;
      username = action.payload!.username;
      return {
        user: {
          ...attributes,
          id: attributes.sub,
          username,
          email: attributes.email,
          firstName: attributes.givenName,
          lastName: attributes.familyName,
          gender: attributes.gender,
          dateOfBirth: attributes.birthdate,
        },
        session: {
          userID: attributes.sub,
          accessToken: signInUserSession.accessToken.jwtToken,
          refreshToken: signInUserSession.refreshToken.token,
          idToken: signInUserSession.idToken.jwtToken,
        },
      } as IAuthState;
    case 'auth/confirm':
      return {
        confirmation: action.payload,
      } as IAuthState;
    case 'auth/logout':
      return {} as IAuthState;
    default:
      return state;
  }
}
