import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class UserIdentifierService {

  private cookieName = 'survey-user-id';
  private localStorageKey = 'survey-user-id';

  constructor() {}

  // Generate a unique identifier (UUID)
  private generateUUID(): string {
    return 'xxxxxxxx-xxxx-4xxx-yxxx-xxxxxxxxxxxx'.replace(/[xy]/g, (c) => {
      const r = Math.random() * 16 | 0,
        v = c === 'x' ? r : (r & 0x3) | 0x8;
      return v.toString(16);
    });
  }

  // Set a cookie
  private setCookie(name: string, value: string, days: number) {
    const date = new Date();
    date.setTime(date.getTime() + days * 24 * 60 * 60 * 1000);
    const expires = 'expires=' + date.toUTCString();
    document.cookie = `${name}=${value}; ${expires}; path=/`;
  }

  // Get a cookie
  private getCookie(name: string): string | null {
    const nameEQ = name + '=';
    const cookies = document.cookie.split(';');
    for (const cookie of cookies) {
      const c = cookie.trim();
      if (c.indexOf(nameEQ) === 0) return c.substring(nameEQ.length);
    }
    return null;
  }

  // Get or create a unique identifier
  public getUserIdentifier(): string {
    let userId = this.getCookie(this.cookieName) || localStorage.getItem(this.localStorageKey);
    if (!userId) {
      userId = this.generateUUID();
      this.setCookie(this.cookieName, userId, 365);
      localStorage.setItem(this.localStorageKey, userId);
    }
    return userId;
  }

  // Clear the identifier (if needed)
  public clearUserIdentifier() {
    document.cookie = `${this.cookieName}=; expires=Thu, 01 Jan 1970 00:00:00 UTC; path=/;`;
    localStorage.removeItem(this.localStorageKey);
  }
}
