import { useInfiniteQuery } from '@tanstack/react-query';
import { useEffect } from 'react';
import { useInView } from 'react-intersection-observer';

export const useInfiniteQueries = <T,>(
  queryKey: string,
  apiFunction: (payload: any) => Promise<InfiniteResponse<T>>,
  ListItem: (props: any) => JSX.Element,
) => {
  const [ref, inView] = useInView();
  const { data, fetchNextPage } = useInfiniteQuery<
    InfiniteResponse<T>,
    unknown
  >([queryKey], apiFunction, {
    getNextPageParam: (lastPage) => lastPage.page + 1,
  });

  useEffect(() => {
    if (!data) return;

    const lastPageIdx = data.pages.length - 1;
    const hasNext = data.pages[lastPageIdx].hasNextPage;
    if (hasNext && inView) fetchNextPage();
  }, [inView]);

  const listElement = data?.pages.map(({ content }) =>
    content.map((item) => <ListItem {...item} />),
  );
  const observer = (
    <div className="observer" ref={ref} style={{ height: '1px' }} />
  );

  return (
    <>
      {listElement}
      {observer}
    </>
  );
};

export interface InfiniteResponse<T> {
  content: T[];
  page: number;
  size: number;
  hasNextPage: boolean;
}

export interface InfiniteRequest {
  page: number;
  size: number;
  sort?: 'asc' | 'desc';
}
