import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root',
})
export class JwtServiceService {
  constructor() {}
  public decodePayload(token: string): any {
    try {
      const base64Url = token.split('.')[1];
      const base64 = base64Url.replace(/-/g, '+').replace(/_/g, '/');
      const jsonPayload = decodeURIComponent(
        atob(base64)
          .split('')
          .map(function (c) {
            return '%' + ('00' + c.charCodeAt(0).toString(16)).slice(-2);
          })
          .join('')
      );

      return JSON.parse(jsonPayload);
    } catch (error) {
      console.error('Error decoding token:', error);
      return null;
    }
  }

  public isTokenExpired(token: string): boolean {
    const payload = this.decodePayload(token);
    if (!payload) {
      return true;
    }

    const expiry = payload.exp;
    return expiry * 1000 < Date.now();
  }
}
