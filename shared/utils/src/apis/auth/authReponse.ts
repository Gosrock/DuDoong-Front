export interface OauthInfoResponse {
  email: string;
  phoneNumber: string;
  profileImage: string;
  name: string;
}

export interface OauthLoginResponse {
  accessToken: string;
  accessTokenAge: number;
  refreshToken: string;
  refreshTokenAge: number;
  userProfile: UserProfileType;
}

export interface UserProfileType {
  id: number;
  profileImage: string;
  name: string;
}

export interface OauthTokenResponse {
  accessToken: string;
  refreshToken: string;
  idToken: string;
}
