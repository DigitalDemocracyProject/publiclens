import { Injectable } from '@angular/core';
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

  constructor(private http: HttpClient, private router: Router) {}

  /** Redirect user to Cognito Hosted UI */
  login() {
    const url = `https://${this.domain}/login?client_id=${
      this.clientId
    }&response_type=code&scope=openid+email+phone&redirect_uri=${encodeURIComponent(
      this.redirectUri
    )}`;
    window.location.href = url;
  }

  /** Handle redirect and exchange code for tokens */
  async handleAuthCallback(): Promise<void> {
    const params = new URLSearchParams(window.location.search);
    const code = params.get('code');
    if (code) {
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

        // Save tokens in localStorage
        localStorage.setItem('id_token', tokenResponse.id_token);
        localStorage.setItem('access_token', tokenResponse.access_token);
        localStorage.setItem('refresh_token', tokenResponse.refresh_token);

        // remove code from URL
        this.router.navigate(['/home']);
      } catch (err) {
        console.error('Token exchange failed', err);
      }
    }
  }

  /** Get stored access token */
  getAccessToken(): string | null {
    return localStorage.getItem('access_token');
  }

  /** Logout */
  logout() {
    localStorage.clear();
    window.location.href = `https://${this.domain}/logout?client_id=${
      this.clientId
    }&logout_uri=${encodeURIComponent(this.redirectUri)}`;
  }
}
