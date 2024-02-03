import { Footer, useHeaderColorContext } from '@dudoong/ui';
import DDHead from '@components/shared/Layout/NextHead';
import { css } from '@emotion/react';
import Media from '@components/shared/Media';
import { Title } from './title';
import { ImpressionArea } from '@toss/impression-area';
import { useEffect } from 'react';
import { Intro } from './intro';
import { Feature } from './feature';
import { Special } from './special';
import { Outro } from './outro';

const Landing = () => {
  const { setHeaderColor } = useHeaderColorContext();

  useEffect(() => {
    setHeaderColor('black');
  }, []);

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
            onImpressionStart={() => setHeaderColor('black')}
            onImpressionEnd={() => setHeaderColor('white')}
          >
            <Title.Mobile />
            <Intro.Mobile />
          </ImpressionArea>
          <ImpressionArea onImpressionEnd={() => setHeaderColor('black')}>
            <Feature.Mobile />
          </ImpressionArea>
          <ImpressionArea onImpressionEnd={() => setHeaderColor('white')}>
            <Special.Mobile />
          </ImpressionArea>
          <ImpressionArea>
            <Outro />
          </ImpressionArea>
        </Media.Mobile>

        <Media.PC>
          <ImpressionArea
            onImpressionStart={() => setHeaderColor('black')}
            onImpressionEnd={() => setHeaderColor('white')}
          >
            <Title.PC />
          </ImpressionArea>
          <ImpressionArea onImpressionEnd={() => setHeaderColor('black')}>
            <Intro.PC />
            <Feature.PC />
          </ImpressionArea>
          <ImpressionArea onImpressionEnd={() => setHeaderColor('white')}>
            <Special.PC />
          </ImpressionArea>
          <ImpressionArea>
            <Outro />
          </ImpressionArea>
        </Media.PC>
      </main>
      <section>
        <Footer />
      </section>
    </>
  );
};

export default Landing;
