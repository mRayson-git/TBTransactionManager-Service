import { Component, OnInit } from '@angular/core';
import { AuthService } from '../modules/shared/services/auth.service';
import { UserService } from '../modules/shared/services/user.service';

@Component({
  selector: 'app-navbar',
  templateUrl: './navbar.component.html',
  styleUrls: ['./navbar.component.scss']
})
export class NavbarComponent implements OnInit {

  constructor(public auth: AuthService, public user: UserService) { }

  ngOnInit(): void { }

  click() {
    console.log('Clicked');
  }

}
