import Head from 'next/head';

interface DDHeadProps {
  title: string;
  description?: string;
  additional?: JSX.Element;
}

const DDHead = ({ title, description, additional }: DDHeadProps) => {
  return (
    <Head>
      <title>{title}</title>
      {description ? (
        <meta name="description" content={description} />
      ) : (
        <meta name="description" content="모두를 위한 새로운 공연 라이프" />
      )}
      <meta
        name="viewport"
        content="initial-scale=1.0,user-scalable=no,maximum-scale=1,width=device-width"
      />
      <link rel="icon" href="/favicon.ico" />
      {additional}
    </Head>
  );
};

export default DDHead;
