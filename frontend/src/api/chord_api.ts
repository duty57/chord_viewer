import {auth} from "@/config/firebase.ts";
import api from "@/config/api_config.ts";

export async function addToFavouriteAPI(chord: string) {
  try {
    const res = await api.post("/favChord", {chord});
    return res.data;
  }catch (err: any) {
    return null;
  }
}

export async function addToLearnedAPI(chord: string) {

  try {
    const res = await api.post("/learnedChord", {chord});
    return res.data
  }catch (err: any) {
    return null;
  }
}

export async function deleteFromFavouriteAPI(chord: string) {
  try {
    const res = await api.delete("/favChord", {
    data: {
      chord
    }
  });
    return res.data;
  }catch (err : any) {
    return null;
  }
}

export async function deleteFromLearnedAPI(chord: string) {
  try {
    const res = await api.delete("/learnedChord", {
      data: {chord}
    });
    return res.data;
  }catch (err : any) {
    return null;
  }
}

export async function getChordPosition(chord: string) {
  try {
    const idToken = await auth.currentUser?.getIdToken(false);
    const res = await api.get(`/chord?chord=${chord}`, {
      headers: {
        Authorization: `Bearer ${idToken}`
      }
    });
    return res.data;
  }catch (err : any) {
    return null;
  }
}

export async function addChordCommentAPI(comment: string) {
  try {
    const res = await api.post("/chord/comment", {
      data: {comment}
    });
    return res.data;
  }catch (err: any) {
    return null
  }
}
