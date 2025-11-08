import {
  addToFavouriteAPI,
  addToLearnedAPI,
  deleteFromFavouriteAPI,
  deleteFromLearnedAPI
} from "@/api/chord_api.ts";

export function removeFromFavourite(chords: Set<string>, key: string) : void {
  deleteFromFavouriteAPI(key).then(r => chords.delete(key));
  //add api calls
}

export function addToFavourite(chords: Set<string>, key: string) : void {
  addToFavouriteAPI(key).then(r => chords.add(key));
  //add api calls
}

export function removeFromLearned(chords: Set<string>, key: string) : void {
  deleteFromLearnedAPI(key).then(r => chords.delete(key));
}

export function addToLearned(chords: Set<string>, key: string) : void {
  addToLearnedAPI(key).then(r => chords.add(key));
  //add api calls
}
