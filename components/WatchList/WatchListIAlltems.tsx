"use client";

import LoadingCard from "../Shared_Components/LoadingCard";
import { formatTimestamp } from "@/utils/formatTimestamp";
import { Edit, Trash2 } from "lucide-react";

import WatchListItemCard from "./WatchListItemCard";
import { useDeleteWatchlist } from "@/hooks/useDeleteWatchlist";

import { useRouter } from "next/navigation";
import { useGetWatchlistItems } from "@/hooks/useGetWatchlistItems";
import { useCurrentWatchlistStore } from "@/store/useCurrentWatchlistStore";
import { useGetWatchlistsSummary } from "@/hooks/useGetWatchlistsSummary";
import getNextWatchlistId from "@/utils/getNextWatchlistId";
import { getNextWatchlistData } from "@/utils/getNextWatchlistData";
import { useState } from "react";

import { useUpdateWatchlist } from "@/hooks/useUpdateWatchlist";
import { useUser } from "@/hooks/useUser";
import { isMovie, isTV } from "@/utils/knownFor";
import TVSerieWatchlistItemCard from "../TVSerie/TVSerieWatchlistItemCard";
import { useThemeStore } from "@/store/themeStore";

interface WatchListIAlltemsProps {
  watchlistId: string;
}

const WatchListIAlltems = ({ watchlistId }: WatchListIAlltemsProps) => {
  const router = useRouter();
  const { user } = useUser();
  const { theme } = useThemeStore();

  const [openNewTitle, setOpenNewTitle] = useState<boolean>(false);
  const [newTitle, setNewTitle] = useState<string>("");

  //current watchlist trong store
  const { watchlist, setWatchlist, previousWatchlist } =
    useCurrentWatchlistStore();

  const { data: watchlistsSummary, isLoading: isWatchlistsLoading } =
    useGetWatchlistsSummary(user?.uid ? true : false);

  const {
    mutate: deleteWatchlist,
    mutateAsync: deleteWatchlistAsync,
    isPending: isDeleteWatchlistPending,
    isError: isDeleteWatchlistError,
    error: deleteWatchlistError,
  } = useDeleteWatchlist();

  const {
    mutateAsync: updateWatchlistAsync,
    isPending: isUpdateWatchlistPending,
    isError: isUpdateWatchlistError,
    error: updateWatchlistError,
  } = useUpdateWatchlist();

  const {
    data: watchlistItems,
    isLoading: isWatchlistItemsLoading,
    isError,
    error,
  } = useGetWatchlistItems(watchlistId);

  const handleDeleteWatchlist = async () => {
    // 1️⃣ Tìm route tiếp theo TRƯỚC khi xoá
    const nextId = getNextWatchlistId(
      watchlistsSummary?.list || [],
      watchlist?.id as string,
    );

    // 2️⃣ Xoá
    await deleteWatchlistAsync(watchlist?.id as string);

    // 3️⃣ Push route mới
    if (nextId) {
      const nextWatchlist = getNextWatchlistData(
        watchlistsSummary?.list || [],
        watchlist?.id as string,
      );

      setWatchlist(nextWatchlist);

      router.replace(`/user/watch-list/${nextId}`);
    } else {
      router.replace("/");
    }
  };

  const handleRenameWatchlist = async () => {
    if (!newTitle.trim()) return;

    await updateWatchlistAsync({
      watchlistId,
      title: newTitle,
    });

    setOpenNewTitle(false);
  };

  return (
    <div>
      {isWatchlistItemsLoading ? (
        <div className="mt-10 ml-10">
          <div className="w-[200px] h-[30px] mb-8 rounded-lg bg-gray-300 dark:bg-gray-700 shadow-md overflow-hidden animate-pulse"></div>
          <div
            className={`grid grid-cols-[repeat(auto-fit,minmax(200px,1fr))] gap-6 mx-6 justify-center`}
          >
            {Array.from({ length: 20 }, (_, index) => index).map(
              (item, index) => (
                <div key={item} className="w-full">
                  <LoadingCard />
                </div>
              ),
            )}
          </div>
        </div>
      ) : !watchlistsSummary?.list.find((item) => item.id === watchlistId) ? (
        <div className="flex justify-center items-center mx-7 mt-20">
          Trang ko tìm thấy
        </div>
      ) : (
        <div className="w-full h-auto mb-8">
          <div className="flex flex-col flex-wrap justify-center items-start gap-1 ml-7 mt-4 mb-4">
            <div className="flex justify-center items-center gap-3">
              <div className="font-bold text-[23px]">
                {!openNewTitle && watchlistsSummary.map[watchlistId].title}
              </div>

              <div className="flex justify-center items-center gap-2 mt-1">
                {openNewTitle ? (
                  <div className="flex flex-wrap justify-center items-center gap-2">
                    <input
                      className="w-auto shadow appearance-none border rounded w-auto py-2 px-3 leading-tight focus:outline-none focus:shadow-outline ml-[-12px]"
                      type="text"
                      defaultValue={watchlistsSummary.map[watchlistId].title}
                      placeholder="Watchlist Title"
                      onChange={(e) => setNewTitle(e.target.value)}
                    />

                    <div className="flex justify-center gap-3">
                      <button
                        className="px-4 py-2 rounded-lg border text-sm cursor-pointer"
                        onClick={() => setOpenNewTitle(false)}
                      >
                        Cancel
                      </button>

                      <button
                        className="px-4 py-2 rounded-lg bg-blue-600 text-white text-sm cursor-pointer"
                        disabled={
                          isUpdateWatchlistPending ||
                          newTitle === "" ||
                          newTitle === watchlistsSummary.map[watchlistId].title
                        }
                        onClick={handleRenameWatchlist}
                      >
                        {isUpdateWatchlistPending ? "Updating..." : "Rename"}
                      </button>
                    </div>
                    {isUpdateWatchlistError && (
                      <div className="text-red-700">
                        Error: {updateWatchlistError.message} !
                      </div>
                    )}
                  </div>
                ) : (
                  <div
                    className="flex justify-center items-center"
                    onClick={() => setOpenNewTitle(true)}
                  >
                    <Edit
                      size={18}
                      className="hover:scale-110 transition-transform cursor-pointer"
                      color={theme === "dark" ? "cyan" : "blue"}
                    />
                  </div>
                )}

                <div className="flex justify-center items-center">
                  <button
                    className="hover:scale-110 transition-transform cursor-pointer"
                    disabled={isDeleteWatchlistPending}
                    onClick={handleDeleteWatchlist}
                  >
                    {isDeleteWatchlistPending ? (
                      "Deleting..."
                    ) : (
                      <Trash2 size={20} color="red" />
                    )}
                  </button>
                </div>
              </div>
            </div>

            <div className="text-sm">
              Created at{" "}
              {formatTimestamp(
                watchlistsSummary.map[watchlistId]?.createdAt as number,
              )}
            </div>
          </div>

          {(watchlistItems || []).length === 0 ? (
            <div className="flex justify-center items-center mx-7 mt-20">
              Chưa có gì
            </div>
          ) : (
            <>
              {(watchlistItems || []).length <= 5 ? (
                <div
                  className={`w-[90%] flex flex-wrap justify-center lg:justify-start gap-6 mx-6`}
                >
                  {(watchlistItems || []).map((item, index) => (
                    <div key={index} className="w-[200px]">
                      {isMovie(item.data) ? (
                        <WatchListItemCard
                          movie={item.data}
                          watchlistId={watchlistId}
                        />
                      ) : (
                        isTV(item.data) && (
                          <TVSerieWatchlistItemCard
                            tv={item.data}
                            watchlistId={watchlistId}
                          />
                        )
                      )}
                    </div>
                  ))}
                </div>
              ) : (
                <div
                  className={`grid grid-cols-[repeat(auto-fit,minmax(200px,1fr))] gap-6 mx-6 justify-center`}
                >
                  {(watchlistItems || []).map((item, index) => (
                    <div key={index} className="w-[200px]">
                      {isMovie(item.data) ? (
                        <WatchListItemCard
                          movie={item.data}
                          watchlistId={watchlistId}
                        />
                      ) : (
                        isTV(item.data) && (
                          <TVSerieWatchlistItemCard
                            tv={item.data}
                            watchlistId={watchlistId}
                          />
                        )
                      )}
                    </div>
                  ))}
                </div>
              )}
            </>
          )}
        </div>
      )}
    </div>
  );
};

export default WatchListIAlltems;
