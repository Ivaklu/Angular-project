import { Component, TemplateRef, ViewChild } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { PurchaseHistoryService } from '../service/PurchaseHistoryService';

@Component({
  selector: 'payment',
  styles: [`
    div {
      text-align: center;
    }

    .payment-details {
      max-width: 600px;
      margin: 0 auto;
    }
  `],
  template: `
    <div class="page-header">
      <h1>Оплата</h1>
    </div>
    <div class="payment-details">
      <p>Вы собираетесь оплатить услуги компании "ТочноНеСкам.ру".</p>
      <p>Пожалуйста, введите свои платежные данные:</p>

      <form [formGroup]="paymentForm">
        <div class="form-group">
          <label for="cardNumber">Номер карты:</label>
          <input type="text" id="cardNumber" class="form-control" formControlName="cardNumber" required>
        </div>
        <div class="form-group">
          <label for="cardName">Имя на карте:</label>
          <input type="text" id="cardName" class="form-control" formControlName="cardName" required>
        </div>
        <div class="form-group">
          <label for="expiryDate">Срок действия:</label>
          <input type="text" id="expiryDate" class="form-control" formControlName="expiryDate" required>
        </div>
        <div class="form-group">
          <label for="cvv">CVV-код:</label>
          <input type="text" id="cvv" class="form-control" formControlName="cvv" required>
        </div>
        <button class="btn btn-primary" [disabled]="paymentForm.invalid" (click)="submitPayment()">Оплатить</button>
      </form>
    </div>
  `
})
export class PaymentComponent {
  paymentForm: FormGroup;
  paymentStatusMessage: string;

  constructor(private router: Router, private purchaseHistoryService: PurchaseHistoryService) {
    this.paymentForm = new FormGroup({
      cardNumber: new FormControl('', Validators.required),
      cardName: new FormControl('', Validators.required),
      expiryDate: new FormControl('', Validators.required),
      cvv: new FormControl('', Validators.required)
    });
  }

  submitPayment() {
    if (this.paymentForm.invalid) return;

    // Здесь можно добавить логику для обработки платежа

    // Моделируем успешное завершение платежа
    alert('Продукты скоро приедут! Наверное.. (нет)');

    // Сохранить покупку в истории
    const purchase = {
      dateTime: new Date(),
      items: this.purchaseHistoryService.getPurchaseItems(),
      total: this.purchaseHistoryService.getTotalPurchaseAmount()
    };

    // Сбросить форму после отправки платежа
    this.paymentForm.reset();
    this.router.navigate(['/home']);
  }
}