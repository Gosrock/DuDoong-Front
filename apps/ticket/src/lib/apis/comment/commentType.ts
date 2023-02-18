export interface RetrieveCommentResponse {
  commentInfo: CommentInfo;
  isMine: boolean;
}

export interface CommentInfo {
  commentId: number;
  nickName: string;
  content: string;
  createdAt: string;
  eventId: number;
  userId: number;
}

export interface PostCommentRequest {
  nickName: string;
  content: string;
}

export interface CreateCommentResponse {
  id: number;
  nickName: string;
  content: string;
  createdAt: string;
  userInfo: UserInfo;
}

interface UserInfo {
  userId: number;
  userName: string;
  email: string;
  phoneNumber: string;
  profileImage: string;
  createdAt: string;
}
