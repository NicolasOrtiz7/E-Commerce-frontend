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

  getProducts(page: number): Observable<any>{
    return this.http.get<Product[]>(this.URL + "?page=" + page);
  }
  
  getImportantProducts(): Observable<any>{
    return this.http.get<Product[]>(this.URL + "/search/important");
  }

}
