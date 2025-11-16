import api from "@/config/api_config.ts";

export async function getUserCountAPI(){
  try {
    const res = await api.get("/admin/users/count");
    return res.data;
  }catch (err : any) {
    return 0;
  }
}

export async function getUsersAPI(page: number) {
  try {
    const res = await api.get(`/admin/users?page=${page}`);
    return res.data;
  }catch (err: any) {
    return null;
  }
}

export async function updateUserEmailAPI(prevEmail: string, newEmail: string) {
  try {
    const res = await api.put("/admin/users/email", {prevEmail: prevEmail, newEmail: newEmail})
    return res.data;
  }catch (err: any) {
    return null;
  }
}

export async function updateUserProfilePictureAPI(email: string, profilePictureUrl: string) {
  try {
    const res = await api.put("/admin/users/picture", {email: email, profilePictureUrl: profilePictureUrl})
    return res.data;
  }catch (err: any) {
    return null;
  }
}

export async function promoteToAdminAPI(email: string) {
  try {
    const res = await api.put("/admin/users/promote", {email : email});
    return res.data;
  }catch (err : any) {
    return null;
  }
}

export async function deleteUserAPI(email: string) {
  try {
    const res = await api.delete(`admin/users?email=${email}`);
    return res.data;
  }catch (err : any) {
    return null;
  }
}

export async function accessAdminPageAPI() {
  try {
    const res = await api.get("admin/access");
    return res.data;
  }catch (err : any) {
    return null;
  }
}
