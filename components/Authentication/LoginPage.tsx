"use client";

import { useSearchParams, useRouter } from "next/navigation";
import {
  GoogleAuthProvider,
  GithubAuthProvider,
  signInWithPopup,
} from "firebase/auth";
import { auth } from "@/lib/firebase/client";
import { useThemeStore } from "@/store/themeStore";
import { useState } from "react";

export default function LoginPage() {
  const [authError, setAuthError] = useState<string | null>(null);
  const searchParams = useSearchParams();
  const router = useRouter();
  const from = searchParams.get("from") || "/";
  const { theme } = useThemeStore();

  const handleLoginWithGoogle = async () => {
    try {
      setAuthError(null);

      const provider = new GoogleAuthProvider();
      const result = await signInWithPopup(auth, provider);

      const user = result.user;
      const idToken = await user.getIdToken();

      await fetch("/api/auth/session", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ idToken }),
      });

      router.push(from);
    } catch (err: any) {
      // console.log(err);

      if (err.code === "auth/account-exists-with-different-credential") {
        setAuthError(
          "This email is already in use. Please sign in using your previous method."
        );
        return;
      }

      if (err.code === "auth/popup-closed-by-user") {
        return; // user closed popup → no error reported
      }

      setAuthError("Google sign-in failed. Please try again.");
    }
  };

  const handleLoginWithGithub = async () => {
    try {
      setAuthError(null);

      const provider = new GithubAuthProvider();
      provider.addScope("read:user");

      const result = await signInWithPopup(auth, provider);

      const user = result.user;
      const idToken = await user.getIdToken();

      await fetch("/api/auth/session", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ idToken }),
      });

      router.push(from);
    } catch (err: any) {
      // console.log(err);

      if (err.code === "auth/account-exists-with-different-credential") {
        setAuthError(
          "This email is already in use. Please sign in using your previous method."
        );
        return;
      }

      if (err.code === "auth/popup-closed-by-user") {
        return;
      }

      setAuthError("GitHub sign-in failed. Please try again.");
    }
  };


  return (
    <div
      className="bg-cover bg-center"
      style={{
        backgroundImage:
          "url('https://images2.alphacoders.com/691/thumb-1920-691515.jpg')",
        height: "calc(100vh - 64px)",
      }}
    >
      <div className="min-h-full flex items-center justify-center bg-black/40">
        <div className="bg-base-100 backdrop-blur-sm p-10 rounded-xl shadow-xl w-full max-w-sm">
          <h2 className="text-2xl font-bold text-center mb-6">Sign In</h2>

          <button
            onClick={handleLoginWithGoogle}
            className={`w-full flex items-center gap-3 border border-gray-300 bg-gray-300 py-3 px-4 rounded-lg transition cursor-pointer ${
              theme === "dark" ? "hover:bg-gray-400" : "hover:bg-base-300"
            }`}
          >
            <img
              width="24"
              height="24"
              src="https://img.icons8.com/color/48/google-logo.png"
              alt="google-logo"
            />
            <span className="text-gray-700">Sign in with Google</span>
          </button>


          <button
            onClick={handleLoginWithGithub}
            className="mt-3 w-full flex items-center gap-3 bg-gray-500 text-white py-3 px-4 rounded-lg hover:bg-gray-600 transition cursor-pointer"
          >
            <img
              width="24"
              height="24"
              src="https://img.icons8.com/material-rounded/24/github.png"
              alt="github"
            />
            <span>Sign in with GitHub</span>
          </button>

          {authError && (
            <div className="flex items-center justify-center text-red-500 text-sm mt-2">
              {authError}
            </div>
          )}
        </div>
      </div>
    </div>
  );
}
