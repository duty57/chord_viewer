import {reactive} from "vue";

export class User {
  private email: string;
  private password: string;
  private token: string;
  private favouriteChords = reactive(new Set<string>());
  private learnedChords = reactive(new Set<string>());

  constructor(email?: string, password?: string, tokenValue?: string) {
    this.email = email || '';
    this.password = password || '';
    this.token = tokenValue || '';
    this.favouriteChords = new Set<string>();
    this.learnedChords = new Set<string>();
  }
  setUser (email: string, password: string, token: string) {
    this.email = email;
    this.password = password;
    this.token = token;
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

  getFavouriteChords(): Set<string> {
    return this.favouriteChords;
  }

  getLearnedChords(): Set<string> {
    return this.learnedChords;
  }

  setFavouriteChords(favouriteChords : Set<string>) {
    this.favouriteChords = favouriteChords;
  }

  setLearnedChords(learnedChords : Set<string>) {
    this.learnedChords = learnedChords;
  }
}
export const userInstance = reactive<User>(new User());
