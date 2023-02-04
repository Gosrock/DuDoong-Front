import { Navigate, Route, Routes } from 'react-router-dom';
import Hosts from './Hosts';
import Events from './Events';

const NewRouter = () => {
  return (
    <Routes>
      <Route path="/events/:step" element={<Events />} />
      <Route path="/hosts" element={<Hosts />} />
      <Route path="/*" element={<Navigate to="/404" />} />
    </Routes>
  );
};

export default NewRouter;
