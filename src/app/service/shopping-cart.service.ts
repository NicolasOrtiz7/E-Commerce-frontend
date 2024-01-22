import { Injectable } from '@angular/core';
import { BehaviorSubject } from 'rxjs';
import { Product } from '../model/product';

@Injectable({
  providedIn: 'root'
})
export class ShoppingCartService {

  private cartSubject = new BehaviorSubject<Product[]>([]);
  cart$ = this.cartSubject.asObservable();

  private subtotalSubject = new BehaviorSubject<number>(0);
  subtotal$ = this.subtotalSubject.asObservable();

  constructor() {
    this.getCartFromLocalStorage();
    this.calculateSubtotal();
  }

  getCart(): Product[] {
    return this.cartSubject.value;
  }

  updateCart(newCart: Product[]): void {
    this.cartSubject.next(newCart);
    localStorage.setItem('cart', JSON.stringify(newCart));
    this.calculateSubtotal();
  }

  addProductToCart(product: Product): void {
    let currentCart = this.getCart();
    // Verificar si el producto existe en el array
    let index = currentCart.findIndex(prod => prod.productId === product.productId);

    // si no existe
    if (index === -1) {
      product.quantityInCart = 1; // agregar 1
      currentCart.push(product);
    }
    // si ya existe
    else {
      let quantityInCart = currentCart[index].quantityInCart; // cantidad del producto
      if (quantityInCart < product.productStock.quantity) { // verifica si hay stock
        currentCart[index].quantityInCart += 1; // suma la cantidad al producto en el carrito
      }
    }

    this.updateCart(currentCart);
  }

  removeProductFromCart(productId: number): void {
    let currentCart = this.getCart();
    currentCart = currentCart.filter(p => p.productId !== productId);

    this.updateCart(currentCart);
  }

  getCartFromLocalStorage(): void {
    const cartString = localStorage.getItem('cart');
    if (cartString !== null) {
      this.cartSubject.next(JSON.parse(cartString));
    }
  }

  calculateSubtotal(): void {
    const cart = this.getCart();
    const subtotal = cart.reduce((total, p) => total + (p.price * p.quantityInCart), 0);
    this.subtotalSubject.next(subtotal);
  }

}
