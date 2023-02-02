import { InfiniteResponse } from '@dudoong/utils';

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
