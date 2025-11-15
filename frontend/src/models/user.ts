import {reactive} from "vue";

export class User {

  get profilePictureUrl(): string | undefined {
    return this._profilePictureUrl;
  }
  get token(): string | undefined {
    return this._token;
  }
  get password(): string {
    return this._password;
  }
  get email(): string {
    return this._email;
  }
  get favouriteChords() {
    return this._favouriteChords;
  }

  get learnedChords() {
    return this._learnedChords;
  }

  set profilePictureUrl(value: string) {
    this._profilePictureUrl = value;
  }

  private _email: string;
  private _password: string;
  private _token: string | undefined;
  private _profilePictureUrl: string | undefined;
  private _favouriteChords = reactive(new Set<string>());
  private _learnedChords = reactive(new Set<string>());

  constructor(email?: string, password?: string, tokenValue?: string) {
    this._email = email || '';
    this._password = password || '';
    this._token = tokenValue || '';
    this._profilePictureUrl = "";
    this._favouriteChords = new Set<string>();
    this._learnedChords = new Set<string>();
  }
  setUser (email: string, password: string, token: string | undefined, profilePictureUrl: string | undefined, favouriteChords: Array<string>, learnedChords: Array<string>) {
    this._email = email;
    this._password = password;
    this._token = token;
    this._profilePictureUrl = profilePictureUrl;
    if (favouriteChords) favouriteChords.forEach(chord => this._favouriteChords.add(chord));
    if (learnedChords) learnedChords.forEach(chord => this._learnedChords.add(chord));
    console.log(this);
  }

}
export const userInstance = reactive<User>(new User());
