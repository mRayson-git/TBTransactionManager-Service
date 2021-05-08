import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { LoginComponent } from './login/login.component';
import { RegisterComponent } from './register/register.component';
import { SharedModule } from '../shared/shared.module';
import { AccountSettingsComponent } from './account-settings/account-settings.component';
import { ParserCreationComponent } from './parser-creation/parser-creation.component';
import { AccountComponent } from './account.component';
import { ParserInformationComponent } from './parser-information/parser-information.component';





@NgModule({
  declarations: [LoginComponent, RegisterComponent, AccountSettingsComponent, ParserCreationComponent, AccountComponent, ParserInformationComponent],
  imports: [
    CommonModule,
    SharedModule
  ]
})
export class AccountModule { }
