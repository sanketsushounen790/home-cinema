"use client";

import { useNotifications } from "@/hooks/useNotifications";
import { markNotificationAsRead } from "./markAsRead";
import { useUser } from "@/hooks/useUser";
import Image from "next/image";
import { useRouter } from "next/navigation";
import formatFirestoreTimestamp from "@/utils/formatFirestoreTimestamp";
import { useState } from "react";
import { Heart, MessageSquare } from "lucide-react";
import { useThemeStore } from "@/store/themeStore";

const PAGE_SIZE = 10;

const Notifications = () => {
  const router = useRouter();
  const { user } = useUser();
  const { theme } = useThemeStore();
  const notifications = useNotifications(user?.uid);

  console.log(notifications);

  const [visibleCount, setVisibleCount] = useState(PAGE_SIZE);

  const sortedNotifications = [...notifications].sort((a, b) => {
    const aTime = a.createdAt?.seconds ?? 0;
    const bTime = b.createdAt?.seconds ?? 0;
    return bTime - aTime; // DESC
  });

  const visibleNotifications = sortedNotifications.slice(0, visibleCount);

  const handleClickNotification = (n: any) => {
    markNotificationAsRead(n.id);

    console.log(n);

    if (!n.postId || !n.commentId) return;

    let commentParam = n.commentId;

    // 👉 nếu là reply thì append thêm replyId
    if (n.type === "reply" && n.replyId) {
      commentParam = `${n.commentId}_${n.replyId}`;
    }

    let mediaId = "";

    const mediaType = n.postId.split("_")[0];
    if (mediaType === "movie") {
      mediaId = n.postId.split("_")[1];

      router.push(`/${mediaType}/${mediaId}/watch?comment=${commentParam}`);
    } else {
      mediaId = n.postId.split("_")[1];
      const tvSeasonId = n.postId.split("_")[2];
      const tvEpisodeId = n.postId.split("_")[3];
      const tvEpisodeIndex = String(
        Number(tvEpisodeId) >= 1
          ? Number(tvEpisodeId) - 1
          : Number(tvEpisodeId),
      );

      router.push(
        `/${mediaType}/${mediaId}/season/${tvSeasonId}/episode/${tvEpisodeId}_${tvEpisodeIndex}?comment=${commentParam}`,
      );
    }
  };

  console.log(notifications);

  return (
    <div className="w-full h-[calc(100vh-64px)] flex flex-col justify-start items-center mt-20">
      <div className="w-[70%] flex justify-start items-center font-bold text-[20px] p-2">
        Notifications
      </div>
      <div className="w-[70%] h-[550px] overflow-y-auto p-3  rounded-lg bg-base-200 shadow-xl">
        {visibleNotifications.map((n) => (
          <div
            key={n.id}
            onClick={() => handleClickNotification(n)}
            className={`
            flex items-start gap-3 p-3 my-2 rounded-lg cursor-pointer
            transition
            ${
              n.read
                ? "bg-transparent"
                : theme === "light"
                  ? "bg-blue-100"
                  : "bg-base-300"
            }
            ${theme === "light" ? "hover:bg-blue-200" : "hover:bg-gray-800"}
          `}
          >
            {/* Avatar */}
            <Image
              src={n.fromUserPhoto}
              width={32}
              height={32}
              alt="avatar"
              className="rounded-full shrink-0"
            />

            {/* Content */}
            <div className="flex-1">
              <div className="text-sm">
                <span className="font-semibold">{n.fromUserName}</span>
                {n.type === "like" ? (
                  <div className="w-full flex justify-start items-center">
                    <span className="w-full flex justify-start items-center">
                      {" "}
                      đã thích <Heart
                        size={15}
                        fill="red"
                        className="mx-2"
                      />{" "}
                      comment của bạn
                    </span>
                  </div>
                ) : (
                  <div className="w-full flex justify-start items-center">
                    <span className="w-full flex justify-start items-center">
                      {" "}
                      đã trả lời{" "}
                      <MessageSquare
                        size={15}
                        fill="blue"
                        className="mx-2"
                      />{" "}
                      comment của bạn
                    </span>{" "}
                  </div>
                )}
              </div>

              <p className="text-xs text-gray-500 mt-1">
                {formatFirestoreTimestamp(n.createdAt)}
              </p>
            </div>

            {/* Unread dot */}
            {!n.read && (
              <span className="mt-1 w-2 h-2 rounded-full bg-primary shrink-0" />
            )}
          </div>
        ))}

        {/* ===== LOAD MORE ===== */}
        {visibleCount < notifications.length && (
          <div className="flex justify-center py-3">
            <button
              onClick={() => setVisibleCount((v) => v + PAGE_SIZE)}
              className="text-sm text-primary hover:underline cursor-pointer"
            >
              Xem thêm ({notifications.length - visibleCount})
            </button>
          </div>
        )}

        {/* ===== EMPTY ===== */}
        {notifications.length === 0 && (
          <p className="text-center text-sm text-gray-500 mt-8">
            Không có thông báo nào
          </p>
        )}
      </div>
    </div>
  );
};

export default Notifications;
