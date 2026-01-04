"use client";

import { signOut } from "firebase/auth";
import { auth } from "@/lib/firebase/client";
import { useRouter } from "next/navigation";

export default function LogoutButton() {
  const router = useRouter();

  const handleLogout = async () => {
    await signOut(auth);

    await fetch("/api/auth/logout", {
      method: "POST",
    });

    router.push("/");
  };

  return (
    <button
      onClick={handleLogout}
      className="px-4 py-2 bg-red-500 text-white rounded-lg"
    >
      Logout
    </button>
  );
}

export async function handleLogout() {
  // 1) Logout Firebase client
  await signOut(auth);

  // 2) Xoá session cookie trên server
  await fetch("/api/auth/logout", {
    method: "POST",
  });
}
