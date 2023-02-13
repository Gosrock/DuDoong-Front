const getKeyFromUrl = (url: string) => {
  if (!url) return '';
  const fragments = url.split('/');
  return `${fragments[3]}/${fragments[4]}/${fragments[5]}/${fragments[6]}`;
};

export default getKeyFromUrl;
