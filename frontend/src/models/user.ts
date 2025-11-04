export class User {
  private email: string;
  private password: string;
  private token: string;
  private favouriteChords: Set<string>;
  private learnedChords: Set<string>;

  constructor(email?: string, password?: string, tokenValue?: string) {
    this.email = email || '';
    this.password = password || '';
    this.token = tokenValue || '';
    this.favouriteChords = new Set<string>();
    this.favouriteChords.add("C");
    this.learnedChords = new Set<string>();
  }
  setUser (email: string, password: string, token: string, favouriteChords: Set<string>, learnedChords: Set<string>) {
    this.email = email;
    this.password = password;
    this.token = token;
    this.favouriteChords = favouriteChords;
    this.learnedChords = learnedChords;
  }

  getAuthToken(): string | null {
    return this.token;
  }

  getUserEmail(): string | null {
    return this.email;
  }

  getUserPassword(): string | null {
    return this.password;
  }

  getFavouriteChords(): Set<string> | null {
    return this.favouriteChords;
  }

  getLearnedChords(): Set<string> | null {
    return this.learnedChords;
  }

  setFavouriteChords(favouriteChords : Set<string>) {
    this.favouriteChords = favouriteChords;
  }

  setLearnedChords(learnedChords : Set<string>) {
    this.learnedChords = learnedChords;
  }
}
export const userInstance = new User();
