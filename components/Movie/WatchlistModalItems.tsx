import { useAddItemToWatchlist } from "@/hooks/useAddItemToWatchlist";
import { useRemoveItemFromWatchlist } from "@/hooks/useRemoveItemFromWatchlist";
import { Check, SquareCheck, SquareX, X } from "lucide-react";

interface WatchlistModalItemsProps {
  watchlistIds: string[];
  item: WatchlistSummary;
  itemData: Movie;
  onClose: () => void;
}

const WatchlistModalItems = ({
  watchlistIds,
  item,
  itemData,
  onClose,
}: WatchlistModalItemsProps) => {
  const {
    mutate: addItem,
    mutateAsync: addItemAsync,
    isPending: isAddItemPending,
    isError: isAddItemError,
    error: addItemError,
  } = useAddItemToWatchlist(item.id);

  const {
    mutate: removeItem,
    mutateAsync: removeItemAsync,
    isPending: isRemoveItemPending,
    isError: isRemoveItemError,
    error: removeItemError,
  } = useRemoveItemFromWatchlist(item.id);

  const handleSubmitAddItemToWatchlist = async () => {
    if (!itemData) return;

    try {
      await addItemAsync({
        id: `movie_${itemData.id}`,
        media_type: "movie",
        data: itemData,
      });
    } catch (err) {
      console.error(err);
    }
  };

  const handleSubmitRemoveItemToWatchlist = async () => {
    if (!itemData) return;

    try {
      await removeItemAsync(`movie_${itemData.id}`);
    } catch (err) {
      console.error(err);
    }
  };

  return (
    <div className="flex items-center justify-between bg-base-300 p-3 rounded-lg">
      {/* Left: Watchlist's title and isAdded status */}
      <div className="flex items-center gap-2">
        {watchlistIds.includes(item.id) ? (
          <SquareCheck size={22} />
        ) : (
          <SquareX size={22} />
        )}
        <span className="text-sm">{item?.title}</span>
      </div>

      {/* Right: Add/Remove Item */}
      <div className="flex items-center gap-2">
        {watchlistIds.includes(item.id) ? (
          <div>
            <button
              className="px-4 py-2 rounded-lg bg-red-600 hover:bg-red-700 text-white text-sm cursor-pointer"
              disabled={isRemoveItemPending}
              onClick={handleSubmitRemoveItemToWatchlist}
            >
              {isRemoveItemPending ? "Removing..." : "Remove"}
            </button>

            {isRemoveItemError && (
              <div className="text-red-700">
                Error: {removeItemError.message} !
              </div>
            )}
          </div>
        ) : (
          <div>
            <button
              className="px-4 py-2 rounded-lg bg-green-600 hover:bg-green-700 text-white text-sm cursor-pointer"
              disabled={isAddItemPending}
              onClick={handleSubmitAddItemToWatchlist}
            >
              {isAddItemPending ? "Adding..." : "Add"}
            </button>

            {isAddItemError && (
              <div className="text-red-700">
                Error: {addItemError.message} !
              </div>
            )}
          </div>
        )}
      </div>
    </div>
  );
};

export default WatchlistModalItems;
