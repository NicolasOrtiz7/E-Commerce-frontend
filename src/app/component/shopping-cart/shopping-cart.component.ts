import { Component } from '@angular/core';
import { Product } from 'src/app/model/product';
import { ShoppingCartService } from 'src/app/service/shopping-cart.service';

@Component({
  selector: 'app-shopping-cart',
  templateUrl: './shopping-cart.component.html',
  styleUrls: ['./shopping-cart.component.css']
})
export class ShoppingCartComponent {

  shoppingCart: Product[] = [];

  subtotal: number;

  total: number;

  selectedShipping: string;

  constructor(private cartService: ShoppingCartService) {
    // Se suscribe al ShoppingService para mantener la lista actualizada. Patrón Observable
    this.cartService.cart$.subscribe(cart => {
      this.shoppingCart = cart;
    });
    this.cartService.subtotal$.subscribe(subtotal => {
      this.subtotal = subtotal;
      this.total = this.subtotal;
    });
  }

  // Guardar valores en base de datos
  shippingOptions: any = [
    { value: "standard", price: 2000, text: "Estándar a domicilio $" },
    { value: "office", price: 1000, text: "Retiro en sucursal $" },
    { value: "fast", price: 3000, text: "Estándar rápido 24hs. $" },
  ]

  removeProductFromCart(productId: number, event: any) {
    event.stopPropagation(); // Evita que el dropdown se cierre al eliminar un producto

    this.cartService.removeProductFromCart(productId);
  }

  // Suma el valor del envío al subtotal
  handleSelectChange(): void {
    switch (this.selectedShipping) {
      case 'standard':
        this.total = this.subtotal + this.shippingOptions[0].price;
        break;
      case 'office':
        this.total = this.subtotal + this.shippingOptions[1].price;
        break;
      case 'fast':
        this.total = this.subtotal + this.shippingOptions[2].price;
        break;
    }
  }

}
