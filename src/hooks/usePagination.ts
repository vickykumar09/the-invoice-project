import { useCallback, useState } from "react";

const PAGE_SIZE = 20;

export type FetchFnParams = {
  offset: number;
  limit: number;
  query?: string;
};

export type FetchDataParams = {
  reset?: boolean;
  query?: string;
};

type UsePaginationReturn<T> = {
  data: T[];
  loading: boolean;
  hasMore: boolean;
  fetchData: (params?: FetchDataParams) => Promise<void>;
  loadMore: () => void;
  reset: () => void;
};

export default function usePagination<T>(
  fetchFn: (params: FetchFnParams) => Promise<T[]>
): UsePaginationReturn<T> {
  const [data, setData] = useState<T[]>([]);
  const [loading, setLoading] = useState(false);
  // const [initialLoading, setInitialLoading] = useState<boolean>(false);
  const [offset, setOffset] = useState(0);
  const [hasMore, setHasMore] = useState(true);

  // Fetch Data Function
  const fetchData = useCallback(
    async ({
      reset = false,
      query,
    }: FetchDataParams = {}) => {
      console.log('helo')
      if (loading || (!reset && !hasMore)) return;

      const currentOffset = reset ? 0 : offset;
      const currentQuery = query;

      setLoading(true);

      try {
        const result = await fetchFn({
          offset: currentOffset,
          limit: PAGE_SIZE,
          query: currentQuery,
        });

        setData((prev) => (reset ? result : [...prev, ...result]));
        setOffset(currentOffset + result.length);
        setHasMore(result.length === PAGE_SIZE);

      } catch (error) {
        console.error("Pagination error:", error);
      } finally {
        setLoading(false);
      }
    },
    [fetchFn, loading, hasMore, offset]
  );

  // Load More Function
  const loadMore = useCallback(() => {
    if (loading || !hasMore) return;

    fetchData();
  }, [loading, hasMore, fetchData]);

  // Reset Function
  const reset = useCallback(() => {
    setData([]);
    setOffset(0);
    setHasMore(true);
  }, []);

  return {
    data,
    loading,
    hasMore,
    fetchData,
    loadMore,
    reset
  };
}