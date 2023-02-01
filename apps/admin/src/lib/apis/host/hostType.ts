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
}

type RoleType = 'MASTER' | 'MANAGER' | 'GUEST';
