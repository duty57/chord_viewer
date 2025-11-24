import {auth} from "@/config/firebase.ts";
import axios from "axios";

export const api = axios.create({
  baseURL: "https://chord-viewer.onrender.com/api",
  withCredentials: true,
});


let isRefreshing = false;
let failedQueue: any[] = [];

// const processQueue = (error: any, token: string | null = null) => {
//   failedQueue.forEach(prom => {
//     if (error) {
//       prom.reject(error);
//     } else {
//       prom.resolve(token);
//     }
//   });
//   failedQueue = [];
// };
//
// api.interceptors.response.use(
//   (response) => response,
//   async (error) => {
//     const originalRequest = error.config;
//
//     // If error is 401 and we haven't retried yet
//     if (error.response?.status === 401 && !originalRequest._retry) {
//
//       // Don't try to refresh if already on login page
//       if (window.location.pathname === '/') {
//         return Promise.reject(error);
//       }
//
//       if (isRefreshing) {
//         return new Promise((resolve, reject) => {
//           failedQueue.push({ resolve, reject });
//         }).then(() => {
//           return api(originalRequest);
//         }).catch(err => {
//           return Promise.reject(err);
//         });
//       }
//
//       originalRequest._retry = true;
//       isRefreshing = true;
//
//       try {
//         // Get fresh Firebase ID token
//         const currentUser = auth.currentUser;
//         if (!currentUser) {
//           throw new Error("No authenticated user");
//         }
//
//         const newIdToken = await currentUser.getIdToken(true); // Force refresh
//         console.log("REFRESHING");
//         await api.post("/refresh", {}, {
//           headers: {
//             Authorization: `Bearer ${newIdToken}`,
//           },
//         });
//
//         processQueue(null, newIdToken);
//         isRefreshing = false;
//
//         // Retry original request
//         return api(originalRequest);
//       } catch (err) {
//         processQueue(err, null);
//         isRefreshing = false;
//
//         if (window.location.pathname !== '/') {
//           window.location.href = "/";
//         }
//         return Promise.reject(err);
//       }
//     }
//     return Promise.reject(error);
//   }
// );

export default api;
