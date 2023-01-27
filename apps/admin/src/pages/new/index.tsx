import { Navigate, Route, Routes } from 'react-router-dom';
import Hosts from './Hosts';
import Events from './Events';
import AdminNoMenuLayout from '@components/shared/layout/AdminNoMenuLayout';

const NewRouter = () => {
  return (
    <Routes>
      <Route element={<AdminNoMenuLayout />}>
        <Route path="/events" element={<Events />} />
        <Route path="/hosts" element={<Hosts />} />
        <Route path="/*" element={<Navigate to="/404" />} />
      </Route>
    </Routes>
  );
};

export default NewRouter;
