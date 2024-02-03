import { Footer, useHeaderColorContext } from '@dudoong/ui';
import DDHead from '@components/shared/Layout/NextHead';
import { css } from '@emotion/react';
import dynamic from 'next/dynamic';
import Media from '@components/shared/Media';
import { Title } from './title';
import { ImpressionArea } from '@toss/impression-area';
import { useEffect } from 'react';

/* const IntroSection = dynamic(() => import('./IntroSection'));
const FeatureSection = dynamic(() => import('./FeatureSection'));
const TicketSection = dynamic(() => import('./TicketSection'));
const OutroSection = dynamic(() => import('./Outro')); */

const Landing = () => {
  const { setHeaderColor } = useHeaderColorContext();

  useEffect(() => {
    setHeaderColor?.('black');
  }, [setHeaderColor]);

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
          <ImpressionArea
            onImpressionStart={() => {
              setHeaderColor?.('black');
            }}
            onImpressionEnd={() => setHeaderColor?.('white')}
          >
            <Title.Mobile />
          </ImpressionArea>
          <ImpressionArea
            onImpressionStart={() => {
              setHeaderColor?.('white');
            }}
          >
            <div css={css({ height: 500 })}></div>
          </ImpressionArea>
        </Media.Mobile>
        <Media.PC>
          <ImpressionArea onImpressionEnd={() => setHeaderColor?.('white')}>
            <Title.PC />
          </ImpressionArea>
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
