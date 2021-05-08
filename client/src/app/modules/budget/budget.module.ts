import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { BudgetSettingsComponent } from './budget-settings.component';
import { CategoryCreatorComponent } from './category-creator/category-creator.component';
import { SharedModule } from '../shared/shared.module';



@NgModule({
  declarations: [BudgetSettingsComponent, CategoryCreatorComponent],
  imports: [
    CommonModule,
    SharedModule
  ]
})
export class BudgetModule { }
