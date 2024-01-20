import { Component, HostListener, OnInit } from '@angular/core';
import { Product } from 'src/app/model/product';
import { ProductService } from 'src/app/service/product.service';

@Component({
  selector: 'app-product-card',
  templateUrl: './product-card.component.html',
  styleUrls: ['./product-card.component.css']
})
export class ProductCardComponent implements OnInit{

  productList: Product[] = [];

  currentPage: number = 0;
  totalPages: Array<number>;
  totalPagesLength: number;

  constructor(private productService: ProductService){}

  ngOnInit(): void {
      this.getProducts(0);
  }

  getProducts(pageNumber: number){
    this.productService.getProducts(pageNumber).subscribe(
      data => {
        this.productList = data.content;
        this.totalPages = new Array(data.totalPages);
        this.totalPagesLength = this.totalPages.length;
      }
    )
  }

  loadMore(i: number){
    this.productService.getProducts(i).subscribe(
      data => {
        this.currentPage++
        this.productList = [...this.productList, ...data.content];
      }
    )
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
