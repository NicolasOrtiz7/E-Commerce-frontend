import { Component, OnInit } from '@angular/core';
import { Order } from 'src/app/model/order';
import { OrderService } from 'src/app/service/order.service';

@Component({
  selector: 'app-admin-orders',
  templateUrl: './admin-orders.component.html',
  styleUrls: ['./admin-orders.component.css']
})
export class AdminOrdersComponent implements OnInit{

  ordersList: Order[] = [];
  
  currentPage: number = 0;
  totalPages: Array<number>;
  totalPagesLength: number;

  constructor(private orderService: OrderService){}

  ngOnInit(): void {
      this.getOrders(this.currentPage);
  }

  getOrders(pageNumber: number){
    this.orderService.getOrders(pageNumber).subscribe(
      data => {
        this.ordersList = data.content;
        this.totalPages = new Array(data.totalPages);
        this.totalPagesLength = this.totalPages.length;
      }
    )
  }
  
  changePage(i: number, event: any) {
    event.preventDefault();
    this.currentPage = i;
    this.getOrders(i);
  }

}
