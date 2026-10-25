import { axiosPublic } from '../axios';
import type { EventDetailResponse } from './eventType';

export const EventApi = {
  // accessToken 을 넘기면 로그인 요청으로 조회한다. 비로그인 요청이면 서버가 호스트 연락처를 가려서 준다 (Front #360, Backend #822)
  GET_EVENT_DETAIL: async (
    eventId: string,
    accessToken?: string,
  ): Promise<EventDetailResponse> => {
    const response = await axiosPublic.get(`events/${eventId}`, {
      headers: accessToken
        ? { Authorization: `Bearer ${accessToken}` }
        : undefined,
    });
    return response.data.data;
  },
};
