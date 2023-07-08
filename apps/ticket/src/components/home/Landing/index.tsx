import { Footer } from '@dudoong/ui';
import DDHead from '@components/shared/Layout/NextHead';
import Title from './Title';
import IntroSection from './IntroSection';
import FeatureSection from './FeatureSection';
import TicketSection from './TicketSection';
import OutroSection from './Outro';
import { css } from '@emotion/react';

const Landing = () => {
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
