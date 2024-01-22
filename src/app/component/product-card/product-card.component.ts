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

  constructor(private cartService: ShoppingCartService) {
  }

  addProductToCart(product: Product) {
    this.cartService.addProductToCart(product);
  }


}
