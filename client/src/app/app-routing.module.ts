import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { HomeComponent } from './home/home.component';
import { AccountComponent } from './modules/account/account.component';
import { LoginComponent } from './modules/account/login/login.component';
import { ParserInformationComponent } from './modules/account/parser-information/parser-information.component';
import { RegisterComponent } from './modules/account/register/register.component';
import { BudgetSettingsComponent } from './modules/budget/budget-settings.component';
import { AuthGuard } from './modules/shared/guards/auth.guard';
import { TransactionComponent } from './modules/transaction/transaction.component';

const routes: Routes = [
  { path: 'register', component: RegisterComponent },
  { path: 'login', component: LoginComponent },
  { path: 'home', component: HomeComponent, canActivate: [AuthGuard] },
  { path: 'accountSettings', component: AccountComponent, canActivate: [AuthGuard] },
  { path: 'accountSettings/parserInformation', component: ParserInformationComponent, canActivate: [AuthGuard] },
  { path: 'transactionManagement', component: TransactionComponent, canActivate: [AuthGuard] },
  { path: 'budgetSettings', component: BudgetSettingsComponent, canActivate: [AuthGuard] },
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
