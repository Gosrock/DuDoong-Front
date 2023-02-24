import { InfiniteResponse } from '@dudoong/utils';
import { EventProfileResponse } from '../event/eventType';

export type PageResponseHostProfileResponse =
  InfiniteResponse<HostProfileResponse>;

export interface HostProfileResponse {
  hostId: number;
  name: string;
  introduce: string;
  profileImage: string;
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
  active: boolean;
}

export interface UpdateHostRequest {
  profileImageKey: string;
  introduce: string;
  contactNumber: string;
  contactEmail: string;
}

export type imageFileExtensionType = 'JPEG' | 'PNG' | 'JPG';
export type status = ' 준비중' | '진행중' | '정산중' | '지난공연 ';

export interface ImageUrlResponse {
  presignedUrl: string;
  key: string;
  url: string;
}

export interface SlackRequest {
  slackUrl: string;
}
export interface HostEventResponse {
  content: EventProfileResponse[];
  page: number;
  size: number;
  totalElements: number;
  totalPages: number;
  hasNextPage: boolean;
}

export interface UserProfile {
  userId: number;
  userName: string;
  email: string;
  profileImage: string;
}

export type InviteHostRoleType = 'MANAGER' | 'GUEST';

export interface InviteHostRequest {
  email: string;
  role: InviteHostRoleType;
}
