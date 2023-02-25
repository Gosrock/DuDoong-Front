import { InfiniteRequest, InfiniteResponse } from '@dudoong/utils';
import { axiosPrivate } from '../axios';
import {
  CreateCommentResponse,
  PostCommentRequest,
  RetrieveCommentResponse,
} from './commentType';

export const CommentApi = {
  GET_COMMENTS: async ({
    id,
    pageParam,
    size = 10,
    sort = 'asc',
  }: InfiniteRequest): Promise<InfiniteResponse<RetrieveCommentResponse>> => {
    console.log();
    const response = await axiosPrivate.get(
      `/events/${id}/comments?page=${pageParam}&size=${size}&sort=${sort}`,
    );
    return response.data.data;
  },

  POST_COMMENTS: async ({
    eventId,
    payload,
  }: {
    eventId: string;
    payload: PostCommentRequest;
  }): Promise<CreateCommentResponse> => {
    const response = await axiosPrivate.post(
      `/events/${eventId}/comments`,
      payload,
    );
    return response.data.data;
  },
};
