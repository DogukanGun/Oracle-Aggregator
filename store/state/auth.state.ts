/** Type for user data */
export type UserType = {
  /** ID of the user */
  id: string;
  /** Username of the user */
  username: string;
  /** Email of the user */
  email: string;
};

/** Confirmation data for unverified users */
export type ConfirmationType = {
  /** Username of the user */
  username: string;
  /** Email of the user */
  email?: string;
};

/** Interface for Cognito user session */
export interface ICognitoUserSessionType {
  /** Access token forthe session */
  accessToken: string;
  /** Refresh token for the session */
  refreshToken: string;
  /** ID token for the session */
  idToken: string;
  userID: string;
}

/** Interface for auth state */
export interface IAuthState {
  /** Data of current user */
  user?: UserType;
  /** Session of current user */
  session?: ICognitoUserSessionType;
  /** Confirmation data for the user */
  confirmation?: ConfirmationType;
}

/** Authorization state of the user */
export default class AuthState implements IAuthState {
  user?: UserType;
  session?: ICognitoUserSessionType;
  confirmation?: ConfirmationType;

  constructor(obj?: Partial<AuthState>) {
    if (obj) {
      this.user = obj.user;
      this.session = obj.session;
      this.confirmation = obj.confirmation;
    }
  }

  /** Initializes an Auth state from server JSON response. */
  static fromJson(data: any) {
    const auth = new AuthState(data);
    return auth;
  }
}
