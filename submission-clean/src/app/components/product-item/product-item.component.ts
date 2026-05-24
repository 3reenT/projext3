import { Component, EventEmitter, Input, Output } from '@angular/core';
import { Product } from '../../models/product';

@Component({
  selector: 'app-product-item',
  templateUrl: './product-item.component.html',
  styleUrl: './product-item.component.css'
})
export class ProductItemComponent {
  @Input() product!: Product;
  @Output() addProduct = new EventEmitter<{ product: Product; quantity: number }>();

  quantity = 1;

  onQuantityChange(quantity: number): void {
    this.quantity = Number(quantity);
  }

  addToCart(): void {
    this.addProduct.emit({ product: this.product, quantity: this.quantity });
    this.quantity = 1;
  }
}
