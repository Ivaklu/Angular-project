import { Component } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { PurchaseHistoryService } from '../service/PurchaseHistoryService';
import { Purchase } from '../service/PurchaseHistoryService';

export class Item {
  purchase: string;
  done: boolean;
  price: number;

  constructor(purchase: string, price: number) {
    this.purchase = purchase;
    this.price = price;
    this.done = false;
  }
}

@Component({
  selector: 'app-home',
  template: `<div class="page-header">
    <h1> Список покупок </h1>
  </div>
  <div class="panel">
    <div class="form-inline">
      <div class="form-group">
        <div class="col-md-8">
          <input class="form-control" [formControl]="purchaseControl" placeholder="Название" />
          <div *ngIf="purchaseControl.hasError('required') && purchaseControl.touched" class="alert alert-danger">
            Название обязательно
          </div>
          <div *ngIf="purchaseControl.hasError('minlength') && purchaseControl.touched" class="alert alert-danger">
            Минимальная длина названия - 1 символ
          </div>
        </div>
      </div>
      <div class="form-group">
        <div class="col-md-6">
          <input type="number" class="form-control" [formControl]="priceControl" placeholder="Цена" />
          <div *ngIf="priceControl.hasError('required') && priceControl.touched" class="alert alert-danger">
            Цена обязательна
          </div>
          <div *ngIf="priceControl.hasError('min') && priceControl.touched" class="alert alert-danger">
            Цена должна быть больше 0
          </div>
        </div>
      </div>
      <div class="form-group">
        <div class="col-md-offset-2 col-md-6">
          <button class="btn btn-default" [disabled]="formGroup.invalid" (click)="addItem()">Добавить</button>
        </div>
      </div>
    </div>
    <table class="table table-striped">
      <thead>
        <tr>
          <th>Предмет</th>
          <th>Цена</th>
          <th>Куплено</th>
        </tr>
      </thead>
      <tbody>
        <tr *ngFor="let item of items; let i = index" [appStatusClass]="item.done">
          <td [class.done]="item.done">{{ item.purchase }}</td>
          <td [class.done]="item.done">{{ item.price }}</td>
          <td>
            <input type="checkbox" [checked]="item.done" (change)="toggleDone(i)" appToggleImage />
          </td>
        </tr>
      </tbody>
    </table>
    <div class="total">
      Итого: {{ getTotalPurchaseAmount() }}
    </div>
    <button class="btn btn-primary" [disabled]="!isAnyItemSelected()" (click)="buy()">Купить</button>
  </div>`
})
export class HomeComponent {
  formGroup: FormGroup;
  purchaseControl: FormControl;
  priceControl: FormControl;

  items: Item[] = [
    { purchase: "Хлеб", done: false, price: 15.9},
    { purchase: "Масло", done: false, price: 60},
    { purchase: "Картофель", done: false, price: 22.6 },
    { purchase: "Сыр", done: false, price: 310},
    { purchase: "Вырезка", done: false, price: 75}
  ];

  constructor(private router: Router, private purchaseHistoryService: PurchaseHistoryService) {
    this.purchaseControl = new FormControl('', [Validators.required, Validators.minLength(1)]);
    this.priceControl = new FormControl('', [Validators.required, Validators.min(1)]);

    this.formGroup = new FormGroup({
      purchase: this.purchaseControl,
      price: this.priceControl
    });
  }

  addItem(): void {
    if (this.formGroup.invalid) return;

    const purchase = this.purchaseControl.value;
    const price = this.priceControl.value;

    this.items.push(new Item(purchase, price));
    this.resetForm();
  }

  resetForm(): void {
    this.formGroup.reset();
  }

  toggleDone(index: number): void {
    this.items[index].done = !this.items[index].done;
  }

  getTotalPurchaseAmount(): number {
    return this.items
      .filter(item => item.done)
      .reduce((total, item) => total + item.price, 0);
  }

  isAnyItemSelected(): boolean {
    return this.items.some(item => item.done);
  }

  buy(): void {
    if (this.isAnyItemSelected()) {
      const selectedItems = this.items.filter(item => item.done);
      const total = this.getTotalPurchaseAmount();
      const purchase = new Purchase(new Date(), selectedItems, total);
      this.purchaseHistoryService.addPurchase(purchase);
      this.router.navigate(['/payment']);
    }
  }
}