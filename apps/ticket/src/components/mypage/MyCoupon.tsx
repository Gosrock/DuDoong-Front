import Main from '@components/shared/Layout/Main';
import DDHead from '@components/shared/Layout/NextHead';
import { media, MenuBar, NavBar, Spacing } from '@dudoong/ui';
import styled from '@emotion/styled';
import { useRouter } from 'next/router';
import { useState } from 'react';
import NoData from './NoData';

const MyCoupon = () => {
  const [menu, setMenu] = useState<number>(0);
  const router = useRouter();
  return (
    <Main>
      <DDHead title="두둥!" />
      <NavBar label="내 쿠폰함" backHandler={() => router.back()} />
      <MenuBar
        menus={['사용가능', '사용됨/기간만료']}
        curActiveMenu={menu}
        setCurActiveMenu={setMenu}
      />
      <Spacing size={182} />
      <NoData text="쿠폰이 없습니다." />
    </Main>
  );
};

export default MyCoupon;

const MenuWrapper = styled.div`
  position: sticky;
  position: -webkit-sticky;
  ${media.pc} {
    position: sticky;
  }
  top: 48px;
  z-index: 3;
  background-color: ${({ theme }) => theme.palette.white};
`;
