"use client";

import { useCommentLikes } from "@/hooks/useCommentLikes";
import Image from "next/image";

export function LikedUsers({ commentId }: { commentId: string }) {
  const { likes } = useCommentLikes(commentId);

  if (likes.length === 0) return null;

  return (
    <div className="flex items-center gap-1 mt-1">
      {likes.slice(0, 5).map((u) => (
        <Image
          key={u.userId}
          src={
            u.userPhoto ||
            "https://instagram.fsgn2-10.fna.fbcdn.net/v/t51.82787-15/581517256_18068701709600173_5274976395804912378_n.jpg?stp=dst-jpg_e35_p1080x1080_tt6&_nc_cat=109&ig_cache_key=Mzc2NDkzNDA5OTg1MzIxMjcyMQ%3D%3D.3-ccb7-5&ccb=7-5&_nc_sid=58cdad&efg=eyJ2ZW5jb2RlX3RhZyI6InhwaWRzLjE0NDB4MTgwMC5zZHIuQzMifQ%3D%3D&_nc_ohc=DOVj3LH800EQ7kNvwFO8V3f&_nc_oc=AdnoeTlzflRgzwfSuKbw9otvQDDx8IPswvI3cMFGueo-40wyV-U0G26YWjYQVQRVNPBfmgP1sp4rXQA1lxHHANNx&_nc_ad=z-m&_nc_cid=0&_nc_zt=23&_nc_ht=instagram.fsgn2-10.fna&_nc_gid=h7vUdRadasuzUucATIRJwg&oh=00_Afnk4aWq1Q_hTW8mLdSARPsjw8HUhlvN7bmH3M1ibUu0eA&oe=694B2357"
          }
          alt={u.userName ?? "User"}
          width={20}
          height={20}
          className="rounded-full"
        />
      ))}
      {likes.length > 5 && (
        <span className="text-xs text-gray-500">+{likes.length - 5}</span>
      )}
    </div>
  );
}
