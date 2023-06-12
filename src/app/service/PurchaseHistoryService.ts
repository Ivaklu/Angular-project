import { Injectable } from '@angular/core';
import { Item } from '../home/home.component';

export class Purchase {
  constructor(public dateTime: Date, public items: Item[], public total: number) {}
}

@Injectable({
  providedIn: 'root'
})
export class PurchaseHistoryService {
  private purchaseHistory: Purchase[] = [];

  addPurchase(purchase: Purchase) {
    this.purchaseHistory.push(purchase);
  }

  getPurchaseHistory() {
    return this.purchaseHistory;
  }

  getPurchaseItems() {
    return this.purchaseHistory.flatMap(purchase => purchase.items);
  }

  getTotalPurchaseAmount() {
    return this.purchaseHistory.reduce((total, purchase) => total + purchase.total, 0);
  }
}