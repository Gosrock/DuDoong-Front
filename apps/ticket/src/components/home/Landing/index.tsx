import { Footer } from '@dudoong/ui';
import DDHead from '@components/shared/Layout/NextHead';
import { css } from '@emotion/react';
import dynamic from 'next/dynamic';
import Media from '@components/shared/Media';
import { Title } from './title';

/* const IntroSection = dynamic(() => import('./IntroSection'));
const FeatureSection = dynamic(() => import('./FeatureSection'));
const TicketSection = dynamic(() => import('./TicketSection'));
const OutroSection = dynamic(() => import('./Outro')); */

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
        <Media.Mobile>
          <Title.Mobile />
        </Media.Mobile>
        <Media.PC>
          <Title.PC />
        </Media.PC>
        {/*         <Title />
        <IntroSection />
        <FeatureSection />
        <TicketSection />
        <OutroSection /> */}
      </main>
      <section>
        <Footer />
      </section>
    </>
  );
};

export default Landing;
