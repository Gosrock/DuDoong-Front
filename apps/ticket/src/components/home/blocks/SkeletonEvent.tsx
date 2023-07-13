import SkeletonItem from '@components/shared/SkeletonStyle';
import { css } from '@emotion/react';
import styled from '@emotion/styled';
import React from 'react';

const SkeletonEvent = () => {
  return (
    <Wrapper>
      <Poster />
      <SubText />
      <MainText />
      {/* <Text
        typo="P_Text_14_R"
        color="gray_400"
        as="p"
        css={css`
          padding-top: 10px;
        `}
      >
        {props.startAt}
      </Text>
      <Text
        typo="P_Header_18_SB"
        color={props.status === '지난공연' ? 'gray_400' : 'black'}
        as="p"
        css={css`
          padding-top: 3px;
        `}
      >
        {props.name}
      </Text> */}
    </Wrapper>
  );
};

export default React.memo(SkeletonEvent);

const Wrapper = styled.div`
  transform: translateY(0px);
  transition: transform 0.15s ease-in 0s;
  &:hover {
    transform: translateY(-4px);
  }
`;

const Poster = styled(SkeletonItem)`
  position: relative;
  padding-top: 141.4%;
  overflow: hidden;
  transition: box-shadow 0.15s ease-in 0s;
  box-shadow: rgba(0, 0, 0, 0.04) 0px 4px 16px 0px;
  border-radius: 12px;

  &:hover {
    box-shadow: rgba(0, 0, 0, 0.08) 0px 12px 20px 0px;
  }
`;

const SubText = styled(SkeletonItem)`
  margin-top: 10px;
  height: 15.6px;
  width: 80%;
`;
const MainText = styled(SkeletonItem)`
  margin-top: 3px;
  height: 27px;
  width: 100%;
`;
