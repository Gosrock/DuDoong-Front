import { Navigate, Route, Routes, useLocation } from 'react-router-dom';
import { AdminMenuLayout } from '@components/shared/layout/AdminMenuLayout';
import Dashboard from './Dashboard';
import Info from './Info';
import Member from './Member';
import Events from './Events';
import Alliance from './Alliance';
import { useQuery } from '@tanstack/react-query';
import HostApi from '@lib/apis/host/HostApi';
import Slack from './Slack';

const HostsRouter = () => {
  const { pathname } = useLocation();
  const eventId = pathname.split('/')[2];
  const { data } = useQuery(['hostDetail', eventId], () =>
    HostApi.GET_HOST_DETAIL(eventId),
  );
  //TODO: fallback 처리하기
  return (
    <Routes>
      <Route
        element={
          <AdminMenuLayout
            title={data?.name || ''}
            host={data?.name || ''}
            alliance={data?.partner || false}
          />
        }
      >
        <Route path="dashboard" element={<Dashboard />} />
        <Route path="info" element={<Info />} />
        <Route path="member" element={<Member />} />
        <Route path="events" element={<Events />} />
        <Route path="slack" element={<Slack />} />
        <Route path="alliance" element={<Alliance />} />
        <Route path="/*" element={<Navigate to="/404" />} />
      </Route>
    </Routes>
  );
};

export default HostsRouter;
