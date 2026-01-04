"use client";

import { useState } from "react";
import PopupModal from "../Shared_Components/PopupModal";
import { useCreateWatchlist } from "@/hooks/useCreateWatchlist";
import { useUser } from "@/hooks/useUser";

interface CreateNewWatchlistModalProps {
  open: boolean;
  onClose: () => void;
}

export default function CreateNewWatchlistModal({
  open,
  onClose,
}: CreateNewWatchlistModalProps) {
  const [title, setTitle] = useState("");

  const {
    mutate: createWatchlist,
    mutateAsync: createWatchlistAsync,
    isPending: isCreateWatchlistPending,
    isError: isCreateWatchlistError,
    error: createWatchlistError,
  } = useCreateWatchlist();

  const handleCloseModal = () => {
    setTitle("");
    onClose();
  };

  const handleSubmitCreateWatchlist = async () => {
    if (title === "") return;

    try {
      await createWatchlistAsync(title);
      handleCloseModal();
    } catch (err) {
      console.error(err);
    }
  };

  return (
    <PopupModal open={open} onClose={onClose}>
      <h2 className="text-xl font-semibold mb-4">Create New Watchlist</h2>

      {/* Footer buttons */}
      <div className="flex flex-col justify-center gap-3 mt-4">
        <input
          className="w-full px-3 py-2 border rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
          value={title}
          onChange={(e) => setTitle(e.target.value)}
          placeholder="Enter watchlist name"
        />

        {isCreateWatchlistError && (
          <div className="text-red-700">
            Error: {createWatchlistError?.message} !
          </div>
        )}
        <div className="flex justify-end gap-3 mt-4">
          <button
            className="px-4 py-2 rounded-lg border text-sm bg-base-100 hover:bg-base-300 cursor-pointer"
            onClick={handleCloseModal}
          >
            Cancel
          </button>

          <button
            className="px-4 py-2 rounded-lg text-white text-sm bg-blue-500 hover:bg-blue-600 cursor-pointer"
            disabled={isCreateWatchlistPending}
            onClick={handleSubmitCreateWatchlist}
          >
            {isCreateWatchlistPending ? "Adding..." : "Done"}
          </button>
        </div>
      </div>
    </PopupModal>
  );
}
