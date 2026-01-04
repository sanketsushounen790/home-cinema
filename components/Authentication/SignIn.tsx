"use client";

import React from "react";
import {
  GoogleAuthProvider,
  signInWithPopup,
  signInWithRedirect,
} from "firebase/auth";
import { auth } from "../../lib/firebase/client"; // Import instance auth của bạn

const SignInButton: React.FC = () => {
  const handleGoogleSignIn = async () => {
    const provider = new GoogleAuthProvider();

    const result = await signInWithPopup(auth, provider);

    const idToken = await result.user.getIdToken();

    // Gửi idToken lên server
    await fetch("/api/auth/login", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ idToken }),
    });

    window.location.href = "/user";
  };

  return <button onClick={handleGoogleSignIn}>Đăng nhập bằng Google</button>;
};

export default SignInButton;
