export interface HostProfileResponse {
  hostId: number;
  name: string;
  introduce: string;
  profileImageUrl: string;
  role: RoleType;
  isMaster: boolean;
  active: boolean;
}

type RoleType = 'MASTER' | 'MANAGER' | 'GUEST';

export interface HostDetailResponse {
  hostId: number;
  name: string;
  introduce: string;
  profileImageUrl: string;
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
