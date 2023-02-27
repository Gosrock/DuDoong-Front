import { notificationToAdmin } from '@lib/error/common/commonComment';

const redisson500 = {
  '1': notificationToAdmin, // "can not get redisson lock",
};

export default redisson500;
