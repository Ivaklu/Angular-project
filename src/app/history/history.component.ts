import { Component, OnInit } from '@angular/core';
import { PurchaseHistoryService } from '../service/PurchaseHistoryService';

@Component({
  selector: 'history',
  template: `
    <h2>История покупок</h2>
    <ul>
      <li *ngFor="let purchase of purchaseHistory">
        <div>{{ purchase.dateTime | date: 'medium' }}</div>
        <ul>
          <li *ngFor="let item of purchase.items">
            {{ item.purchase }} - {{ item.price }} руб.
          </li>
        </ul>
        <div>Общая сумма: {{ purchase.total }} руб.</div>
      </li>
    </ul>
  `
})
export class HistoryComponent implements OnInit {
  purchaseHistory: any[];

  constructor(private purchaseHistoryService: PurchaseHistoryService) {}

  ngOnInit() {
    this.purchaseHistory = this.purchaseHistoryService.getPurchaseHistory();
  }
}