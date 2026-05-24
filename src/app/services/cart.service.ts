import { Injectable } from '@angular/core';
import { BehaviorSubject } from 'rxjs';
import { CartItem } from '../models/cart-item';
import { Order } from '../models/order';
import { Product } from '../models/product';

@Injectable({
  providedIn: 'root'
})
export class CartService {
  private items: CartItem[] = [];
  private order?: Order;
  private itemsSubject = new BehaviorSubject<CartItem[]>([]);

  items$ = this.itemsSubject.asObservable();

  addToCart(product: Product, quantity: number): void {
    const cleanQuantity = Number(quantity);

    if (!Number.isFinite(cleanQuantity) || cleanQuantity < 1) {
      return;
    }

    const existingItem = this.items.find((item) => item.product.id === product.id);

    if (existingItem) {
      existingItem.quantity += cleanQuantity;
    } else {
      this.items.push({ product, quantity: cleanQuantity });
    }

    this.emitItems();
  }

  updateQuantity(productId: number, quantity: number): void {
    const cleanQuantity = Number(quantity);

    if (!Number.isFinite(cleanQuantity) || cleanQuantity < 1) {
      this.removeFromCart(productId);
      return;
    }

    const item = this.items.find((cartItem) => cartItem.product.id === productId);

    if (item) {
      item.quantity = cleanQuantity;
      this.emitItems();
    }
  }

  removeFromCart(productId: number): void {
    this.items = this.items.filter((item) => item.product.id !== productId);
    this.emitItems();
  }

  clearCart(): void {
    this.items = [];
    this.emitItems();
  }

  getTotal(): number {
    return this.items.reduce((total, item) => total + item.product.price * item.quantity, 0);
  }

  getItemCount(): number {
    return this.items.reduce((count, item) => count + item.quantity, 0);
  }

  saveOrder(order: Order): void {
    this.order = order;
  }

  getOrder(): Order | undefined {
    return this.order;
  }

  private emitItems(): void {
    this.itemsSubject.next([...this.items]);
  }
}
