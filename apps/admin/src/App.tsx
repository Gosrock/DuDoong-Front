import { Routes, Route } from 'react-router-dom';
import Landing from '@pages/common/Landing';
import { Navigate } from 'react-router-dom';
import NotFound from '@pages/common/NotFound';
import { EventsRouter } from '@pages/events';
import { HostsRouter } from '@pages/hosts';
import { AdminLayout } from './components/shared/layout/AdminLayout';

function App() {
  return (
    <Routes>
      <Route element={<AdminLayout />}>
        <Route path="/" element={<Landing />} />
        <Route path="/hosts/:hostId/*" element={<HostsRouter />} />
        <Route path="/events/:eventId/*" element={<EventsRouter />} />
        <Route path="/404" element={<NotFound />} />
      </Route>
      <Route path="*" element={<Navigate to="/404" />} />
    </Routes>
  );
}

export default App;
