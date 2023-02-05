import { IncomingHttpHeaders } from 'http';

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

type StatusType = 'PREPAREING' | 'OPEN' | 'CLOSED';

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
