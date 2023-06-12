import { Component } from '@angular/core';

@Component({
  selector: 'my-app',
  styles: [
    `.done {
      text-decoration: line-through;
      color: #ccc;
    }`
  ],
  template:`
    <nav>
      <ul>
        <li><a routerLink="/home" routerLinkActive="active">Главная</a></li>
        <li><a routerLink="/history" routerLinkActive="active">История покупок</a></li>
      </ul>
    </nav>
    <router-outlet></router-outlet>`
})
export class AppComponent {}
