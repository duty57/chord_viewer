import {
  addToFavouriteAPI,
  addToLearnedAPI,
  deleteFromFavouriteAPI,
  deleteFromLearnedAPI
} from "@/api/chord_api.ts";
import Router from "@/router";
//TODO: wrap into try catch
export async function removeFromFavourite(chords: Set<string>, key: string) : Promise<void> {
  await deleteFromFavouriteAPI(key).then(() => chords.delete(key));
  //add api calls
}

export async function addToFavourite(chords: Set<string>, key: string) : Promise<void> {
  await addToFavouriteAPI(key).then(() => chords.add(key));
  //add api calls
}

export async function removeFromLearned(chords: Set<string>, key: string) : Promise<void> {
  await deleteFromLearnedAPI(key).then(() => chords.delete(key));
}

export async function addToLearned(chords: Set<string>, key: string) : Promise<void> {
  await addToLearnedAPI(key).then(() => chords.add(key));
  //add api calls
}

export function navigateToChord(router : typeof Router, chordName: string) {
  router.push({
    path: "/chords",
    query: {chord: chordName}
  });
}
