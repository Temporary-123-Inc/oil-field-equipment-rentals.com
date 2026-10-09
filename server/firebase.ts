import { cert, getApps, initializeApp } from "firebase-admin/app";
import { getDatabase } from "firebase-admin/database";
import { getAppCheck } from "firebase-admin/app-check";
import { getFirestore } from "firebase-admin/firestore";
import { required } from "./env.js";
import { asAdminRealtimeDatabase } from "./realtime-database.js";
function firebasePrivateKey() {
  const encoded = process.env.FIREBASE_PRIVATE_KEY_BASE64?.trim();
  if (encoded) {
    const decoded = Buffer.from(encoded, "base64").toString("utf8");
    if (
      !decoded.includes("-----BEGIN PRIVATE KEY-----") ||
      !decoded.includes("-----END PRIVATE KEY-----")
    )
      throw new Error("FIREBASE_PRIVATE_KEY_BASE64 is not a complete PEM key.");
    return decoded;
  }
  const value = required("FIREBASE_PRIVATE_KEY").replace(/\\n/g, "\n");
  if (
    !value.includes("-----BEGIN PRIVATE KEY-----") ||
    !value.includes("-----END PRIVATE KEY-----")
  )
    throw new Error("FIREBASE_PRIVATE_KEY is not a complete PEM key.");
  return value;
}
export function firebase() {
  if (
    process.env.FIREBASE_DATABASE_EMULATOR_HOST ||
    process.env.FIRESTORE_EMULATOR_HOST ||
    process.env.FIREBASE_AUTH_EMULATOR_HOST
  )
    throw new Error("Deployed backend refuses emulator configuration.");
  const app =
    getApps().find((app) => app.name === "temporary-kitchen-rental-server") ||
    initializeApp(
      {
        databaseURL: required("FIREBASE_DATABASE_URL"),
        credential: cert({
          projectId: required("FIREBASE_PROJECT_ID"),
          clientEmail: required("FIREBASE_CLIENT_EMAIL"),
          privateKey: firebasePrivateKey(),
        }),
      },
      "temporary-kitchen-rental-server",
    );
  return {
    db: asAdminRealtimeDatabase(getDatabase(app)),
    firestore: getFirestore(app),
    appCheck: getAppCheck(app),
  };
}
