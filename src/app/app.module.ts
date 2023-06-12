import  { NgModule } from '@angular/core';
import  { BrowserModule } from '@angular/platform-browser';
import  { FormsModule } from '@angular/forms';
import  { AppComponent } from './app.component';
import { StatusClassDirective } from '../directive/StatusClassDirective'
import { ReactiveFormsModule } from '@angular/forms';
import { RouterModule, Routes } from '@angular/router';
import { HomeComponent } from './home/home.component';
import { HistoryComponent } from './history/history.component';
import { PaymentComponent } from './payment/payment.component';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';

const routes: Routes = [
    { path: '', redirectTo: 'home', pathMatch: 'full' },
    { path: 'home', component: HomeComponent },
    { path: 'history', component: HistoryComponent },
    { path: 'payment', component: PaymentComponent },
  ];

@NgModule({
    imports: [BrowserModule, FormsModule, ReactiveFormsModule, RouterModule.forRoot(routes), BrowserAnimationsModule],
    declarations: [AppComponent, StatusClassDirective, HomeComponent, HistoryComponent, PaymentComponent],
    bootstrap: [AppComponent]
})

export class AppModule { }