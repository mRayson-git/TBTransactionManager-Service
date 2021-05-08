import { Injectable } from '@angular/core';
import { JwtHelperService } from '@auth0/angular-jwt';
import { User } from '../models/user';


@Injectable({
  providedIn: 'root'
})
export class AuthService {
  private jwtHelper: JwtHelperService = new JwtHelperService();

  constructor() { }

  loggedIn(): boolean {
    return !!localStorage.getItem('thinkbudget-token');
  }

  getToken(): string {
    return localStorage.getItem('thinkbudget-token');
  }

  getUser(): User {
    return JSON.parse(localStorage.getItem('thinkbudget-user'));
  }

  isAuthenticated(): boolean {
    const token = this.getToken();
    return !this.jwtHelper.isTokenExpired(token);
  }

}
