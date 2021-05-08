import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { User } from '../models/user';
import { Reply } from '../models/reply';
import { MessageService } from './message.service';
import { Router } from '@angular/router';

@Injectable({
  providedIn: 'root'
})
export class UserService {

  userUrl = 'http://localhost:3000/api/users/';

  constructor(private http: HttpClient, private ms: MessageService, private router: Router) { }

  // Register user
  registerUser(user: User): void {
    this.http.post<Reply>(this.userUrl + 'register', user).subscribe(reply => {
      console.log(reply);
      if (!reply.success) {
        this.ms.addDangerMessage(reply.message);
      } else {
        this.ms.addSuccessMessage(reply.message);
        this.router.navigate(['/login']);
      }
    });
  }

  // Login user
  loginUser(user: User): void {
    this.http.post<Reply>(this.userUrl + 'login', user).subscribe(reply => {
      console.log(reply);
      if (!reply.success) {
        this.ms.addDangerMessage(reply.message);
      } else {
        this.ms.addSuccessMessage(reply.message);
        const currUser: User = reply.result;
        localStorage.setItem('thinkbudget-user', JSON.stringify(currUser));
        localStorage.setItem('thinkbudget-token', reply.result2);
        this.router.navigate(['/home']);
      }
    });
  }

  // Logout user
  logoutUser(): void {
    console.log('Logging out user');
    localStorage.removeItem('thinkbudget-token');
    localStorage.removeItem('thinkbudget-user');
    this.router.navigate(['/login']);
  }

  // Update user
  updateUser(user: User): void {
    this.http.post<Reply>(this.userUrl + 'update', user).subscribe(reply => {
      if (!reply.success) {
        this.ms.addDangerMessage(reply.message);
      } else {
        this.ms.addSuccessMessage(reply.message);
      }
    });
  }
}
