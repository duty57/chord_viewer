import {User} from "@/models/user.ts";
import api from "@/config/firebase.ts";

export async function loginAPI(user: User) {
  const token = user.getAuthToken();
  const userData = {
    email: user.getUserEmail(),
    password: user.getUserPassword(),
    admin: false,
  };
  try {
    const res = await api.post("/login", userData, {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    });
    return res.data;
  } catch (err: any) {
    console.error("Login failed:", err.response?.data || err.message);
    return null;
  }
}

export async function registerAPI(user: User) {
  const token = user.getAuthToken();
  const userData = {
    email: user.getUserEmail(),
    password: user.getUserPassword(),
    admin: false,
  };
  try {
    const res = await api.post("/register", userData, {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    });
    return res.data;
  } catch (err: any) {
    console.error("Registration failed:", err.response?.data || err.message);
    return null;
  }
}

export async function meAPI() {
  try {
    const res = await api.get("/me");
    return res.data;
  } catch (err: any) {
    console.log("No session", err);
    return null;
  }
}
