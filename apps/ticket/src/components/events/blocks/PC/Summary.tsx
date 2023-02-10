import { EventDetailResponse, parseDate } from '@dudoong/utils';
import styled from '@emotion/styled';
import Image from 'next/image';

const Summary = ({ detail }: { detail: EventDetailResponse }) => {
  return (
    <Wrapper>
      <Image
        src={detail.posterImage}
        alt={detail.name}
        width={204}
        height={287}
      />
      <Content>
        <div>
          <div>
            <p>날짜</p>
            <p>{parseDate(detail.startAt, true)[0]}</p>
          </div>
          <div>
            <p>시간</p>
            <p>{`${parseDate(detail.startAt)[1]} ${
              detail.runtime ? `(${detail.runtime}분)` : ''
            }`}</p>
          </div>
          <div>
            <p>장소</p>
            <p>
              {detail.place.placeName} <br />
              <span>{detail.place.placeAddress}</span>
            </p>
          </div>
          <div>
            <p>호스트</p>
            <p>
              {detail.host.name}
              <br />
              <span>{detail.host.contactNumber}</span>
            </p>
          </div>
        </div>
        <div>
          본 공연은 두둥서비스를 이용하여 온라인 예매를 실시하고 있으며,
          예매하신 티켓의 취소/환불/배송에 관련된 사항은 두둥스튜디오의 약관을
          참고하여 주세요.
        </div>
      </Content>
    </Wrapper>
  );
};

export default Summary;

const Wrapper = styled.div`
  display: flex;
  justify-content: flex-start;
  gap: 18px;
  padding-top: 20px;
  margin-top: 12px;
  border-top: 2px solid black;
`;

const Content = styled.div`
  display: flex;
  flex-direction: column;
  justify-content: space-between;

  & > div:first-of-type > div {
    display: grid;
    grid-template-columns: 64px auto;
    ${({ theme }) => theme.typo.P_Text_16_M}
    margin-bottom:10px;
    color: ${({ theme }) => theme.palette.black};
    span {
      color: ${({ theme }) => theme.palette.gray_400};
    }
  }

  & > div:last-of-type {
    ${({ theme }) => theme.typo.P_Text_14_M}
    color: ${({ theme }) => theme.palette.gray_300};
    padding: 15px 4px;
    border-top: 1px solid ${({ theme }) => theme.palette.gray_300};
    border-bottom: 1px solid ${({ theme }) => theme.palette.gray_300};
  }
`;
