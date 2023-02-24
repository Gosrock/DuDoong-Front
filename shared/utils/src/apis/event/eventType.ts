export interface EventDetailResponse {
  status: EventStatus;
  host: HostInfo;
  name: string;
  startAt: string;
  endAt: string;
  runTime: number;
  place: EventPlace;
  posterImage: string;
  content: string;
}

export type EventStatus =
  | '준비중'
  | '진행중'
  | '정산중'
  | '지난공연'
  | '삭제된공연';

export interface EventPlace {
  latitude: number;
  longitude: number;
  placeName: string;
  placeAddress: string;
}

export interface HostInfo {
  hostId: number;
  name: string;
  introduce: string;
  profileImage: string;
  contactEmail: string;
  contactNumber: string;
  partner: boolean;
}
