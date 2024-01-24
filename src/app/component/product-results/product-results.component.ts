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
  keyword: string;

  constructor(private productService: ProductService, private route: ActivatedRoute) { }

  ngOnInit(): void {
    this.getProducts();
  }

  // Obtiene los parámetros de la URL
  getProducts() {
    this.route.queryParams.subscribe(
      params => {
        this.category = params['category'] || '';
        this.keyword = params['keyword'] || '';
        this.currentPage = 0;
        this.filterProducts();
      }
    )
  }

  // Obtiene los productos filtrados por category o keyword
  filterProducts() {
    if (this.keyword.length > 1) {
      this.getProductsByKeyword(this.keyword, this.currentPage);
    }
    else if (this.category.length > 1) {
      this.getProductsByCategory(this.category, this.currentPage);
    }
    else {
      this.getAllProducts(this.currentPage);
    }
  }

  // Obtiene todos los productos sin filtros
  getAllProducts(pageNumber: number) {
    this.productService.getAllProducts(pageNumber).subscribe(
      data => {
        this.productList = data.content;
        this.totalPages = new Array(data.totalPages);
        this.totalPagesLength = this.totalPages.length;
      }
    )
  }


  // Obtiene todos los productos por categoryName, el page es para paginar
  getProductsByCategory(category: string, page: number) {
    this.productService.getProductsByCategory(this.category, this.currentPage).subscribe(
      data => this.addProductsToList(data),
      err => console.log(err)
    )
  }

  // Obtiene todos los productos por productName, el page es para paginar
  getProductsByKeyword(keyword: string, page: number) {
    this.productService.getProductsByKeyword(this.keyword, this.currentPage).subscribe(
      data => this.addProductsToList(data),
      err => console.log(err)
    )
  }
  // Guarda los productos obtenidos en la lista y preprara para la páginación. Para evitar repetir código
  addProductsToList(data: any) {
    this.productList = data.content;
    this.totalPages = new Array(data.totalPages);
    this.totalPagesLength = this.totalPages.length;
  }


  // Carga más productos, carga la siguiente página. Usa la paginación
  loadMore() {
    if (this.keyword.length > 1) {
      this.productService.getProductsByKeyword(this.keyword, this.currentPage + 1).subscribe(
        data => this.updateList(data),
        err => console.log(err))
    }
    else if (this.category.length > 1) {
      this.productService.getProductsByCategory(this.category, this.currentPage + 1).subscribe(
        data => this.updateList(data),
        err => console.log(err))
    }
    else {
      this.productService.getAllProducts(this.currentPage + 1).subscribe(
        data => this.updateList(data),
        err => console.log(err))
    }
  }
  // Mete más productos a la lista de productos existente. Para evitar repetir código
  updateList(data: any) {
    this.currentPage++
    this.productList = [...this.productList, ...data.content];
  }


  // Ordena los productos por nombre
  orderProducts(order: string) {
    if (order == "ASC") {
      this.productList.sort((a, b) => a.price - b.price);
    }
    else {
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
