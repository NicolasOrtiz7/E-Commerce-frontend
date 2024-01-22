import { Component, HostListener, Input, OnInit } from '@angular/core';
import { Product } from 'src/app/model/product';
import { ShoppingCartService } from 'src/app/service/shopping-cart.service';

@Component({
  selector: 'app-product-card',
  templateUrl: './product-card.component.html',
  styleUrls: ['./product-card.component.css']
})
export class ProductCardComponent {

  @Input() product: Product;

  shoppingCart: Product[] = [];

  subtotal: number;

  constructor(private cartService: ShoppingCartService) {
    // Se suscribe al ShoppingService para mantener la lista actualizada
    this.cartService.cart$.subscribe(cart => {
      this.shoppingCart = cart;
      this.calculateSubtotal();
    });
  }

  addProductToCart(product: Product) {
    this.cartService.addProductToCart(product);
  }

  calculateSubtotal() {
    this.subtotal = this.shoppingCart.reduce((total, p) => total + (p.price * p.quantityInCart), 0);
  }

}
