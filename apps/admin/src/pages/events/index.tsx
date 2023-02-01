import NotFound from '@pages/common/NotFound';
import { Route, Routes } from 'react-router-dom';
import Dashboard from './Dashboard';
import Detail from './Detail';
import Guests from './Guests';
import Info from './Info';
import Qr from './Qr';
import { AdminMenuLayout } from '@components/shared/layout/AdminMenuLayout';
import TicketsRouter from './tickets/index';
import OptionsRouter from './options';

const EventsRouter = () => {
  return (
    <Routes>
      <Route element={<AdminMenuLayout />}>
        <Route path="/dashboard" element={<Dashboard />} />
        <Route path="/info" element={<Info />} />
        <Route path="/detail" element={<Detail />} />
        <Route path="/tickets/*" element={<TicketsRouter />} />
        <Route path="/options/*" element={<OptionsRouter />} />
        <Route path="/guests" element={<Guests />} />
        <Route path="/qr" element={<Qr />} />
        <Route path="/*" element={<NotFound />} />
      </Route>
    </Routes>
  );
};

export default EventsRouter;
