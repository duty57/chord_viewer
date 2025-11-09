import {User} from "@/models/user.ts";
import axios from "axios";
import {signInWithEmailAndPassword} from "firebase/auth";
import {auth} from "@/config/firebase.ts";

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
       // if backend sets HttpOnly cookie
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
       // if backend sets HttpOnly cookie
    });
    return res.data;
  } catch (err: any) {
    console.error("Login failed:", err.response?.data || err.message);
    return null;
  }
}

export async function meAPI(token : string | undefined) {
  console.log("TOOOKKEEN", token)
  try {
    const res = await axios.get("http://localhost:8081/api/me", {
      headers: {
        Authorization: `Bearer ${token}`
      },
    });
    return res.data;
  }catch (err : any) {
    console.log("No session", err);
    return;
  }
}
