import {User} from "@/models/user.ts";
import api from "@/config/api_config.ts";

export async function loginAPI(user: User) {
  const token = user.token;
  const userData = {
    email: user.email,
    password: user.password,
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
  const token = user.token;
  const userData = {
    email: user.email,
    password: user.password,
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

export async function logoutAPI() {
  try {
    const res = await api.post("/logout");
    return res.data;
  } catch (err: any) {
    return null;
  }
}

export async function updateProfilePictureAPI(url : string) {
  try {
    const res = await api.put("/profile-picture", {profilePictureUrl: url});
    return res.data;
  }catch (err : any) {
    return null;
  }
}
