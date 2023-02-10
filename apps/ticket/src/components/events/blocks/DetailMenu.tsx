import { MenuBar, Spacing } from '@dudoong/ui';
import { css } from '@emotion/react';
import styled from '@emotion/styled';
import dynamic from 'next/dynamic';

import { ComponentType, useState } from 'react';
import { MdViewerProps } from './MdViewer';
import SaleInfo from './SaleInfo';

const DetailMenu = ({
  content,
  MdViewer,
}: {
  content: string;
  MdViewer: ComponentType<MdViewerProps>;
}) => {
  const [menu, setMenu] = useState<number>(0);
  return (
    <>
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
    </>
  );
};

export default DetailMenu;

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
`;
