export class Order {

    customer: Customer;
    datetime: Date;
    orderItems: OrderItems[];
    orderDetails: OrderDetails;
}

export class OrderDetails{

    payment: string;
    city: string;
    address: string;
}

export class OrderItems{

    constructor(productId: number, quantity: number){
        this.productId = productId;
        this.quantity = quantity;
    }

    productId: number;
    quantity: number;
}

export class Customer{

    customerId: number;
    email: string;
}