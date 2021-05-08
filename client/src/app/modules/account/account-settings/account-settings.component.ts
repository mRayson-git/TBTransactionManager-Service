import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { User } from '../../shared/models/user';
import { AuthService } from '../../shared/services/auth.service';
import { UserService } from '../../shared/services/user.service';

@Component({
  selector: 'app-account-settings',
  templateUrl: './account-settings.component.html',
  styleUrls: ['./account-settings.component.scss']
})
export class AccountSettingsComponent implements OnInit {

  currUser: User;
  userSettings: FormGroup;

  constructor(private auth: AuthService, private fb: FormBuilder, private us: UserService) { }

  ngOnInit(): void {
    this.currUser = this.auth.getUser();
    this.userSettings = this.fb.group({
      username: [this.currUser.username],
      email: [{ value: this.currUser.email, disabled: true }],
      contactEmail: [this.currUser.contactEmail],
      password: ['', Validators.required],
    });
  }

  updateAccountSettings(): void {
    const user: User = {
      username: this.userSettings.get('username').value,
      email: this.userSettings.get('email').value,
      contactEmail: this.userSettings.get('contactEmail').value,
      password: this.userSettings.get('password').value,
    }
    this.us.updateUser(user);
    this.userSettings.reset();
  }

}
