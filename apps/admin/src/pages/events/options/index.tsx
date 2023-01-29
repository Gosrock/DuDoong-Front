import { Navigate, Route, Routes } from 'react-router-dom';
import NewOptions from './NewOptions';
import Options from './Options';

const OptionsRouter = () => {
  return (
    <Routes>
      <Route path="/" element={<Options />} />
      <Route path="/new" element={<NewOptions />} />
      <Route path="*" element={<Navigate replace to="/404" />} />
    </Routes>
  );
};

export default OptionsRouter;
