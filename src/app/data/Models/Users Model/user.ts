export interface User {
  fullName: string;
  email: string;
  password: string;
  confirmedPassword: string;
  id?: string;
  isAdmin: boolean;
}
export class cUser {
  constructor(
    public email: string,
    public id: string,
    private _token: string,
    private _tokenExpirationDate: Date
  ) {}
  get token() {
    if (!this._tokenExpirationDate || new Date() > this._tokenExpirationDate) {
      return null;
    }
    return this._token;
  }
}
