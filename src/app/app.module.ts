import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { HomeComponent } from './component/home/home.component';
import { NavbarComponent } from './component/navbar/navbar.component';
import { FooterComponent } from './component/footer/footer.component';
import { ProductCardComponent } from './component/product-card/product-card.component';
import { ProductPageComponent } from './component/product-page/product-page.component';
import { HttpClientModule } from '@angular/common/http';
import { ProductResultsComponent } from './component/product-results/product-results.component';
import { ShoppingCartComponent } from './component/shopping-cart/shopping-cart.component';
import { FormsModule } from '@angular/forms';

@NgModule({
  declarations: [
    AppComponent,
    HomeComponent,
    NavbarComponent,
    FooterComponent,
    ProductCardComponent,
    ProductPageComponent,
    ProductResultsComponent,
    ShoppingCartComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    HttpClientModule,
    FormsModule
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
