import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Budget } from '../../shared/models/budget';
import { AuthService } from '../../shared/services/auth.service';
import { BudgetService } from '../../shared/services/budget.service';

@Component({
  selector: 'app-category-creator',
  templateUrl: './category-creator.component.html',
  styleUrls: ['./category-creator.component.scss']
})
export class CategoryCreatorComponent implements OnInit {

  categoryNames = [
    "Groceries",
    "Rent",
    "Entertainment",
    "Clothes",
    "Dates",
  ]

  categoryNameForm: FormGroup;
  budgetForm: FormGroup;
  budgets: Budget[] = [];

  constructor(private auth: AuthService, private fb: FormBuilder, private bs: BudgetService) { }

  ngOnInit(): void {
    this.bs.budgets$.subscribe(budget => {
      this.budgets.push(budget);
      if (!this.categoryNames.includes(budget.categoryName)) {
        this.categoryNames.push(budget.categoryName);
        this.categoryNames.sort();
      }
    });
    this.bs.getBudget(this.auth.getUser().email);
    this.categoryNameForm = this.fb.group({
      categoryName: ['']
    });
    this.budgetForm = this.fb.group({
      categoryName: ['', Validators.required],
      budgetAmount: [0, Validators.required],
      budgetColour: ['#333333', Validators.required],
    });
    this.categoryNames.sort();
  }

  addCategoryName(): void {
    this.categoryNames.push(this.categoryNameForm.get('categoryName').value);
    this.categoryNames.sort();
    this.categoryNameForm.reset();
  }

  addToBudget(): void {
    console.log(this.budgetForm.value);
    const budget: Budget = {
      userEmail: this.auth.getUser().email,
      categoryName: this.budgetForm.get('categoryName').value,
      budgetAmount: this.budgetForm.get('budgetAmount').value,
      budgetColour: this.budgetForm.get('budgetColour').value,
    }
    this.budgets = [];
    this.bs.saveBudget(budget);
  }

  deleteFromBudget(budget: Budget): void {
    this.budgets = [];
    this.bs.deleteBudget(budget);
  }

}
