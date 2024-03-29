import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { HomeComponent } from './component/home/home.component';
import { ProductResultsComponent } from './component/product-results/product-results.component';
import { ProductCardComponent } from './component/product-card/product-card.component';
import { ShoppingCartComponent } from './component/shopping-cart/shopping-cart.component';
import { AdminProductsComponent } from './component/admin-products/admin-products.component';
import { AdminOrdersComponent } from './component/admin-orders/admin-orders.component';

const routes: Routes = [
  {path: 'home', component: HomeComponent},
  {path: 'products', component: ProductResultsComponent},
  {path: 'card', component: ProductCardComponent},
  {path: 'cart', component: ShoppingCartComponent},
  {path: 'admin/products', component: AdminProductsComponent},
  {path: 'admin/orders', component: AdminOrdersComponent},
  {path: '**', redirectTo: 'home'},
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
