import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';

import { User } from '../../shared/models/user';
import { UserService } from '../../shared/services/user.service';
import { matchingValidator } from '../../shared/validators/matching.validator';

@Component({
  selector: 'app-register',
  templateUrl: './register.component.html',
  styleUrls: ['./register.component.scss']
})
export class RegisterComponent implements OnInit {

  registerForm: FormGroup;

  constructor(private fb: FormBuilder, private us: UserService) { }

  ngOnInit(): void {
    this.registerForm = this.fb.group({
      username: ['', Validators.required],
      email: ['', [Validators.required, Validators.email]],
      contactEmail: ['', [Validators.required, Validators.email]],
      password: ['', [Validators.required, Validators.minLength(8)]],
      cpassword: ['', Validators.required],
    }, { validators: matchingValidator });
  }

  submit(): void {
    const user: User = {
      username: this.registerForm.get('username').value,
      email: this.registerForm.get('email').value,
      contactEmail: this.registerForm.get('contactEmail').value,
      password: this.registerForm.get('password').value,
    }
    this.us.registerUser(user);
    this.registerForm.reset();
  }

  isFieldValid(fieldName: string): boolean {
    return (this.registerForm.get(fieldName).touched || this.registerForm.get(fieldName).dirty) && this.registerForm.get(fieldName).valid;
  }
  isFieldInvalid(fieldName: string): boolean {
    return (this.registerForm.get(fieldName).touched || this.registerForm.get(fieldName).dirty) && !this.registerForm.get(fieldName).valid;
  }
}
