"use client";

import { useState } from "react";

import { useCreateWatchlist } from "@/hooks/useCreateWatchlist";
import { useGetWatchlistsSummary } from "@/hooks/useGetWatchlistsSummary";
import { useGetItemIndex } from "@/hooks/useGetItemIndex";

import { useUser } from "@/hooks/useUser";
import PopupModal from "../Shared_Components/PopupModal";
import TVSerieWatchlistModalItems from "./TVSerieWatchlistModalItems";
import ModalPopup from "../Movie/ModalPopup";

interface TVSerieWatchlistModalProps {
  open: boolean;
  onClose: () => void;
  itemData: TV;
}

export default function TVSerieWatchlistModal({
  open,
  onClose,
  itemData,
}: TVSerieWatchlistModalProps) {
  const { user, loading: userLoading } = useUser();
  const [watchlistTitleOpen, setWatchlistTitleOpen] = useState<boolean>(false);
  const [newWatchlistTitle, setNewWatchlistTitle] = useState<string>("");

  //console.log(newWatchlistTitle);

  const { data: itemIndexMap } = useGetItemIndex(open);

  const itemId = `tv_${itemData.id}`;

  const watchlistIds = itemIndexMap?.[itemId]?.watchlistIds || [];

  const {
    data: watchlistsSummary,
    isLoading: isWatchlistsLoading,
    isError: isWatchlistsError,
    error: watchlistsError,
  } = useGetWatchlistsSummary(!userLoading && !!user?.uid);

  const {
    mutate: createWatchlist,
    mutateAsync: createWatchlistAsync,
    isPending: isCreateWatchlistPending,
    isError: isCreateWatchlistError,
    error: createWatchlistError,
  } = useCreateWatchlist();

  const handleSubmitCreateWatchlist = async () => {
    if (newWatchlistTitle === "") return;

    try {
      await createWatchlistAsync(newWatchlistTitle);
      setWatchlistTitleOpen(false);
    } catch (err) {
      console.error(err);
    }
  };

  return (
    <ModalPopup open={open} onClose={onClose}>
      {user?.uid ? (
        <>
          <div className="flex justify-center items-center mb-4">
            <div className="flex justify-start text-xl font-semibold">
              Add to Watchlistssss
            </div>
            <div className="flex-1 flex justify-end">
              <button
                className="px-4 py-2 rounded-lg border text-sm bg-base-100 hover:bg-base-300 cursor-pointer"
                onClick={onClose}
              >
                Close
              </button>
            </div>
          </div>

          <div className="space-y-3 max-h-60 overflow-y-auto p-0 border-1">
            {watchlistsSummary?.list.map((item, index) => (
              <div key={index}>
                <TVSerieWatchlistModalItems
                  watchlistIds={watchlistIds}
                  item={item}
                  itemData={itemData}
                  onClose={onClose}
                />
              </div>
            ))}
          </div>

          {/* New watchlist button */}
          {watchlistTitleOpen ? (
            <div className="mt-5">
              <input
                className="shadow appearance-none border rounded w-full py-2 px-3 leading-tight focus:outline-none focus:shadow-outline"
                type="text"
                placeholder="Watchlist Title"
                onChange={(e) => setNewWatchlistTitle(e.target.value)}
              />

              <div className="flex justify-end gap-3 mt-4">
                <button
                  className="px-4 py-2 rounded-lg border text-sm bg-base-100 hover:bg-base-300 cursor-pointer"
                  onClick={() => setWatchlistTitleOpen(false)}
                >
                  Cancel
                </button>

                <button
                  className="px-4 py-2 rounded-lg bg-blue-600 hover:bg-blue-700 text-white text-sm cursor-pointer"
                  disabled={
                    isCreateWatchlistPending || newWatchlistTitle === ""
                  }
                  onClick={handleSubmitCreateWatchlist}
                >
                  {isCreateWatchlistPending ? "Creating..." : "Create"}
                </button>
              </div>

              {isCreateWatchlistError && (
                <div className="text-red-700">
                  Error: {createWatchlistError.message} !
                </div>
              )}
            </div>
          ) : (
            <button
              className="w-full mt-5 py-2 rounded-lg bg-blue-600 text-white text-sm cursor-pointer"
              onClick={() => setWatchlistTitleOpen(true)}
            >
              + Create New Watchlist
            </button>
          )}
        </>
      ) : (
        <div>Please Login To Use This Feature !</div>
      )}
    </ModalPopup>
  );
}
