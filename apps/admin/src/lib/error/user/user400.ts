import { notificationToAdmin } from '../common/commonComment';

const user400 = {
  '1': '이미 회원가입한 유저입니다. 다시 로그인 해주세요.', // "이미 회원가입한 유저입니다.",
  '2': notificationToAdmin, // "유저의 휴대폰 전화번호가 올바르지않습니다. 두둥 관리자에게 문의주세요",
  '3': notificationToAdmin, // "유저의 휴대폰 전화번호가 null입니다.",
};

export default user400;
