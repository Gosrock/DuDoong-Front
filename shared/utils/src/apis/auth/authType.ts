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
  userProfile: UserProfile;
}

export interface UserProfile {
  id: number;
  profileImage: string;
  name: string;
}

export interface OauthTokenResponse {
  accessToken: string;
  refreshToken: string;
  idToken: string;
}
