import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Environments } from '../environments';
import { Product } from '../model/product';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class ProductService {

  private URL: string = Environments.URL + "/products"

  constructor(private http: HttpClient) { }

  getAllProducts(page: number): Observable<any>{
    return this.http.get<Product[]>(this.URL + "?page=" + page);
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

}
