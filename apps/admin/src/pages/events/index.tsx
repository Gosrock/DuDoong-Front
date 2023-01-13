import NotFound from '@pages/common/NotFound';
import { Navigate, Route, Routes, useLocation } from 'react-router-dom';
import Dashboard from './Dashboard';
import Detail from './Detail';
import Guests from './Guests';
import Info from './Info';
import Options from './Options';
import Tickets from './Tickets';
import Qr from './Qr';
import { AdminMenuLayout } from '../../components/shared/AdminMenuLayout';
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
  const [thirdMenuRoute, setthirdMenuRoute] = useState<string | null>(null);
  return (
    <Routes>
      <Route
        element={
          <AdminMenuLayout
            page={'events'}
            curActiveMenu={curActiveMenu}
            setCurActiveMenu={setCurActiveMenu}
            thirdMenuRoute={thirdMenuRoute}
          />
        }
      >
        <Route path="/dashboard" element={<Dashboard />} />
        <Route path="/info" element={<Info />} />
        <Route path="/detail" element={<Detail />} />
        <Route
          path="/tickets"
          element={<Tickets setThirdMenuRoute={setthirdMenuRoute} />}
        />
        <Route path="/options" element={<Options />} />
        <Route path="/guests" element={<Guests />} />
        <Route path="/qr" element={<Qr />} />
        <Route path="/*" element={<NotFound />} />
      </Route>
    </Routes>
  );
};
