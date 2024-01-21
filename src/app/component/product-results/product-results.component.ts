import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { Product } from 'src/app/model/product';
import { ProductService } from 'src/app/service/product.service';

@Component({
  selector: 'app-product-results',
  templateUrl: './product-results.component.html',
  styleUrls: ['./product-results.component.css']
})
export class ProductResultsComponent implements OnInit {

  productList: Product[] = [];

  currentPage: number = 0;
  totalPages: Array<number>;
  totalPagesLength: number;

  category: string;

  constructor(private productService: ProductService, private route: ActivatedRoute) { }

  ngOnInit(): void {
    this.getProducts();
  }

  getProducts(){
    this.route.queryParams.subscribe(
      params => {
        this.category = params['category'] || '';
        this.currentPage = 0;
        this.filterProducts();
      }
    )
  }

  filterProducts() {
    if (this.category.length > 1) {
      this.getProductsByCategory(this.category, this.currentPage);
    }
    else {
      this.getAllProducts(this.currentPage);
    }
  }

  getAllProducts(pageNumber: number) {
    this.productService.getAllProducts(pageNumber).subscribe(
      data => {
        this.productList = data.content;
        this.totalPages = new Array(data.totalPages);
        this.totalPagesLength = this.totalPages.length;
      }
    )
  }

  getProductsByCategory(category: string, page: number) {
    this.productService.getProductsByCategory(this.category, this.currentPage).subscribe(
      data => {
        this.productList = data.content;
        this.totalPages = new Array(data.totalPages);
        this.totalPagesLength = this.totalPages.length;
      },
      err => console.log(err)
    )
  }


  loadMore() {
    if (this.category.length > 1) {
      this.productService.getProductsByCategory(this.category, this.currentPage + 1).subscribe(
        data => {
          this.currentPage++
          this.productList = [...this.productList, ...data.content];
        }
      )
    }
    else {
      this.productService.getAllProducts(this.currentPage + 1).subscribe(
        data => {
          this.currentPage++
          this.productList = [...this.productList, ...data.content];
        }
      )
    }
  }

  orderProducts(order: string){
    if(order == "ASC"){
      this.productList.sort((a, b) => a.price - b.price);
    }
    else{
      this.productList.sort((a, b) => b.price - a.price);
    }
  }



  // Cuando se usan los botones para cambiar de página
  // changePage(i: number, event: any){
  //   event.preventDefault();
  //   this.currentPage = i;
  //   this.getProducts(i);
  // }

  // ------------------------------------------------
  // Cuando el Scroll llega al final, se ejecuta la función para cargar más productos. (desactivado, se usa el botón de "cargar más")

  // @HostListener('window:scroll', ['$event'])
  // onScroll() {
  //   this.detectScrollToEnd();
  // }
  // detectScrollToEnd() {
  //   const scrollHeight = document.documentElement.scrollHeight;
  //   const visibleHeight = window.innerHeight;
  //   const scrollPosition = window.scrollY || window.pageYOffset || document.body.scrollTop + (document.documentElement && document.documentElement.scrollTop || 0);

  //   if (scrollHeight - scrollPosition === visibleHeight) {
  //     this.loadMore(this.currentPage + 1);
  //   }
  // }
  // ------------------------------------------------

}
