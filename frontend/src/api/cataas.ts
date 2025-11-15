import axios from "axios";

export async function getCatImageAPI() {
  try {
    const res = await axios.get("https://cataas.com/cat?position=center");
    return res.data;
  }catch (err : any) {
    return null;
  }
}
