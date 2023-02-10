import { MenuBar, Spacing } from '@dudoong/ui';
import styled from '@emotion/styled';
import dynamic from 'next/dynamic';

import { useState } from 'react';
import SaleInfo from './SaleInfo';

const DetailMenu = ({ content }: { content: string }) => {
  const MdViewer = dynamic(() => import('../blocks/MdViewer'), { ssr: false });
  const [menu, setMenu] = useState<number>(0);
  return (
    <>
      <MenuBar
        menus={['공연상세', '판매정보']}
        curActiveMenu={menu}
        setCurActiveMenu={setMenu}
      />
      <Content>
        <Spacing size={32} />
        {menu === 0 ? <MdViewer content={content} /> : <SaleInfo />}

        <Spacing size={120} />
      </Content>
    </>
  );
};

export default DetailMenu;

const Content = styled.div``;
