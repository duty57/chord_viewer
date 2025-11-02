export class User {
  private email: string;
  private password: string;
  private token: string;

  constructor(email?: string, password?: string, tokenValue?: string) {
    this.email = email || '';
    this.password = password || '';
    this.token = tokenValue || '';
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
}
export const userInstance = new User();
