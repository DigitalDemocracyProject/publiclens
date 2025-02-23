import { Injectable } from '@angular/core';

@Injectable({
    providedIn: 'root'
})
export class CookieService {

    getCookie(name: string): string | null {
        const match = document.cookie.match(
            new RegExp('(^| )' + name + '=([^;]+)')
        );
        return match ? decodeURIComponent(match[2]) : null;
    }

    setCookie(name: string, value: string, days: number): void {
        const expires = new Date();
        expires.setTime(expires.getTime() + days * 24 * 60 * 60 * 1000);
        document.cookie = `${name}=${encodeURIComponent(
            value
        )};expires=${expires.toUTCString()};path=/`;
    }
}
