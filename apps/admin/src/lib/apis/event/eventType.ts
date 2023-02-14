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
  runTime: number;
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

export interface CreateEventRequest {
  hostId: number;
  name: string;
  startAt: string;
  runTime: number;
}

export interface CreateEventResponse {
  eventId: number;
  hostId: number;
  status: '준비중' | '진행중' | '정산중' | '지난공연';
  name: string;
  startAt: string;
  endAt: string;
  runTime: number;
  posterImage: string;
  detailImages: string;
  content: string;
  place: {
    latitude: number;
    longitude: number;
    placeName: string;
    placeAddress: string;
  };
}

export interface BasicEventRequest {
  name: string;
  startAt: string;
  runTime: number;
  placeName: string;
  placeAddress: string;
  longitude: number;
  latitude: number;
}

export interface BasicEventResponse {
  eventId: number;
  hostId: number;
  status: '준비중' | '진행중' | '정산중' | '지난공연';
  name: string;
  startAt: string;
  runTime: number;
  posterImage: string;
  detailImages: string;
  content: string;
  place: {
    latitude: number;
    longitude: number;
    placeName: string;
    placeAddress: string;
  };
}
