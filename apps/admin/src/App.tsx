import { Routes, Route } from 'react-router-dom';
import Landing from '@pages/common/Landing';
import { Navigate } from 'react-router-dom';
import NotFound from '@pages/common/NotFound';
import { EventsRouter } from '@pages/events';
import { HostsRouter } from '@pages/hosts';
import { AdminLayout } from './components/shared/layout/AdminLayout';
import RequireAuth from './components/shared/auth/RequireAuth';
import Login from './components/common/Login';
import RefuseAuth from './components/shared/auth/RefuseAuth';
import Callback from '@pages/kakao/Callback';
import Refresh from './components/shared/auth/Refresh';

function App() {
  return (
    <Routes>
      <Route element={<Refresh />}>
        <Route element={<RequireAuth />}>
          <Route element={<AdminLayout />}>
            <Route path="/" element={<Landing />} />
            <Route path="/hosts/:hostId/*" element={<HostsRouter />} />
            <Route path="/events/:eventId/*" element={<EventsRouter />} />
          </Route>
        </Route>
      </Route>
      <Route element={<RefuseAuth />}>
        <Route path="/login" element={<Login />} />
      </Route>
      <Route path="/404" element={<NotFound />} />
      <Route path="/kakao/callback" element={<Callback />} />
      <Route path="*" element={<Navigate to="/404" />} />
    </Routes>
  );
}

export default App;
