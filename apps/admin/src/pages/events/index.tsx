import NotFound from '@pages/common/NotFound';
import { Route, Routes, useLocation } from 'react-router-dom';
import Dashboard from './Dashboard';
import Detail from './Detail';
import Guests from './Guests';
import Info from './Info';
import Qr from './Qr';
import { AdminMenuLayout } from '@components/shared/layout/AdminMenuLayout';
import TicketsRouter from './tickets/index';
import OptionsRouter from './options';
import { useQuery } from '@tanstack/react-query';
import EventApi from '@lib/apis/event/EventApi';

const EventsRouter = () => {
  const { pathname } = useLocation();
  const eventId = pathname.split('/')[2];
  const { data } = useQuery(['eventDetail'], () =>
    EventApi.GET_EVENT_DETAIL(eventId),
  );

  //TODO: fallback 처리하기
  return (
    <Routes>
      <Route
        element={
          <AdminMenuLayout
            title={data?.name || ''}
            host={data?.host.name || ''}
            alliance={false} //TODO : 값 넣기 고민
          />
        }
      >
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
