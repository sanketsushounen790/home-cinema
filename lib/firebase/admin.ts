import { initializeApp, getApps, cert } from "firebase-admin/app";
import { getAuth } from "firebase-admin/auth";
import { getFirestore } from "firebase-admin/firestore";
import admin from "firebase-admin";

// Dùng service account từ env
const serviceAccount = JSON.parse(
  process.env.NEXT_PUBLIC_FIREBASE_SERVICE_ACCOUNT_KEY!
);

const app = getApps().length
  ? getApps()[0]
  : initializeApp({
      credential: cert(serviceAccount),
    });

export const adminAuth = getAuth(app);
export const adminDb = getFirestore(app);
export default admin; // 👈 QUAN TRỌNG
