import { EventPlace, EventStatus } from '@dudoong/utils';

export interface getEventsRequest {
  keyword?: string;
  pageParam?: number;
  size?: number;
  sort?: 'ASC' | 'DESC';
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
  place: EventPlace;
}
