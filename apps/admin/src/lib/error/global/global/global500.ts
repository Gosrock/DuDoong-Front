import { notificationToAdmin } from '@lib/error/common/commonComment';

const global500 = {
  '1': notificationToAdmin, // "서버 오류. 관리자에게 문의 부탁드립니다.",
  '2': notificationToAdmin, // "security context not found",
};

export default global500;
