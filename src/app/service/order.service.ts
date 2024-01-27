import { Injectable } from '@angular/core';
import { Environments } from '../environments';
import { HttpClient } from '@angular/common/http';
import { Order } from '../model/order';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class OrderService {

  URL: string = Environments.URL + "/orders";

  constructor(private http: HttpClient) { }

  getOrders(page: number): Observable<any>{
    return this.http.get<Order[]>(this.URL + "?page=" + page);
  }

  saveOrder(order: Order){
    return this.http.post(this.URL, order);
  }

}
