
export function removeFromFavourite(chords: Set<string>, key: string) : void {
  chords.delete(key);
  //add api calls
}

export function addToFavourite(chords: Set<string>, key: string) : void {
  chords.add(key);
  //add api calls
}

export function removeFromLearned(chords: Set<string>, key: string) : void {
  chords.delete(key);
  //add api calls

}

export function addToLearned(chords: Set<string>, key: string) : void {
  chords.add(key);
  //add api calls
}
