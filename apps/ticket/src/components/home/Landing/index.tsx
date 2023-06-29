import { Footer } from '@dudoong/ui';
import DDHead from '@components/shared/Layout/NextHead';
import Title from './Title';
//import IntroSection from './IntroSection';
//import FeatureSection from './FeatureSection';
//import TicketSection from './TicketSection';
//import OutroSection from './Outro';
import { css } from '@emotion/react';
import React from 'react';
const Landing = () => {
  const IntroSection = React.lazy(() => import('./IntroSection'));
  const FeatureSection = React.lazy(() => import('./FeatureSection'));
  const TicketSection = React.lazy(() => import('./TicketSection'));
  const OutroSection = React.lazy(() => import('./Outro'));

  return (
    <>
      <DDHead
        title="두둥!"
        additional={
          <>
            <meta property="og:image" content="/og.png" />
          </>
        }
      />
      <main
        css={css`
          overflow-x: hidden;
        `}
      >
        <Title />
        <IntroSection />
        <FeatureSection />
        <TicketSection />
        <OutroSection />
      </main>
      <section>
        <Footer />
      </section>
    </>
  );
};

export default Landing;
