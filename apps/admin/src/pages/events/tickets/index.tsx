import { Navigate, Route, Routes } from 'react-router-dom';
import NewTickets from './NewTickets';
import Tickets from './Tickets';

const TicketsRouter = () => {
  return (
    <Routes>
      <Route path="/" element={<Tickets />} />
      <Route path="/new" element={<NewTickets />} />
      <Route path="*" element={<Navigate replace to="/404" />} />
    </Routes>
  );
};

export default TicketsRouter;
