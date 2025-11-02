import {User} from "@/models/user.ts";
import axios from "axios";

export async function loginAPI(user: User) {
  const token = user.getAuthToken();
  const userData = {
    email: user.getUserEmail(),
    password: user.getUserPassword(),
    admin: false
  }
  try {
    const res = await axios.post("http://localhost:8081/api/login", userData, {
      headers: {
        Authorization: `Bearer ${token}`
      },
      withCredentials: true // if backend sets HttpOnly cookie
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
    admin: false
  }
  try {
    const res = await axios.post("http://localhost:8081/api/register", userData, {
      headers: {
        Authorization: `Bearer ${token}`
      },
      withCredentials: true // if backend sets HttpOnly cookie
    });
    return res.data;
  } catch (err: any) {
    console.error("Login failed:", err.response?.data || err.message);
    return null;
  }
}
