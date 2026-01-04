import fetchPopularPeople from "@/services/Person/fetchPopularPeople";
import { useInfiniteQuery } from "@tanstack/react-query";

export function usePopularPeople() {
  return useInfiniteQuery({
    queryKey: ["popular-people"],

    // ⬇️ Phải có dạng này: ({ pageParam }) => Promise<DataType>
    queryFn: ({ pageParam = 1 }) => fetchPopularPeople("en-US", pageParam),

    // ⬇️ Phải return number | undefined
    getNextPageParam: (lastPage) => {
      const next = lastPage.page + 1;
      return next <= lastPage.total_pages ? next : undefined;
    },

    initialPageParam: 1, // 🔥 QUAN TRỌNG V5: bắt buộc để tránh lỗi overload
  });
}
