import { Injectable } from '@angular/core';
import { Environments } from '../environments';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { Product, ProductCategory } from '../model/product';

@Injectable({
  providedIn: 'root'
})
export class CategoryService {

  private URL: string = Environments.URL + "/products/categories"

  constructor(private http: HttpClient) { }

  getCategories(): Observable<ProductCategory[]>{
    return this.http.get<ProductCategory[]>(this.URL);
  }

}
