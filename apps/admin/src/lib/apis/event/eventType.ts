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

export interface CreateEventRequest {
  hostId: number;
  name: string;
  startAt: string;
  runTime: number;
}

export type EventStatus = '준비중' | '진행중' | '정산중' | '지난공연';

export interface CreateEventResponse {
  eventId: number;
  hostId: number;
  status: EventStatus;
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

export type imageFileExtensionType = 'JPEG' | 'PNG' | 'JPG';

export interface ImageUrlResponse {
  presignedUrl: string;
  key: string;
  url: string;
}

export interface UpdateEventDetailRequest {
  posterImageKey: string;
  content: string;
}

export interface EventResponse {
  eventId: number;
  hostId: number;
  status: EventStatus;
  name: string;
  startAt: string;
  endAt: string;
  runTime: number;
  posterImage: string;
  content: string;
  place: {
    latitude: number;
    longitude: number;
    placeName: string;
    placeAddress: string;
  };
}
