import { InfiniteResponse } from '@dudoong/utils';

export type PageResponseHostProfileResponse =
  InfiniteResponse<HostProfileResponse>;

export interface HostProfileResponse {
  hostId: number;
  name: string;
  introduce: string;
  profileImageUrl: string;
  role: RoleType;
  isMaster: boolean;
  active: boolean;
}

export interface CreateHostRequest {
  name: string;
  contactEmail: string;
  contactNumber: string;
}

export interface CreateHostResponse {
  hostId: number;
  name: string;
  introduce: string;
  profileImageUrl: string;
  contactEmail: string;
  contactNumber: string;
  partner: boolean;
  masterUserId: number;
}
type RoleType = '마스터' | '매니저' | '게스트';

export interface HostDetailResponse {
  hostId: number;
  name: string;
  introduce: string;
  profileImage: string;
  contactEmail: string;
  contactNumber: string;
  partner: boolean;
  masterUser: HostUser;
  hostUsers: HostUser[];
  slackUrl: string;
}

export interface HostUser {
  userId: number;
  userName: string;
  email: string;
  phoneNumber: string;
  profileImage: string;
  createdAt: string;
  role: RoleType;
}

export interface UpdateHostRequest {
  profileImageKey: string;
  introduce: string;
  contactNumber: string;
  contactEmail: string;
}

export type imageFileExtensionType = 'JPEG' | 'PNG' | 'JPG';

export interface ImageUrlResponse {
  presignedUrl: string;
  key: string;
  url: string;
}
