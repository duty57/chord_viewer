import axios from "axios";


export async function addToFavouriteAPI(chord: string, token : string | undefined) {
  const userData = {
    chord: chord
  };
  try {
    const res = await axios.post("http://localhost:8081/api/favChord", userData, {
      headers: {
        Authorization: `Bearer ${token}`
      }
    });
    return res.data;
  }catch (err: any) {
    return null;
  }
}

export async function addToLearnedAPI(chord: string, token : string | undefined) {
  const userData = {
    chord: chord
  };
  try {
    const res = await axios.post("http://localhost:8081/api/learnedChord", userData, {
      headers: {
        Authorization: `Bearer ${token}`
      }
    });
    return res.data
  }catch (err: any) {
    return null;
  }
}

export async function deleteFromFavouriteAPI(chord: string, token : string | undefined) {
  const userData = {
    chord: chord
  };
  try {
    const res = await axios.delete("http://localhost:8081/api/favChord", {
      data: userData,
      headers: {
        Authorization: `Bearer ${token}`
      }
    });
    return res.data;
  }catch (err : any) {
    return null;
  }
}

export async function deleteFromLearnedAPI(chord: string, token : string | undefined) {
  const userData = {
    chord: chord
  };
  try {
    const res = await axios.delete("http://localhost:8081/api/learnedChord", {
      data: userData,
      headers: {
        Authorization: `Bearer ${token}`
      }
    });
    return res.data;
  }catch (err : any) {
    return null;
  }
}
