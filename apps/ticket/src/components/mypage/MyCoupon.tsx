import Main from '@components/shared/Layout/Main';
import DDHead from '@components/shared/Layout/NextHead';
import { MenuBar, NavBar } from '@dudoong/ui';
import { useRouter } from 'next/router';
import { useState } from 'react';

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
    </Main>
  );
};

export default MyCoupon;
