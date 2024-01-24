import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
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

  keyword: string;

  constructor(private categoryService: CategoryService,
    private cartService: ShoppingCartService,
    private router: Router) {
    // Se suscribe al ShoppingService para mantener la lista actualizada. Patrón Observable
    this.cartService.cart$.subscribe(cart => {
      this.shoppingCart = cart;
    });
    this.cartService.subtotal$.subscribe(subtotal => {
      this.subtotal = subtotal;
    });
  }

  ngOnInit(): void {
    this.getCategories();
  }

  getCategories() {
    this.categoryService.getCategories().subscribe(
      data => {
        this.categoryList = data
      },
      err => console.log(err)
    )
  }

  getProductsByKeyword() {
    this.router.navigate(["/products"], { queryParams: { keyword: this.keyword } });
  }

  removeProductFromCart(productId: number, event: any) {
    event.stopPropagation(); // Evita que el dropdown se cierre al eliminar un producto

    this.cartService.removeProductFromCart(productId);
  }

}
