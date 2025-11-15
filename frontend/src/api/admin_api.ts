import api from "@/config/api_config.ts";

export async function getUserCountAPI(){
  try {
    const res = await api.get("/admin/users/count");
    return res.data;
  }catch (err : any) {
    return 0;
  }
}
