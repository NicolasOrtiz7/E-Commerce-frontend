import { Component, OnInit } from '@angular/core';
import { Product, ProductCategory } from 'src/app/model/product';
import { ProductService } from 'src/app/service/product.service';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.css']
})
export class HomeComponent implements OnInit{

  productList: Product[] = [];

  categoryList: ProductCategory[] = [];

  constructor(private productService: ProductService){}

  ngOnInit(): void {
    this.getImportantProducts();
    this.getCategories();
  }

  getImportantProducts(){
    this.productService.getImportantProducts().subscribe(
      data => this.productList = data
    )
  }


  getCategories(){
    this.productService.getAllCategories().subscribe(
      data => this.categoryList = data,
      err => console.log(err)      
    )
  }

}
