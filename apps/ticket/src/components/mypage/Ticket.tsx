import Main from '@components/shared/Layout/Main';
import DDHead from '@components/shared/Layout/NextHead';
import { NavBar } from '@dudoong/ui';
import { useRouter } from 'next/router';

const Ticket = () => {
  const {
    query: { id },
    back,
  } = useRouter();
  console.log(id);
  return (
    <>
      <DDHead title="두둥!" />
      <Main>
        <NavBar label="모바일 티켓" backHandler={back} />
      </Main>
    </>
  );
};

export default Ticket;
