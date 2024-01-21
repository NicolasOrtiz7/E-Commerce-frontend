import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { HomeComponent } from './component/home/home.component';
import { ProductResultsComponent } from './component/product-results/product-results.component';
import { ProductCardComponent } from './component/product-card/product-card.component';

const routes: Routes = [
  {path: 'home', component: HomeComponent},
  {path: 'search', component: ProductResultsComponent},
  {path: 'card', component: ProductCardComponent},
  {path: '**', redirectTo: 'home'},
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
