import { Component, OnInit } from '@angular/core';
import { Product } from 'src/app/model/product';
import { ProductService } from 'src/app/service/product.service';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.css']
})
export class HomeComponent implements OnInit{

  productList: Product[] = [];

  constructor(private productService: ProductService){}

  ngOnInit(): void {
    this.getImportantProducts();
  }

  getImportantProducts(){
    this.productService.getImportantProducts().subscribe(
      data => this.productList = data
    )
  }

}
