import { Injectable } from '@angular/core';
import { Environments } from '../environments';
import { HttpClient } from '@angular/common/http';
import { Order } from '../model/order';

@Injectable({
  providedIn: 'root'
})
export class OrderService {

  URL: string = Environments.URL + "/orders";

  constructor(private http: HttpClient) { }


  saveOrder(order: Order){
    return this.http.post(this.URL, order);
  }

}
