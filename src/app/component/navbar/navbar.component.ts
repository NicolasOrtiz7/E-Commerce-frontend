import { Component, OnInit } from '@angular/core';
import { Product, ProductCategory } from 'src/app/model/product';
import { CategoryService } from 'src/app/service/category.service';
import { ShoppingCartService } from 'src/app/service/shopping-cart.service';

@Component({
  selector: 'app-navbar',
  templateUrl: './navbar.component.html',
  styleUrls: ['./navbar.component.css']
})
export class NavbarComponent implements OnInit {

  categoryList: ProductCategory[] = [];

  shoppingCart: Product[] = [];

  subtotal: number;

  constructor(private categoryService: CategoryService, private cartService: ShoppingCartService) {
    // Se suscribe al ShoppingService para mantener la lista actualizada
    this.cartService.cart$.subscribe(cart => {
      this.shoppingCart = cart;
      this.calculateSubtotal();
    });
  }

  ngOnInit(): void {
    this.getCategories();
    this.calculateSubtotal();
  }

  getCategories() {
    this.categoryService.getCategories().subscribe(
      data => {
        this.categoryList = data
      },
      err => console.log(err)
    )
  }

  removeProductFromCart(productId: number, event: any) {
    event.stopPropagation(); // Evita que el dropdown se cierre al eliminar un producto

    this.cartService.removeProductFromCart(productId);

    this.calculateSubtotal();
  }

  calculateSubtotal() {
    this.subtotal = this.shoppingCart.reduce((total, p) => total + (p.price * p.quantityInCart), 0);
  }

}
