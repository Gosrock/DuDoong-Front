import { InfiniteResponse } from '@dudoong/utils';
import { IncomingHttpHeaders } from 'http';

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

export interface EventDetailResponse {
  name: string;
  startAt: string;
  runtime: number;
  status: StatusType;
  host: HostInfo;
  place: EventPlace;
  posterImage: string;
  detailImage: string[]; //TODO : 삭제
  content: string;
}

export interface EventPlace {
  latitude: number;
  longitude: number;
  placeName: string;
  placeAddress: string;
}

export interface HostInfo {
  hostId: IncomingHttpHeaders;
  name: string;
  introduce: string;
  profileImageUrl: string;
  contactEmail: string;
  contactNumber: string;
  partner: boolean;
}
