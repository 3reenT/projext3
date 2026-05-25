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
  message = '';

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
    const item = this.cartItems.find((cartItem) => cartItem.product.id === productId);
    this.cartService.removeFromCart(productId);
    this.message = item ? `${item.product.name} removed from your cart.` : 'Item removed from your cart.';
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
