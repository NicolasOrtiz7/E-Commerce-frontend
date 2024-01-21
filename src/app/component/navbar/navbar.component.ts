import { Component, OnInit } from '@angular/core';
import { ProductCategory } from 'src/app/model/product';
import { CategoryService } from 'src/app/service/category.service';

@Component({
  selector: 'app-navbar',
  templateUrl: './navbar.component.html',
  styleUrls: ['./navbar.component.css']
})
export class NavbarComponent implements OnInit{

  categoryList: ProductCategory[] = [];

  constructor(private categoryService: CategoryService){}

  ngOnInit(): void {
    this.getCategories();
}

getCategories(){
  this.categoryService.getCategories().subscribe(
    data => {
      this.categoryList = data
    },
    err => console.log(err)
  )
}

}
