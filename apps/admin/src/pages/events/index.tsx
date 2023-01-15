import NotFound from '@pages/common/NotFound';
import { Navigate, Route, Routes, useLocation } from 'react-router-dom';
import Dashboard from './Dashboard';
import Detail from './Detail';
import Guests from './Guests';
import Info from './Info';
import Options from './Options';
import Tickets from './Tickets';
import Qr from './Qr';
import { AdminMenuLayout } from '../../components/shared/layout/AdminMenuLayout';
import { useState } from 'react';

const menuItems = [
  'dashboard',
  'info',
  'detail',
  'tickets',
  'options',
  'guests',
  'qr',
];

export const EventsRouter = () => {
  const location = useLocation();
  const acticeMenuIndex = menuItems.indexOf(location.pathname.split('/')[3]);
  const [curActiveMenu, setCurActiveMenu] = useState<number>(acticeMenuIndex);
  const [thirdMenuRoute, setThirdMenuRoute] = useState<string | null>(null);
  const menuActiveHandler = (menuKey: number) => {
    setThirdMenuRoute(null);
    setCurActiveMenu(menuKey);
  };
  return (
    <Routes>
      <Route
        element={
          <AdminMenuLayout
            page={'events'}
            curActiveMenu={curActiveMenu}
            setCurActiveMenu={menuActiveHandler}
            thirdMenuRoute={thirdMenuRoute}
          />
        }
      >
        <Route path="/dashboard" element={<Dashboard />} />
        <Route path="/info" element={<Info />} />
        <Route path="/detail" element={<Detail />} />
        <Route
          path="/tickets"
          element={<Tickets setThirdMenuRoute={setThirdMenuRoute} />}
        />
        <Route path="/options" element={<Options />} />
        <Route path="/guests" element={<Guests />} />
        <Route path="/qr" element={<Qr />} />
        <Route path="/*" element={<NotFound />} />
      </Route>
    </Routes>
  );
};
