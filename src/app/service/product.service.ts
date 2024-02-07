import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Environments } from '../environments';
import { Product, ProductCategory, StockEntity } from '../model/product';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class ProductService {

  private URL: string = Environments.URL + "/products"

  constructor(private http: HttpClient) { }

  
  // --------- Products ---------

  getAllProducts(page: number): Observable<any>{
    return this.http.get<Product[]>(this.URL + "?page=" + page);
  }

  getAllActiveProducts(page: number): Observable<any>{
    return this.http.get<Product[]>(this.URL + "/actives?page=" + page);
  }
  
  getImportantProducts(): Observable<any>{
    return this.http.get<Product[]>(this.URL + "/search/important");
  }
  
  getProductsByCategory(category: string, page: number = 0): Observable<any>{
    return this.http.get<Product[]>(this.URL + "/search?category=" + category + "&page=" + page);
  }
  
  getProductsByKeyword(keyword: string, page: number = 0): Observable<any>{
    return this.http.get<Product[]>(this.URL + "/search?keyword=" + keyword + "&page=" + page);
  }

  getProductById(id: number){
    return this.http.get<Product>(this.URL + "/" + id);
  }

  saveProduct(product: Product){
    return this.http.post(this.URL, product);
  }

  updateProduct(productId: number, product: Product){
    return this.http.put(this.URL + "/" + productId, product);
  }

  disableProduct(productId: number){
    return this.http.put(this.URL + "/disable/" + productId, {});
  }

  // --------- Categories ---------

  getAllCategories(){
    return this.http.get<ProductCategory[]>(this.URL + "/categories");
  }

  saveCategory(cat: ProductCategory){

  }

  updateCategory(catId: number, cat: ProductCategory){

  }

  deleteCategory(catId: number){

  }

  // --------- Stock ---------

  getAllStock(page: number): Observable<any>{
    return this.http.get<StockEntity[]>(this.URL + "/stock?page=" + page);
  }

  updateStock(productId: number, quantity: number){
    return this.http.put(this.URL + "/stock/product/" + productId + "/" + quantity, {});
  }

}
