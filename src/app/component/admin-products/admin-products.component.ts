import { Component, OnInit } from '@angular/core';
import { NgForm } from '@angular/forms';
import { Product, ProductCategory, ProductStock, StockEntity } from 'src/app/model/product';
import { ProductService } from 'src/app/service/product.service';

@Component({
  selector: 'app-admin-products',
  templateUrl: './admin-products.component.html',
  styleUrls: ['./admin-products.component.css']
})
export class AdminProductsComponent implements OnInit {

  constructor(private productService: ProductService) { }

  ngOnInit(): void {

    /* Inicializar Producto nuevo */
    this.product.category = this.category;
    this.product.productStock = this.stock;

    /* Inicializar Producto editable */
    this.productEditable.category = this.categoryEditable;

    this.inicializarSidebar();
    this.getCategories();
    this.getProducts(this.currentProductPage);
    this.getStock(this.currentStockPage);
  }

  // -------------- Productos --------------

  /* Paginación */
  productList: Product[] = [];
  currentProductPage: number = 0;
  totalProductPages: Array<number>;
  totalProductPagesLength: number;

  /* Crear nuevo producto */
  product: Product = new Product();
  category: ProductCategory = new ProductCategory();
  stock: ProductStock = new ProductStock();

  /* Editar producto */
  productEditable: Product = new Product();
  categoryEditable: ProductCategory = new ProductCategory();

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

  getProductById(id: number) {
    this.productService.getProductById(id).subscribe(
      data => this.productEditable = data,
      err => console.log(err)
    )
  }

  saveProduct() {
    this.productService.saveProduct(this.product).subscribe(
      data => {
        alert("Guardado correctamente");
        this.ngOnInit();
      },
      err => alert("ERROR AL CREAR")
    )
  }

  updateProduct(productId: number) {
    console.log(this.productEditable);
    console.log(JSON.stringify(this.productEditable));

    this.productService.updateProduct(productId, this.productEditable).subscribe(
      data => {
        alert("Editado correctamente");
        this.ngOnInit();
      },
      err => console.log(err)      
    )

  }

  saveCategory() {

  }

  // -------------- Categorías --------------

  categoriesList: ProductCategory[] = [];

  getCategories() {
    this.productService.getAllCategories().subscribe(
      data => this.categoriesList = data,
      err => console.log(err)
    )
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
