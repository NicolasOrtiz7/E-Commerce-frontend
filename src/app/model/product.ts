export class Product {

    productId: number;
    name: string;
    description: string;
    image: string;
    price: number;
    important: boolean;
    active: boolean;

    category: ProductCategory;
    productStock: ProductStock;

    quantityInCart: number = 0;
}

export class ProductCategory{
    categoryId: number;
    name: string;
    image: string;
}

export class ProductStock{
    stockId: string;
    quantity: number;
}

export class StockEntity{
    stockId: number;
    quantity: number;
    product: Product;
}
