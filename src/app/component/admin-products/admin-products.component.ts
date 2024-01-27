import { Component, OnInit } from '@angular/core';
import { Product, StockEntity } from 'src/app/model/product';
import { ProductService } from 'src/app/service/product.service';

@Component({
  selector: 'app-admin-products',
  templateUrl: './admin-products.component.html',
  styleUrls: ['./admin-products.component.css']
})
export class AdminProductsComponent implements OnInit {

  constructor(private productService: ProductService) { }

  ngOnInit(): void {
    this.inicializarSidebar();
    this.getProducts(this.currentProductPage);
    this.getStock(this.currentStockPage);
  }

  // -------------- Productos --------------

  productList: Product[] = [];
  currentProductPage: number = 0;
  totalProductPages: Array<number>;
  totalProductPagesLength: number;

  getProducts(pageNumber: number) {
    this.productService.getAllProducts(pageNumber).subscribe(
      data => {
        this.productList = data.content;
        this.totalProductPages = new Array(data.totalPages);
        this.totalProductPagesLength = this.totalProductPages.length;
      },
      err => console.log(err)
    )
  }

  changeProductPage(i: number, event: any) {
    event.preventDefault();
    this.currentProductPage = i;
    this.getProducts(i);
  }


  // -------------- Stock --------------

  stockList: StockEntity[] = [];
  currentStockPage: number = 0;
  totalStockPages: Array<number>;
  totalStockPagesLength: number;

  getStock(pageNumber: number) {
    this.productService.getAllStock(pageNumber).subscribe(
      data => {
        this.stockList = data.content;
        this.totalStockPages = new Array(data.totalPages);
        this.totalStockPagesLength = this.totalStockPages.length;
      }
    )
  }
  
  changeStockPage(i: number, event: any) {
    event.preventDefault();
    this.currentStockPage = i;
    this.getStock(i);
  }

  // -------------- DOM --------------

  inicializarSidebar() {
    const sidebarCollapse = document.getElementById('sidebarCollapse');
    const sidebar = document.getElementById('sidebar');

    if (sidebarCollapse && sidebar) {
      sidebarCollapse.addEventListener('click', () => {
        sidebar.classList.toggle('active');
      });
    }
  }

}
