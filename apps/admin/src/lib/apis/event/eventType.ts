import { EventStatus } from '@dudoong/utils';
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
  status: EventStatus;
}

export interface EventDetailResponse {
  name: string;
  startAt: string;
  runTime: number;
  status: EventStatus;
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

export interface EventChecklistResponse {
  hostId: number;
  eventId: number;
  name: string;
  hasBasic: boolean;
  hasDetail: boolean;
  hasTicketItem: boolean;
}

export interface DashBoardStatisticResponse {
  notApprovedCount: number;
  sellAmount: string;
  doneCount: number;
  enteredCount: number;
  notEnteredCount: number;
  issuedCount: number;
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

export interface BasicEventRequest {
  name: string;
  startAt: string;
  runTime: number;
  placeName: string | undefined;
  placeAddress: string | undefined;
  longitude: number;
  latitude: number;
}

type EventStatusType = 'CLOSED' | 'CALCULATING' | 'OPEN' | 'PREPARING';

export interface UpdateEventStatusRequest {
  status: EventStatus;
}
