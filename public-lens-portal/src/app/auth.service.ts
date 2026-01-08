import { Inject, Injectable, PLATFORM_ID } from '@angular/core';
import { isPlatformBrowser } from '@angular/common';

import { HttpClient, HttpParams, HttpHeaders } from '@angular/common/http';
import { Router } from '@angular/router';

@Injectable({
  providedIn: 'root',
})
export class AuthService {
  private clientId = '53h7c1lf326qo9t0u1ebv7v3mk';
  private domain = 'eu-north-1bk9yvbyg5.auth.eu-north-1.amazoncognito.com';
  private redirectUri = 'http://localhost:4200/home';
  private tokenEndpoint = `https://${this.domain}/oauth2/token`;

  constructor(
    private http: HttpClient,
    private router: Router,
    @Inject(PLATFORM_ID) private platformId: Object
  ) {}

  /** Redirect user to Cognito Hosted UI */
  login() {
    if (!isPlatformBrowser(this.platformId)) return;

    const url = `https://${this.domain}/login?client_id=${
      this.clientId
    }&response_type=code&scope=openid+email+phone&redirect_uri=${encodeURIComponent(
      this.redirectUri
    )}`;
    window.location.href = url;
  }

  /** Handle redirect and exchange code for tokens */
  async handleAuthCallback(): Promise<void> {
    if (!isPlatformBrowser(this.platformId)) return;

    const params = new URLSearchParams(window.location.search);
    const code = params.get('code');
    if (!code) return;

    const body = new HttpParams()
      .set('grant_type', 'authorization_code')
      .set('client_id', this.clientId)
      .set('code', code)
      .set('redirect_uri', this.redirectUri);

    try {
      const tokenResponse: any = await this.http
        .post(this.tokenEndpoint, body.toString(), {
          headers: new HttpHeaders({
            'Content-Type': 'application/x-www-form-urlencoded',
          }),
        })
        .toPromise();

      localStorage.setItem('id_token', tokenResponse.id_token);
      localStorage.setItem('access_token', tokenResponse.access_token);
      localStorage.setItem('refresh_token', tokenResponse.refresh_token);

      this.router.navigate(['/home']);
    } catch (err) {
      console.error('Token exchange failed', err);
    }
  }

  /** Get stored access token */
  getAccessToken(): string | null {
    if (!isPlatformBrowser(this.platformId)) {
      return null;
    }
    return localStorage.getItem('access_token');
  }

  /** Get email from ID token */
  getEmail(): string | null {
    if (!isPlatformBrowser(this.platformId)) return null;

    const token = localStorage.getItem('id_token');
    if (!token) return null;

    const payload = JSON.parse(atob(token.split('.')[1]));
    return payload['email'] || null;
  }

  /** Logout */
  logout() {
    if (isPlatformBrowser(this.platformId)) {
      localStorage.clear();
      window.location.href = `https://${this.domain}/logout?client_id=${
        this.clientId
      }&logout_uri=${encodeURIComponent(this.redirectUri)}`;
    }
  }

  /** Check login status */
  isLoggedIn(): boolean {
    if (!isPlatformBrowser(this.platformId)) {
      return false;
    }
    return !!localStorage.getItem('id_token');
  }

  /** Get username from ID token */
  getUsername(): string | null {
    if (!isPlatformBrowser(this.platformId)) {
      return null;
    }

    const token = localStorage.getItem('id_token');
    if (!token) return null;

    const payload = JSON.parse(atob(token.split('.')[1]));
    return payload['cognito:username'] || payload['email'] || 'User';
  }
}
