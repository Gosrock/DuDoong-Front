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
import { useEffect } from 'react';

const EventsRouter = () => {
  const { pathname } = useLocation();
  const eventId = pathname.split('/')[2];
  const { data, status } = useQuery(['eventDetail', eventId], () =>
    EventApi.GET_EVENT_DETAIL(eventId),
  );

  useEffect(() => {
    console.log(status);
  }, [status]);

  //TODO: fallback 처리하기
  return (
    <>
      {status === 'success' ? (
        <Routes>
          <Route
            element={
              <AdminMenuLayout
                title={data.name || ''}
                host={data.host.name || ''}
                alliance={data.host.partner}
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
      ) : (
        <></>
      )}
    </>
  );
};

export default EventsRouter;
