import { Button, ButtonSet, Footer, ListHeader } from '@dudoong/ui';
import DDHead from '@components/shared/Layout/NextHead';
import { useRouter } from 'next/router';
import { GetStaticProps } from 'next';
const Landing = () => {
  const router = useRouter();
  return (
    <>
      <DDHead title="두둥!" />
      <main></main>
      <section>
        <Footer />
      </section>
    </>
  );
};

export default Landing;

export const getStaticProps: GetStaticProps = () => {
  return {
    redirect: {
      destination: '/home',
      permanent: true,
    },
  };
};
