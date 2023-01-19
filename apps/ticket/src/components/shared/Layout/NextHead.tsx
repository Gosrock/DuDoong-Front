import Head from 'next/head';

interface DDHeadProps {
  title: string;
  description?: string;
}

const DDHead = ({ title, description }: DDHeadProps) => {
  return (
    <Head>
      <title>{title}</title>
      {description ? (
        <meta name="description" content={description} />
      ) : (
        <meta name="description" content="모두를 위한 새로운 공연 라이프" />
      )}
      <meta name="viewport" content="width=device-width, initial-scale=1" />
      <link rel="icon" href="/favicon.ico" />
    </Head>
  );
};

export default DDHead;
