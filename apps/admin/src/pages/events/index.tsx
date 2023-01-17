import NotFound from '@pages/common/NotFound';
import { Route, Routes, useLocation } from 'react-router-dom';
import Dashboard from './Dashboard';
import Detail from './Detail';
import Guests from './Guests';
import Info from './Info';
import Options from './Options';
import Qr from './Qr';
import { AdminMenuLayout } from '../../components/shared/layout/AdminMenuLayout';
import { useState } from 'react';
import TicketsRouter from './tickets/index';

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
  return (
    <Routes>
      <Route
        element={
          <AdminMenuLayout
            page={'events'}
            curActiveMenu={curActiveMenu}
            setCurActiveMenu={setCurActiveMenu}
          />
        }
      >
        <Route path="/dashboard" element={<Dashboard />} />
        <Route path="/info" element={<Info />} />
        <Route path="/detail" element={<Detail />} />
        <Route path="/tickets/*" element={<TicketsRouter />} />
        <Route path="/options" element={<Options />} />
        <Route path="/guests" element={<Guests />} />
        <Route path="/qr" element={<Qr />} />
        <Route path="/*" element={<NotFound />} />
      </Route>
    </Routes>
  );
};
