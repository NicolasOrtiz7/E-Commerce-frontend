import { Component } from '@angular/core';
import { Customer, Order, OrderDetails, OrderItems } from 'src/app/model/order';
import { Product } from 'src/app/model/product';
import { OrderService } from 'src/app/service/order.service';
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

  constructor(private cartService: ShoppingCartService, private orderService: OrderService) {

    // Se suscribe al ShoppingService para mantener la lista actualizada. Patrón Observable
    this.cartService.cart$.subscribe(cart => {
      this.shoppingCart = cart;
    });
    this.cartService.subtotal$.subscribe(subtotal => {
      this.subtotal = subtotal;
      this.total = this.subtotal;
    });

    // Datos de ORDER    
    this.order.customer = this.customer;
    this.order.orderDetails = this.orderDetails;
    this.order.orderItems = this.orderItems;
  }


  // ------------------ Datos para generar una ORDEN ------------------

  customer: Customer = new Customer();

  order: Order = new Order();
  orderDetails: OrderDetails = new OrderDetails();
  orderItems: OrderItems[] = [];

  // implementar lógica para procesar los pagos

  saveOrder(){
    this.setItems();
    this.customer.customerId = 1; // ID temporal hasta implementar seguridad
    this.orderDetails.payment = "PAYPAL"; // Payment temporal hasta implementar pagos

    console.log(this.order);
    console.log(JSON.stringify(this.order));
    

    this.orderService.saveOrder(this.order).subscribe(
      data => {
        console.log(data);
        localStorage.removeItem("cart");
      },
      err => console.log(err)
    )
    
  }

  setItems(){
    this.shoppingCart.forEach(p =>{
      this.orderItems.push(new OrderItems(p.productId, p.quantityInCart));
    })
  }

  // ----------------------------------------------------

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
