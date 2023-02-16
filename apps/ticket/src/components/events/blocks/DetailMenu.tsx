import { media, MenuBar, Spacing } from '@dudoong/ui';
import { css } from '@emotion/react';
import styled from '@emotion/styled';

import { ComponentProps, ComponentType, useState } from 'react';
import { MdViewerProps } from './MdViewer';
import SaleInfo from './SaleInfo';

interface DetailMenuProps extends ComponentProps<'div'> {
  content: string;
  MdViewer: ComponentType<MdViewerProps>;
}

const DetailMenu = ({ content, MdViewer, ...props }: DetailMenuProps) => {
  const [menu, setMenu] = useState<number>(0);
  return (
    <Wrapper {...props}>
      <MenuBar
        menus={['공연상세', '판매정보']}
        curActiveMenu={menu}
        setCurActiveMenu={setMenu}
      />
      <Content menu={menu}>
        <Spacing size={32} />
        <MdViewer content={content} className="detail-info" />
        <SaleInfo className="sale-info" />
      </Content>
    </Wrapper>
  );
};

export default DetailMenu;

const Wrapper = styled.div``;

const Content = styled.div<{ menu: number }>`
  ${({ menu }) =>
    menu === 0
      ? css`
          .sale-info {
            display: none;
          }
        `
      : css`
          .detail-info {
            display: none;
          }
        `}
  ${media.mobile} {
    padding: 0 24px;
  }
`;
