import {
  addToFavouriteAPI,
  addToLearnedAPI,
  deleteFromFavouriteAPI,
  deleteFromLearnedAPI
} from "@/api/chord_api.ts";
//TODO: wrap into try catch
export async function removeFromFavourite(chords: Set<string>, key: string, token : string | undefined) : Promise<void> {
  await deleteFromFavouriteAPI(key, token).then(() => chords.delete(key));
  //add api calls
}

export async function addToFavourite(chords: Set<string>, key: string, token : string | undefined) : Promise<void> {
  await addToFavouriteAPI(key, token).then(() => chords.add(key));
  //add api calls
}

export async function removeFromLearned(chords: Set<string>, key: string, token : string | undefined) : Promise<void> {
  await deleteFromLearnedAPI(key, token).then(() => chords.delete(key));
}

export async function addToLearned(chords: Set<string>, key: string, token : string | undefined) : Promise<void> {
  await addToLearnedAPI(key, token).then(() => chords.add(key));
  //add api calls
}
