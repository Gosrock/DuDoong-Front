import { InfiniteResponse } from '@dudoong/utils';

export interface EventProfileResponse {
  hostId: number;
  hostName: string;
  eventId: number;
  posterImage: string;
  name: string;
  startAt: string;
  endAt: string;
  placeName: string;
  status: StatusType;
}

type StatusType = 'PREPAREING' | 'OPEN' | 'CLOSED';
