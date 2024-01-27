import { Product } from "./product";

// ------------
// Los que están entre líneas son para recibir los datos
// ------------

export class Order {

    customer: Customer;
    datetime: Date;
    orderItems: OrderItems[];
    orderDetails: OrderDetails;

    //--------------
    orderId: number;
    //--------------
}

export class OrderDetails {

    payment: string;
    city: string;
    address: string;

    //--------------
    total: number;
    //--------------
}

export class OrderItems {

    constructor(productId: number, quantity: number) {
        this.productId = productId;
        this.quantity = quantity;
    }

    productId: number;
    quantity: number;


    //--------------
    product: Product;
    //--------------
}

export class Customer {

    customerId: number;
    email: string;
}