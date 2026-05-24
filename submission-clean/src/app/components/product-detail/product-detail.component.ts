import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { Product } from '../../models/product';
import { CartService } from '../../services/cart.service';
import { ProductService } from '../../services/product.service';

@Component({
  selector: 'app-product-detail',
  templateUrl: './product-detail.component.html',
  styleUrl: './product-detail.component.css'
})
export class ProductDetailComponent implements OnInit {
  product?: Product;
  quantity = 1;
  message = '';

  constructor(
    private route: ActivatedRoute,
    private router: Router,
    private productService: ProductService,
    private cartService: CartService
  ) {}

  ngOnInit(): void {
    const productId = Number(this.route.snapshot.paramMap.get('id'));

    this.productService.getProducts().subscribe((products) => {
      this.product = products.find((product) => product.id === productId);
    });
  }

  onQuantityChange(quantity: number): void {
    this.quantity = Number(quantity);
  }

  addToCart(): void {
    if (!this.product) {
      return;
    }

    this.cartService.addToCart(this.product, this.quantity);
    this.message = `${this.quantity} ${this.product.name} added to your cart.`;
  }

  goBack(): void {
    this.router.navigate(['/']);
  }
}
