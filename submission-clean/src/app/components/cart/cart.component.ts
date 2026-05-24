import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { CartItem } from '../../models/cart-item';
import { CartService } from '../../services/cart.service';

@Component({
  selector: 'app-cart',
  templateUrl: './cart.component.html',
  styleUrl: './cart.component.css'
})
export class CartComponent implements OnInit {
  cartItems: CartItem[] = [];
  fullName = '';
  address = '';
  creditCard = '';

  constructor(
    private router: Router,
    private cartService: CartService
  ) {}

  ngOnInit(): void {
    this.cartService.items$.subscribe((items) => {
      this.cartItems = items;
    });
  }

  get total(): number {
    return this.cartService.getTotal();
  }

  onQuantityChange(productId: number, quantity: number): void {
    this.cartService.updateQuantity(productId, Number(quantity));
  }

  removeItem(productId: number): void {
    this.cartService.removeFromCart(productId);
  }

  submitOrder(): void {
    if (this.cartItems.length === 0 || this.fullName.length < 3 || this.address.length < 6 || this.creditCard.length < 16) {
      return;
    }

    this.cartService.saveOrder({
      fullName: this.fullName,
      address: this.address,
      creditCard: this.creditCard,
      total: this.total
    });
    this.cartService.clearCart();
    this.router.navigate(['/confirmation']);
  }
}
