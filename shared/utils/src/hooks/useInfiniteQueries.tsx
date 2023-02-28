import {
  QueryKey,
  useInfiniteQuery,
  UseInfiniteQueryOptions,
} from '@tanstack/react-query';
import { useEffect } from 'react';
import { useInView } from 'react-intersection-observer';

export const useInfiniteQueries = <T,>(
  queryKey: QueryKey,
  apiFunction: (payload: any) => Promise<InfiniteResponse<T>>,
  ListItem: (props: any) => JSX.Element,
  options?: UseInfiniteQueryOptions<
    InfiniteResponse<T>,
    any,
    any,
    any,
    QueryKey
  >,
) => {
  const [ref, inView] = useInView();
  const { data, fetchNextPage } = useInfiniteQuery<
    InfiniteResponse<T>,
    unknown
  >(queryKey, apiFunction, {
    getNextPageParam: (lastPage) => lastPage.page + 1,
    ...options,
  });

  useEffect(() => {
    if (!data) return;

    const lastPageIdx = data.pages.length - 1;
    const hasNext = data.pages[lastPageIdx].hasNext;
    if (hasNext && inView) fetchNextPage();
  }, [inView]);

  const listElement = data?.pages.map(({ content }) =>
    content.map((item, idx) => <ListItem {...item} key={`item-${idx}`} />),
  );
  const observer = (
    <div className="observer" ref={ref} style={{ height: '1px' }} />
  );

  const isEmpty = data?.pages[0].content.length === 0;

  return {
    infiniteListElement: (
      <>
        {listElement}
        {observer}
      </>
    ),
    isEmpty,
  };
};

export interface InfiniteResponse<T> {
  content: T[];
  page: number;
  size: number;
  hasNext: boolean;
}

export interface InfiniteRequest {
  pageParam?: number;
  size?: number;
  sort?: 'asc' | 'desc';
  id?: string;
}
