import { Injectable } from '@angular/core';
@Injectable({
  providedIn: 'root',
})
export class AdminAuthService {
  public isAdmin: string | null = localStorage.getItem('isAdmin');
  public isAdminAccess(): string | null {
    return this.isAdmin;
  }
}
