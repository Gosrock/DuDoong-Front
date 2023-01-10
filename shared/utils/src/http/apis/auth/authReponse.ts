export interface OauthInfoResponse {
  email: string;
  phoneNumber: string;
  profileImage: string;
  name: string;
}

export interface OauthLoginResponse {
  accessToken: string;
  refreshToken: string;
  userProfile: {
    id: number;
    profileImage: string;
    name: string;
  };
}
