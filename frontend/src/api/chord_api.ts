import axios from "axios";


export async function addToFavouriteAPI(chord: string) {
  const userData = {
    chord: chord
  };
  try {
    const res = await axios.post("http://localhost:8081/api/favChord", userData, {
      withCredentials: true
    });

    return res.data;
  }catch (err: any) {
    return null;
  }
}

export async function addToLearnedAPI(chord: string) {
  const userData = {
    chord: chord
  };
  try {
    const res = await axios.post("http://localhost:8081/api/learnedChord", userData, {
      withCredentials: true
    });
    return res.data
  }catch (err: any) {
    return null;
  }
}

export async function deleteFromFavouriteAPI(chord: string) {
  const userData = {
    chord: chord
  };
  try {
    const res = await axios.delete("http://localhost:8081/api/favChord", {
      data: userData,
      withCredentials: true
    });
    return res;
  }catch (err : any) {
    return null;
  }
}

export async function deleteFromLearnedAPI(chord: string) {
  const userData = {
    chord: chord
  };
  try {
    const res = await axios.delete("http://localhost:8081/api/learnedChord", {
      data: userData,
      withCredentials: true
    });
    return res;
  }catch (err : any) {
    return null;
  }
}
