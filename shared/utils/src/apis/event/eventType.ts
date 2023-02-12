import { IncomingHttpHeaders } from 'http';

export interface EventDetailResponse {
  status: StatusType;
  host: HostInfo;
  name: string;
  startAt: string;
  endAt: string;
  runTime: number;
  place: EventPlace;
  posterImage: string;
  content: string;
}

type StatusType = '준비중' | '진행중' | '정산중' | '지난공연';

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
  profileImage: string;
  contactEmail: string;
  contactNumber: string;
  partner: boolean;
}
