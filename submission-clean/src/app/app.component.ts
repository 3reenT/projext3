import { Component } from '@angular/core';
import { CartService } from './services/cart.service';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrl: './app.component.css'
})
export class AppComponent {
  title = 'mystore';

  constructor(private cartService: CartService) {}

  get cartCount(): number {
    return this.cartService.getItemCount();
  }
}
