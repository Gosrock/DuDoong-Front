/** @jsxImportSource @emotion/react */
import { css } from '@emotion/react';
import styled from '@emotion/styled';
import { HTMLAttributes } from 'react';
import { FlexBox, ListRow, Padding } from '../../layout';
import { ImageMock } from '../../layout/ListRow/listRow.stories';
import { Text } from '../Text';

export interface PCHeaderProps extends HTMLAttributes<HTMLDivElement> {
  profile: { name: string; host: string };
  title?: string;
}

export const Header = ({ profile, title }: PCHeaderProps) => {
  return (
    <Wrapper align={'center'}>
      <Padding size={[0, 56, 0, 24]} fill>
        <FlexBox justify={'space-between'} align={'center'}>
          <LogoMock />
          <ListRow
            leftImage={<ImageMock size={32} />}
            text={<Text typo="Text_16">한규진</Text>}
            paddingSize={0}
          />
        </FlexBox>
      </Padding>
      {title && (
        <Text
          typo="Text_18_SB"
          color="black"
          css={css`
            position: absolute;
            left: 290px;
          `}
        >
          {title}
        </Text>
      )}
    </Wrapper>
  );
};

const Wrapper = styled(FlexBox)`
  height: 72px;
  border-bottom: 1px solid ${({ theme }) => theme.palette.gray_200};
`;

const LogoMock = styled.div`
  width: 80px;
  height: 36px;
  background-color: gray;
`;
