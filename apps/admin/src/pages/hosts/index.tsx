import { Navigate, Route, Routes } from 'react-router-dom';
import { AdminMenuLayout } from '@components/shared/layout/AdminMenuLayout';
import Dashboard from './Dashboard';
import Info from './Info';
import Member from './Member';
import Events from './Events';
import Alliance from './Alliance';

const HostsRouter = () => {
  return (
    <Routes>
      <Route element={<AdminMenuLayout />}>
        <Route path="dashboard" element={<Dashboard />} />
        <Route path="info" element={<Info />} />
        <Route path="member" element={<Member />} />
        <Route path="events" element={<Events />} />
        <Route path="alliance" element={<Alliance />} />
        <Route path="/*" element={<Navigate to="/404" />} />
      </Route>
    </Routes>
  );
};

export default HostsRouter;
