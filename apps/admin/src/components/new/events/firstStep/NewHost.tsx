import { useNavigate } from 'react-router-dom';
import NewPerson from '@components/shared/component/NewPerson';

const NewHost = () => {
  const navigate = useNavigate();
  const newHostHandler = () => {
    navigate('/new/hosts', {
      state: {
        returnUrl: '/new/events/2',
      },
      replace: true,
    });
  };

  return <NewPerson type="host" size="lg" onClick={newHostHandler} />;
};

export default NewHost;
