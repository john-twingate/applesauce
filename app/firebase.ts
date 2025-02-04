import { initializeApp } from "firebase/app"
import { getFirestore } from "firebase/firestore"
import { getAuth } from "firebase/auth"
import { getAnalytics } from "firebase/analytics"

const firebaseConfig = {
  apiKey: "AIzaSyDVA2JpCMJfUfYJaGyFuoSphSv3gb-t6pA",
  authDomain: "twingate-hackathon.firebaseapp.com",
  databaseURL: "https://twingate-hackathon-default-rtdb.firebaseio.com",
  projectId: "twingate-hackathon",
  storageBucket: "twingate-hackathon.firebasestorage.app",
  messagingSenderId: "573274510718",
  appId: "1:573274510718:web:c8d4c9b2d74e39c9ed0f2f",
  measurementId: "G-S6GW0RSZGN",
}

const app = initializeApp(firebaseConfig)
export const db = getFirestore(app)
export const auth = getAuth(app)

let analytics
if (typeof window !== "undefined") {
  analytics = getAnalytics(app)
}
export { analytics }

